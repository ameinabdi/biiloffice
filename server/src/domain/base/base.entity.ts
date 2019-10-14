import { ObjectIdColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @ObjectIdColumn()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  createdBy?: string;
  @Column({ nullable: true })
  createdDate?: Date;
  @Column()
  lastModifiedBy?: string;
  @Column({ nullable: true })
  lastModifiedDate?: Date;
}
