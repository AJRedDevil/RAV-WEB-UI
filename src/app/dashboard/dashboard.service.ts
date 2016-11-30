import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import "rxjs/add/operator/toPromise";

 
@Injectable()
export class DashboardService {
  private headers = new Headers({
        'Content-type': 'application/json'
    });
  
  constructor(
    private _http: Http) {}
 
  getDashboardStats(): Promise<any> {
    var baseUrl = localStorage.getItem('baseUrl')
    var url = `${baseUrl}/dashboard/stats/`;
    return this._http.post(url, {headers: this.headers})
              .toPromise()
              .then( res => {
                  return res.json()
              })
              .catch(this.handleError);
  }

  getUserStats(): Promise<any> {
    var baseUrl = localStorage.getItem('baseUrl')
    var url = `${baseUrl}/dashboard/userstats/`;
    return this._http.post(url, {headers: this.headers})
              .toPromise()
              .then( res => {
                  return res.json()
              })
              .catch(this.handleError);
  }

    private handleError (error: any): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
