import { Module } from '@nestjs/common';
import { AuthService } from '../usuarios/services/auth.service';
import { AuthController } from '../usuarios/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRETO',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
