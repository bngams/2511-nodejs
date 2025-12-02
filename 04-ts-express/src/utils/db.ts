import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString!)
console.log('SQL initialized', connectionString);

export default sql