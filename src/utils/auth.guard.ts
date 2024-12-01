import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('Token not provided.')
    }
    try {
      const user = await this.jwtService.verifyAsync(token, { secret: "12345678" })
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
