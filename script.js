/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name: 'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random() * 1000));
}

/**
 * Ваши изменения ниже
 */

var responses = {}, 
    territory;

window.onload = function(){

    var requests = ['/countries', '/cities', '/populations'], 
        count;

    territory = prompt("Введите название территории:");

    if (territory == null || territory == ''){
        alert('Название территории не должно быть пустым.');
    } else {
        for (count = 0; count < 3; count++){
            getData(requests[count], doRequest(requests[count]));
        }
    }
};

function doRequest(request) {

    return function (error, result) {

        var l = [], 
            country = [], 
            city = [], 
            population = null,
            i, 
            j;

        responses[request] = result;
        
        for (K in responses) {
            l.push(K);
        }

        if (l.length == 3) {

            for (i = 0; i < responses['/countries'].length; i++) {
                if (responses['/countries'][i].continent === territory) {
                    country.push(responses['/countries'][i].name);
                }
            }

            if (country.length == 0) {
                country.push(territory);
            }

            for (i = 0; i < responses['/cities'].length; i++) {
                for (j = 0; j < country.length; j++) {
                    if (responses['/cities'][i].country === country[j]) {
                        city.push(responses['/cities'][i].name);
                    }
                }
            }

            if (city.length == 0) {
                city.push(territory);
            }

            for (i = 0; i < responses['/populations'].length; i++) {
                for (j = 0; j < city.length; j++) {
                    if (responses['/populations'][i].name === city[j]) {
                        population += responses['/populations'][i].count;
                    }
                }
            }

            if (population != null) {
                alert('Население ' + territory + ': ' + population);
            } else {
                alert('Нет информации по ' + territory + '.');
            }
        }
    };
}