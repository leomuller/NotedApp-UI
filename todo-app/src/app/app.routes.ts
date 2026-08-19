import { Routes } from '@angular/router';
import { TodoList } from './features/todo/components/todo-list/todo-list';

export const routes: Routes = [
	{ 
		path: 'todo', 
		component: TodoList 
	},
	{
		path: '**',
		redirectTo: 'todo'
	}

];
