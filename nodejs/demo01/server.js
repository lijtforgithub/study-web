const http = require('http');
const url = require('url');

function start(route, handle) {
  http.createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    console.log(`Request for ${pathname} received.`); // 当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。那是因为大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico

    let postData = '';
    request.setEncoding('utf8');
    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log(`Received POST data chunk ${postDataChunk}.`);
    });
    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
    
    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write('Hello World');
    // response.end();
  }).listen(8888);

  console.log('Server has started.');
}

exports.start = start;