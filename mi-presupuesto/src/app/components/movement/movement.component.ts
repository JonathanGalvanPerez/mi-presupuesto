import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
  	@Input() name: string;
  	@Input() date: string;
  	@Input() concept: string;
  	@Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
