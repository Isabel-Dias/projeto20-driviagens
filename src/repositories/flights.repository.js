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

async function getById(id) {

    const result = await db.query(
        `SELECT * FROM "flights"
        WHERE "id" = $1`,
        [id]
    )
    return result;
}

async function getAll() {

    const result = await db.query(
        `SELECT flights.id,
        origin.name AS origin,
        destination.name AS destination,
        TO_CHAR(flights.date, 'DD-MM-YYYY') AS "date"
        FROM "flights"
        JOIN "cities" AS origin ON flights.origin = origin.id
        JOIN "cities" AS destination ON flights.destination = destination.id
        ORDER BY flights.date DESC;`
    )
    return result;
}

async function getAllByOrigin(origin) {

    const result = await db.query(
        `SELECT flights.id,
        origin.name AS origin,
        destination.name AS destination,
        TO_CHAR(flights.date, 'DD-MM-YYYY') AS "date"
        FROM "flights"
        JOIN "cities" AS origin ON flights.origin = origin.id
        JOIN "cities" AS destination ON flights.destination = destination.id
        WHERE origin.name = $1
        ORDER BY flights.date DESC;`,
        [origin]
    )
    return result;
}

async function getAllByDestination(destination) {

    const result = await db.query(
        `SELECT flights.id,
        origin.name AS origin,
        destination.name AS destination,
        TO_CHAR(flights.date, 'DD-MM-YYYY') AS "date"
        FROM "flights"
        JOIN "cities" AS origin ON flights.origin = origin.id
        JOIN "cities" AS destination ON flights.destination = destination.id
        WHERE destination.name = $1
        ORDER BY flights.date DESC;`,
        [destination]
    )
    return result;
}

async function getAllbyOriginAndDestination(origin, destination) {

    const result = await db.query(
        `SELECT flights.id,
        origin.name AS origin,
        destination.name AS destination,
        TO_CHAR(flights.date, 'DD-MM-YYYY') AS "date"
        FROM "flights"
        JOIN "cities" AS origin ON flights.origin = origin.id
        JOIN "cities" AS destination ON flights.destination = destination.id
        WHERE origin.name = $1 AND destination.name = $2
        ORDER BY flights.date DESC;`,
        [origin, destination]
    )
    return result;
}



export const flightsRepository = {
    create,
    getById,
    getAll,
    getAllByOrigin,
    getAllByDestination,
    getAllbyOriginAndDestination
}