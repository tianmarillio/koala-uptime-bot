import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/modules/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { IdentityApplicationModule } from 'src/application/identity/identity.module';

@Module({
  imports: [
    AccountModule,

    // FIXME: use env
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),

    IdentityApplicationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
