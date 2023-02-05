import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly UserService: UserService,private readonly jwtService: JwtService){}

    async validateUser(username: string,password: string):Promise<any>{
        const user = await this.UserService.user({userName: username,})
        if (user && user.password === password){
            const {password,...result} = user
            return result
        }return null
    }


}
