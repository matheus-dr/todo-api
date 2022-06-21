import { sign, verify } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import jwt from '../../../config/jwt';
import { User } from '../../../modules/user/core/entities/user.entity';
import { IJwtProvider } from '../../../core/application/providers/jwt.provider';
import { JwtPayloadInterface } from '../../../auth/core/interfaces/jwt-payload.interface';

@injectable()
export class JsonwebtokenJwtProvider implements IJwtProvider {
  private jwtConfig = jwt();

  async sign(user: User): Promise<string> {
    const payload: JwtPayloadInterface = { sub: { user } };

    return sign(payload, this.jwtConfig.JWT_SECRET, {
      expiresIn: this.jwtConfig.JWT_EXPIRATION,
    });
  }

  verify(token: string): JwtPayloadInterface {
    return verify(
      token,
      this.jwtConfig.JWT_SECRET
    ) as unknown as JwtPayloadInterface;
  }
}