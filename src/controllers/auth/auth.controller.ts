import { Request, Response } from 'express'
/* services */
import authService from './services/auth.service'
/* dtos */
import { ILogin, IRegister } from './services/dtos/auth.dto'
import { AppResponse } from '@app/models/app.response'

class AuthController {
  public async login (req: Request, res: Response): Promise<void> {
    const body = req.body as ILogin
    const result = new AppResponse()
    const secure = Boolean(process.env.CUENTAME_MODE_HTTPS)

    try {
      const response = await authService.login(body)
      result.message = 'Login is correct'
      result.response = response

      res.cookie('refreshToken', response.refreshToken, {
        secure,
        httpOnly: true,
        expires: new Date(Date.now() + response.refreshExpiresIn * 1000),
        sameSite: 'none'
      })

      res.status(200).json(result)
    } catch (err) {
      result.message = String(err)
      res.status(500).json(result)
    }
  }

  public async register (req: Request, res: Response): Promise<void> {
    const body = req.body as IRegister
    const result = new AppResponse()

    try {
      const response = await authService.register(body)
      result.message = 'Register correct!'
      result.response = response

      res.status(200).json(result)
    } catch (err) {
      result.message = String(err)
      res.status(500).json(result)
    }
  }
}

export const authController = new AuthController()
