import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ReadTenantDto } from './dto/read-tenant.dto';
import { Response } from 'express';
import { Roles } from '../../security/roles/roles.decorator';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiResponse({
    status: 201,
    description: 'Tenant created with Location header',
  })
  async create(
    @Body() createTenantDto: CreateTenantDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const tenant = await this.tenantsService.create(createTenantDto);
    res.setHeader('Location', `/tenants/${tenant.id}`);
    res.status(HttpStatus.CREATED);
  }

  @Get()
  @Roles(['admin'])
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({
    status: 200,
    description: 'List of tenants',
    type: [ReadTenantDto],
  })
  findAll(): Promise<ReadTenantDto[]> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tenant by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Tenant found',
    type: ReadTenantDto,
  })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  findOne(@Param('id') id: string): Promise<ReadTenantDto> {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tenant by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 204,
    description: 'Tenant updated with Location header',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.tenantsService.update(id, updateTenantDto);
    res.setHeader('Location', `/tenants/${id}`);
    res.status(HttpStatus.NO_CONTENT);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 204, description: 'Tenant deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tenantsService.remove(id);
  }
}
