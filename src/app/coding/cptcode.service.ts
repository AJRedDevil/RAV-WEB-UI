import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

import { CPTCode } from './cptcode.model';

@Injectable()
export class CptCodeService { 
    private headers = new Headers({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });

    constructor(private _http: Http) {}

    getCptCodes(claimContent): Promise<CPTCode[]> {
        claimContent["id"] = localStorage.getItem("loggedInUserId");
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/cptclaim/get/`;
        return this._http.post(url, JSON.stringify(claimContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json() as CPTCode[])
                   .catch(this.handleError);
    }

    addCptCode(cptCodeContent): Promise<any> {
        cptCodeContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/cptclaim/addCptClaim/`;
        return this._http.post(url, JSON.stringify(cptCodeContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postCptCodeComment(cptCodeContent): Promise<any> {
        //cptCodeContent["_id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/cptclaim/addComment/`;
        return this._http.post(url, JSON.stringify(cptCodeContent), {headers: this.headers})
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
