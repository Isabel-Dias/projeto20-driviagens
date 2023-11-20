import db from "../database.connection.js"

async function create(firstName, lastName) {
    const result = await db.query(
        `INSERT INTO "passengers" ("firstName", "lastName") 
        VALUES ($1, $2) 
        RETURNING "id";`,
        [firstName, lastName]
    )
    return result;
}

async function getById(id) {
    const result = await db.query(
        `SELECT * FROM "passengers" 
        WHERE id = $1`,
        [id]
    )
    return result;
}

async function getWithTravels() {
    const result = await db.query(
        `SELECT 
        CONCAT(passengers."firstName", ' ', passengers."lastName") AS passenger,
        COUNT(travels.id) AS travels
        FROM "passengers"
        LEFT JOIN "travels" ON passengers.id = travels."passengerId"
        GROUP BY passengers."firstName", passengers."lastName"
        ORDER BY travels DESC;`
    )
    return result
}

async function getWithTravelsByName(name) {
    const result = await db.query(
        `SELECT 
        CONCAT(passengers."firstName", ' ', passengers."lastName") AS passenger,
        COUNT(travels.id) AS travels
        FROM "passengers"
        LEFT JOIN "travels" ON passengers.id = travels."passengerId"
        WHERE CONCAT(passengers."firstName", ' ', passengers."lastName") ILIKE $1
        GROUP BY passengers."firstName", passengers."lastName"
        ORDER BY travels DESC;`,
        [`%${name}%`]
    )
    return result
}


export const passengerRepository = {
    create,
    getById,
    getWithTravels,
    getWithTravelsByName
}