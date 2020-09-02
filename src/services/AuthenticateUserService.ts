import User from './../models/User'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

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
    // o segundo parametro podemos usar um hash do md5.cz reinventese
    //o terceiro sempre sera o id do usuario que fez a requisição
    const token = sign({}, '97a8ba531e3242a25ea0fcb7fee65cc7', {
      subject: user.id,
      expiresIn: '1d'
    })
    return { user, token }
  }
}

export default AuthenticateUserService
