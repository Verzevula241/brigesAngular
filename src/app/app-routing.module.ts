import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { SignalChatComponent } from './signal-chat/signal-chat.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLoginComponent,
  },
  {
    path: 'chat',
    component: SignalChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
