import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemetraUserController } from '../web/rest/demetra-user.controller';
import { DemetraUserRepository } from '../repository/demetra-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DemetraUserRepository])],
  controllers: [DemetraUserController]
})
export class DemetraUserModule {}
