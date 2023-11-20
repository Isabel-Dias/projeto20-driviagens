import db from "../database.connection.js"

async function create(firstName, lastName) {
    const result = await db.query(
        `INSERT INTO "passengers" ("firstName", "lastName") VALUES ($1, $2) RETURNING "id";`,
        [firstName, lastName]
    )
    return result;
}

export const passengerRepository = {
    create
}