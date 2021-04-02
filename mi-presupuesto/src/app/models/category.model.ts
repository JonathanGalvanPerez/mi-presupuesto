export class Category {
	static categories_ingress = new Map([
		[1, 'salario'],
		[2, 'transferencia'],
		[3, 'otros']
	]);
	static categories_egress = new Map([
	  [4, 'gastronomia'],
	  [5, 'entretenimiento'],
	  [6, 'indumentaria'],
	  [7, 'compras'],
	  [8, 'servicios'],
	  [9, 'transporte'],
	  [10, 'alquiler'],
	  [11, 'otros']
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