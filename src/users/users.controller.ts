import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserInterface } from "./interfaces/user.interface";
import { UsersService } from "./users.service";
import { UserDocument } from "./schemas/user.schema";
import { Observable } from "rxjs";

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
    return this.userService.getAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: UserInterface
  ): Observable<UserDocument> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.userService.delete(id);
  }
}
