import User from './../models/User'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from './../config/auth'

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error("Email ou senhas incorretos");
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error("Email ou senhas incorretos");
    }
    // bacana essa desetruturação:
    const { secret, expiresIn } = authConfig.jwt
    // o segundo parametro podemos usar um hash do md5.cz reinventese
    //o terceiro sempre sera o id do usuario que fez a requisição
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    })
    return { user, token }
  }
}

export default AuthenticateUserService
