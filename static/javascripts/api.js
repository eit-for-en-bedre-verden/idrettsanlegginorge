var REST_SETTINGS = {
    update: {
        method: 'PUT'
    },
    query: {
        method: 'GET'
    }
}

angular.module('idrettsanlegg.services')
 // Interface with the REST API, inject Construction and use
    // .query, .get, .delete etc.
    .factory('Construction', function ($resource, apiUrl) {
        return $resource(apiUrl + 'Idrettsanlegg/:id',
            {id: '@id', format: 'json', limit: "18"}, REST_SETTINGS);
    })
    .factory('County', function ($resource, apiUrl) {
        return $resource(apiUrl + 'Kommune/:id',
            {id: '@id', format: 'json', limit: "20"}, REST_SETTINGS);
    })
    .factory('Municipality', function ($resource, apiUrl) {
        return $resource(apiUrl + 'Kommune/:id',
            {id: '@id', format: 'json', limit: "1000"}, REST_SETTINGS);
    })
    .factory('ConstructionType', function($resource, apiUrl) {
        return $resource(apiUrl + 'Anleggstype:id',
            {id: '@id', format: 'json', limit: "1000"}, REST_SETTINGS);
    });
