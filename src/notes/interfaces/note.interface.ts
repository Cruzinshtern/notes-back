import { User } from "../../users/schemas/user.schema";

export interface NoteInterface {
  title: string;
  text: string;
  user: User;
}
