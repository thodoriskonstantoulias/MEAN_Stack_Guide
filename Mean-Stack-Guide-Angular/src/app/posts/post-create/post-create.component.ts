import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})

export class PostCreateComponent {
    enteredValue = '';
    enteredTitle = ''; 
    @Output() postCreated = new EventEmitter<Post>();

    onAddPost(){
        // alert('Button clicked');
        const newPost : Post = {title : this.enteredTitle, content : this.enteredValue};

        this.postCreated.emit(newPost);
    }
} 