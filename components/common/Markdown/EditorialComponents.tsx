import { Children, isValidElement, ReactNode } from 'react'

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number')
    return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement(node)) {
    const children = node.props.children
    return children ? extractText(children) : ''
  }
  return ''
}

function cellText(node: ReactNode): string {
  return extractText(node).trim()
}

function flatChildren(c: ReactNode): ReactNode[] {
  const arr = Array.isArray(c) ? c : [c]
  return arr.filter(Boolean)
}

// ─── Timeline ─────────────────────────────────────────────
export function Timeline({ items: _items }: { items: { year: string; event: ReactNode }[] }) {
  return (
    <div className="editorial-timeline">
      {_items.map((item, i) => (
        <div key={i} className="editorial-timeline-item">
          <div className="editorial-timeline-dot" />
          {i < _items.length - 1 && <div className="editorial-timeline-line" />}
          <div className="editorial-timeline-year">{item.year}</div>
          <div className="editorial-timeline-event">{item.event}</div>
        </div>
      ))}
    </div>
  )
}

// ─── DataGrid ─────────────────────────────────────────────
export function DataGrid({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="editorial-datagrid">
      <div className="editorial-datagrid-header">
        {headers.map((h, i) => (
          <div key={i} className="editorial-datagrid-hcell">
            {h}
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} className="editorial-datagrid-row">
          {row.map((cell, ci) => (
            <div
              key={ci}
              className={`editorial-datagrid-cell ${
                ci === 0 ? 'editorial-datagrid-label' : ''
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── ActorCards (2‑column entity‑description tables) ──────
export function ActorCards({
  items,
}: {
  items: { entity: ReactNode; role: ReactNode }[]
}) {
  return (
    <div className="editorial-actor-cards">
      {items.map((item, i) => (
        <div key={i} className="editorial-actor-card">
          <div className="editorial-actor-entity">{item.entity}</div>
          <div className="editorial-actor-role">{item.role}</div>
        </div>
      ))}
    </div>
  )
}

// ─── StatCards (single‑metric highlight) ──────────────────
export function StatCards({
  items,
}: {
  items: { metric: ReactNode; value: ReactNode }[]
}) {
  return (
    <div className="editorial-stat-cards">
      {items.map((item, i) => (
        <div key={i} className="editorial-stat-card">
          <div className="editorial-stat-value">{item.value}</div>
          <div className="editorial-stat-metric">{item.metric}</div>
        </div>
      ))}
    </div>
  )
}

// ─── InfoBox ──────────────────────────────────────────────
const INFO_TYPES: Record<string, { label: string; className: string }> = {
  esencial: {
    label: 'Lo esencial',
    className: 'editorial-infobox-esencial',
  },
  clave: {
    label: 'Dato clave',
    className: 'editorial-infobox-clave',
  },
  impacto_colombia: {
    label: 'Impacto para Colombia',
    className: 'editorial-infobox-impacto',
  },
  impacto_global: {
    label: 'Impacto global',
    className: 'editorial-infobox-impacto',
  },
  porque_importa: {
    label: '¿Por qué importa?',
    className: 'editorial-infobox-importa',
  },
  reflexion: {
    label: 'Reflexión',
    className: 'editorial-infobox-reflexion',
  },
}

export function InfoBox({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  const labelLower = label.replace(/[¿?:]/g, '').toLowerCase().trim()
  let infoType: { label: string; className: string } | undefined

  if (/^(lo )?esencial/.test(labelLower))
    infoType = INFO_TYPES.esencial
  else if (/^dato clave/.test(labelLower))
    infoType = INFO_TYPES.clave
  else if (/^impacto.*colombia/.test(labelLower))
    infoType = INFO_TYPES.impacto_colombia
  else if (/^impacto/.test(labelLower))
    infoType = INFO_TYPES.impacto_global
  else if (/^(¿)?por qué importa/.test(labelLower))
    infoType = INFO_TYPES.porque_importa
  else if (/^reflexión/.test(labelLower))
    infoType = INFO_TYPES.reflexion

  const cls = infoType?.className || 'editorial-infobox-default'

  return (
    <div className={`editorial-infobox ${cls}`}>
      <div className="editorial-infobox-label">
        {infoType?.label || label.replace(':', '')}
      </div>
      <div className="editorial-infobox-content">{children}</div>
    </div>
  )
}

// ─── Table data extraction helpers ────────────────────────
export function extractTableData(children: ReactNode) {
  const kids = flatChildren(children)
  let thead: ReactNode | undefined
  let tbody: ReactNode | undefined

  for (const kid of kids) {
    if (isValidElement(kid)) {
      if (kid.type === 'thead') thead = kid
      if (kid.type === 'tbody') tbody = kid
    }
  }

  if (!thead || !tbody) return null

  const theadChildren = isValidElement(thead)
    ? flatChildren(thead.props.children)
    : []
  const headerRow = theadChildren[0]
  const headers = isValidElement(headerRow)
    ? flatChildren(headerRow.props.children).map(cellText)
    : []

  const tbodyChildren = isValidElement(tbody)
    ? flatChildren(tbody.props.children)
    : []
  const rows: string[][] = []
  for (const tr of tbodyChildren) {
    if (isValidElement(tr)) {
      const cells = flatChildren(tr.props.children).map(cellText)
      rows.push(cells)
    }
  }

  return { headers, rows }
}

export function detectTableType(headers: string[]) {
  const h = headers.map((s) => s.toLowerCase().trim())

  if (h.length >= 2 && (h[0] === 'año' || h[0] === 'a\u00f1o' || h[0] === 'year'))
    return 'timeline'

  if (h.length === 2) return 'actor-cards'

  if (h.length >= 3) return 'data-grid'

  return 'default'
}

function isNumericValue(s: string): boolean {
  return /^[\d.,%]/.test(s.trim()) || /millones|billones|%|dólares|usd/i.test(s.trim())
}

export function detectStatTable(headers: string[], rows: string[][]): boolean {
  if (headers.length === 2 && rows.length >= 2) {
    const valueCol = 1
    const allValues = rows.map((r) => r[valueCol] || '').filter(Boolean)
    const numericCount = allValues.filter(isNumericValue).length
    return numericCount >= rows.length * 0.5
  }
  return false
}
