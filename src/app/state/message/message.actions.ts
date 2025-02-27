import { createAction, props } from '@ngrx/store';
import { Message } from '../../shared/interface/message';

export const loadMessages = createAction('[Messages] Load Messages');

export const loadMessagesSuccess = createAction(
  '[Messages] Load Messages Success',
  props<{ messages: Message[] }>()
);

export const loadMessagesFail = createAction(
  '[Messages] Load Messages Fail',
  props<{ error: string }>()
);

export const sendMessage = createAction(
  '[Message] Send Message',
  props<{ message: Message }>()
);

export const sendMessageSuccess = createAction(
  '[Message] Send Message Success',
  props<{ message: Message }>()
);

export const sendMessageFail = createAction(
  '[Message] Send Message Fail',
  props<{ error: string }>()
);

export const toggleArchive = createAction(
  '[Messages] Toggle Archive',
  props<{ messageId: number }>()
);

export const toggleArchiveSuccess = createAction(
  '[Messages] Toggle Archive Success',
  props<{ message: Message }>()
);

export const toggleArchiveFail = createAction(
  '[Messages] Toggle Archive Fail',
  props<{ error: string }>()
);

export const openDeleteDialog = createAction(
  '[Message] Open Delete Dialog',
  props<{ messageId: number }>()
);

export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{ messageId: number }>()
);

export const deleteMessageSuccess = createAction(
  '[Message] Delete Message Success',
  props<{ messageId: number }>()
);

export const deleteMessageFail = createAction(
  '[Message] Delete Message Fail',
  props<{ error: string }>()
);
