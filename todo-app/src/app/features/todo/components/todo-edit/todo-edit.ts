import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToDoInfo } from '../../models/todo.model';
import { TODO_COLOR_PAIRS, todoColorPair } from '../../models/todo-colors';

export interface TodoEditDialogData {
	mode: 'create' | 'edit';
	item?: ToDoInfo;
}

export type TodoEditDialogResult =
	| { action: 'save'; toDoText: string; color: string }
	| { action: 'remove' };

@Component({
  selector: 'app-todo-edit',
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-edit.html',
  styleUrl: './todo-edit.css',
})
export class TodoEdit {
  private dialogRef = inject(MatDialogRef<TodoEdit, TodoEditDialogResult>);
  data = inject<TodoEditDialogData>(MAT_DIALOG_DATA);

  readonly colorPairs = TODO_COLOR_PAIRS;

  text = signal(this.data.item?.toDoText ?? '');
  selectedColor = signal(this.data.item?.color ?? TODO_COLOR_PAIRS[0].key);

  swatchColor(key: string): string {
    return todoColorPair(key).code;
  }

  save() {
    const toDoText = this.text().trim();
    if (!toDoText) {
      return;
    }
    this.dialogRef.close({ action: 'save', toDoText, color: this.selectedColor() });
  }

  remove() {
    this.dialogRef.close({ action: 'remove' });
  }

  cancel() {
    this.dialogRef.close();
  }
}
