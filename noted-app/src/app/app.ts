import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar/navbar';
import { NoteList } from './features/notes/note-list/note-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NoteList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('noted-app');
}
