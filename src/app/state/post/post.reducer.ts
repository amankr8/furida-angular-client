import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFail,
  addPost,
  addPostSuccess,
  addPostFail,
  updatePost,
  updatePostSuccess,
  updatePostFail,
  deletePost,
  deletePostSuccess,
  deletePostFail,
} from './post.actions';
import { Post } from '../../interface/post';

export interface PostState {
  posts: Post[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialPostsState: PostState = {
  posts: [],
  isLoaded: false,
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialPostsState,
  on(loadPosts, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    isLoaded: true,
    loading: false,
  })),

  on(loadPostsFail, (state, { error }) => ({
    ...state,
    error,
    isLoaded: false,
    loading: false,
  })),

  on(addPost, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(addPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
    loading: false,
  })),

  on(addPostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(updatePost, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    loading: false,
  })),

  on(updatePostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(deletePost, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deletePostSuccess, (state, { postId }) => ({
    ...state,
    posts: state.posts.filter((post) => post.id !== postId),
    loading: false,
  })),

  on(deletePostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
