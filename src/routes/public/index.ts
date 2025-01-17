import { Hono } from 'hono'
import { CronJob } from 'cron'

import generator from '../../utils/generator'
import solver from '../../utils/solver'

const public_api = new Hono().basePath('/api')

public_api.get('/', (c) => {
    return c.text("public api '/'")
})

public_api.get('/generate/:level?', (c) => {
    // TODO: pass level select to generator
    let level: string | undefined = c.req.param('level')?.toLowerCase()
    let level_num =
        level == 'easy' ? 0 : level == 'medium' ? 1 : level == 'hard' ? 2 : -1
    let game = generator(level_num)
    return c.json(game)
})

public_api.get('solve/:board_string', (c) => {
    return c.text(solver(c.req.param('board_string'), true).toString())
})

CronJob.from({
    cronTime: '0 5 * * *',
    onTick: () => {
        for (let i = 0; i < 10; i++) {
            let game = generator()
        }
    },
    start: true,
    timeZone: 'Etc/GMT',
})

export default public_api
