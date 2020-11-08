
// import { AotCompiler } from '@angular/compiler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// firebase 
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// services
import { ExploitantService, AuthentificationService, AutoLogoutService, DomaineService } from './services';

// application view
import {
    ExploitantListComponent, ExploitantDetailComponent,
    AuthentificationLoginComponent,
    EvolutionListComponent,
    HomeComponent, ProductionListComponent, InnovationListComponent,
    FormationListComponent, DomaineCedarComponent
} from './application';

import { HistoricCumaComponent } from './application/production/historic-cuma/historic-cuma.component';
import { CuviComponent } from './application/production/cuvi/cuvi.component';
import { ProductionNavigationComponent } from './application/production/production-navigation/production-navigation.component';

//animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DataTablesModule } from 'angular-datatables';

// material design
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalService } from './services/modal.service';

// heure française + LOCAL_ID
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductionBovinComponent } from './application/production/production-bovin/production-bovin.component';
import { ProductionCunnicultureComponent } from './application/production/production-cunniculture/production-cunniculture.component';
import { ProductionApicultureComponent } from './application/production/production-apiculture/production-apiculture.component';
import { ProductionAvicultureComponent } from './application/production/production-aviculture/production-aviculture.component';
import { ProductionPorcicultureComponent } from './application/production/production-porciculture/production-porciculture.component';

import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { HistoricCuviComponent } from './application/production/historic-cuvi/historic-cuvi.component'


@NgModule({
    declarations: [
        AppComponent,
        ExploitantListComponent,
        ExploitantDetailComponent,
        AuthentificationLoginComponent,
        HomeComponent,
        ProductionListComponent,
        FormationListComponent,
        InnovationListComponent,
        EvolutionListComponent,
        DomaineCedarComponent,
        HistoricCumaComponent,
        CuviComponent,
        ProductionNavigationComponent,
        ProductionBovinComponent,
        ProductionCunnicultureComponent,
        ProductionApicultureComponent,
        ProductionAvicultureComponent,
        ProductionPorcicultureComponent,
        HistoricCuviComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        BackButtonDisableModule.forRoot({ preserveScrollPosition: true }),
        Ng2LoadingSpinnerModule.forRoot({}),
        NgxChartsModule,
        MDBBootstrapModule.forRoot(),
        DataTablesModule,
        ChartsModule,
        WavesModule,
        
        // mat
        A11yModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
    ],
    exports: [MatRadioModule],
    providers: [
        ExploitantService,
        AuthentificationService,
        DatePipe,
        AutoLogoutService,
        MatDialogConfig,
        DomaineService,
        ModalService,
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: MAT_DATE_LOCALE, useValue: 'fr' },
        { provide: MAT_DATE_FORMATS, useValue: environment },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [ExploitantDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }