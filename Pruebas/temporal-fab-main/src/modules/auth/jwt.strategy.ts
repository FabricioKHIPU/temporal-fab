import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://aumdev.khipucode.com:9090/realms/master/protocol/openid-connect/certs`,
      }),
      audience: 'aum-ms-security',      
      issuer: `https://aumdev.khipucode.com:9090/realms/master`,
      algorithms: ['RS256'],
    });
  }
  
  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.preferred_username };
  }
}
