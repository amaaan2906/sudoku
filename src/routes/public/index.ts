import { Hono } from 'hono'

const public_api = new Hono().basePath('/api')

import generator from '../../utils/generator'

import solver from '../../utils/solver'

public_api.get('/', (c) => {
    return c.text("public api '/'")
})

public_api.get('/generate/:level?', (c) => {
    let level: string | undefined = c.req.param('level')?.toLowerCase()
    let game = generator()
    return c.json(game)
})

public_api.get('solve/:board_string', (c) => {
    let sol = solver(c.req.param('board_string'))
    return c.text(sol.toString())
})

export default public_api
