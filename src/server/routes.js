var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/peopleList/:pageIndex/:pageSize', peopleList);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people.slice(0, 5));
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function peopleList(req, res, next) {
    var pageIndex = req.params.pageIndex;
    var pageSize = req.params.pageSize;
    if (pageIndex * pageSize > data.people.length) {
        getPeople();
    }
    var startIndex = pageIndex === 1 ? 0 : pageIndex * pageSize;
    res.status(200).send(data.people.slice(startIndex, pageSize));
}
