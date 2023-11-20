import db from "../database.connection.js"

async function create(flightData) {

    const { origin, destination, date } = flightData;

    const result = await db.query(
        `INSERT INTO "flights" ("origin",
        "destination",
        "date") VALUES ($1, $2, $3) RETURNING "id";`,
        [origin, destination, date]
    )
    return result.rows[0].id
}

export const flightsRepository = {
    create
}