import { Injectable } from '@nestjs/common';
import { from, Observable, of } from "rxjs";
import { UserInterface } from "../../users/interfaces/user.interface";
import { JwtService } from "@nestjs/jwt";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 10));
  }

  comparePasswords(inputPassword: string, hashedPassword: string): Observable<boolean> {
    return of<boolean>(bcrypt.compare(inputPassword, hashedPassword));
  }

  generateJWT(user): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }


}
