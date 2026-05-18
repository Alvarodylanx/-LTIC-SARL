import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.CORS_ORIGIN || 'http://localhost:3000',
    ],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'ltic-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 },
    })
  );

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
  console.log(`LTIC SARL API running on http://localhost:${port}`);
}

bootstrap();
