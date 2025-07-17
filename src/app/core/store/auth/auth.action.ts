import { User } from "../../interfaces/models";
import { LoginDto } from "../../dtos/auth/login-dto";

export class Login {
    static readonly type = "[Auth] Login";

    constructor(public payload: LoginDto) {}
}

export class Logout {
    static readonly type = "[Auth] Logout";
}

export class SetLoggedUser {
    static readonly type = "[Auth] SetLoggedUser";

    constructor(public payload: User) {}
}

export class ClearLoggedUser {
    static readonly type = "[Auth] ClearLoggedUser";
}
