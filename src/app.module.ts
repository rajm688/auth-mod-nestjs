import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'raj123',
      database: 'auth-mod',
      autoLoadEntities: true, // we can provide entities here or autoload entitiles will do it for us
      synchronize: true,
    }),
  ],
})
export class AppModule {}
