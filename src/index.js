const Axios = require('axios');

const fs = require('fs');
const path = require('path');

const Endpoint = require('./structs/Endpoint');
const Category = require('./structs/Category');

module.exports = class {
    constructor (options = {}) {
        this.options = options;
        this.endpoints = {};
    }

    createEndpointCategory (categoryName) {
        if (!categoryName) {
            throw new Error('Category name is required');
        }
        else {
            if (this.endpoints[categoryName]) {
                throw new Error(`Category ${categoryName} already exists`);
            }
            else {
                this.endpoints[categoryName] = new Category(categoryName);
            }
        }
        return this.endpoints[categoryName];
    }

    addEndpoint (endpoint, categoryName) {
        if (!endpoint) {
            throw new Error('Endpoint is required');
        }
        else {
            if (!(endpoint instanceof Endpoint)) {
                throw new Error('Endpoint must be an instance of Endpoint');
            }
            else {
                if (!categoryName) {
                    throw new Error('Category name is required');
                }
                else {
                    if (!this.endpoints[categoryName]) {
                        throw new Error(`Category ${categoryName} does not exist`);
                    }
                    else {
                        this.endpoints[categoryName].addEndpoint(endpoint);
                    }
                }
            }
        }
    }

    dump (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this, null, 4));
    }

    load (filePath) {
        let data = fs.readFileSync(filePath, { encoding: 'utf8' });
        let json = JSON.parse(data);
        // Use inbuilt static fromJSON methods on categories and endpoints
        let endpoints = json.endpoints;
        for (let categoryName in endpoints) {
            let category = endpoints[categoryName];
            let categoryInstance = this.createEndpointCategory(categoryName);
            for (let endpointName in category) {
                let endpoint = category[endpointName];
                let endpointInstance = Endpoint.fromJSON(endpoint);
                categoryInstance.addEndpoint(endpointInstance);
            }
        }
    }

    getCategory (categoryName) {
        return this.endpoints[categoryName];
    }
}

module.exports.Endpoint = Endpoint;
module.exports.Category = Category;