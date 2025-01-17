const log = function (msg: any) {
    console.log(`<${new Date().toUTCString()}> [App] ${msg}`)
}

import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono({ strict: false })
app.use(logger())

import router from './routes'
app.route('/', router)

export default {
    port: process.env.PORT || 1337,
    fetch: app.fetch,
}
