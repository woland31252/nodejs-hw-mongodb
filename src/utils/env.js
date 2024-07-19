// src/utils/env.js
import dotenv from 'dotenv';

dotenv.config();

function env(name, defaultvalue) {
  const value = process.env[name];
  if (value) return value;
  if (defaultvalue) return defaultvalue;
  throw new Error(`Missing: process.env['${name}'].`);
}

const ENV_VARS = {
  GOOGLE_AUTH_CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
  GOOGLE_AUTH_CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
};

export { env, ENV_VARS };
