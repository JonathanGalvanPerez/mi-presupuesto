import { v4 as uuidv4 } from 'uuid';

export class Movement {

	constructor(public mount: number, public type: string, public concept: string, public date: string, public user_email: string, public id = uuidv4()) {}

	setMount(newMount: number) {
		this.mount = newMount;
	}
	setConcept(newConcept: string) {
		this.concept = newConcept;
	}
	setDate(newDate: string) {
		this.date = newDate;
	}
}