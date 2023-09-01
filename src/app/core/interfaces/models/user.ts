import { IBaseModel } from "./base-model";
import { UserRole } from "../../enums/user-role.enum";

export interface IUser extends IBaseModel {
    name: string;
    username: string;
    role: UserRole;
    regNo: string;
    dob: string;
    gender: string;
}
