export interface ILogin {
  email: string
  password: string
}

export interface ITokenResponse {
  token: string
  refreshToken: string
  expiresIn: number
  refreshExpiresIn: number
}

export interface IRegister {
  name: string
  email: string
  password: string
}
