//repository are class decorated with @EntityRepository which extends Repostiory from typeorm and gives the type of the entity the repository tends to

import { EntityRepository, Repository } from 'typeorm';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
@EntityRepository(Auth) // to denote the repository of the Auth entity
export class AuthRepository extends Repository<Auth> {
  async creatingUser(req: AuthDto): Promise<string> {
    try {
      const { username, password } = req;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.createQueryBuilder()
        .insert()
        .into(Auth)
        .values({ username, password: hashedPassword })
        .execute();
      return 'user created successfully';
    } catch (error) {
      //   console.log(error.code);
      if (error.code == 23505) return 'user already exists';
      else return 'error in signup';
    }
  }
  async finduser(req: AuthDto, jwtService): Promise<any> {
    try {
      const { username, password } = req;
      const user = await this.createQueryBuilder().where({ username }).getOne();
      const unhashedpassword = await bcrypt.compare(password, user.password);
      if (user && unhashedpassword) {
        const payload = { username }; //payload should be an object
        const accessToken = await jwtService.sign(payload);
        return { accessToken };
      } else return 'invalid username or password';
    } catch (err) {
      return 'error in login';
    }
  }
}
