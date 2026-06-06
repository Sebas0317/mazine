import { Layout } from '@components/common/Layout'

const offline = () => {
  return (
    <Layout>
      <div className="text-center my-auto">
        <h4 className="my-1 text-2xl serif">Sin conexión</h4>
        <p style={{ color: 'var(--primary-60)' }}>
          Esta página no puede mostrarse porque no estás conectado a internet.
        </p>
      </div>
    </Layout>
  )
}

export default offline
