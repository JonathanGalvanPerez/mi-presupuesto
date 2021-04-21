import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { Movement } from '../../models/movement.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-form-add-movement',
  templateUrl: './form-add-movement.component.html',
  styleUrls: ['./form-add-movement.component.css']
})
export class FormAddMovementComponent implements OnInit {
	fg: FormGroup;
  categories: Map<number, string>;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private movementsApiClient: MovementsApiClient) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      mount: ['', [
        Validators.required,
        this.mountValidator
      ]],
      type: ['', Validators.required],
      category: [{ value: '', disabled: true }, { validators: [Validators.required]}],
      concept: ['', Validators.required]
    });
  }

  save() {
    let mount = this.fg.controls['mount'].value;
    let type = this.fg.controls['type'].value;
    let category = this.fg.controls['category'].value;
    let concept = this.fg.controls['concept'].value;
  	let date = new Date();
    let user_mail = localStorage.getItem('userLog');
    let movement = new Movement(mount, type, category, concept, date, user_mail);
  	this.movementsApiClient.add(movement);
    this.activeModal.close('Close click');
  }

  updateCategory() {
    let typeValue = this.fg.controls['type'].value;
    this.fg.controls['category'].markAsUntouched();
    if (typeValue == "Ingreso" || typeValue == "Egreso") {
      this.categories = Category.getCategories(typeValue);
      this.fg.controls['category'].setValue('');
      this.fg.controls['category'].enable();
    } else {
      this.fg.controls['category'].setValue('');
      this.fg.controls['category'].disable();
    }
  }

  mountValidator(control: FormControl): { [s: string]: boolean } {
  	let l = (control.value as number);
  	return (l > 0 && l < 500000)? null: { invalidMount: true };
  }
}
