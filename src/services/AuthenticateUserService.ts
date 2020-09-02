import User from './../models/User'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User
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

    //Agora esta autentidado
    return { user }
  }
}

export default AuthenticateUserService
