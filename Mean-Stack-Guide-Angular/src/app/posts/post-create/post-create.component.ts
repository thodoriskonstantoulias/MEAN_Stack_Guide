import { Component } from '@angular/core';

@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html'
})

export class PostCreateComponent {
    newPost = 'No content';

    onAddPost(){
        // alert('Button clicked');
        this.newPost = 'Property changed';
    }
}