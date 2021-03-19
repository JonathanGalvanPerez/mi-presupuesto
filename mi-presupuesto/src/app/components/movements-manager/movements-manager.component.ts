import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { FormAddMovementComponent } from '../form-add-movement/form-add-movement.component';

@Component({
  selector: 'app-movements-manager',
  templateUrl: './movements-manager.component.html',
  styleUrls: ['./movements-manager.component.css']
})
export class MovementsManagerComponent implements OnInit {

  constructor(public movementsApiClient: MovementsApiClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  add() {
  	const modalRef = this.modalService.open(FormAddMovementComponent);
  }
}
