import { IStudent } from "./student.model";

export interface IAssistance {
  id:      number;
  student: IStudent;
  date:    Date;
}
