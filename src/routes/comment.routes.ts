import { RequestHandler } from 'express'
/* controllers */
import { commentController } from '@controllers/comment/comment.controller'
import { MyRouter } from './'
/* middlewares */
import { verifyAccess } from '@app/middlewares/authentication.middleware'

class BlogRoutes extends MyRouter {
  constructor () {
    super()
    this.config()
  }

  config (): void {
    this.router.post('/save', verifyAccess, commentController.saveComment as RequestHandler)
    this.router.get('/find', verifyAccess, commentController.findCommmentsByEntry as RequestHandler)
  }
}

const blogRoutes = new BlogRoutes()
export default blogRoutes.router
