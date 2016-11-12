import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

import { Claim } from './claim.model';

@Injectable()
export class ClaimService { 
    private headers = new Headers({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });

    constructor(private _http: Http) {}

    updateDos(claimComponent): Promise<any> {
        claimComponent['id'] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/claim/updateDos/`;
        return this._http.post(url, JSON.stringify(claimComponent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postClaimComment(claimComment): Promise<any> {
        claimComment['id'] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/claim/updateComment/`;
        return this._http.post(url, JSON.stringify(claimComment), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postClaimReview(claimContent): Promise<any> {
        claimContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/claim/setReviewState/`;
        return this._http.post(url, JSON.stringify(claimContent), {headers: this.headers})
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
