import { RequestHandler } from 'express'
/* controllers */
import { authController } from '@controllers/auth/auth.controller'
import { MyRouter } from './'

class AuthRoutes extends MyRouter {
  constructor () {
    super()
    this.config()
  }

  config (): void {
    this.router.post('/login', authController.login as RequestHandler)
    this.router.post('/register', authController.register as RequestHandler)
  }
}

const authRoutes = new AuthRoutes()
export default authRoutes.router
