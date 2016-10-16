import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import "rxjs/add/operator/toPromise";

@Injectable()
export class CommentCannotReviewService{
    private headers = new Headers({
        'Content-type': 'application/json'
    });

    constructor(private _http: Http) {}

    getCannotReviewList(): Promise<any[]> {
        var userContent = {"id":localStorage.getItem("loggedInUserId")};
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/chart/cannotReview/`
        return this._http.post(url, JSON.stringify(userContent), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    postCannotReview(crSelection): Promise<any> {
        crSelection["id"] = localStorage.getItem("loggedInUserId"); 
        var baseUrl = localStorage.getItem('baseUrl')
        var url = `${baseUrl}/registerCannotReview`
        return this._http.post(url, JSON.stringify(crSelection), {headers: this.headers})
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
