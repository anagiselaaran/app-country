import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() {
    this.loadFromLocalStorage()
    
   }
 

  httpClient = inject(HttpClient)

  private urlApi: string = 'https://restcountries.com/v3.1'

  public cacheStore:CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },

  }

  private saveLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }



  private getCountriesRequest(url:string):Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        //delay(2000)
    )
  }

  searchByAlphaCode(term: string): Observable<Country | null>{
    const url = (`${this.urlApi}/alpha/${term}`)
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null), 
        catchError(error => of(null))

      )
     
  }

  searchCapital(term:string):Observable<Country[]> {
    const url = (`${this.urlApi}/capital/${term}`)
    
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries }),
        tap( ()=> this.saveLocalStorage())
    )
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = (`${this.urlApi}/name/${term}?fullText=false`)
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term, countries }),
        tap(() => this.saveLocalStorage())

      )

  }

  searchRegion(region: Region): Observable<Country[]>{
    const url = (`${this.urlApi}/region/${region}?fullText=false`)
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveLocalStorage())

    )

  }

}
