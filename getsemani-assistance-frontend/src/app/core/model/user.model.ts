export interface IUser {
    id:      string;
    name:    string;
    surname: string;
    password: string;
    rol: { id: number };
}
