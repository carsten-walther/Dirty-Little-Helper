import { get, set } from './Storage'

class ValidatorServiceController {

    validators = [
        {
            id: 1,
            name: 'CSS',
            description: 'W3C CSS Validation Service',
            url: 'http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri=',
        }, {
            id: 2,
            name: 'HTML',
            description: 'W3C Markup Validation Service',
            url: 'http://validator.w3.org/check?verbose=1&uri=',
        }, {
            id: 3,
            name: 'Feed',
            description: 'W3C Feed Validation Service',
            url: 'http://validator.w3.org/feed/check.cgi?url=',
        }, {
            id: 4,
            name: 'Link Checker',
            description: 'W3C Validation Service',
            url: 'http://validator.w3.org/checklink?check=Check&hide_type=all&summary=on&uri=',
        }, {
            id: 5,
            name: 'Validate Accessibility',
            description: 'WAVE Web Accessibility Evaluation Tool',
            url: 'http://wave.webaim.org/report#/',
        }, {
            id: 6,
            name: 'Validate Structured Data',
            description: 'Rich result status reports',
            url: 'https://search.google.com/test/rich-results?url=',
        }]

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

    async get (id) {
        return this.validators.find(validator => validator.id === id)
    }

    async create (validator) {
        let id = Math.max(...this.validators.map(validator => parseInt(validator.id)), 0) + 1
        this.validators.push({
            id: id.toString(),
            name: validator.name,
            url: validator.url,
        })
        await this.save()
    }

    async update (id, validator) {
        let index = this.validators.indexOf(this.get(id))
        this.validators[index] = validator
        await this.save()
    }

    async delete (validator) {
        let index = this.validators.indexOf(validator)
        if (index > -1) {
            this.validators.splice(index, 1)
            await this.save()
        }
    }
}

export const ValidatorService = new ValidatorServiceController()
