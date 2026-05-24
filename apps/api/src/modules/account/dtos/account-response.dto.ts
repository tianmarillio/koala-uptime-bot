import { Expose } from 'class-transformer';

export class AccountResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  password: string;
}
