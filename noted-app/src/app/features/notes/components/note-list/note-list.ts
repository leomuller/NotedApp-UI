import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes-service';
import { NoteInfo } from '../../models/note.model';

@Component({
  selector: 'app-note-list',
  imports: [RouterLink],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss',
})
export class NoteList {
  private notesService = inject(NotesService);
  
// Strongly-typed Signals to hold our data and UI states
  noteList = signal<NoteInfo[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {

    this.loading.set(true);
    this.errorMessage.set(null);
    
    this.notesService.getNoteList().subscribe({
      next: (data) => {
        this.noteList.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage.set(`Failed to load notes (${err.status})`);
        this.loading.set(false);
      }
    });
  }
}
