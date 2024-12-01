import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) {}

    async getUsers() {
        return this.userModel.find({})
    }

    async register(dto: UserDto) {
        const usernameTaken = await this.userModel.findOne({username: dto.username})
        if (usernameTaken) {
            throw new BadRequestException("Username already taken!")
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const user = await this.userModel.create({username: dto.username, password: hashedPassword})
        return user
    }

    async login(dto: UserDto) {
        const user = await this.userModel.findOne({username: dto.username})
        if (!user) {
            throw new BadRequestException("User not found!")
        }
        const passwordTrue = await bcrypt.compare(dto.password, user.password)
        if (!passwordTrue) {
            throw new BadRequestException("Password is incorrect.")
        }
        return user
    }

    async updateProfile(userId: string, dto: Omit<UserDto, "password">) {
        const user = await this.userModel.findById({_id: userId})
        if (!user) {
            throw new BadRequestException("User not found!")
        }
        if (!dto.username.trim()) {
            throw new BadRequestException('Username cannot be empty')
        }
        const existingUser = await this.userModel.findOne({ username: dto.username });
        if (existingUser && existingUser._id.toString() !== userId) {
            throw new BadRequestException('Username is already taken');
        }
        user.username = dto.username
        const updatedUser = await user.save()
        return updatedUser
    }

    async getUser(username: string) {
        return this.userModel.find({username}).select("-password")
    }

    async deleteUser(userId: string) {
        await this.userModel.findByIdAndDelete(userId)
        return true
    }

    generateToken(userId: string): string {
        return this.jwtService.sign({userId}, {secret: "12345678", expiresIn: '7d'})
    }
}