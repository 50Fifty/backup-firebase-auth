import * as dotenv from 'dotenv';
import * as fs from "fs";

export const serviceAccountKeyFilePath = "tests/system-tests/configs/serviceAccountKey.json"
export const serviceAccountKeyExists = fs.existsSync(serviceAccountKeyFilePath);

dotenv.config({ path: "tests/system-tests/configs/.env" });

if (!process.env.PROJECT_ID && serviceAccountKeyExists) {
  throw new Error('Service Account Key exists but PROJECT_ID not set in .env file.');
}

if (process.env.PROJECT_ID && !serviceAccountKeyExists) {
  throw new Error('PROJECT_ID set in .env file but Service Account Key does not exist.');
}

if (!process.env.BUCKET_NAME) {
  throw new Error('BUCKET_NAME not set in .env file.');
}

if (!process.env.CRON_SCHEDULE) {
  throw new Error('CRON_SCHEDULE not set in .env file.');
}

export const testEnv = {
  PROJECT_ID: process.env.PROJECT_ID,
  BUCKET_NAME: process.env.BUCKET_NAME,
  CRON_SCHEDULE: process.env.CRON_SCHEDULE,
};
