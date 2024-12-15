import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { jwtInterceptor } from './config/jwt.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProjectEffects } from './store/effects/project.effects';
import { projectReducer } from './store/reducers/project.reducer';
import { MessageEffects } from './store/effects/message.effects';
import { messageReducer } from './store/reducers/message.reducer';
import { documentReducer } from './store/reducers/document.reducer';
import { DocumentEffects } from './store/effects/document.effects';
import { postReducer } from './store/reducers/post.reducer';
import { PostEffects } from './store/effects/post.effects';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: JWT_OPTIONS, useValue: {} },
    { provide: JwtHelperService, useClass: JwtHelperService },
    provideStore(),
    provideState('projects', projectReducer),
    provideState('messages', messageReducer),
    provideState('documents', documentReducer),
    provideState('posts', postReducer),
    provideState('users', userReducer),
    provideState('auth', authReducer),
    provideEffects([
      ProjectEffects,
      MessageEffects,
      DocumentEffects,
      PostEffects,
      UserEffects,
      AuthEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
