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
  movementsSelected: Movement[];
	categories: Map<number, string>;
	categorySelected = 0;
	typeSelected = "";

  constructor(public movementsApiClient: MovementsApiClient, private modalService: NgbModal) {
  	this.categories = Category.getCategories("");
  	this.movementsApiClient.subscribeOnChangeMovements(movements => {
      this.movements = movements;
      this.movementsSelected = movements;
      this.categorySelected = 0;
      this.typeSelected = "";
    });
    this.movementsSelected = this.movements;
  }

  ngOnInit(): void {
  }

  add() {
  	this.modalService.open(FormAddMovementComponent);
  }

  typeSelection() {
  	this.categorySelected = 0;
  	if(this.typeSelected == "") {
  		this.movementsSelected = this.movements;
  		this.categories = Category.getCategories("");
  	}	else {
	  	this.filterType(this.typeSelected);
	 		this.categories = Category.getCategories(this.typeSelected);
	 	}
  }

  categorySelection() {
  	if(this.categorySelected == 0) {
  		if(this.typeSelected == "")
	  		this.movementsSelected = this.movements;
	  	else
	  		this.filterType(this.typeSelected);
  	} else {
  		this.filterCategory(this.categorySelected);
  	}
  }

  filterType(type: string) {
    this.movementsSelected = this.movements.filter(movement => movement.type === type);
  }

  filterCategory(category: number) {
    this.movementsSelected = this.movements.filter(movement => movement.category === category);
  }
}
