const log = function (msg: any) {
    console.log(`<${new Date().toUTCString()}> [App] ${msg}`)
}

import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { CronJob } from 'cron'

import { createHmac } from 'node:crypto'

const app = new Hono({ strict: false })
app.use(logger())

import router from './routes'
app.get('/health', (c) => {
    return c.text('OK', 200)
})

app.route('/', router)

export default {
    port: process.env.PORT || 1337,
    fetch: app.fetch,
}

CronJob.from({
    cronTime: '0 5 * * *',
    onTick: () => {
        log('test')
    },
    start: true,
    timeZone: 'Etc/GMT',
})

// setInterval(() => {
//     const secret = 'ilovesudoku'
//     const hash = createHmac('SHA1', secret)
//         .update(
//             '107005290000700084040009100010000470030000000006280500900501002060000009000608000'
//         )
//         .digest('hex')
//     console.log(hash)
//     // Prints:
//     //   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
// }, 1000)
