import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(
    "mongodb+srv://henry:1234@cluster0.xq0ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  ), TaskModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}