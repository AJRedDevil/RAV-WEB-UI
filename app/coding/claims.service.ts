import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

import { Claim } from './claim.model';

@Injectable()
export class ClaimsService { 
    private headers = new Headers({
        'Content-type': 'application/json'
    });

    constructor(private _http: Http) {}

    getClaims(): Promise<Claim[]> {
        var userContent = {"id": localStorage.getItem('loggedInUserId')};
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/claim/get/`;
        return this._http.post(url, JSON.stringify(userContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json() as Claim[])
                   .catch(this.handleError);
    }

    addClaim(claimContent): Promise<any> {
        claimContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/addClaim`;
        return this._http.post(url, JSON.stringify(claimContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    codingComplete(): Promise<any> {
        var userContent = {"id": localStorage.getItem('loggedInUserId')};
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/chart/complete/`;
        return this._http.post(url, JSON.stringify(userContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    goToNextChart(): Promise<any> {
        var userContent = {"id": localStorage.getItem('loggedInUserId')};
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/chart/next/`;
        return this._http.post(url, JSON.stringify(userContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
