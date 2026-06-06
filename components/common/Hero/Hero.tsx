type Props = {
  title: string
  description?: string
}

const Hero = ({ title, description }: Props) => {
  return (
    <div className="py-6 text-center max-w-2xl mx-auto">
      <h1 className="serif text-3xl mb-3 leading-tight">{title}</h1>
      {description && (
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--primary-60)' }}>
          {description}
        </p>
      )}
    </div>
  )
}

export default Hero
