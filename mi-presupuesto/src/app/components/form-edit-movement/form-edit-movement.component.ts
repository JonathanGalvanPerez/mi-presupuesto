import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movement } from '../../models/movement.model';
import { MovementsApiClient } from '../../services/movements-api-client.service';

@Component({
  selector: 'app-form-edit-movement',
  templateUrl: './form-edit-movement.component.html',
  styleUrls: ['./form-edit-movement.component.css']
})
export class FormEditMovementComponent implements OnInit {
	@Input() mount: number;
	@Input() type: string;
	@Input() concept: string;
	@Input() id: string;
	fg: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private movementsApiClient: MovementsApiClient) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      mount: [this.mount, [
        Validators.required,
        this.mountValidator
      ]],
      concept: [this.concept, Validators.required]
    });
  }

  save() {
    let mount = this.fg.controls['mount'].value;
    let concept = this.fg.controls['concept'].value;
  	this.movementsApiClient.edit(mount, this.mount, this.type, concept, this.id)
  	this.activeModal.close('Close click');
  }

  mountValidator(control: FormControl): { [s: string]: boolean } {
  	let l = (control.value as number);
  	return (l > 0 && l < 100000)? null: { invalidMount: true };
  }
}
