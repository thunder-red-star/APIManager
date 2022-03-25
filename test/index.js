const APIManager = require('../src/index');

let apiManager = new APIManager();

apiManager.createEndpointCategory('category1', 'Category 1');

apiManager.getCategory('category1').addEndpoint('https://google.com', 'My First Endpoint');
apiManager.getCategory('category1').addEndpoint('https://bing.com', 'My Second Endpoint');
apiManager.getCategory('category1').addEndpoint('https://yahoo.com', 'My Third Endpoint');
apiManager.getCategory('category1').addEndpoint('https://duckduckgo.com', 'My Fourth Endpoint');
apiManager.getCategory('category1').addEndpoint('https://facebook.com', 'My Fifth Endpoint');

let res = apiManager.getCategory('category1').getRandomEndpoint().get();

console.log(res);

apiManager.dump("data/dump.json");