import { Module } from '@nestjs/common';
import { AccountSignUpUseCase } from './account-sign-up.use-case';
import { AccountModule } from 'src/modules/account/account.module';

@Module({
  imports: [AccountModule],
  providers: [AccountSignUpUseCase],
  exports: [AccountSignUpUseCase],
})
export class IdentityApplicationModule {}
