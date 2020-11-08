import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthentificationLoginComponent,
  ExploitantListComponent, ExploitantDetailComponent,
  FormationListComponent, InnovationListComponent, ProductionListComponent, EvolutionListComponent
} from "./application";
import { CuviComponent } from './application/production/cuvi/cuvi.component';
import { HistoricCumaComponent } from './application/production/historic-cuma/historic-cuma.component';
import { HistoricCuviComponent } from './application/production/historic-cuvi/historic-cuvi.component'
import { ProductionApicultureComponent } from './application/production/production-apiculture/production-apiculture.component';
import { ProductionAvicultureComponent } from './application/production/production-aviculture/production-aviculture.component';
import { ProductionBovinComponent } from './application/production/production-bovin/production-bovin.component';
import { ProductionCunnicultureComponent } from './application/production/production-cunniculture/production-cunniculture.component';
import { ProductionNavigationComponent } from './application/production/production-navigation/production-navigation.component';
import { ProductionPorcicultureComponent } from './application/production/production-porciculture/production-porciculture.component';


const routes: Routes = [
  { path: 'login', component: AuthentificationLoginComponent },
  { path: 'exploitant', component: ExploitantListComponent },
  { path: 'exploitantlist/:id', component: ExploitantDetailComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'formation', component: FormationListComponent },
  { path: 'innovation', component: InnovationListComponent },
  { path: 'production', component: ProductionNavigationComponent },
  { path: 'evolution', component: EvolutionListComponent },
  { path: 'cuma', component: ProductionListComponent },
  { path: 'cuvi', component: CuviComponent },
  { path: 'cuma-historique', component: HistoricCumaComponent },
  { path: 'cuvi-historique', component: HistoricCuviComponent },
  { path: 'aviculture', component: ProductionAvicultureComponent },
  { path: 'apiculture', component: ProductionApicultureComponent },
  { path: 'bovin', component: ProductionBovinComponent },
  { path: 'porciculture', component: ProductionPorcicultureComponent },
  { path: 'cunniculture', component: ProductionCunnicultureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
