import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {

  
  activatedRoute = inject(ActivatedRoute)
  countriesService = inject(CountryService)
  router = inject(Router)
  public country?:Country


  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) {
          return this.router.navigateByUrl('home')
        }
        return this.country = country
        
        
        
        
        
        /* 
        SI COMO SUBSCRIBIMOS CON PIPE-SWITCHMAP ESTO YA NO SIRVE
        this.countriesService.searchByAlphaCode(id)
          .subscribe(country => {
          console.log(country);
          
        }) */
        
      })
  }

 /*  searchCountry(code: string) {
    this.countriesService.searchByAlphaCode(code)
      .subscribe(country => {
        console.log(country);
      })

  } */
}
