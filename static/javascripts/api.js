 

angular.module('idrettsanlegg.services')
 // Interface with the REST API, inject Construction and use
    // .query, .get, .delete etc.
    .factory('Construction', function ($resource, apiUrl) {
        return $resource(apiUrl + 'Idrettsanlegg/:id',
            {id: '@id', format: 'json', limit: "20"}, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET'
            }
        });
    })
    .factory('County', function ($resource, apiUrl) {
        return $resource(apiUrl + 'Kommune/:id',
            {id: '@id', format: 'json', limit: "20"}, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET'
            }
        });
    })
    .factory('Municipality', function ($resource, apiUrl) {
        return $resource(apiUrl + 'Kommune/:id',
            {id: '@id', format: 'json', limit: "1000"}, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET'
            }
        });
    });
