import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserInterface } from "./interfaces/user.interface";
import { UsersService } from "./users.service";
import { UserDocument } from "./schemas/user.schema";
import { from, Observable, of } from "rxjs";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Post()
  create(@Body() user: UserInterface): Observable<UserDocument> {
    return this.userService.create(user);
  }

  @Get()
  getAll(): Observable<UserDocument[]> {
    return this.userService.getAllUsers();
  }
}
