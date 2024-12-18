import { Routes } from '@angular/router';
import { CreatePostComponent } from './pages/admin/posts/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/posts/edit-post/edit-post.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { SignupComponent } from './pages/admin/users/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/landing/home.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ProjectsComponent } from './pages/admin/projects/projects.component';
import { AddProjectComponent } from './pages/admin/projects/add-project/add-project.component';
import { DocumentsComponent } from './pages/home/projects/documents.component';
import { AdminDocumentsComponent } from './pages/admin/documents/documents.component';
import { AddDocumentComponent } from './pages/admin/documents/add-document/add-document.component';
import { AboutComponent } from './pages/home/about/about.component';
import { ContactComponent } from './pages/home/contact/contact.component';
import { MessagesComponent } from './pages/admin/messages/messages.component';
import { ReadMessagesComponent } from './pages/admin/messages/read-messages/read-messages.component';
import { MainLayoutComponent } from './pages/home/main-layout.component';
import { AdminLandingComponent } from './pages/admin/landing/admin-landing.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'projects',
        children: [
          {
            path: ':id',
            component: DocumentsComponent,
          },
        ],
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminLandingComponent,
        canActivate: [authGuard],
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: ProjectsComponent,
            canActivate: [authGuard],
          },
          {
            path: 'add-project',
            component: AddProjectComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostsComponent,
            canActivate: [authGuard],
          },
          {
            path: 'create-post',
            component: CreatePostComponent,
            canActivate: [authGuard],
          },
          {
            path: 'edit-post',
            component: EditPostComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'documents',
        children: [
          {
            path: '',
            component: AdminDocumentsComponent,
            canActivate: [authGuard],
          },
          {
            path: 'add-document',
            component: AddDocumentComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
            canActivate: [authGuard],
          },
          {
            path: 'signup',
            component: SignupComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            component: MessagesComponent,
            canActivate: [authGuard],
          },
          {
            path: 'read-messages',
            component: ReadMessagesComponent,
            canActivate: [authGuard],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
