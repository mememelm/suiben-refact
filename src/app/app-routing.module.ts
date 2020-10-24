import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthentificationLoginComponent,
  ExploitantListComponent, ExploitantDetailComponent,
  FormationListComponent, InnovationListComponent, ProductionListComponent, EvolutionListComponent
} from "./application";


const routes: Routes = [
  { path: 'login', component: AuthentificationLoginComponent },
  { path: 'exploitant', component: ExploitantListComponent },
  { path: 'exploitantlist/:id', component: ExploitantDetailComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'formation', component: FormationListComponent },
  { path: 'innovation', component: InnovationListComponent },
  { path: 'production', component: ProductionListComponent },
  { path: 'evolution', component: EvolutionListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
