import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import type { EventHandler, EventHandlerRequest } from 'h3'
export const defineWrappedResponseHandler = <T extends
    EventHandlerRequest, D>(
    handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            const connection = await mysql.createConnection({


                host: 'localhost',
                user: 'forumuser',
                password: 'forumpass',
                database: 'forum',
                Promise: bluebird,

            })
            event.context.mysql = connection
            const response = await handler(event)
            event.context.mysql.end()
            return response
        } catch (err) {
// Error handling
            return { err }
        }

    })

/*Il sera ensuite nécessaire d’utiliser defineWrappedResponseHandlerau lieu de
defineEventHandlerdans vos routes API serveur. Par exemple, dans un ﬁchier
server/api/movies.get.ts:

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    const [rows, fields] = await db.execute("SELECT * FROM movies")
    return {
        movies: rows
    }
});*/