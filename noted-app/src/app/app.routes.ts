import { Routes } from '@angular/router';
import { NoteList } from './features/notes/components/note-list/note-list';
import { NoteCreate } from './features/notes/components/note-create/note-create';
import { NoteEdit } from './features/notes/components/note-edit/note-edit';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'notes', 
    pathMatch: 'full' 
  },
  { 
    path: 'notes', 
    component: NoteList 
  },
  { 
    path: 'notes/create', 
    component: NoteCreate 
  },
  {
    path: 'notes/edit/:id',
    component: NoteEdit
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];
