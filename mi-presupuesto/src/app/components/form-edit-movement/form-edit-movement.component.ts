import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movement } from '../../models/movement.model';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-form-edit-movement',
  templateUrl: './form-edit-movement.component.html',
  styleUrls: ['./form-edit-movement.component.css']
})
export class FormEditMovementComponent implements OnInit {
	@Input() mount: number;
	@Input() type: string;
  @Input() category: string;
	@Input() concept: string;
	@Input() id: string;
	fg: FormGroup;
  categories: Map<number, string>;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private movementsApiClient: MovementsApiClient) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      mount: [this.mount, [
        Validators.required,
        this.mountValidator
      ]],
      category: [this.category],
      concept: [this.concept, Validators.required]
    });
    this.categories = Category.getCategories(this.type);
  
  }

  save() {
    let mount = this.fg.controls['mount'].value;
    let category = this.fg.controls['category'].value;
    let concept = this.fg.controls['concept'].value;
  	this.movementsApiClient.edit(mount, this.mount, this.type, category, concept, this.id)
  	this.activeModal.close('Close click');
  }

  mountValidator(control: FormControl): { [s: string]: boolean } {
  	let l = (control.value as number);
  	return (l > 0 && l < 500000)? null: { invalidMount: true };
  }
}
