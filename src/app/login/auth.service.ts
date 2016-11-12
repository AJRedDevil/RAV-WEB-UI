import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

export class User {
  constructor(
    public email: string,
    public password: string) { }
}
 
// var users = [
//   new User('admin@admin.com','adm9'),
//   new User('test@test.com','test')
// ];
 
@Injectable()
export class AuthService {
  private headers = new Headers({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
  
  constructor(
    private _router: Router,
    private _http: Http) {}
 
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("username");
    localStorage.removeItem("chartId");
    localStorage.removeItem("fullScreen");
    this._router.navigate(['Login']);
    window.location.reload();
  }
 
  login(user): Promise<Boolean> {
    var baseUrl = localStorage.getItem('baseUrl')
    var url = `${baseUrl}/user/login/`;
    var authResponse: any;
    return this._http.post(url, JSON.stringify(user), {headers: this.headers})
              .toPromise()
              .then(res => {
                authResponse = res.json();
                if (authResponse.flag == true) {
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem('loggedInUserId', authResponse.id);
                  localStorage.setItem('username', authResponse.username);
                  localStorage.setItem("fullScreen", "");
                  return true;
                } else {
                  return false;
                }
              })
              .catch(this.handleError);
  }
 
  loggedIn(): Boolean {
    // this.logout();
    if (localStorage.getItem("user") === null){
      return false;
    }
    return true;
  }

  private handleError (error: any): Promise<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
