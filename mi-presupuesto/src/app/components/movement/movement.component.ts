import { Component, OnInit, Input, HostBinding, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
	@Input() mount: number;
	@Input() date: string;
	@Input() concept: string;
	@Input() type: string;
	@Input() edit: boolean;
	@ViewChild('dark_screen') dark_screen: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  showEdit() {
  	if (this.edit) {
  		this.dark_screen.nativeElement.style.display = 'flex';
  	}
  }
  hideEdit() {
  	this.dark_screen.nativeElement.style.display = 'none';
  }
}
