import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { Observable } from "rxjs";
import { NoteInterface } from "./interfaces/note.interface";
import { NoteDocument } from "./schemas/note.schema";

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {
  }

  @Post()
  create(@Body() note: NoteInterface): Observable<NoteDocument> {
    return this.notesService.create(note);
  }

  @Get()
  getAll(): Observable<NoteDocument[]> {
    return this.notesService.getAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() note: NoteInterface
  ): Observable<NoteDocument> {
    return this.notesService.update(id, note);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.notesService.delete(id);
  }
}
