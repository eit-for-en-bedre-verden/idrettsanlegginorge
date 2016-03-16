 

angular.module('idrettsanlegg.services')
 // Interface with the REST API, inject Construction and use
    // .query, .get, .delete etc.
    .factory('Construction', function ($resource) {
        return $resource('http://127.0.0.1:8000/api/v1/Idrettsanlegg/:id',
            {id: '@id', format: 'json', limit: "20"}, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET'
            }
        });
    });
