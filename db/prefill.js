const fs = require('fs')
const path = require("path")
const { Client } = require('pg')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const client = new Client({ connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`})

const sql = fs.readFileSync("./db/init.sql").toString()

client.connect().then(async () => {
    try {
        await client.query(sql)
        console.log('База данных успешно заполнена')
    } catch (e) {
        console.error(e.message)
    } finally {
        client.end()
    }
})