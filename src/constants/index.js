// src/constants/index.js
import path from 'node:path';

const FIFTEEN_NINUTES = 15 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 3600 * 1000;

const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export { FIFTEEN_NINUTES, THIRTY_DAYS, SMTP, TEMPLATES_DIR };
