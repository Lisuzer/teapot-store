import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/users.entity';
import { JwtStrategy } from './guards/jwt-strategy';
import { StatusesGuard } from './guards/status.guard';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './guards/google-strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      })
    }),
  ],
  providers: [AuthService, JwtStrategy, StatusesGuard, GoogleStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
