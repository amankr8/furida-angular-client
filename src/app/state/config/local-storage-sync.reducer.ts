import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { localStorageKeys } from '../../constants/global-constants';

export function localStorageSyncReducer<T>(
  reducer: ActionReducer<T>
): ActionReducer<T> {
  return (state: T | undefined, action: any): T => {
    if (action.type === INIT || action.type === UPDATE) {
      const storedConfig = localStorage.getItem(localStorageKeys.ConfigState);
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        return {
          ...(state as T),
          config: parsedConfig,
        };
      }
    }

    const nextState = reducer(state, action);

    const configState = (nextState as any)?.config;
    if (configState) {
      localStorage.setItem(
        localStorageKeys.ConfigState,
        JSON.stringify(configState)
      );
    }

    return nextState;
  };
}