import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    const [forums]: any = await db.execute(`
    SELECT f.*, COUNT(s.id) AS topic_count
    FROM forums f
    LEFT JOIN sujets s ON s.forum_id = f.id
    GROUP BY f.id
  `)

    return { forums }
})

/*import {db} from '~/server/db/client'
import { }
import {forums} from "~/server/db/schema";
import { defineWrappedResponseHandler } from '~/server/utils/mysql'


export default defineEventHandler(async () => {
    const allForums = await db.select().from(forums)
    return allForums
})*/