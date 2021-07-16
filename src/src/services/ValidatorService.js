import { get, set } from './Storage'

class ValidatorServiceController {

    validators = []
    storageKey = 'validators'

    async load () {
        if (this.validators.length > 0) {
            return this.validators
        } else {
            this.validators = (await get(this.storageKey)) || []
            return this.validators
        }
    }

    async save () {
        return await set(this.storageKey, this.validators)
    }

    get (id) {
        return this.validators.find(validator => validator.id === id)
    }

    create (validator) {
        let id = Math.max(...this.validators.map(validator => parseInt(validator.id)), 0) + 1
        this.validators.push({
            id: id.toString(),
            name: validator.name,
            url: validator.url,
        })
        this.save()
    }

    update (id, validator) {
        let index = this.validators.indexOf(this.get(id))
        this.validators[index] = validator
        this.save()
    }

    delete (validator) {
        let index = this.validators.indexOf(validator)
        if (index > -1) {
            this.validators.splice(index, 1)
            this.save()
        }
    }
}

export const ValidatorService = new ValidatorServiceController()
