/**
 * Migración: SQLite local -> Strapi remoto
 *
 * Uso: node migrate-to-remote.js
 *
 * Variables de entorno requeridas:
 *   STRAPI_URL     (ej: https://magazine-api.onrender.com)
 *   ADMIN_EMAIL    (email del admin de Strapi)
 *   ADMIN_PASSWORD (password del admin de Strapi)
 */

const path = require('path')
const fs = require('fs')
const knex = require(path.join(__dirname, 'magazine-api/node_modules/knex'))({
  client: 'sqlite3',
  connection: { filename: path.join(__dirname, 'magazine-api/.tmp/data.db') },
  useNullAsDefault: true,
})

const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/+$/, '')
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

let JWT = null

async function api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } }
  if (JWT) opts.headers['Authorization'] = `Bearer ${JWT}`
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(`${STRAPI_URL}${path}`, opts)
  const text = await res.text()
  if (!res.ok) throw new Error(`[${res.status}] ${method} ${path}: ${text.slice(0, 200)}`)
  try { return JSON.parse(text) } catch { return text }
}

async function login() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ Define ADMIN_EMAIL y ADMIN_PASSWORD como variables de entorno')
    process.exit(1)
  }
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login falló (${res.status}): ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  JWT = data.data.token
  console.log('✅ Login exitoso')
}

// ── Migración ──────────────────────────────────────────────────────
const idMap = { categories: {}, contributors: {}, files: {} }

async function migrateUploads() {
  const files = await knex('upload_file').select('*')
  console.log(`\n📁 Subiendo ${files.length} archivo(s)...`)
  for (const f of files) {
    const filePath = path.join(__dirname, 'magazine-api/public/uploads', f.hash + f.ext)
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠️  No encontrado en disco: ${f.hash}${f.ext}, se omite`)
      continue
    }
    const blob = new Blob([fs.readFileSync(filePath)], { type: f.mime })
    const fd = new FormData()
    fd.append('files', blob, f.name)
    fd.append('refId', '')
    fd.append('ref', '')
    fd.append('source', 'content-api')

    const res = await fetch(`${STRAPI_URL}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${JWT}` },
      body: fd,
    })
    if (!res.ok) {
      console.warn(`  ⚠️  Error subiendo ${f.name}: ${(await res.text()).slice(0, 150)}`)
      continue
    }
    const uploaded = await res.json()
    const u = Array.isArray(uploaded) ? uploaded[0] : uploaded
    idMap.files[f.id] = u.id
    console.log(`  ✅ ${f.name} (${(f.size / 1024).toFixed(1)} KB) -> file#${u.id}`)
  }
}

async function migrateCategories() {
  const cats = await knex('categories').select('*')
  console.log(`\n📂 Migrando ${cats.length} categorías...`)
  for (const c of cats) {
    const created = await api('POST', '/categories', {
      title: c.title,
      slug: c.slug,
      description: c.description || '',
    })
    idMap.categories[c.id] = created.id || created._id || created
    console.log(`  ✅ "${c.title}"`)
  }
}

async function migrateContributors() {
  const conts = await knex('contributors').select('*')
  const comps = await knex('contributors_components').select('*')
  const socials = await knex('components_contributor_social_urls').select('*')

  console.log(`\n👤 Migrando ${conts.length} contribuidor(es)...`)
  for (const c of conts) {
    const comp = comps.find(x => x.contributor_id === c.id && x.field === 'urls')
    let urls = { twitter: null, instagram: null, facebook: null, linkedin: null }
    if (comp) {
      const s = socials.find(x => x.id === comp.component_id)
      if (s) urls = { twitter: s.twitter, instagram: s.instagram, facebook: s.facebook, linkedin: s.linkedin }
    }
    const created = await api('POST', '/contributors', { name: c.name, slug: c.slug, role: c.role, urls })
    idMap.contributors[c.id] = created.id || created._id || created
    console.log(`  ✅ "${c.name}"`)
  }
}

async function migrateArticles() {
  const articles = await knex('articles').select('*')
  console.log(`\n📄 Migrando ${articles.length} artículos...`)
  let ok = 0, errs = 0
  for (const a of articles) {
    const body = {
      title: a.title,
      slug: a.slug,
      content: a.content || '',
      description: a.description || '',
    }
    if (idMap.contributors[a.author]) body.author = idMap.contributors[a.author]
    if (idMap.categories[a.category]) body.category = idMap.categories[a.category]
    if (a.published_at) body.published_at = new Date(a.published_at).toISOString()

    try {
      await api('POST', '/articles', body)
      ok++
    } catch (e) {
      errs++
      console.warn(`  ⚠️  [${a.id}] "${(a.title || '').slice(0, 50)}": ${e.message}`)
    }
    if ((ok + errs) % 20 === 0) process.stdout.write(`  ...${ok + errs}/${articles.length} (${ok} ok, ${errs} err)\n`)
  }
  console.log(`  ✅ ${ok}/${articles.length} artículos migrados (${errs} errores)`)
}

async function migratePages() {
  const pages = await knex('pages').select('*')
  console.log(`\n📑 Migrando ${pages.length} página(s)...`)
  for (const p of pages) {
    const body = { title: p.title, slug: p.slug, content: p.content || '', description: p.description || '' }
    if (p.published_at) body.published_at = new Date(p.published_at).toISOString()
    const created = await api('POST', '/pages', body)
    console.log(`  ✅ "${p.title}"`)
  }
}

async function main() {
  console.log('🚀 Migración SQLite → Strapi remoto')
  console.log(`   Strapi URL: ${STRAPI_URL}\n`)

  await login()
  await migrateUploads()
  await migrateCategories()
  await migrateContributors()
  await migrateArticles()
  await migratePages()

  console.log('\n🎉 Migración completada')
  await knex.destroy()
}

main().catch(e => { console.error('\n💥 Fatal:', e); process.exit(1) })
