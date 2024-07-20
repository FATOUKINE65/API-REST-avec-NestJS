import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService : UserService){}

    //inscription
   @Post('register')
   async inscription (@Body() userData :User){
    const resultat = await this.userService.inscription(userData)

    return resultat

   }

     //inscription
     @Post('connexion')
     async connexion (@Body() userData : User){
      const resultat_de_connexion = await this.userService.connexion(userData)
  
      return resultat_de_connexion
  
     }

}
