import { Expose } from 'class-transformer';

export class MonitorResponse {
  @Expose()
  id: string;

  @Expose()
  url: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  isActive: boolean;
}
