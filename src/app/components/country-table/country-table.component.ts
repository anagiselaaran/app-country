import { Component, Input, inject } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {

  countriesService = inject(CountryService)

  @Input() countries:Country[]=[]

}
