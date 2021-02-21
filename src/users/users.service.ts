import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserInterface } from "./interfaces/user.interface";
import { from, Observable } from "rxjs";
import { AuthService } from "../auth/service/auth.service";
import { map, switchMap } from "rxjs/operators";


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
    ) {
  }

  create(user: UserInterface): Observable<UserDocument> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        const newUser: UserInterface = {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        };
        return this.userModel.create(newUser);
      })
    )

  }

  async getAll(req): Promise<any> {
    try {
      const length = await this.userModel.countDocuments();
      const currentPage = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.limit) || 3;
      const offset = (currentPage - 1) * itemsPerPage;
      const data = await this.userModel.find().limit(itemsPerPage).skip(offset);

      const res = {
        items: data.length ? data : 'Sorry, no data',
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        totalItems: length,
      };
      return res;
    } catch (e) {
      return e.message;
    }
  }


  getByEmail(email: string): Observable<UserDocument> {
    try {
      return from(this.userModel.findOne( {email}));
    } catch (e) {
      return e.message;
    }
  }

  update(id: string, user: UserInterface): Observable<UserDocument> {
    return from(this.userModel.findByIdAndUpdate(id, user));
  }

  delete(id: string): Observable<any> {
    return from(this.userModel.findByIdAndDelete(id));
  }

  validateUser(email: string, password: string): Observable<any> {
    return this.getByEmail(email).pipe(
      switchMap((user: UserInterface) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((isMatch: boolean) => {
            if (isMatch) {
              return user;
            } else {
              throw Error;
            }
          })
        )
      )
    )
  }


  login(user): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user) => {
        if(user) {
          return this.authService.generateJWT(user).pipe(
            map((token: string) => token)
          )
        } else {
          return 'Wrong credentials';
        }
      }),
    );
  }


}
