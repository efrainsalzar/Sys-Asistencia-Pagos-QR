export default () => ({
  app: {
    port: Number(process.env.API_PORT ?? 3001),
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  redis: {
    url: process.env.REDIS_URL,
  },
});