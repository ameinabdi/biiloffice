import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import SingleCourse from './single-course.model';

/**
 * A DemetraUser.
 */
@Entity('demetra_user')
export default class DemetraUser extends BaseEntity {
  /*
    @PrimaryGeneratedColumn()
    id: number;
    */

  @Column({ name: 'gender', nullable: false })
  gender: any;

  @Column({ name: 'address', nullable: false })
  address: any;

  @Column({ name: 'borndate', nullable: false })
  borndate: any;

  @Column({ name: 'cf', nullable: false, unique: true })
  cf: any;

  @Column({ name: 'usertype', nullable: false })
  usertype: any;

  @ManyToMany({})
  @JoinTable({
    name: 'demetra_user_coursetitle',
    joinColumn: { name: 'demetra_user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'coursetitle_id', referencedColumnName: 'id' }
  })
  coursetitles: SingleCourse[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
