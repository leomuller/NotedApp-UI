import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AppInfo } from '../models/app-info.model';
import { Observable } from 'rxjs';

@Service()
export class NotesService {

	private http = inject(HttpClient);
	//private apiBaseUrl: string = 'https://localhost:7190';
	private apiBaseUrl = "/intapi"; //use relative, the proxy will handle the rest


	getTestData(): Observable<AppInfo[]> {
		return this.http.get<AppInfo[]>(`${this.apiBaseUrl}/Test/getdata1`);

	}	

}
	