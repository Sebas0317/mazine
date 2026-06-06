import { Layout } from '@components/common/Layout'

export default function Custom404() {
  return (
    <Layout>
      <div className="text-center my-auto">
        <h4 className="my-1 text-2xl serif">Página no encontrada</h4>
        <p style={{ color: 'var(--primary-60)' }}>Lo sentimos, no pudimos encontrar esta página.</p>
      </div>
    </Layout>
  )
}
