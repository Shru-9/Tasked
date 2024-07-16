import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./component/login/login.module").then((mod) => mod.LoginModule),
  },
  // {
  //   path: "login",
  //   component: LoginComponent,
  // },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "task",
    loadChildren: () =>
      import("./component/task/task.module").then((mod) => mod.TaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
