import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleCourseController } from '../web/rest/single-course.controller';
import { SingleCourseRepository } from '../repository/single-course.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SingleCourseRepository])],
  controllers: [SingleCourseController]
})
export class SingleCourseModule {}
