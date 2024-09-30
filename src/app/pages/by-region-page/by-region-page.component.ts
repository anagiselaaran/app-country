import { Region } from './../../interfaces/region.type';
import { Component, inject } from '@angular/core';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

 

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [SearchBoxComponent,CountryTableComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  countries: Country[] = []
  countriesService = inject(CountryService)
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region
  

  searchByRegion(term: Region): void{

    this.selectedRegion = term
    this.countriesService.searchRegion(term)
      .subscribe(region =>
      this.countries = region
    )
  }

  ngOnInit() {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }

}
