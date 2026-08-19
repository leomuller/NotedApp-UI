import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { ToDoInfo } from '../../models/todo.model';
import { todoColorPair } from '../../models/todo-colors';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {TodoEdit, TodoEditDialogData, TodoEditDialogResult} from '../todo-edit/todo-edit';



@Component({
  selector: 'app-todo-list',
  imports: [MatListModule, MatIconModule, MatButtonModule, MatDividerModule, MatCheckboxModule, DragDropModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  toDoService = inject(TodoService);
  private dialog = inject(MatDialog);
  
  toDoList = signal<ToDoInfo[]>([]);
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  errrorMessage = signal<string | null>(null);

  // sample data for the static design pass, separate from the real toDoList/service above
  demoTodos = signal<ToDoInfo[]>([
    { toDoId: 1, toDoText: 'Buy groceries', isCompleted: true, color: 'purple', dateUpdated: '2026-08-15' },
    { toDoId: 2, toDoText: 'Finish Angular Material demo\nAdd color pairs and edit dialog', isCompleted: false, color: 'blue', dateUpdated: '2026-08-17' },
    { toDoId: 3, toDoText: 'Walk the dog', isCompleted: false, color: 'orange', dateUpdated: '2026-08-18' },
  ]);
  private nextDemoId = 4;

  dropDemo(event: CdkDragDrop<ToDoInfo[]>) {
    const items = [...this.demoTodos()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.demoTodos.set(items);
  }

  firstLine(text: string): string {
    return text.split('\n', 1)[0];
  }

  itemColor(item: ToDoInfo): string {
    const pair = todoColorPair(item.color);
    return item.isCompleted ? pair.shadeCode : pair.code;
  }

  toggleComplete(item: ToDoInfo) {
    this.demoTodos.update((items) =>
      items.map((i) => (i.toDoId === item.toDoId ? { ...i, isCompleted: !i.isCompleted } : i))
    );
  }

  openAdd() {
    const dialogRef = this.dialog.open<TodoEdit, TodoEditDialogData, TodoEditDialogResult>(TodoEdit, {
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        const today = new Date().toISOString().slice(0, 10);
        const newItem: ToDoInfo = {
          toDoId: this.nextDemoId++,
          toDoText: result.toDoText,
          isCompleted: false,
          color: result.color,
          dateUpdated: today,
        };
        this.demoTodos.update((items) => [newItem, ...items]);
      }
    });
  }

  openEdit(item: ToDoInfo) {
    const dialogRef = this.dialog.open<TodoEdit, TodoEditDialogData, TodoEditDialogResult>(TodoEdit, {
      data: { mode: 'edit', item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      if (result.action === 'remove') {
        this.demoTodos.update((items) => items.filter((i) => i.toDoId !== item.toDoId));
        return;
      }
      const today = new Date().toISOString().slice(0, 10);
      this.demoTodos.update((items) =>
        items.map((i) =>
          i.toDoId === item.toDoId
            ? { ...i, toDoText: result.toDoText, color: result.color, dateUpdated: today }
            : i
        )
      );
    });
  }
  
  constructor() {
    this.loadToDoList();
  }

  loadToDoList() {
    this.loading.set(true);
    this.error.set(false);
    this.errrorMessage.set(null);

    this.toDoService.getToDoList().subscribe({
      next: (data) => {
        this.toDoList.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading to-do list:', err);
        this.error.set(true);
        this.errrorMessage.set('Failed to load to-do list. Please try again later.');
        this.loading.set(false);
      },
    });
  }   

}
