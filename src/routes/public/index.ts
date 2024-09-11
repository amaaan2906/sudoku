import { Hono } from 'hono'

const public_api = new Hono().basePath('/api')

public_api.get('/', (c) => {
    return c.text("public api '/'")
})

export default public_api
