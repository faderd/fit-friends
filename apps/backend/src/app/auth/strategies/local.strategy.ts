import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../user/user.entity';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: USERNAME_FIELD_NAME
    });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    return this.authService.verifyUser({ email, password });
  }
}
