import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import "rxjs/add/operator/toPromise";

import { MemberInfo } from './member-info.model';

@Injectable()
export class MemberInfoService{
    private headers = new Headers({
        'Content-type': 'application/json'
    });
    
    constructor(private _http: Http) {}

    getMemberInfo(): Promise<MemberInfo> {
        var userContent = {"id": localStorage.getItem("loggedInUserId")}
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/member/info/`
        return this._http.post(url, JSON.stringify(userContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json() as MemberInfo)
                   .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
