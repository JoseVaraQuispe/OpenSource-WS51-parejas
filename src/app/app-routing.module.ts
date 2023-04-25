import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPeliculasComponent } from './component/list-peliculas/list-peliculas.component';
import { HomeComponent } from '../app/component/home/home.component';
const routes: Routes = [
  //{path: 'home', component: ListPeliculasComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'business/peliculas', component: ListPeliculasComponent},
  {path: '', pathMatch: 'full', redirectTo: 'business/peliculas'},
  {path: '**', pathMatch: 'full', redirectTo: 'business/peliculas'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
