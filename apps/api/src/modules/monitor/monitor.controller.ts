import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorDto } from './dtos/monitor.dto';
import { UpdateMonitorDto } from './dtos/update-monitor.dto';
import { CreateMonitorDto } from './dtos/create-monitor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { type RequestWithJwtAccount } from '../auth/interfaces/jwt-account.interface';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMonitors(@Req() req: RequestWithJwtAccount): Promise<MonitorDto[]> {
    return await this.monitorService.listMonitors(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMonitorById(
    @Req() req: RequestWithJwtAccount,
    @Param('id') id: string,
  ): Promise<MonitorDto> {
    return await this.monitorService.findMonitorByIdOrThrow(id, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async postMonitor(
    @Req() req: RequestWithJwtAccount,
    @Body() createMonitorDto: CreateMonitorDto,
  ): Promise<{ id: string }> {
    return await this.monitorService.createMonitor(
      createMonitorDto,
      req.user.id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async patchMonitorById(
    @Req() req: RequestWithJwtAccount,
    @Param('id') id: string,
    @Body() updateMonitorDto: UpdateMonitorDto,
  ): Promise<{ id: string }> {
    return await this.monitorService.updateMonitor(
      id,
      updateMonitorDto,
      req.user.id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMonitorById(
    @Req() req: RequestWithJwtAccount,
    @Param('id') id: string,
  ): Promise<{ id: string }> {
    return await this.monitorService.deleteMonitor(id, req.user.id);
  }
}
