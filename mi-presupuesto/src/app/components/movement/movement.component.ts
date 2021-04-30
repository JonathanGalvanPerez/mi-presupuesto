import { Component, OnInit, Input, Output, HostBinding, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormEditMovementComponent } from '../form-edit-movement/form-edit-movement.component';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
	@Input() mount: number;
  @Input() type: string;
  @Input() category_id: number;
	@Input() concept: string;
  @Input() date: Date;
	@Input() edit: boolean;
  @Input() id: string;
  @Output() deleteMovement: EventEmitter<string>;
  displayOptions: boolean;
  category_name: string;

  constructor(private modalService: NgbModal) {
    this.displayOptions = false;
    this.deleteMovement = new EventEmitter();
  }

  ngOnInit(): void {
    this.category_name = Category.getCategoryName(this.type, this.category_id);
  }

  showOptions() {
 		this.displayOptions = true;
  }

  hideOptions() {
  	this.displayOptions = false;
  }

  editClick() {
    this.displayOptions = false;
    const modalRef = this.modalService.open(FormEditMovementComponent);
    modalRef.componentInstance.initialMount = this.mount;
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.initialCategory = this.category_id;
    modalRef.componentInstance.initialConcept = this.concept;
    modalRef.componentInstance.id = this.id;
  }

  deleteClick(deleteModal) {
    this.displayOptions = false;
    const modalRef = this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-title' });
    modalRef.result.then((result) => {
      if (result == 'delete')
        this.deleteMovement.emit(this.id);
    }).catch(() => {});
  }
}
