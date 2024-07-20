import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService : UserService){}

    //inscription
   @Post('inscription')
   async inscription (@Body() userData :User){
    const resultat = await this.userService.inscription(userData)

    return resultat

   }

}
