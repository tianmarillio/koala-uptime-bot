import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
