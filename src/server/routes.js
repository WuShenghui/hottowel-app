var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/peopleList', getPeople);
router.get('/people', getPeopleList);
router.get('/people/:id', getPerson);
router.post('/people', addPerson);
router.put('/people', updatePerson);
router.delete('/people/:id', deletePerson);
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

function getPeopleList(req, res, next) {
    console.warn('getPeopleList...');
    var params = JSON.parse(req.query.filters);
    var pageIndex = params.pageIndex;
    var pageSize = params.pageSize;
    var start = pageIndex > 1 ? (pageIndex - 1) * pageSize : pageIndex - 1;
    var end = Number(start) + Number(pageSize);
    var filter = params.filter;
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
    console.warn('addPerson..');
    var person = req.body;
    person.id = data.people.length + 1;
    data.people.push(person);
    res.status(200).send();
}

function deletePerson(req, res, next) {
    console.warn('deletePerson..');
    var id = +req.params.id;
    var i = index(id);
    if (i !== -1) {
        data.people.splice(i, 1);
        res.status(200).send();
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function updatePerson(req, res, next) {
    console.warn('updatePerson..');
    var person = req.body;
    var id = person.id;
    var i = index(id);
    if (i !== -1) {
        data.people.splice(i, 1, person);
        res.status(200).send();
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function index(id) {
    for (var i = data.people.length - 1; i >= 0; i -= 1) {
        if (data.people[i].id === id) {
            return i;
        }
    }

    return -1;
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
