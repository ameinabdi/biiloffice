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
import DemetraUser from '../../domain/demetra-user.entity';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { DemetraUserRepository } from '../../repository/demetra-user.repository';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('demetra-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('demetra-users')
export class DemetraUserController {
  logger = new Logger('DemetraUserController');

  constructor(@InjectRepository(DemetraUserRepository) private demetraUserRepository: DemetraUserRepository) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DemetraUser
  })
  async getAll(@Req() req: Request) {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.demetraUserRepository.findAndCount({
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
    type: DemetraUser
  })
  getOne(@Param('id') id: string) {
    return this.demetraUserRepository.findOne(id);
  }

  @PostMethod('/')
  @ApiOperation({ title: 'Create demetraUser' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DemetraUser
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() demetraUser: DemetraUser) {
    const created = await this.demetraUserRepository.save(demetraUser);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DemetraUser', created.id);
    return created;
  }

  @Put('/:id')
  @ApiOperation({ title: 'Update demetraUser' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DemetraUser
  })
  put(@Req() req: Request, @Param('id') id: string, @Body() demetraUser: DemetraUser) {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DemetraUser', id);
    return this.demetraUserRepository.update(id, demetraUser);
  }

  @Delete('/:id')
  @ApiOperation({ title: 'Delete demetraUser' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  remove(@Req() req: Request, @Param('id') id: string) {
    this.demetraUserRepository.delete(id);
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DemetraUser', id);
  }
}
