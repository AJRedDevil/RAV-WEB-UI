import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

import { DXCode, Reasons } from './dxcode.model';

@Injectable()
export class DxCodeService { 
    private headers = new Headers({
        'Content-type': 'application/json'
    });

    constructor(private _http: Http) {}

    getDxcodes(claimContent): Promise<DXCode[]> {
        claimContent["id"] = localStorage.getItem("loggedInUserId");
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/dxclaim/get/`;
        return this._http.post(url, JSON.stringify(claimContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json() as DXCode[])
                   .catch(this.handleError);
    }

    getReasons(dxCodeContent): Promise<Reasons[]> {
        dxCodeContent["id"] = localStorage.getItem("loggedInUserId");
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/chart/reasons/`;
        return this._http.post(url, JSON.stringify(dxCodeContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json() as Reasons[])
                   .catch(this.handleError);
    }
    
    addDxCode(dxCodeContent): Promise<any> {
        dxCodeContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/dxclaim/addDxClaim/`;
        return this._http.post(url, JSON.stringify(dxCodeContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postDxCodeReview(dxcodeContent): Promise<any> {
        // dxcodeContent["_id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/dxclaim/setInvalidState/`;
        return this._http.post(url, JSON.stringify(dxcodeContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postDxCodeComment(dxCodeContent): Promise<any> {
        //dxCodeContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/dxclaim/addComment/`;
        return this._http.post(url, JSON.stringify(dxCodeContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postReason(dxCodeContent): Promise<any> {
        // dxCodeContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/dxclaim/setReason/`;
        return this._http.post(url, JSON.stringify(dxCodeContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postValid(dxCodeContent): Promise<any> {
        // dxCodeContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/dxclaim/setValidState/`;
        return this._http.post(url, JSON.stringify(dxCodeContent), {headers: this.headers})
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
