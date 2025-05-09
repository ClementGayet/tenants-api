import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    description: 'License key associated with the tenant',
    example: 'demo-license',
  })
  @IsString()
  @IsNotEmpty()
  licence: string;

  @ApiProperty({
    description: 'Free-form attributes stored as key-value pairs',
    example: { brandName: 'Boseat', brandUrl: 'https://boseat.com' },
  })
  @IsObject()
  attributes: Record<string, string>;
}
