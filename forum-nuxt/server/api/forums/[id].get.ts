import { db } from '~/server/db/client'
import { forums } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const forum = await db.query.forums.findFirst({ where: eq(forums.id, Number(id)) })
    return forum
})
