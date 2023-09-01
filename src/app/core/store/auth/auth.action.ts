import { IUser } from "../../interfaces/models";
import { ILoginDto } from "../../dtos/auth/login-dto";

export class Login {
    static readonly type = "[Auth] Login";

    constructor(public payload: ILoginDto) {}
}

export class Logout {
    static readonly type = "[Auth] Logout";
}

export class SetLoggedUser {
    static readonly type = "[Auth] SetLoggedUser";

    constructor(public payload: IUser) {}
}

export class ClearLoggedUser {
    static readonly type = "[Auth] ClearLoggedUser";
}
