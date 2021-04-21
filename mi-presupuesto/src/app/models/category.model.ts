export class Category {
	static categories_ingress = new Map([
		[1, 'Salario'],
		[2, 'Transferencia'],
		[3, 'Otros']
	]);
	static categories_egress = new Map([
	  [4, 'Gastronomia'],
	  [5, 'Entretenimiento'],
	  [6, 'Indumentaria'],
	  [7, 'Compras'],
	  [8, 'Servicios'],
	  [9, 'Transporte'],
	  [10, 'Alquiler'],
	  [11, 'Otros']
  ]);

	static getCategories(type: string) {
		if(type == 'Ingreso') {
			return this.categories_ingress;
		}
		else if(type == 'Egreso') {
			return this.categories_egress;
		}
		else {
			return new Map([...this.categories_ingress, ...this.categories_egress]);
		}
	}

	static getCategoryName(type: string, id: number) {
		if(type === 'Ingreso')
			return this.categories_ingress.get(id);
		else if('Egreso')
			return this.categories_egress.get(id);
		else
			return null;
	}

}