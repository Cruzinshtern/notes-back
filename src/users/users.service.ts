import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserInterface } from "./interfaces/user.interface";
import { from, Observable } from "rxjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  create(user: UserInterface): Observable<UserDocument> {
    const newUser = new this.userModel(user);
    return from(newUser.save());
  }

  getAllUsers(): Observable<UserDocument[]> {
    return from(this.userModel.find());
  }

}
