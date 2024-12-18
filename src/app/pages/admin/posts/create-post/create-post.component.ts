import { Component } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { PostFormComponent } from '../components/post-form/post-form.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [Level2HeaderComponent, PostFormComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  headerText: string = 'Add New Post';
}
