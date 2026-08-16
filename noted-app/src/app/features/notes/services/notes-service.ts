import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { AppInfo } from '../models/app-info.model';
import { Observable } from 'rxjs';
import { NoteInfo } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})

export class NotesService {

	private http = inject(HttpClient);
	//private apiBaseUrl: string = 'https://localhost:7190';
	private apiBaseUrl = "/intapi"; //use relative, the proxy will handle the rest


	getTestData(): Observable<AppInfo[]> {
		return this.http.get<AppInfo[]>(`${this.apiBaseUrl}/Test/getdata1`);

	}

	// for the real method, I need authentication, how do I do that? 
	// How do I get the auth token (that normally comes from the login page) and pass it to the API? 
	// I need to figure that out. 
	//

	//if not logged in. (valid session) => need a method to check. 
	//if yes => send the session token. 
	//if no => redirect to login page. - there is no login page in this app, so I need to create one. so I need a second API for login. 

	getNoteList(): Observable<NoteInfo[]> {
		//include cookies in the request, so that the server can validate the session.
		
		return this.http.get<NoteInfo[]>(`${this.apiBaseUrl}/Noted/list`, 
			{ withCredentials: true });
	}

	getNoteById(noteId: number): Observable<NoteInfo> {
		return this.http.get<NoteInfo>(`${this.apiBaseUrl}/Noted/detail/${noteId}`, 
			{ withCredentials: true });
	}

	createNote(note: { noteTitle: string, noteText: string }): Observable<NoteInfo> {
		return this.http.post<NoteInfo>(`${this.apiBaseUrl}/Noted/create`, note, 
			{ withCredentials: true });
	}
	
	updateNote(noteId: number, note: { noteTitle: string, noteText: string, isPinned: boolean }): Observable<NoteInfo> {
		return this.http.put<NoteInfo>(`${this.apiBaseUrl}/Noted/update/${noteId}`, note, 
			{ withCredentials: true });
	}	

	deleteNote(noteId: number): Observable<void> {
		return this.http.delete<void>(`${this.apiBaseUrl}/Noted/delete/${noteId}`, 
			{ withCredentials: true });
	}	


}
	