import { Component, OnInit, Input, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormEditMovementComponent } from '../form-edit-movement/form-edit-movement.component';
import { MovementsApiClient } from '../../services/movements-api-client.service';
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
  @Input() date: string;
	@Input() edit: boolean;
  @Input() id: string;
  displayOptions: boolean;
  category_name: string;

  constructor(private modalService: NgbModal, private movementsApiClient: MovementsApiClient) {
    this.displayOptions = false;
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
    modalRef.componentInstance.mount = this.mount;
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.category = this.category_id;
    modalRef.componentInstance.concept = this.concept;
    modalRef.componentInstance.id = this.id;
  }

  deleteClick(deleteModal) {
    console.log("Se hizo click en el boton delete")
    this.displayOptions = false;
    const modalRef = this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-title' });
    modalRef.result.then((result) => {
      if (result == 'delete') {
        this.movementsApiClient.delete(this.id);
      }
    }, () => {});
  }
}
