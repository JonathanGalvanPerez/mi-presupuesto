import { Pipe, PipeTransform } from '@angular/core';
import { Movement } from '../models/movement.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Movement[], type: string, category: number): Movement[] {
  	if (category != 0)
  		return value.filter(movement => movement.category == category);
  	if (type !== '')
  		return value.filter(movement => movement.type == type);
  	return value;
  }

}
