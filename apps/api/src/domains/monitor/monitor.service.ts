import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitorDto } from './dtos/create-monitor.dto';
import { UpdateMonitorDto } from './dtos/update-monitor.dto';
import { MonitorResponse } from './dtos/monitor-response.dto';
import { DatabaseService } from 'src/database/database.service';
import { generateNanoid } from 'src/utils/nanoid';

@Injectable()
export class MonitorService {
  constructor(private readonly prisma: DatabaseService) {}

  async listMonitors(accountId: string): Promise<MonitorResponse[]> {
    const monitors = await this.prisma.monitor.findMany({
      where: {
        accountId,
      },
      select: {
        id: true,
        title: true,
        url: true,
        isActive: true,
        description: true,
      },
    });

    return monitors;
  }

  async findMonitorById(
    monitorId: string,
    accountId: string,
  ): Promise<MonitorResponse | null> {
    return await this.prisma.monitor.findFirst({
      where: {
        id: monitorId,
        accountId,
      },
      select: {
        id: true,
        title: true,
        url: true,
        isActive: true,
        description: true,
      },
    });
  }

  async findMonitorByIdOrThrow(
    monitorId: string,
    accountId: string,
  ): Promise<MonitorResponse> {
    const monitor = await this.findMonitorById(monitorId, accountId);

    if (!monitor) {
      throw new NotFoundException('Monitor NOT FOUND');
    }

    return monitor;
  }

  async createMonitor(
    payload: CreateMonitorDto,
    accountId: string,
  ): Promise<{ id: string }> {
    const createdMonitor = await this.prisma.monitor.create({
      data: {
        id: generateNanoid(),
        accountId,
        ...payload,
      },
    });

    return {
      id: createdMonitor.id,
    };
  }

  async updateMonitor(
    monitorId: string,
    payload: UpdateMonitorDto,
    accountId: string,
  ): Promise<{ id: string }> {
    await this.findMonitorByIdOrThrow(monitorId, accountId);

    const updatedMonitor = await this.prisma.monitor.update({
      where: {
        id: monitorId,
      },
      data: payload,
    });

    return {
      id: updatedMonitor.id,
    };
  }

  async deleteMonitor(
    monitorId: string,
    accountId: string,
  ): Promise<{ id: string }> {
    await this.findMonitorByIdOrThrow(monitorId, accountId);

    const deletedMonitor = await this.prisma.monitor.delete({
      where: {
        id: monitorId,
      },
    });

    return {
      id: deletedMonitor.id,
    };
  }
}
