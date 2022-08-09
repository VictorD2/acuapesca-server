import dotenv from 'dotenv';

dotenv.config();
const config = {
  jwtSecret: process.env.JWT_SECRET,
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  port: parseInt(process.env.BD_PORT || '3306', 10),
  adminId: process.env.ADMIN_ID,
  adminEmail: process.env.ADMIN_EMAIL,
  adminName: process.env.ADMIN_NAME,
  adminLastname: process.env.ADMIN_LASTNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  adminRolId: process.env.ROL_ADMIN_ID,
};

export default config;
