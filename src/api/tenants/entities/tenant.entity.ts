import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  licence: string;

  @Column({ type: 'jsonb' })
  attributes: Record<string, string>;
}
