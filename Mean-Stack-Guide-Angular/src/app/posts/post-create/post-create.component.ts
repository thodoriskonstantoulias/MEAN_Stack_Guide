import { Component } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})

export class PostCreateComponent {

    constructor(private postService:PostService) { }

    onAddPost(form: NgForm){
        // alert('Button clicked');

        if (form.invalid){
            return;
        }
        const newPost : Post = {id: null, title : form.value.title, content : form.value.content};

        this.postService.addPost(newPost);

        //Clear the fields after adding them to the list
        form.resetForm();
    }
} 