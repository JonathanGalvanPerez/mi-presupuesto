import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movement } from '../../models/movement.model';

@Component({
  selector: 'app-form-movement',
  templateUrl: './form-movement.component.html',
  styleUrls: ['./form-movement.component.css']
})
export class FormMovementComponent implements OnInit {
	@Output() onItemAdded: EventEmitter<Movement>
	fg: FormGroup;

  constructor(fb: FormBuilder, public activeModal: NgbActiveModal) {
  	this.onItemAdded = new EventEmitter();
  	this.fg = fb.group({
  		mount: ['', Validators.compose([
  			Validators.required,
  			this.mountValidator
  		])],
  		type: ['', Validators.required],
  		concept: ['', Validators.required]
  	})
  }

  ngOnInit(): void {
  }

  save(mount: number, type: string, concept: string): boolean {
  	let date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  	const movement = new Movement(mount, type, concept, date);
  	this.onItemAdded.emit(movement);
  	return false;
  }

  mountValidator(control: FormControl): { [s: string]: boolean } {
  	let l = (control.value as number);
  	return (l > 0 && l < 100000)? null: { invalidMount: true };
  }
}
