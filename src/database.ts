import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {
  DEV_DB_HOST,
  DEV_DB,
  DEV_DB_USER,
  DEV_DB_PASS,
  TEST_DB_HOST,
  TEST_DB,
  TEST_DB_USER,
  TEST_DB_PASS,
  ENV,
} = process.env;

let client: Pool;

if (ENV === 'dev') {
  client = new Pool({
    host: DEV_DB_HOST,
    user: DEV_DB_USER,
    database: DEV_DB,
    password: DEV_DB_PASS,
  });
} else {
  client = new Pool({
    host: TEST_DB_HOST,
    user: TEST_DB_USER,
    database: TEST_DB,
    password: TEST_DB_PASS,
  });
}

export default client;
