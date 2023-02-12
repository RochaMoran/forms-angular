import { ValidationsService } from './../../services/validations.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
})
export class ReactiveComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validations: ValidationsService
  ) {
    this.createForm();
    this.loadDataForm();
  }

  get lastNameInvalid() {
    return (
      this.form.get('lastName')?.invalid && this.form.get('lastName')?.touched
    );
  }
  get emailInvalid() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  get nameInvalid() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  get streetInvalid() {
    return (
      this.form.get('address.street')?.invalid &&
      this.form.get('address.street')?.touched
    );
  }

  get password1Invalid() {
    return (
      this.form.get('password1')?.invalid && this.form.get('password1')?.touched
    );
  }

  get cityInvalid() {
    return (
      this.form.get('address.city')?.invalid &&
      this.form.get('address.city')?.touched
    );
  }

  get userInvalid() {
    return this.form.invalid && this.form.touched;
  }

  createForm() {
    this.form = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            this.validations.noSteven,
          ],
        ],
        user: ['', , this.validations.userNotFound],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        password1: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        address: this.fb.group({
          street: ['', [Validators.required, Validators.minLength(3)]],
          city: ['', [Validators.required, Validators.minLength(3)]],
        }),
      },
      {
        validators: this.validations.equalPassword('password', 'password1'),
      }
    );
  }

  save() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(this.form.value);
    this.resetForm();
  }

  loadDataForm() {
    this.form.setValue({
      name: 'Juan',
      lastName: 'Perez',
      email: 'fsdad@gmai.es',
      address: {
        street: 'Calle 1',
        city: 'Bogota',
      },
      user: '',
      password: '',
      password1: '',
    });
  }

  resetForm() {
    this.form.reset();
  }
}
