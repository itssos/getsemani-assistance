import { IEducationLevel } from './education_level.model';
import { IGrade } from "./grade.model"
import { ISection } from "./section.model"

export interface IStudent {
    id:              string
    name:            string
    surname:         string
    dni:             string
    grade:           IGrade
    section:         ISection
    education_level: IEducationLevel
    state:           string
}
