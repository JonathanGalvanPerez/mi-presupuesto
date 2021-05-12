import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { FormAddMovementComponent } from '../form-add-movement/form-add-movement.component';
import { Movement } from '../../models/movement.model'
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-movements-manager',
  templateUrl: './movements-manager.component.html',
  styleUrls: ['./movements-manager.component.css']
})
export class MovementsManagerComponent implements OnInit {
	movements: Movement[];
	categories: Map<number, string>;
	categorySelected = 0;
	typeSelected = "";

  constructor(public movementsApiClient: MovementsApiClient, private modalService: NgbModal) {
  	this.categories = Category.getCategories("");
  	this.movementsApiClient.subscribeOnChangeMovements(movements => {
      this.movements = movements;
      this.categorySelected = 0;
      this.typeSelected = "";
    });
  }

  ngOnInit(): void {
  }

  add() {
  	this.modalService.open(FormAddMovementComponent);
  }

  typeSelection() {
  	this.categorySelected = 0;
  	if(this.typeSelected == "")
  		this.categories = Category.getCategories("");
  	else
	 		this.categories = Category.getCategories(this.typeSelected);
  }
}
