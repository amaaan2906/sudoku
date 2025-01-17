import { Hono } from 'hono'

const router = new Hono()

import public_api from './public'

router.get('/health', (c) => {
    return c.text('OK', 200)
})

router.route('/', public_api)

export default router
