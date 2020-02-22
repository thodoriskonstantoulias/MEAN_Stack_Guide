import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private token : string;
    private authStatus = new Subject<boolean>();

    constructor(private http: HttpClient){};

    getToken(){
        return this.token;
    }

    getAuthStatus(){
        return this.authStatus.asObservable();
    }

    createUser(email:string, password:string){
        const authData : AuthData = {
            email : email,
            password : password
        };
        this.http.post("http://localhost:3000/api/user/signup",authData)
            .subscribe(data => {
                console.log(data); 
            });
    }

    login(email:string, password:string){
        const authData : AuthData = {
            email : email,
            password : password
        };
        this.http.post<{token : string}>("http://localhost:3000/api/user/login",authData)
            .subscribe(data => {
                this.token = data.token;
                this.authStatus.next(true);
            });
    }
}