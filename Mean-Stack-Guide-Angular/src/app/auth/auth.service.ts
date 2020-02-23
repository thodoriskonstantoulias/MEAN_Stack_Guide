import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private token : string;
    private authStatus = new Subject<boolean>();
    private userIsAuthenticated = false;

    constructor(private http: HttpClient, private router: Router){};

    getToken(){
        return this.token;
    }

    getAuthStatus(){
        return this.authStatus.asObservable();
    }

    getIsAuth(){
        return this.userIsAuthenticated;
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
                if (this.token){
                    this.userIsAuthenticated = true;
                    this.authStatus.next(true);
                    this.router.navigate(['/']);
                }
            });
    }

    logout(){
        this.token = null;
        this.userIsAuthenticated = false;
        this.authStatus.next(false);
        this.router.navigate(['/']);
    }
}