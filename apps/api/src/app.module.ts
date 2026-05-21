import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MonitorModule } from './domains/monitor/monitor.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './applications/auth/auth.module';
import { AccountService } from './domains/account/account.service';
import { AccountModule } from './domains/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MonitorModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, AccountService],
})
export class AppModule {}
