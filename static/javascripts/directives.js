

angular.module('idrettsanlegg.directives')
     // Formatter for monetary units with thousands separator
    .directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link : function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            // input
            ctrl.$formatters.unshift(function () {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            // output
            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);
