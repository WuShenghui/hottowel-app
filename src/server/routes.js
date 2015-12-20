var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/peopleList/:pageIndex/:pageSize/:filter', getPeopleList);
router.get('/*', four0four.notFoundMiddleware);
router.post('/people/:personInfo', addPerson);

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

function getPeopleList(req, res, next) {
    var pageIndex = req.params.pageIndex;
    var pageSize = req.params.pageSize;
    var start = pageIndex > 1 ? (pageIndex - 1) * pageSize : pageIndex - 1;
    var end = Number(start) + Number(pageSize);
    var filter = JSON.parse(req.params.filter);
    var isFilter = filter.name.trim().length > 0 ||
                    filter.location.trim().length > 0;
    var source = isFilter ?
                    getPeopleSource(filter.name, filter.location).sort(sortDesc) :
                    data.people.sort(sortDesc);
    var list = start > source.length ?
                source.slice(0, pageSize) :
                source.slice(start, end);
    var result = {
        data: list,
        total: source.length
    };
    res.status(200).send(result);
}

function addPerson(req, res, next) {
    var person = JSON.parse(req.params.personInfo);
    person.id = data.people.length + 1;
    data.people.push(person);
    res.status(200).send();
}

function getPeopleSource(name, location) {
    var temp = [];
    var result = [];
    if (name) {
        for (var i = 0; i < data.people.length; i++) {
            if (data.people[i].firstName.indexOf(name) > -1 ||
                data.people[i].lastName.indexOf(name) > -1) {
                temp.push(data.people[i]);
            }
        }
    }
    if (location) {
        for (var j = 0; j < temp.length; j++) {
            if (temp[j].location.indexOf(location) > -1) {
                result.push(temp[j]);
            }
        }
    }
    else {
        result = temp;
    }
    return result;
}

function sortDesc(a, b) {
    return b.id - a.id;
}
