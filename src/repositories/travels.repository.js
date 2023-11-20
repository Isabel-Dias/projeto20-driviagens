import db from "../database.connection.js"

async function create(passengerId, flightId) {
    
    const result = await db.query(
        `INSERT INTO "travels" 
        ("passengerId", "flightId") 
        VALUES ($1, $2) RETURNING "id";`,
        [passengerId, flightId]
    )
    return result;
}

export const travelsRepository = {
    create
}