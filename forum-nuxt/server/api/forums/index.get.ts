// server/api/forums/index.get.ts
import {db} from '~/server/db/client'
import {forums} from "~/server/db/schema";

export default defineEventHandler(async () => {
    const allForums = await db.select().from(forums)
    return allForums
})