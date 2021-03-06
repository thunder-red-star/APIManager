const APIManager = require('../src/index');

let apiManager = new APIManager();

apiManager.createEndpointCategory('category1', 'Category 1');

let newEndpoint = new APIManager.Endpoint('https://api.kanye.rest', 'Kanye', '0', '5');
apiManager.getCategory('category1').addEndpoint(newEndpoint);

let secondEndpoint = new APIManager.Endpoint('https://www.google.com', 'Google', '0', '5');
apiManager.getCategory('category1').addEndpoint(secondEndpoint);

(async () => {
    let res = await apiManager.getCategory('category1').getRandomEndpoint().get();
    await apiManager.getCategory('category1').getRandomEndpoint().get();
    await apiManager.getCategory('category1').getRandomEndpoint().get();
    await apiManager.getCategory('category1').getRandomEndpoint().get();
    await apiManager.getCategory('category1').getRandomEndpoint().get();
})();

apiManager.dump("dump.json");

console.log("Dumped! Check dump.json");