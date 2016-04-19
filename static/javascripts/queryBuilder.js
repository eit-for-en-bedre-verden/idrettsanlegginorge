

angular.module('idrettsanlegg.services')
    .factory('QueryBuilder', function(queryMapping) {
        return function(formData, isMap) {
            var query = {};
            var model = angular.copy(formData); // to not pollute formData...
            for (var key in model) {
                if (model.hasOwnProperty(key)) {
                    if (model[key]) {
                        // Query excepts 'yyyy', but gets full date...
                        if (key === 'constructionYearFrom'
                            || key === 'constructionYearTo') {
                            model[key] = model[key].getFullYear();
                        }
                        var name = queryMapping[key];
                        if (isMap) {
                            name = 'ianlegg__' + name;
                        }
                        query[name] = model[key];
                    }
                }
            }
            return query;
        }
    });
