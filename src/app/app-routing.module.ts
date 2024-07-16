import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./component/session/session.module").then((mod) => mod.SessionModule),
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
