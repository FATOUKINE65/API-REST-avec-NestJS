import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userService;
    constructor(userService: Repository<User>);
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
