export interface ToDoInfo {
	toDoId: number;
	toDoText: string;
	isCompleted: boolean;
	color: string;
	dateUpdated: string;
}

export interface ToDoCreateItem {
	toDoText: string;
	color: string;
}

export interface ToDoUpdateItem {
	toDoId: number;
	toDoText: string;
	color: string;
}

export interface CheckToDoItem {
	toDoId: number;
	isCompleted: boolean;
}

export interface DeleteToDoItem {
	toDoId: number;
	isDeleted: boolean;
}

export interface MoveToDoItem {
	toDoId: number;
	showAfterToDoId: number;
}

