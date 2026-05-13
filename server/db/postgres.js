const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')
const { PG_CONNECTION_STRING } = require('../config/env')

const pool = new Pool({
  connectionString: PG_CONNECTION_STRING,
})

pool.on('connect', () => {
  console.log('PostgreSQL connected')
})

async function testPostgresConnection() {
  try {
    await pool.query('SELECT 1')
    console.log('PostgreSQL connection check passed')
  } catch (error) {
    console.error('PostgreSQL connection error:', error.message)
    process.exit(1)
  }
}

async function runMigrations() {
  const migrationPath = path.join(__dirname, 'migrations', '001_init.sql')
  const sql = fs.readFileSync(migrationPath, 'utf8')
  await pool.query(sql)
  console.log('Migrations ran successfully')
}

module.exports = {
  pool,
  testPostgresConnection,
  runMigrations,
}
