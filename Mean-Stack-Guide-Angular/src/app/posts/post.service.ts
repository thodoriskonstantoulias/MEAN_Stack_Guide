import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})

export class PostService {
    private posts : Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http : HttpClient) {}

    getPosts(){
        return this.http.get<{message:string, posts:Post[]}>("http://localhost:3000/api/posts")
            .subscribe((data)=>{
                this.posts = data.posts;
                this.postsUpdated.next([...this.posts]);
            });
    }
    
    //Listen to the event of addPost
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(post:Post){ 
        //POST the data to server
        this.http.post<{message:string}>("http://localhost:3000/api/posts",post)
            .subscribe((data) => {
                console.log(data.message);

                this.posts.push(post);
                //Emit the event
                this.postsUpdated.next([...this.posts]);
            });   
    }
}