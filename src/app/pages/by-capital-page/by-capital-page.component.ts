import { Component, inject } from '@angular/core';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchBoxComponent,CountryTableComponent,LoadingSpinnerComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  countriesService = inject(CountryService)
  public countries: Country[] = []
  public isLoading: boolean = false
  public initialValue:string = ''

  searchByCapital(term: string): void {
    this.isLoading = true
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries
        this.isLoading = false

      } )
  }

  ngOnInit() {
    this.countries = this.countriesService.cacheStore.byCapital.countries
    this.initialValue = this.countriesService.cacheStore.byCapital.term
  }
 
}
