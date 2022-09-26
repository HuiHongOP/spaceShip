require('dotenv').config()
const { Pool } = require('pg')
/*
const pool = new Pool({
  user: 'iqaocotrhwuddw',
  host: 'host=ec2-44-207-133-100.compute-1.amazonaws.com',
  database: 'dcmm4i2a27tmi7',
  password: 'c2dfea47878b15e67962c82160b447fb188b07763a27c070b297e8e163b5597b',
  port: 5432
});
*/

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    isProduction,
    rejectUnauthorized: false
  }
})
module.exports = pool