import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MonitorModule } from './modules/monitor/monitor.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AccountService } from './modules/account/account.service';
import { AccountModule } from './modules/account/account.module';
import { IdentityApplicationModule } from './application/identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MonitorModule,
    AuthModule,
    AccountModule,
    IdentityApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AccountService],
})
export class AppModule {}
