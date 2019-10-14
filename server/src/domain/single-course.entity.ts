import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import DemetraUser from './demetra-user.model';

/**
 * A SingleCourse.
 */
@Entity('single_course')
export default class SingleCourse extends BaseEntity {
  /*
    @PrimaryGeneratedColumn()
    id: number;
    */

  @Column({ name: 'title', nullable: false, unique: true })
  title: any;

  @Column({ name: 'description' })
  description: any;

  @Column({ name: 'isnotonlyfordegree', nullable: false })
  isnotonlyfordegree: any;

  @Column({ name: 'cfu' })
  cfu: any;

  @ManyToMany({})
  cfstudents: DemetraUser[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
