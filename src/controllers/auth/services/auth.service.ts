/* dtos */
import { ILogin, ITokenResponse, IRegister } from './dtos/auth.dto'
/* middlewares */
import { comparePassword, generateToken, generateRefreshToken, generatePassword } from '@app/middlewares/authentication.middleware'
/* modules */
import { User } from '@app/repositories/database/models'

class AuthService {
  async register ({ name, email, password }: IRegister): Promise<User> {
    const hashed = generatePassword(password)
    const data = await User.create({ name, email, password: hashed })
    return data
  }

  async login ({ email, password }: ILogin): Promise<ITokenResponse> {
    const user = await User.findOne({ where: { email, active: true } })
    if (user == null) throw new Error('The account does not exists!')
    const isPasswordCorrect = await comparePassword(password, user.password)
    if (!isPasswordCorrect) throw new Error('Incorrect password')
    const { token, expiresIn } = generateToken(user.id)
    const { refreshToken, refreshExpiresIn } = generateRefreshToken(user.id)
    return { token, refreshToken, expiresIn, refreshExpiresIn }
  }
}

const authService = new AuthService()
export default authService
