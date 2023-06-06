import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: 'user-team-profile',
        loadChildren: () => import('../../user-team-profile/user-team-profile.module').then( m => m.UserTeamProfilePageModule)
      },
      {
        path: 'search-team',
        loadChildren: () => import('../../search-team/search-team.module').then( m => m.SearchTeamPageModule)
      },
      {
        path: 'team',
        loadChildren: () => import('../../team/team.module').then( m => m.TeamPageModule)
      },
      {
        path: 'prizes-page',
        loadChildren: () => import('../../prizes-page/prizes-page.module').then( m => m.PrizesPagePageModule)
      },
      {
        path: 'rules-and-tasks-rules',
        loadChildren: () => import('../../rules-and-tasks-rules/rules-and-tasks-rules.module').then( m => m.RulesAndTasksRulesPageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: 'participants',
        loadChildren: () => import('../../participants/participants.module').then( m => m.ParticipantsPageModule)
      },
      {
        path: 'user-notification-description',
        loadChildren: () => import('../../user-notification-description/user-notification-description.module').then( m => m.UserNotificationDescriptionPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule { }
