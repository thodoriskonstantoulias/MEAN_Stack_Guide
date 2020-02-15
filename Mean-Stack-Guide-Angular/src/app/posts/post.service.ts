import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class PostService {
    private posts : Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts(){
        return [...this.posts];
    }
    
    //Listen to the event of addPost
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(post:Post){
        this.posts.push(post);

        //Emit the event
        this.postsUpdated.next([...this.posts]);
    }
}