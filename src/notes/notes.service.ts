import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Note, NoteDocument } from "./schemas/note.schema";
import { Model } from "mongoose";
import { UserInterface } from "../users/interfaces/user.interface";
import { from, Observable, of } from "rxjs";
import { NoteInterface } from "./interfaces/note.interface";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {
  }

  create(note: NoteInterface, req): Observable<NoteDocument> {
    const newNote = new this.noteModel(note);
    newNote.user = req.body.authedUser;
    return from(newNote.save());
  }

  getAll(req): Observable<NoteDocument[]> {
    return from(this.noteModel.find({ user: req.body.authedUser._id }));
  }

  update(id: string, note: NoteInterface): Observable<NoteDocument> {
    return from(this.noteModel.findByIdAndUpdate(id, note));
  }

  delete(id: string): Observable<any> {
    return from(this.noteModel.findByIdAndDelete(id));
  }
}
