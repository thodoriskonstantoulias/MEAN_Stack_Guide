import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  posts = [{title:"Title 1", content : "First content"}, {title:"Title 2", content : "Second content"}];

  constructor() { }

}
