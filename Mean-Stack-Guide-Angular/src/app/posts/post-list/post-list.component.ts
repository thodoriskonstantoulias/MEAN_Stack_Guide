import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  //posts = [{title:"Title 1", content : "First content"}, {title:"Title 2", content : "Second content"}];
  @Input() posts : Post[] = [];

  constructor(private postService:PostService) { }

}
