import { ApiProperty } from '@nestjs/swagger';

export class ReadTenantDto {
  @ApiProperty({
    description: 'Unique tenant ID (UUID)',
    example: '12fa5bba-ef34-4a82-8a5b-6931e14598cb',
  })
  id: string;

  @ApiProperty({
    description: 'License key associated with the tenant',
    example: 'demo-license',
  })
  licence: string;

  @ApiProperty({
    description: 'Free-form attributes stored as key-value pairs',
    example: { brandName: 'Boseat', brandUrl: 'https://boseat.com' },
  })
  attributes: Record<string, string>;
}
