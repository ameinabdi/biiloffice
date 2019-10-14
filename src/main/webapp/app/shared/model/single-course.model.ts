import { IDemetraUser } from 'app/shared/model/demetra-user.model';

export interface ISingleCourse {
  id?: number;
  title?: string;
  description?: string;
  isnotonlyfordegree?: boolean;
  cfu?: number;
  cfstudents?: IDemetraUser[];
}

export const defaultValue: Readonly<ISingleCourse> = {
  isnotonlyfordegree: false
};
