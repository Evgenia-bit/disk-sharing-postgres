const path = require("path")

const { Pool } = require('pg')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const pool = new Pool({connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`})

module.exports = {
     getPerson: async (nickname) => {
             const person = await pool.query(`SELECT * FROM person WHERE nickname = '${nickname}'`)
             return person.rows[0]
     },
    getOwnDisks: async (person_id) => {
        const ownDisks = await pool.query(`SELECT disk.id, disk.name FROM disk 
                                    JOIN takenItem ON  takenItem.diskId = disk.id AND takenItem.ownerId = ${person_id}`)
        return ownDisks.rows
     },
    getFreeDisks: async (person_id) => {
        const freeDisks = await pool.query(`SELECT disk.id, disk.name FROM disk 
                       JOIN takenItem ON  takenItem.diskId = disk.id AND takenItem.ownerId != ${person_id} AND takenItem.holderId = takenItem.ownerId `)
        return freeDisks.rows
     },
    getDisksTakenByPerson: async (person_id) => {
        const disksTakenByPerson = await pool.query(`SELECT disk.id, disk.name FROM disk
                    JOIN takenItem ON  takenItem.diskId = disk.id AND takenItem.ownerId != ${person_id} AND takenItem.holderId = ${person_id}`)
        return disksTakenByPerson.rows
    },
    getDisksTakenFromPerson: async (person_id) => {
        const disksTakenFromPerson = await pool.query(`SELECT disk.id as "diskId", disk.name as "diskName", person.nickname as "personNickname" FROM takenItem  
                                JOIN disk ON  takenItem.diskId = disk.id AND takenItem.ownerId = ${person_id} AND takenItem.holderId != ${person_id}
                                JOIN person ON takenItem.holderId = person.id`)
        return disksTakenFromPerson.rows
    },
    getTakenItem: async (diskId) => {
        const takenItem = await pool.query(`SELECT ownerId, holderId FROM takenItem WHERE diskId = ${diskId}`)
        return takenItem.rows[0]
    },
    giveDisk: async (diskId) => {
        return await pool.query(`UPDATE takenItem SET holderId = ownerId WHERE diskId = ${diskId}`)
    },
    takeDisk: async (person_id, diskId) => {
        return await pool.query(`UPDATE takenItem SET holderId = ${person_id} WHERE diskId = ${diskId}`)
    }
}