/* aliases */
import 'module-alias/register'
import 'dotenv/config'

/* application */
import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/* handlers */
import { Winston } from '@app/handlers/loggers/winston.logger'

/* routes */
import authRoutes from '@routes/auth.routes'
import blogRoutes from '@routes/blog.routes'
import commentRoutes from '@routes/comment.routes'

/* app */
export class MyApp {
  public app: Application

  constructor () {
    this.app = express()

    /* run configuration */
    this.config()
    this.routes()
  }

  /* app configuration */
  config (): void {
    this.app.set('port', process.env.PORT ?? 3100)
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  /* routing configuration */
  routes (): void {
    this.app.use('/api/auth', authRoutes)
    this.app.use('/api/blog', blogRoutes)
    this.app.use('/api/comment', commentRoutes)
  }

  start (): void {
    this.app.listen(this.app.get('port'), () => {
      Winston.info(`Server listening on \x1b[34mhttp://localhost:${this.app.get('port') as string}\x1b[0m`)
    })
  }
}
