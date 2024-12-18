import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from './message.reducer';

export const selectMessagesState =
  createFeatureSelector<MessageState>('messages');

export const selectMessages = (archived: boolean) =>
  createSelector(selectMessagesState, (state) =>
    state.messages.filter((msg) => msg.read === archived)
  );

export const selectIsMessageLoaded = createSelector(
  selectMessagesState,
  (state) => state.isLoaded
);

export const selectLoading = createSelector(
  selectMessagesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectMessagesState,
  (state) => state.error
);
