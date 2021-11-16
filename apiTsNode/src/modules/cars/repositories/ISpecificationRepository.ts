import { Specification } from '../model/Specification';

interface ICreateSpecificationDTO {
	name: string
	description: string
}

interface ICreateSpecificationRepository {
	findByName (name: string): Specification
	list (): Specification[]
	create ({name, description}: ICreateSpecificationDTO): void
}

export { ICreateSpecificationDTO, ICreateSpecificationRepository }