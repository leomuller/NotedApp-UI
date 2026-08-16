import { Component, inject, signal } from '@angular/core';
import { NotesService } from '../services/notes-service';
import { AppInfo } from '../models/app-info.model';

@Component({
  selector: 'app-app-list',
  imports: [],
  templateUrl: './app-list.html',
  styleUrl: './app-list.scss',
})
export class AppList {

  private notesService = inject(NotesService);
    
  // Strongly-typed Signals to hold our data and UI states
  appsList = signal<AppInfo[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.notesService.getTestData().subscribe({
      next: (data) => {
        this.appsList.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage.set(`Failed to load apps (${err.status})`);
        this.loading.set(false);
      }
    });
  }

}
