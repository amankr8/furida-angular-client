import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostsState = createFeatureSelector<PostState>('posts');

export const selectPostById = (id: number) =>
  createSelector(selectPostsState, (state) =>
    state.posts.find((post) => post.id === id)
  );

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectPostLoaded = createSelector(
  selectPostsState,
  (state) => state.loaded
);

export const selectPostLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectPostError = createSelector(
  selectPostsState,
  (state) => state.error
);
