import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./tabs/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./tabs/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'task-completed',
    loadChildren: () => import('./task-completed/task-completed.module').then( m => m.TaskCompletedPageModule)
  },
  {
    path: 'send-rule',
    loadChildren: () => import('./send-rule/send-rule.module').then( m => m.SendRulePageModule)
  },
  {
    path: 'send-task',
    loadChildren: () => import('./send-task/send-task.module').then( m => m.SendTaskPageModule)
  },
  {
    path: 'user-rule-completed',
    loadChildren: () => import('./user-rule-completed/user-rule-completed.module').then( m => m.UserRuleCompletedPageModule)
  },
  {
    path: 'task-confirmation',
    loadChildren: () => import('./task-confirmation/task-confirmation.module').then( m => m.TaskConfirmationPageModule)
  },
  {
    path: 'completed-task',
    loadChildren: () => import('./completed-task/completed-task.module').then( m => m.CompletedTaskPageModule)
  },
  {
    path: 'create-team',
    loadChildren: () => import('./create-team/create-team.module').then( m => m.CreateTeamPageModule)
  },
  {
    path: 'task-rejected',
    loadChildren: () => import('./task-rejected/task-rejected.module').then( m => m.TaskRejectedPageModule)
  },
  {
    path: 'rule-rejected',
    loadChildren: () => import('./rule-rejected/rule-rejected.module').then( m => m.RuleRejectedPageModule)
  },
  {
    path: 'admin-team-settings',
    loadChildren: () => import('./admin-team-settings/admin-team-settings.module').then( m => m.AdminTeamSettingsPageModule)
  },
  {
    path: 'create-rule',
    loadChildren: () => import('./create-rule/create-rule.module').then( m => m.CreateRulePageModule)
  },
  {
    path: 'create-prize',
    loadChildren: () => import('./create-prize/create-prize.module').then( m => m.CreatePrizePageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'admin-rule-completed',
    loadChildren: () => import('./admin-rule-completed/admin-rule-completed.module').then( m => m.AdminRuleCompletedPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'rule-confirmation',
    loadChildren: () => import('./rule-confirmation/rule-confirmation.module').then( m => m.RuleConfirmationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
