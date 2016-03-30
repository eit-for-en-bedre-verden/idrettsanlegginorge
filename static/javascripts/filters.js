

angular.module('idrettsanlegg.controllers')
    .filter('municipality', function () {
        return function(municipalities, county) {
            if (!county) return municipalities;
            return municipalities.filter(function(m) {
                if (m.fylke.name === county) {
                    return m;
                }
            });

        }
    });
