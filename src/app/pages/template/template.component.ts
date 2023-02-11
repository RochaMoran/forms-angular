import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

type UserType = {
  name: string;
};

type CountriesType = {
  name: string;
  code: string;
};

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  user: UserType = {
    name: '',
  };
  countries: CountriesType[] = [];

  constructor(private countriesService: CountryService) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((respCountries) => {
      this.countries = respCountries;
    });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);
  }
}
