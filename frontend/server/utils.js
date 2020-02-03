const unauthorized = (response) => {
    response.writeHead(401, 'Access denied', {'Content-Type': 'text/plain'})
    response.end('Invalid credentials');
    setTimeout(() => response.status(401), 500);
}
  
module.exports = {unauthorized}
  