module.exports = class {
    constructor (name, endpoints = []) {
        if (typeof name !== 'string') throw new Error('Category name must be a string.');
        if (!Array.isArray(endpoints)) throw new Error('Category endpoints must be an array.');
        this.name = name;
        this.endpoints = endpoints;
    }

    toJSON () {
        return {
            name: this.name,
            endpoints: this.endpoints
        };
    }

    static fromJSON (json) {
        if (typeof json !== 'object') throw new Error('Category json must be an object.');
        if (typeof json.name !== 'string') throw new Error('Category name must be a string.');
        if (!Array.isArray(json.endpoints)) throw new Error('Category endpoints must be an array.');
        return new Category(json.name, json.endpoints);
    }

    addEndpoint (endpoint) {
        if (!(typeof endpoint == 'string' || typeof endpoint == 'object')) throw new Error('Endpoint must be a string or object.');
        this.endpoints.push(endpoint);
    }

    removeEndpoint (endpoint) {
        if (!(typeof endpoint == 'string' || typeof endpoint == 'object')) throw new Error('Endpoint must be a string or object.');
        this.endpoints.splice(this.endpoints.indexOf(endpoint), 1);
    }

    getRandomEndpoint () {
        return this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    }

    getEndpoint (index) {
        if (!(typeof index == 'number' || typeof index == 'string')) throw new Error('Index must be a number or string.');
        if (typeof index == 'number') return this.endpoints[index];
        if (typeof index == 'string') return this.endpoints.find(endpoint => endpoint.name == index);
    }
}