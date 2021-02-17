import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Note, NoteDocument } from "./schemas/note.schema";
import { Model } from "mongoose";
import { UserInterface } from "../users/interfaces/user.interface";
import { from, Observable } from "rxjs";
import { NoteInterface } from "./interfaces/note.interface";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {
  }

  create(note: NoteInterface): Observable<NoteDocument> {
    const newUser = new this.noteModel(note);
    return from(newUser.save());
  }

  getAll(): Observable<NoteDocument[]> {
    return from(this.noteModel.find());
  }

  update(id: string, note: NoteInterface): Observable<NoteDocument> {
    return from(this.noteModel.findByIdAndUpdate(id, note));
  }

  delete(id: string): Observable<any> {
    return from(this.noteModel.findByIdAndDelete(id));
  }
}
