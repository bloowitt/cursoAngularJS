var server = require('express')(),
    faker = require('faker'),
    moment = require('moment'),
    cors = require('cors'),
    uuid = require('node-uuid');

var port = 8001;

var comics = [];
while (comics.length < 50) {
  comics.push({
    uuid: uuid.v4(),
    title: faker.company.companyName()
  });
}

server.use(cors());

server.get('/v1/comics', function (req, res, next) {
  var count = parseInt(req.query.count, 10) || 10,
      page = parseInt(req.query.page, 10) || 0,
      from = page * count,
      to = (page + 1) * count;
    console.log(count, page, from, to);
  var items = comics.slice(from, to);
  res.json({
    total: comics.length,
    items: items
  });
});

server.listen(port);

console.log('Comics Fake Server running at http://localhost:%d', port);