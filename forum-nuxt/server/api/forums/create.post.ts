import { defineWrappedResponseHandler } from '~/server/utils/mysql'
import {forums} from '~/server/db/schema'

export default defineWrappedResponseHandler(async (event) => {
    const body = await readBody(event)
    const { title } = body
    const db = event.context.mysql

    await db.execute('INSERT INTO forums (title) VALUES (?)', [title])

    return { success: true }
})

/*import {db} from '~/server/db/client'
import {forums} from '~/server/db/schema'
import {broadcast} from '~/server/ws'
import { defineWrappedResponseHandler } from '~/server/utils/mysql'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)


    const forumId = result.insertId

    broadcast('new-forum', { id: forumId, titre: body.titre })
    return await db.insert(forums).values(forumData)

})*/
