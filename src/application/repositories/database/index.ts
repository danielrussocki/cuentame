// import path from 'path'
/* orm */
import { Sequelize } from 'sequelize-typescript'
import { Winston } from '@app/handlers/loggers/winston.logger'

export const AppDatabaseRepo = new Sequelize({
  database: process.env.CUENTAME_DATABASE,
  username: process.env.CUENTAME_USERNAME,
  password: process.env.CUENTAME_PASSWORD,
  host: process.env.CUENTAME_HOST,
  port: parseInt(process.env.CUENTAME_PORT ?? ''),
  storage: ':memory:',
  dialect: 'mysql',
  logging: (a) => Winston.info(a)
})

AppDatabaseRepo.databaseVersion()
  .then(() => Winston.info('DB connected'))
  .catch(() => Winston.error('Database connection error'))
