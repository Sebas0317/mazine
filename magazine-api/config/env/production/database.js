module.exports = ({ env }) => {
  // Si hay DATABASE_URL (Render / Railway), parseamos manualmente
  const dbUrl = env("DATABASE_URL")
  if (dbUrl) {
    const url = new URL(dbUrl)
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host: url.hostname,
            port: parseInt(url.port, 10) || 5432,
            database: url.pathname.replace(/^\//, ""),
            username: decodeURIComponent(url.username),
            password: decodeURIComponent(url.password),
            schema: "public",
            ssl: { rejectUnauthorized: false },
          },
          options: {},
        },
      },
    }
  }

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          username: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          schema: "public",
          ssl: { rejectUnauthorized: false },
        },
        options: {},
      },
    },
  }
}
