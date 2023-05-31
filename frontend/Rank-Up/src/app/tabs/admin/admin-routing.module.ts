import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'admin-list',
        loadChildren: () => import('../../admin-list/admin-list.module').then( m => m.AdminListPageModule)
      },
      {
        path: 'admin-profile',
        loadChildren: () => import('../../admin-profile/admin-profile.module').then( m => m.AdminProfilePageModule)
      },
      {
        path: 'pending-tasks',
        loadChildren: () => import('../../pending-tasks/pending-tasks.module').then( m => m.PendingTasksPageModule)
      },
      {
        path: 'admin-prizes-page',
        loadChildren: () => import('../../admin-prizes-page/admin-prizes-page.module').then( m => m.AdminPrizesPagePageModule)
       },
       {
        path: 'admin-home-team',
        loadChildren: () => import('../../admin-home-team/admin-home-team.module').then( m => m.AdminHomeTeamPageModule)
      },
      {
        path: 'request-history',
        loadChildren: () => import('../../request-history/request-history.module').then( m => m.RequestHistoryPageModule)
      },
      {
        path: 'add-user',
        loadChildren: () => import('../../add-user/add-user.module').then( m => m.AddUserPageModule)
      },
      {
        path: 'access-requests-list',
        loadChildren: () => import('../../access-requests-list/access-requests-list.module').then( m => m.AccessRequestsListPageModule)
      },
      {
        path: 'team-rules-tasks',
        loadChildren: () => import('../../team-rules-tasks/team-rules-tasks.module').then( m => m.TeamRulesTasksPageModule)
      },
      {
        path: 'admin-notification-description',
        loadChildren: () => import('../../admin-notification-description/admin-notification-description.module').then( m => m.AdminNotificationDescriptionPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
