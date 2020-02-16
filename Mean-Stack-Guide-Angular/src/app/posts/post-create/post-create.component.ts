import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
    private mode = 'create';
    private postId : string;
    post : Post;
    isLoading = false;

    constructor(private postService:PostService, private route:ActivatedRoute) { }

    ngOnInit(){
        this.route.paramMap.subscribe((paramMap : ParamMap) => {
            if (paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                //flag for spinner
                this.isLoading = true;
                this.postService.getPost(this.postId).subscribe(post => {
                        this.isLoading = false;
                        this.post = {id:post._id,title:post.title,content:post.content};
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(form: NgForm){
        // alert('Button clicked');

        if (form.invalid){
            return;
        }
        //flag for spinner
        this.isLoading = true;
        
        const newPost : Post = {id: null, title : form.value.title, content : form.value.content};

        if (this.mode === 'create'){
            this.postService.addPost(newPost);
        } else {
            this.postService.updatePost(this.postId, newPost);
        }
        
        //Clear the fields after adding them to the list
        form.resetForm();
    }
} 