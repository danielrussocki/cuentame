import { Request, Response } from 'express'
/* services */
import commentService from './services/comment.service'
/* dtos */
import { IComment, ICommentByBlogs } from './services/dtos/comment.dto'
import { AppResponse } from '@app/models/app.response'

class CommentController {
  public async saveComment (req: Request, res: Response): Promise<void> {
    const body = req.body as IComment
    const result = new AppResponse()

    try {
      const response = await commentService.saveComment(body)
      result.message = 'Comment saved!'
      result.response = response

      res.status(200).json(result)
    } catch (err) {
      result.message = String(err)
      res.status(500).json(result)
    }
  }

  public async findCommmentsByEntry (req: Request, res: Response): Promise<void> {
    const body = req.body as ICommentByBlogs
    const result = new AppResponse()

    try {
      const response = await commentService.findCommmentsByEntry(body)
      result.message = 'Entries found!'
      result.response = response

      res.status(200).json(result)
    } catch (err) {
      result.message = String(err)
      res.status(500).json(result)
    }
  }
}

export const commentController = new CommentController()
