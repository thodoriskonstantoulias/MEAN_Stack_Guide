import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from './mime-type.validator';

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
    form: FormGroup;
    imagePreview: string;

    constructor(private postService:PostService, private route:ActivatedRoute) { }

    ngOnInit(){
        //Reactive Form
        this.form = new FormGroup({
           'title': new FormControl(null, {validators : [Validators.required]}),
           'content' : new FormControl(null, {validators:[Validators.required]}),
           'image' : new FormControl(null, {validators:[Validators.required], asyncValidators: [mimeType]})
        });

        this.route.paramMap.subscribe((paramMap : ParamMap) => {
            if (paramMap.has('postId')){
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                //flag for spinner
                this.isLoading = true;
                this.postService.getPost(this.postId).subscribe(post => {
                        this.isLoading = false;
                        this.post = {id:post._id,title:post.title,content:post.content};
                        this.form.setValue({'title': this.post.title, 'content': this.post.content});
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(){
        // alert('Button clicked');

        if (this.form.invalid){
            return;
        }
        //flag for spinner
        this.isLoading = true;
        
        const newPost : Post = {id: null, title : this.form.value.title, content : this.form.value.content};

        if (this.mode === 'create'){
            this.postService.addPost(newPost,this.form.value.image);
        } else {
            this.postService.updatePost(this.postId, newPost);
        }
        
        //Clear the fields after adding them to the list
        this.form.reset();
    }

    onImagePicked(event:Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({'image' : file});
        this.form.get('image').updateValueAndValidity();

        //Convert image to url that will be used as href
        const reader = new FileReader()
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file); 
    }
} 