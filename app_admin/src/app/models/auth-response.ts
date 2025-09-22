export class AuthResponse {
    token: string;

    // initialize an empty token for JWT token saving
    constructor() {
        this.token = '';
    }
}
