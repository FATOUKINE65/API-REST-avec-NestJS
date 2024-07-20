import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    inscription(userData: User): Promise<{
        message: string;
        success: boolean;
    }>;
    connexion(userData: User): Promise<{
        message: string;
        success: boolean;
        TOKEN?: string;
    }>;
}
