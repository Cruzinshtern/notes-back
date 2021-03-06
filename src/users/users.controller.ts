import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from "@nestjs/common";
import { UserInterface } from "./interfaces/user.interface";
import { UsersService } from "./users.service";
import { User, UserDocument } from "./schemas/user.schema";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Post()
  create(@Body() user: UserInterface): Observable<UserDocument> {
    return this.userService.create(user);
  }

  @Get()
  getAll(@Req() req): Observable<UserDocument[]> {
    return from(this.userService.getAll(req));
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

  @Post('login')
  login(@Body() user) {
    // console.log(user)
    return this.userService.login(user).pipe(
      map((token: string) => {
        return { token: token }
      })
    )
  }
}
