import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/modules/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { IdentityApplicationModule } from 'src/application/identity/identity.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AccountModule,

    JwtModule.register({
      // FIXME: use env for jwt secret
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),

    IdentityApplicationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
