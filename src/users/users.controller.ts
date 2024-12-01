import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/utils/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({ summary: 'Get all users' })
    @HttpCode(200)
    @Get("/all-users")
    async getUsers() {
        return this.userService.getUsers()
    }

    @ApiOperation({ summary: 'Register with username and password' })
    @HttpCode(201)
    @Post("/register")
    @UsePipes(ValidationPipe)
    async register(@Body() dto: UserDto) {
        const user = await this.userService.register(dto)
        const token = this.userService.generateToken(user._id.toString())
        return {token}
    }

    @ApiOperation({ summary: 'Log in with username and password' })
    @HttpCode(201)
    @Post("/login")
    @UsePipes(ValidationPipe)
    async login(@Body() dto: UserDto) {
        const user = await this.userService.login(dto)
        const token = this.userService.generateToken(user._id.toString())
        return {token}
    }

    @ApiOperation({ summary: 'Update profile' })
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Put("/update-profile")
    @UsePipes(ValidationPipe)
    async updateProfile(@Body() dto: Omit<UserDto, "password">, @Req() req: any) {
        const userId = req.user.userId
        return this.userService.updateProfile(userId, dto)
    }

    @ApiOperation({ summary: 'Profile' })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get("/profile/:username")
    async getUser(@Param("username") username: string) {
        return this.userService.getUser(username)
    }

    @ApiOperation({ summary: 'Delete your account' })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post("/delete-account")
    async deleteAccount(@Req() req: any) {
        return this.userService.deleteUser(req.user.userId)
    }
}
