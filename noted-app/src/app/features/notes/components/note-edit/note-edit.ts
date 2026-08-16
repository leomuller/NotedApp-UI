import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../services/notes-service';
import { NoteInfo } from '../../models/note.model';

@Component({
  selector: 'app-note-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './note-edit.html',
  styleUrl: './note-edit.scss',
})
export class NoteEdit implements OnInit {
  private fb = inject(FormBuilder);
  private notesService = inject(NotesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  noteId = signal<number | null>(null);
  noteInfo = signal<NoteInfo | null>(null);
  loading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  noteForm: FormGroup = this.fb.group({
    noteTitle: ['', [Validators.required]],
    noteText: ['', [Validators.required]],
    isPinned: [false],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id || isNaN(id)) {
      this.errorMessage.set('Invalid note ID provided.');
      this.loading.set(false);
      return;
    }

    this.noteId.set(id);
    this.loadNote(id);
  }

  loadNote(id: number): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.notesService.getNoteById(id).subscribe({
      next: (note) => {
        this.noteInfo.set(note);
        this.noteForm.patchValue({
          noteTitle: note.noteTitle,
          noteText: note.noteText,
          isPinned: note.isPinned ?? false,
        });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load note:', err);
        this.errorMessage.set(`Failed to load note (${err.status || 'Error'})`);
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    const id = this.noteId();
    if (!id) return;

    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { noteTitle, noteText, isPinned } = this.noteForm.value;

    this.notesService.updateNote(id, { noteTitle, noteText, isPinned }).subscribe({
      next: (_updatedNote) => {
        this.isSubmitting.set(false);
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        console.error('Update note failed:', err);
        this.errorMessage.set('Failed to update note. Please try again.');
        this.isSubmitting.set(false);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }

  onDelete(): void {
    const id = this.noteId();
    if (!id) return;

    const currentTitle = this.noteForm.get('noteTitle')?.value || 'this note';
    const confirmed = window.confirm(`Are you sure you want to delete "${currentTitle}"?`);

    if (!confirmed) return;

    this.isDeleting.set(true);
    this.errorMessage.set(null);

    this.notesService.deleteNote(id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        console.error('Delete note failed:', err);
        this.errorMessage.set('Failed to delete note. Please try again.');
        this.isDeleting.set(false);
      },
    });
  }
}
