import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities:[User]
    }),
    UserModule,JwtModule.register({
      signOptions: {  expiresIn:'2d'},
      secret: process.env.CLE_SECRETE

    })
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {
  constructor(private readonly databaseService : DatabaseService){
    this.databaseService.testConnection()
  }
}
