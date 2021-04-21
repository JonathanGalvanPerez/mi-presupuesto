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
  	this.movements = movementsApiClient.getAllMovements();
  }

  ngOnInit(): void {
  }

  add() {
  	const modalRef = this.modalService.open(FormAddMovementComponent);
  }

  typeSelection() {
  	this.categorySelected = 0;
  	if(this.typeSelected == "") {
  		this.movements = this.movementsApiClient.getAllMovements();
  		this.categories = Category.getCategories("");
  	}	else {
	  	this.movements = this.movementsApiClient.getTypeList(this.typeSelected);
	 		this.categories = Category.getCategories(this.typeSelected);
	 	}
  }

  categorySelection() {
  	if(this.categorySelected == 0) {
  		if(this.typeSelected == "")
	  		this.movements = this.movementsApiClient.getAllMovements();
	  	else
	  		this.movements = this.movementsApiClient.getTypeList(this.typeSelected);
  	} else {
  		this.movements = this.movementsApiClient.getCategoryList(this.categorySelected);
  	}
  }
}
