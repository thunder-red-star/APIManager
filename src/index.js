const Axios = require('axios');

const fs = require('fs');
const path = require('path');

const Endpoint = require('./structs/endpoint');
const Category = require('./structs/category');

module.exports = class {
    constructor (options = {}) {
        this.options = options;
        this.endpoints = {};
    }

    createEndpointCategory (category) {
        this.endpoints[category] = {};
    }

    addEndpoint (endpoint, category) {
        if (!this.endpoints[category]) {
            this.createEndpointCategory(category);
        }

        this.endpoints[category][endpoint] = {};
    }

    dumpToFile (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this, null, 4));
    }

    load (filePath) {
        let data = fs.readFileSync(filePath, { encoding: 'utf8' });
        let json = JSON.parse(data);
        this.endpoints = json.endpoints;
    }

    getCategory (category) {
        return this.endpoints[category];
    }
}