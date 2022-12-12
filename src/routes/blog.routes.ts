import { RequestHandler } from 'express'
/* controllers */
import { blogController } from '@controllers/blog/blog.controller'
import { MyRouter } from './'
/* middlewares */
import { verifyAccess } from '@app/middlewares/authentication.middleware'

class BlogRoutes extends MyRouter {
  constructor () {
    super()
    this.config()
  }

  config (): void {
    this.router.post('/save', verifyAccess, blogController.saveEntry as RequestHandler)
    this.router.get('/title', verifyAccess, blogController.findTitle as RequestHandler)
  }
}

const blogRoutes = new BlogRoutes()
export default blogRoutes.router
