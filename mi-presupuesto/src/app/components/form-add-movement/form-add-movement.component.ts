import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { Movement } from '../../models/movement.model';

@Component({
  selector: 'app-form-add-movement',
  templateUrl: './form-add-movement.component.html',
  styleUrls: ['./form-add-movement.component.css']
})
export class FormAddMovementComponent implements OnInit {
	fg: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private movementsApiClient: MovementsApiClient) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      mount: ['', [
        Validators.required,
        this.mountValidator
      ]],
      type: ['', Validators.required],
      concept: ['', Validators.required]
    });
  }

  save() {
    let mount = this.fg.controls['mount'].value;
    let type = this.fg.controls['type'].value;
    let concept = this.fg.controls['concept'].value;
  	let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let user_mail = localStorage.getItem('userLog');
    let movement = new Movement(mount, type, concept, date, user_mail);
  	this.movementsApiClient.add(movement);
    this.activeModal.close('Close click');
  }

  mountValidator(control: FormControl): { [s: string]: boolean } {
  	let l = (control.value as number);
  	return (l > 0 && l < 100000)? null: { invalidMount: true };
  }
}
