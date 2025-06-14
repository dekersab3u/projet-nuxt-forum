// server/db/client.ts
import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'

const poolConnection = mysql.createPool({
    host: 'localhost',
    user: 'forumuser',
    password: 'forumpass',
    database: 'forum',
})

export const db = drizzle(poolConnection)
