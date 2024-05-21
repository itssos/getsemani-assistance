import { IEducationLevel } from './education_level.model';
import { IGrade } from "./grade.model"
import { ISection } from "./section.model"

export interface IStudentBackend {
  id:              string
  name:            string
  surname:         string
  dni:             string
  grade:           IGrade
  section:         ISection
  educationLevel: IEducationLevel
  state:           string
}
