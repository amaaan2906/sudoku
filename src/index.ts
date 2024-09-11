import { Hono } from 'hono'

const app = new Hono({ strict: false })

import router from './routes'
app.get('/health', (c) => {
    return c.text('OK', 200)
})

app.route('/', router)

export default {
    port: process.env.PORT || 1337,
    fetch: app.fetch,
}
