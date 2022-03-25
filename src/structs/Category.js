const Endpoint = require('./Endpoint');

module.exports = class {
    /**
     * @param {string} name
     * @param name
     * @param endpoints
     */
    constructor (name, endpoints = []) {
        if (typeof name !== 'string') throw new Error('Category name must be a string.');
        if (!Array.isArray(endpoints)) throw new Error('Category endpoints must be an array.');
        this.name = name;
        this.endpoints = endpoints;
    }

    /**
     * @param {string} name
     * @returns {{endpoints: *[], name}}
     * @description Returns the JSON representation of the category.
     */
    toJSON () {
        return {
            name: this.name,
            endpoints: this.endpoints
        };
    }

    /**
     * @param {string} json
     * @returns {Category}
     * @description Returns a category from a JSON string.
     */
    static fromJSON (json) {
        if (typeof json !== 'object') throw new Error('Category json must be an object.');
        if (typeof json.name !== 'string') throw new Error('Category name must be a string.');
        if (!Array.isArray(json.endpoints)) throw new Error('Category endpoints must be an array.');
        return new Category(json.name, json.endpoints);
    }

    /**
     * @param {Endpoint} endpoint
     * @returns {boolean}
     * @description Adds an endpoint to the category.
     */
    addEndpoint (endpoint) {
        if (!(endpoint instanceof Endpoint)) throw new Error('Endpoint must be an instance of Endpoint.');
        this.endpoints.push(endpoint);
        return true;
    }

    /**
     * @param {string} endpoint
     * @returns {boolean}
     * @description Removes an endpoint from the category.
     */
    removeEndpoint (endpoint) {
        if (!(typeof endpoint === 'string' || typeof endpoint === 'object')) throw new Error('Endpoint must be a string or object.');
        this.endpoints.splice(this.endpoints.indexOf(endpoint), 1);
        return true;
    }

    /**
     * @returns {Endpoint}
     * @description Returns a random endpoint from the category.
     */
    getRandomEndpoint () {
        return this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    }

    /**
     * @param {string, number} index
     * @returns {Endpoint}
     * @description Returns a specific endpoint from the category.
     */
    getEndpoint (index) {
        if (!(typeof index == 'number' || typeof index == 'string')) throw new Error('Index must be a number or string.');
        if (typeof index == 'number') return this.endpoints[index];
        else return this.endpoints.find(endpoint => endpoint.name === index);
    }
}