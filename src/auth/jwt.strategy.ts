import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from './auth.repository';
import { payloadInterface } from './dto/payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {
    super({
      secretOrKey: 'Top_secret',
      JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  /**
   *
   * @param payload
   * @returns
   */
  async validate(payload: payloadInterface) {
    const { username } = payload; // where does this payload is coming from
    const user = await this.authRepository
      .createQueryBuilder()
      .where({ username })
      .getOne();
    if (!user) return { mes: 'user not found' };
    else return user; // this returnd user will be then injected to the req. obj. of the controller
  }
}
