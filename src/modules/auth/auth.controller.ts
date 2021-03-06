import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { SignupDto } from '../core/dto/signup.dto';
import { SigninDto } from '../core/dto/signin.dto';
import { User } from '../core/interfaces/user.interface';
import { Token } from '../core/interfaces/token.interface';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
  }
  
  @Post('signup')
  async signup(@Req() req: any, @Res() res: any, @Body() body: SignupDto,
  ) {
    await this.usersService.create(body);
    const auth: User = await this.authService.auth(body);
    const token: Token = await this.authService.createToken(auth._id);
    return res.status(HttpStatus.OK).send({token, user: auth});
  }
  
  @Post('signin')
  async signin(@Req() req: any, @Res() res: any, @Body() body: SigninDto,
  ) {
    const auth: User = await this.authService.auth(body);
    const token: Token = await this.authService.createToken(auth._id);
    return res.status(HttpStatus.OK).send({token, user: auth});
  }
  
}
