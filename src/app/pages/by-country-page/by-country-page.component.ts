import { Component, inject } from '@angular/core';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchBoxComponent,CountryTableComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  countriesService = inject(CountryService)
  countries: Country[] = []
  public initialValue: string = ''

  
  searchByCountry(term: string): void{
    this.countriesService.searchCountry(term)
      .subscribe(country =>
      this.countries = country
    )
  }
  ngOnInit() {
    this.countries = this.countriesService.cacheStore.byCountries.countries
    this.initialValue = this.countriesService.cacheStore.byCountries.term
  }

}
