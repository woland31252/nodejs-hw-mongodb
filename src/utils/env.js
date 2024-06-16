// src/utils/env.js
import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultvalue) {
  const value = process.env[name];
  if (value) return value;
  if (defaultvalue) return defaultvalue;
  throw new Error(`Missing: process.env['${name}'].`);
}
