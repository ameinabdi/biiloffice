import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  Query,
  Res,
  UseGuards,
  Req,
  UseInterceptors
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import SingleCourse from '../../domain/single-course.entity';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { SingleCourseRepository } from '../../repository/single-course.repository';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('single-courses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('single-courses')
export class SingleCourseController {
  logger = new Logger('SingleCourseController');

  constructor(@InjectRepository(SingleCourseRepository) private singleCourseRepository: SingleCourseRepository) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SingleCourse
  })
  async getAll(@Req() req: Request) {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.singleCourseRepository.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: SingleCourse
  })
  getOne(@Param('id') id: string) {
    return this.singleCourseRepository.findOne(id);
  }

  @PostMethod('/')
  @ApiOperation({ title: 'Create singleCourse' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SingleCourse
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() singleCourse: SingleCourse) {
    const created = await this.singleCourseRepository.save(singleCourse);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SingleCourse', created.id);
    return created;
  }

  @Put('/:id')
  @ApiOperation({ title: 'Update singleCourse' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SingleCourse
  })
  put(@Req() req: Request, @Param('id') id: string, @Body() singleCourse: SingleCourse) {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SingleCourse', id);
    return this.singleCourseRepository.update(id, singleCourse);
  }

  @Delete('/:id')
  @ApiOperation({ title: 'Delete singleCourse' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  remove(@Req() req: Request, @Param('id') id: string) {
    this.singleCourseRepository.delete(id);
    HeaderUtil.addEntityDeletedHeaders(req.res, 'SingleCourse', id);
  }
}
