import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Globals } from '../interfaces/globals';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnInit {
    ngOnInit(): void {
      this.setHeaderLabel('');
    }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

  //
  //Variables
  //
  user: Subject<User> = new Subject<User>();
  _logout: Subject<boolean> = new Subject<boolean>();
  public headerLabel: Subject<string> = new Subject<string>();


  //
  //Methods
  //
  login(user: User) {
    var url = this.baseUrl + 'api/Log/Login';
    this.http.post<User>(url, user).subscribe(res => {
      this.user.next(res);
      this.globals.user = res;
    });
  }

  get getlogin(): Observable<User> {
    return this.user.asObservable();
  }

  setlogin() {
    this.user.next(null);
  }

  setHeaderLabel(label: string) {
    this.headerLabel.next(label);
  }
}
