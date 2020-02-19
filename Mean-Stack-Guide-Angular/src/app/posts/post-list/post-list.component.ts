import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  //posts = [{title:"Title 1", content : "First content"}, {title:"Title 2", content : "Second content"}];
  posts : Post[] = [];
  private postsSub: Subscription;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;

  constructor(private postService:PostService) { }

  ngOnInit(){
    this.postService.getPosts(this.postsPerPage, this.currentPage);

    //Listen to the event
    this.postsSub = this.postService.getPostUpdateListener()
        .subscribe((posts:Post[]) =>{
          this.posts = posts; 
        });
  }

  onDelete(id:string){
    this.postService.deletePost(id);
  }
  
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onChangedPage(pageData:PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;

    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

}
