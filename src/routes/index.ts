import { Hono } from 'hono'

const router = new Hono()

import public_api from './public'

router.route('/', public_api)

export default router
