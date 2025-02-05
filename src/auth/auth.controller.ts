import { 
  Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request, Logger 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInRequestDto, SignInResponseDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'The login response',
    type: SignInResponseDto,
    isArray: false
  })
  async signIn(@Body() signInDto: SignInRequestDto) {
    this.logger.log(`User attempting login: ${signInDto.username}`);

    try {
      const response = await this.authService.signIn(signInDto.username, signInDto.password);
      this.logger.log(`User ${signInDto.username} logged in successfully`);
      return response;
    } catch (error) {
      this.logger.warn(`Failed login attempt for user: ${signInDto.username}`);
      throw error;
    }
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get Profile' })
  getProfile(@Request() req) {
    const userId = req.user?.sub;
    this.logger.log(`Fetching profile for user: ${userId}`);

    return req.user;
  }
}