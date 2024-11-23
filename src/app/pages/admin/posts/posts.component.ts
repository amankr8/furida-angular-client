import { Component, inject, signal } from '@angular/core';
import { Post } from '../../../interface/post';
import { PostService } from '../../../service/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { EditPostComponent } from './edit-post/edit-post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HeaderComponent,
    MatProgressBarModule,
    RouterLink,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: Post[] = [];
  isLoading = false;
  readonly editDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }

  openEditDialog(id: number) {
    const editDialogref = this.editDialog.open(EditPostComponent, {
      data: this.posts.find((post) => post.id === id),
      width: '50%',
    });

    editDialogref.afterClosed().subscribe({
      next: (updatedPost) => {
        if (!updatedPost) return;
        this.isLoading = true;

        const postDto = new FormData();
        postDto.append('title', updatedPost.title);
        postDto.append('content', updatedPost.content);
        this.postService.updatePost(updatedPost.id, postDto).subscribe({
          next: (res) => {
            const index = this.posts.findIndex(
              (post) => post.id === updatedPost.id
            );
            this.posts[index] = updatedPost;
            this.isLoading = false;
            this.snackBarRef.open('Post updated successfully!', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBarRef.open('Error: Failed to update post', 'Dismiss', {
              duration: 3000,
            });
          },
        });
      },
    });
  }

  openDeleteDialog(id: number) {
    const deleteDialogref = this.deleteDialog.open(DeletePostComponent, {
      data: id,
      width: '50%',
    });

    deleteDialogref.afterClosed().subscribe({
      next: (id) => {
        if (!id) return;
        this.isLoading = true;

        this.postService.deletePost(id).subscribe({
          next: (res) => {
            this.posts = this.posts.filter((post) => post.id !== id);
            this.isLoading = false;
            this.snackBarRef.open('Post deleted successfully!', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBarRef.open('Error: Failed to update post', 'Dismiss', {
              duration: 3000,
            });
          },
        });
      },
    });
  }
}