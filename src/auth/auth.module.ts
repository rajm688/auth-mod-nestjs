import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

// when we are importing typeormodule in app.module we use forRoot and in anyother submodule we use ForFeature
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // jwt module will exports a service called jwtservice we are going to use this service in athservice
      secret: 'ganeshvellan',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
  ], // it expects array of entities but we are providing the repository
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
