import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtSecret: process.env.JWT_SECRET,
  salt: parseInt(process.env.SALT),
}));
