import { ICreateSpecificationRepository } from '../ISpecificationRepository';
import { Specification } from '../../model/Specification';

class SpecificationRepository implements ICreateSpecificationRepository {
	private readonly specifications: Specification[]
	private static INSTANCE: SpecificationRepository

	constructor () {
		this.specifications = []
	}

	public static getInstance (): SpecificationRepository {
		if (!SpecificationRepository.INSTANCE) {
			SpecificationRepository.INSTANCE = new SpecificationRepository()
		}
		return SpecificationRepository.INSTANCE
	}

	create ({name, description}): void {
		const specification = new Specification()

		Object.assign(specification, {name, description, created_at: new Date()})

		this.specifications.push(specification)
	}

	findByName (name: string) {
		return this.specifications.find((specification) => specification.name === name)
	}

	list () {
		return this.specifications
	}
}

export { SpecificationRepository }