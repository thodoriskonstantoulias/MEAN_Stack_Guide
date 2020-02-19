import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})

export class PostService {
    private posts : Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http : HttpClient, private router: Router) {}

    getPosts(postsPerPage:number, currentPage:number){
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

        return this.http.get<{message:string, posts:any}>("http://localhost:3000/api/posts" + queryParams)
            .pipe(map((data) => {
                return data.posts.map(post => {
                    return {
                        title: post.title,
                        content : post.content,
                        id : post._id,
                        imagePath : post.imagePath
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

    addPost(post:Post, image:File){ 
        const postData = new FormData();
        postData.append("title" , post.title);
        postData.append("content" , post.content);
        postData.append("image" , image, post.title);

        //POST the data to server
        this.http.post<{message:string, post:Post}>("http://localhost:3000/api/posts",postData)
            .subscribe((data) => {
                this.posts.push(post);
                //Emit the event
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });   
    }

    updatePost(id:string, post: Post){
        const updatedPost : Post = {id:id, title: post.title, content : post.content, imagePath:null};
        this.http.put("http://localhost:3000/api/posts/" + id, updatedPost)
            .subscribe((data)=> {
                const updatedPosts = [...this.posts];
                const oldIndex = updatedPosts.findIndex(p => p.id === updatedPost.id);
                updatedPosts[oldIndex] = updatedPost;
                this.posts = updatedPosts;
                //Emit the event
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
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