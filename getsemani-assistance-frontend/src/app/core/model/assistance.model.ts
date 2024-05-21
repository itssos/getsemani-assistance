import { IStudentBackend } from "./student_backend.model";
import { IUser } from "./user.model";

export interface IAssistance {
  id?:      number
  student: IStudentBackend
  date?:    Date
  user:    IUser
  state:    string
}
