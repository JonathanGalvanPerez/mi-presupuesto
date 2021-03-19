import { Component, OnInit, Input, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormEditMovementComponent } from '../form-edit-movement/form-edit-movement.component';
import { MovementsApiClient } from '../../services/movements-api-client.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
	@Input() mount: number;
  @Input() type: string;
	@Input() concept: string;
  @Input() date: string;
	@Input() edit: boolean;
  @Input() id: string;
	@ViewChild('dark_screen') dark_screen: ElementRef;

  constructor(private modalService: NgbModal, private movementsApiClient: MovementsApiClient) {
  }

  ngOnInit(): void {
  }

  showDarkScreen() {
  	if (this.edit) {
  		this.dark_screen.nativeElement.style.display = 'flex';
  	}
  }
  hideDarkScreen() {
  	this.dark_screen.nativeElement.style.display = 'none';
  }
  editClick() {
    const modalRef = this.modalService.open(FormEditMovementComponent);
    modalRef.componentInstance.mount = this.mount;
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.concept = this.concept;
    modalRef.componentInstance.id = this.id;
  }
  deleteClick(deleteModal) {
    console.log("Se hizo click en el boton delete")
    const modalRef = this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-title' });
    modalRef.result.then((result) => {
      console.log("Se cerro el modal")
      if (result == 'delete') {
        console.log("Se llamo a delete de movementsApiClient");
        this.movementsApiClient.delete(this.id);
      }
    }, () => {});
  }
}
