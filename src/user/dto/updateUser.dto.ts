import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsString()
  oldPassword: string;

  @IsString()
  @IsString()
  newPassword: string;
}
