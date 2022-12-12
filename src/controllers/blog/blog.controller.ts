import { Request, Response } from 'express'
/* services */
import blogService from './services/blog.service'
/* dtos */
import { IEntry, IFindTitle } from './services/dtos/blog.dto'
import { AppResponse } from '@app/models/app.response'

class BlogController {
  public async saveEntry (req: Request, res: Response): Promise<void> {
    const body = req.body as IEntry
    const result = new AppResponse()

    try {
      const response = await blogService.saveEntry(body)
      result.message = 'Entry saved!'
      result.response = response

      res.status(200).json(result)
    } catch (err) {
      result.message = String(err)
      res.status(500).json(result)
    }
  }

  public async findTitle (req: Request, res: Response): Promise<void> {
    const body = req.body as IFindTitle
    const result = new AppResponse()

    try {
      const response = await blogService.findTitle(body)
      result.message = 'Entries found!'
      result.response = response

      res.status(200).json(result)
    } catch (err) {
      result.message = String(err)
      res.status(500).json(result)
    }
  }
}

export const blogController = new BlogController()
