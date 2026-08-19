import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToDoInfo, ToDoCreateItem, ToDoUpdateItem, CheckToDoItem, DeleteToDoItem, MoveToDoItem } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
	
export class TodoService {

	private http = inject(HttpClient);
	private apiBaseUrl = "/intapi"; 

	//in this POC, just using GET and POST, instead of other HTTP methods. 
	
	getToDoList() : Observable<ToDoInfo[]> {
		//get /intapi/todo/getlist
		return this.http.get<ToDoInfo[]>(`${this.apiBaseUrl}/todo/getlist`, { withCredentials: true });
	}

	checkToDoListItem(checkToDoItem : CheckToDoItem){
		//post /intapi/todo/completeitem
		return this.http.post(`${this.apiBaseUrl}/todo/completeitem`, checkToDoItem, { withCredentials: true });
	}

	deleteToDoListItem(deleteToDoItem: DeleteToDoItem){
		//post /intapi/todo/deleteitem
		return this.http.post(`${this.apiBaseUrl}/todo/deleteitem`, deleteToDoItem, { withCredentials: true });
	}

	updateToDoListItem(toDoUpdate: ToDoUpdateItem){
		//post /intapi/todo/updateitem
		return this.http.post(`${this.apiBaseUrl}/todo/updateitem`, toDoUpdate, { withCredentials: true });
	}

	createToDoListItem(toDoCreate: ToDoCreateItem){
		//post /intapi/todo/createitem
		return this.http.post(`${this.apiBaseUrl}/todo/createitem`, toDoCreate, { withCredentials: true });
	}

	moveToDoListItem(moveToDoItem: MoveToDoItem){
		//post /intapi/todo/moveitem
		return this.http.post(`${this.apiBaseUrl}/todo/moveitem`, moveToDoItem, { withCredentials: true });
	}

}
