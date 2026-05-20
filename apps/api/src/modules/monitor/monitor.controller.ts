import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorResponse } from './dtos/monitor-response.dto';
import { UpdateMonitorDto } from './dtos/update-monitor.dto';
import { CreateMonitorDto } from './dtos/create-monitor.dto';

// TODO: authentication

// FIXME:
const TEMP_PLACEHOLDER_ACCOUNT_ID = 'clqwxz123000109l6b3n11b23';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get()
  async getMonitors(): Promise<MonitorResponse[]> {
    return await this.monitorService.listMonitors(TEMP_PLACEHOLDER_ACCOUNT_ID);
  }

  @Get(':id')
  async getMonitorById(@Param('id') id: string): Promise<MonitorResponse> {
    return await this.monitorService.findMonitorByIdOrThrow(
      id,
      TEMP_PLACEHOLDER_ACCOUNT_ID,
    );
  }

  @Post()
  async postMonitor(
    @Body() createMonitorDto: CreateMonitorDto,
  ): Promise<{ id: string }> {
    return await this.monitorService.createMonitor(
      createMonitorDto,
      TEMP_PLACEHOLDER_ACCOUNT_ID,
    );
  }

  @Patch(':id')
  async patchMonitorById(
    @Param('id') id: string,
    @Body() updateMonitorDto: UpdateMonitorDto,
  ): Promise<{ id: string }> {
    return await this.monitorService.updateMonitor(
      id,
      updateMonitorDto,
      TEMP_PLACEHOLDER_ACCOUNT_ID,
    );
  }

  @Delete(':id')
  async deleteMonitorById(@Param('id') id: string): Promise<{ id: string }> {
    return await this.monitorService.deleteMonitor(
      id,
      TEMP_PLACEHOLDER_ACCOUNT_ID,
    );
  }
}
