import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  //posts = [{title:"Title 1", content : "First content"}, {title:"Title 2", content : "Second content"}];
  posts : Post[] = [];
  private postsSub: Subscription;

  constructor(private postService:PostService) { }

  ngOnInit(){
    this.postService.getPosts();

    //Listen to the event
    this.postsSub = this.postService.getPostUpdateListener()
        .subscribe((posts:Post[]) =>{
          this.posts = posts; 
        });
  }
  
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
