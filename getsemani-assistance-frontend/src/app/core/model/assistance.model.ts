import { IStudent } from "./student.model";
import { IUser } from "./user.model";

export interface IAssistance {
  id:      number
  student: IStudent
  date:    Date
  user:    IUser
  sate:    string
}
