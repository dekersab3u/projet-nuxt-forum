import {db} from '~/server/db/client'
import {forums} from '~/server/db/schema'
import {broadcast} from '~/server/ws'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)


    const forumId = result.insertId

    broadcast('new-forum', { id: forumId, titre: body.titre })
    return await db.insert(forums).values(forumData)

})
