import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { MongooseConfigService } from "./config/MongooseConfigService";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useClass: MongooseConfigService
    }),
    AuthModule,
    UsersModule,
    TestsModule
  ]
})
export class AppModule {
}
