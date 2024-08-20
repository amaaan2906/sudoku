import { Hono } from 'hono'

const app = new Hono({ strict: false })
app.get('/', (c) => c.text('Hello Bun!'))

export default {
  port: process.env.PORT || 1337,
  fetch: app.fetch,
}
