import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})

export class PostService {
    private posts : Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http : HttpClient) {}

    getPosts(){
        return this.http.get<{message:string, posts:any}>("http://localhost:3000/api/posts")
            .pipe(map((data) => {
                return data.posts.map(post => {
                    return {
                        title: post.title,
                        content : post.content,
                        id : post._id
                    };
                });
            }))
            .subscribe((transPosts)=>{
                this.posts = transPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }
    
    //Listen to the event of addPost
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    getPost(id:string){
        return this.http.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/posts/" + id);
    }

    addPost(post:Post){ 
        //POST the data to server
        this.http.post<{message:string}>("http://localhost:3000/api/posts",post)
            .subscribe((data) => {
                this.posts.push(post);
                //Emit the event
                this.postsUpdated.next([...this.posts]);
            });   
    }

    updatePost(id:string, post: Post){
        const updatedPost : Post = {id:id, title: post.title, content : post.content};
        this.http.put("http://localhost:3000/api/posts/" + id, updatedPost)
            .subscribe((data)=> {
                const updatedPosts = [...this.posts];
                const oldIndex = updatedPosts.findIndex(p => p.id === updatedPost.id);
                updatedPosts[oldIndex] = updatedPost;
                this.posts = updatedPosts;
                //Emit the event
                this.postsUpdated.next([...this.posts]);
            });
    }

    deletePost(id:string){
        this.http.delete("http://localhost:3000/api/posts/" + id)
            .subscribe(()=>{
                const updatedPosts = this.posts.filter(post => post.id !== id);
                this.posts = updatedPosts;
                //Emit the event
                this.postsUpdated.next([...this.posts]);
            });
    }
}