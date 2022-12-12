import { Request, Response, NextFunction } from 'express'
/* libs */
import { genSaltSync, hashSync, compare } from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
/* handlers */
import { Winston } from '@app/handlers/loggers/winston.logger'
/* models */
import { AppResponse } from '@app/models/app.response'

export function generatePassword (password: string): string {
  const rounds = 5
  const salt = genSaltSync(rounds)
  const hash = hashSync(password, salt)
  return hash
}

export async function comparePassword (password: string, hashPassword: string): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    compare(password, hashPassword, (err, matches) => {
      if (err != null) return reject(err)
      return resolve(matches)
    })
  })
}

export function generateToken (id: number): { token: string, expiresIn: number } {
  const expiresIn = 60 * 15
  const token: string = jwt.sign(
    { id },
    process.env.CUENTAME_JWT_TOKEN ?? '',
    { expiresIn })
  return { token, expiresIn }
}

export function generateRefreshToken (id: number): { refreshToken: string, refreshExpiresIn: number } {
  let refreshExpiresIn = 60 * 60 * 24
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)
  refreshExpiresIn = ((date.getTime() - new Date().getTime()) / 1000)
  refreshExpiresIn = parseInt(refreshExpiresIn.toString())
  const refreshToken: string = jwt.sign(
    { id },
    process.env.CUENTAME_JWT_REFRESH_TOKEN ?? '',
    { expiresIn: refreshExpiresIn })
  return { refreshToken, refreshExpiresIn }
}

export function verifyToken (token: string): string | JwtPayload {
  return jwt.verify(token, process.env.CUENTAME_JWT_TOKEN ?? '')
}

export function verifyRefreshToken (token: string): string | JwtPayload {
  return jwt.verify(token, process.env.CUENTAME_JWT_REFRESH_TOKEN ?? '')
}

export function verifyAccess (req: Request, res: Response, next: NextFunction): void {
  const result = new AppResponse()
  try {
    const auth = req.headers?.authorization
    const token = ((auth?.includes('Bearer')) ?? false) ? auth?.split?.(' ')?.[1] : auth
    if (token == null) throw new Error('Token missing from request')
    const { id } = verifyToken(String(token)) as { id: number }
    Winston.info(`user (${id}) verified`)
    next()
  } catch (error) {
    result.message = String(error)
    res.status(401).json(result)
  }
}
