import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthService } from './service/auth.service';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthMiddleware } from "./middleware/auth.middleware";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: `${process.env.JWT_SECRET}`,
        signOptions: { expiresIn: '20h' },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
// export class AuthModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({ path: 'users', method: RequestMethod.GET })
//   }
// }

export class AuthModule {}
