import { v4 as uuidv4 } from 'uuid';

export class Movement {

	constructor(public mount: number, public type: string, public category: number, public concept: string, public date: Date, public user_email: string, public id = uuidv4()) {}

	setMount(newMount: number) {
		this.mount = newMount;
	}
	setCategory(newCategory: number) {
		this.category = newCategory;
	}
	setConcept(newConcept: string) {
		this.concept = newConcept;
	}
	setDate(newDate: Date) {
		this.date = newDate;
	}
}