import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'contact', component: ContactPageComponent },
    {
        path: 'countries',children: [
            { path: 'by-capital', component: ByCapitalPageComponent },
            { path: 'by-country', component: ByCountryPageComponent },
            { path: 'by-region', component: ByRegionPageComponent },
            { path: 'by/:id', component: CountryPageComponent },
    ]},
    { path: '**', redirectTo: 'countries' }
    
    



    
];
