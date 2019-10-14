import { Moment } from 'moment';
import { ISingleCourse } from 'app/shared/model/single-course.model';

export interface IDemetraUser {
  id?: number;
  gender?: string;
  address?: string;
  borndate?: Moment;
  cf?: string;
  usertype?: string;
  coursetitles?: ISingleCourse[];
}

export const defaultValue: Readonly<IDemetraUser> = {};
