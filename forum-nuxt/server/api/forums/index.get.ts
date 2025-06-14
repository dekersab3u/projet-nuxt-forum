// server/api/forums/index.get.ts
import { db } from '~/server/db/client'

export default defineEventHandler(async () => {
    const [rows] = await db.execute('SELECT * FROM forums ORDER BY date_creation DESC')
    return rows
})
