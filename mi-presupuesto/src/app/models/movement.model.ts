export class Movement {

	constructor(public mount: number, public concept: string, public date: string, public type: string) {}

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