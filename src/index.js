const Axios = require('axios');

const fs = require('fs');
const path = require('path');

const Endpoint = require('./structs/Endpoint');
const Category = require('./structs/Category');

module.exports = class {
    /**
     * @param options
     */
    constructor (options = {}) {
        this.options = options;
        this.endpoints = {};
    }

    /**
     * @param {string} categoryName
     * @returns {*}
     * @description Creates a new endpoint category
     */
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

    /**
     * @param {string} endpoint
     * @param {string} categoryName
     * @description Creates a new endpoint in a category.
     */
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

    /**
     * @description Dumps the entire manager to a file, to be loaded in future sessions.
     * @param {string} filePath
     */
    dump (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this, null, 4));
    }

    /**
     * @param {string} filePath
     * @description Loads the manager from a file.
     */
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

    /**
     * @param {string} filePath
     * @description Static function that Loads the manager from a file.
     */
    static load (filePath) {
        let manager = new this();
        manager.load(filePath);
        return manager;
    }

    /**
     * @description Get a category by name.
     * @param {string} categoryName
     * @returns {Category}
     */
    getCategory (categoryName) {
        return this.endpoints[categoryName];
    }

    /**
     * @description Get a random endpoint from a named category.
     * @param {string} categoryName
     * @returns {Endpoint}
     */
    getRandomEndpoint(categoryName) {
        let category = this.getCategory(categoryName);
        if (category) {
            return category.getRandomEndpoint();
        }
        else {
            throw new Error(`Category ${categoryName} does not exist`);
        }
    }
}

module.exports.Endpoint = Endpoint;
module.exports.Category = Category;