import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../../services/notes-service';

@Component({
  selector: 'app-note-create',
  imports: [ReactiveFormsModule],
  templateUrl: './note-create.html',
  styleUrl: './note-create.scss',
})
export class NoteCreate {
  private fb = inject(FormBuilder);
  private notesService = inject(NotesService);
  private router = inject(Router);

  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  noteForm: FormGroup = this.fb.group({
    noteTitle: ['', [Validators.required]],
    noteText: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { noteTitle, noteText } = this.noteForm.value;

    this.notesService.createNote({ noteTitle, noteText }).subscribe({
      next: (_newNote) => {
        this.isSubmitting.set(false);
        this.noteForm.reset();
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        console.error('Create note failed:', err);
        this.errorMessage.set('Failed to create note. Please try again.');
        this.isSubmitting.set(false);
      },
    });
  }

  onCancel(): void {
    this.noteForm.reset();
    this.errorMessage.set(null);
    this.router.navigate(['/notes']);
  }
}
