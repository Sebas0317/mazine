import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { getMediaURL } from '@lib/api'
import {
  Timeline,
  DataGrid,
  ActorCards,
  StatCards,
  InfoBox,
} from './EditorialComponents'

const ParagraphRenderer = (props: any) => {
  const element = props.children?.[0]
  if (!element) return <p {...props} />
  if (element.type?.name === 'ImageRenderer') return { ...element }
  return <p {...props} />
}

const ImageRenderer = ({ src, alt }: { src: string; alt: string }) => {
  const srcUrl = getMediaURL(src)
  return (
    <figure className="relative w-full h-full mt-6">
      {src.startsWith(process.env.API_URL || 'http://localhost:1337') ? (
        <Image src={srcUrl} alt={alt} layout="fill" objectFit="contain" />
      ) : (
        <img src={srcUrl} alt={alt} style={{ objectFit: 'contain' }} />
      )}
      <figcaption
        className="text-sm mt-4 text-primary-60"
        style={{ textAlign: 'center' }}
      >
        {alt}
      </figcaption>
    </figure>
  )
}

// ─── Markdown table parser ──────────────────────────────
function isMarkdownTable(block: string): boolean {
  const lines = block.trim().split('\n')
  if (lines.length < 2) return false
  const first = lines[0].trim()
  const second = lines[1].trim()
  return (
    first.startsWith('|') &&
    first.endsWith('|') &&
    second.startsWith('|') &&
    /^[\| :\-]+$/.test(second.replace(/-/g, ''))
  )
}

function parseMarkdownTable(block: string): {
  headers: string[]
  rows: string[][]
} {
  const lines = block
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l)

  // Remove separator line (line 2)
  const headerLine = lines[0]
  const dataLines = lines.slice(2)

  const parseRow = (line: string) =>
    line
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((c) => c.trim())

  const headers = parseRow(headerLine)
  const rows = dataLines.map(parseRow)
  return { headers, rows }
}

function getTableType(headers: string[]) {
  const h = headers.map((s) => s.toLowerCase().trim())
  if (
    h.length >= 2 &&
    (h[0] === 'año' || h[0] === 'a\u00f1o' || h[0] === 'year')
  )
    return 'timeline'
  if (h.length === 2) return 'actor-cards'
  if (h.length >= 3) return 'data-grid'
  return 'default'
}

function isStatTable(headers: string[], rows: string[][]): boolean {
  if (headers.length !== 2 || rows.length < 2) return false
  const valueCol = 1
  const numericCount = rows.filter(
    (r) => r[valueCol] && /^[\d.,%$]/.test(r[valueCol].trim())
  ).length
  return numericCount >= rows.length * 0.5
}

function parseTableToSegment(block: string): {
  type: 'table'
  component: ReactNode
} | null {
  if (!isMarkdownTable(block)) return null
  const { headers, rows } = parseMarkdownTable(block)
  const tableType = getTableType(headers)

  if (tableType === 'timeline') {
    const items = rows.map((r) => ({ year: r[0] || '', event: r[1] || '' }))
    return { type: 'table', component: <Timeline items={items} /> }
  }

  if (tableType === 'data-grid') {
    return { type: 'table', component: <DataGrid headers={headers} rows={rows} /> }
  }

  if (tableType === 'actor-cards') {
    if (isStatTable(headers, rows)) {
      const items = rows.map((r) => ({ metric: r[0] || '', value: r[1] || '' }))
      return { type: 'table', component: <StatCards items={items} /> }
    }
    const items = rows.map((r) => ({
      entity: r[0] || '',
      role: r[1] || '',
    }))
    return { type: 'table', component: <ActorCards items={items} /> }
  }

  return null
}

// ─── Blockquote with label detection ────────────────────
const INFO_LABELS = [
  'lo esencial',
  'dato clave',
  'claves del caso',
  'claves para entender',
  '¿por qué importa',
  'por qué importa',
  'impacto para colombia',
  'impacto global',
  'impacto en la democracia',
  'reflexión',
  'lo que viene',
  'pregunta central',
  'lo esencial',
]

function getInfoLabel(text: string): string | null {
  const lower = text.toLowerCase().replace(/[¿?:]/g, '').trim()
  for (const label of INFO_LABELS) {
    if (lower.startsWith(label)) return text.replace(/:.*$/, '').trim()
  }
  return null
}

function isInfoBlockquote(block: string): string | null {
  const trimmed = block.trim()
  if (!trimmed.startsWith('>')) return null
  const content = trimmed.replace(/^>\s?/, '')
  // Check for **Label:** pattern
  const strongMatch = content.match(/^\*\*(.+?)\*\*/)
  if (strongMatch) {
    const label = getInfoLabel(strongMatch[1])
    if (label) return label
  }
  return null
}

function removeLabelFromBlockquote(block: string): string {
  return block.replace(/^\*\*.+?\*\*:?\s?/, '')
}

// ─── Content splitter ───────────────────────────────────
function splitContent(content: string): ReactNode[] {
  const blocks = content.split(/\n\n+/)
  const result: ReactNode[] = []
  let key = 0

  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) continue

    // Check for info blockquote
    const infoLabel = isInfoBlockquote(trimmed)
    if (infoLabel) {
      const body = removeLabelFromBlockquote(trimmed)
      result.push(
        <InfoBox key={key++} label={infoLabel}>
          <ReactMarkdown renderers={{ image: ImageRenderer }}>
            {body}
          </ReactMarkdown>
        </InfoBox>
      )
      continue
    }

    // Check for markdown table
    const tableSeg = parseTableToSegment(trimmed)
    if (tableSeg) {
      result.push(<div key={key++}>{tableSeg.component}</div>)
      continue
    }

    // Regular markdown
    result.push(
      <ReactMarkdown
        key={key++}
        renderers={{ image: ImageRenderer, paragraph: ParagraphRenderer }}
      >
        {trimmed}
      </ReactMarkdown>
    )
  }

  return result
}

// ─── Markdown component ─────────────────────────────────
const Markdown = ({
  content,
  variant,
}: {
  content?: string
  variant?: 'editorial'
}) => {
  const isEditorial = variant === 'editorial'
  if (!content) return null

  if (isEditorial) {
    const segments = splitContent(content)
    return (
      <section className="markdown markdown-editorial">{segments}</section>
    )
  }

  return (
    <section className="markdown">
      <ReactMarkdown
        renderers={{ image: ImageRenderer, paragraph: ParagraphRenderer }}
      >
        {content}
      </ReactMarkdown>
    </section>
  )
}

export default Markdown
