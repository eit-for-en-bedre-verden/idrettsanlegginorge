

angular.module('idrettsanlegg.controllers')
    .controller('HomeController', function($scope, Construction) {
        Construction.query(function (data) {
            //$scope.constructions = data.objects etc.
            //console.log(data);
        });

        $scope.viewState = 'Kart';

        $scope.constructions = ['1', '2', '3'];
        $scope.construction = {
            types : [
                "RallyCross-Bane",
                "Svømmehall",
                "Pingpong-bord",
                "Racingcircuit"
            ],
            selected : undefined,
        };
        $scope.counties = {
            county : [
                { name: "Østfold", municipalities : ["12", "23", "34"], selected : undefined },
                { name: "Akershus", municipalities : [], selected : undefined },
                { name: "Insigne", municipalities : [], selected : undefined },
                { name: "Hedmark", municipalities : [], selected : undefined },
                { name: "Oppland", municipalities : [], selected : undefined },
                { name: "Buskerud", municipalities : [], selected : undefined },
                { name: "Vestfold", municipalities : [], selected : undefined },
                { name: "Telemark", municipalities : [], selected : undefined },
                { name: "Aust-Agder", municipalities : [], selected : undefined },
                { name: "Vest-Agder", municipalities : [], selected : undefined },
                { name: "Rogaland", municipalities : [], selected : undefined },
                { name: "Hordaland", municipalities : [], selected : undefined },
                { name: "Sogn", municipalities : [], selected : undefined },
                { name: "Møre", municipalities : [], selected : undefined },
                { name: "Sør-Trøndelag", municipalities : [], selected : undefined },
                { name: "Nord-Trøndelag", municipalities : [], selected : undefined },
                { name: "Nordland", municipalities : [], selected : undefined },
                { name: "Troms", municipalities : [], selected : undefined },
                { name: "Finnmark", municipalities : [], selected : undefined },
            ],
            selected : undefined
        };

        // Datepickers
        $scope.callers = [];
        $scope.fromDate = undefined;//new Date(0);
        $scope.toDate = undefined;//new Date();

        $scope.dateOpts = {
            datepickerMode: "year",
            minMode: "year",
            showWeeks: "false"
        };

        $scope.openDate = function ($event, caller) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.callers['from'] = false;
            $scope.callers['to'] = false;

            $scope.callers[caller] = true;
        };

        // Tooltips
        $scope.tooltip = {
            placement: 'right-top'
        };

        // Funds
        $scope.funds = {
            lower : null,
            upper : null
        };

        // Area
        $scope.area = {
            lower : null,
            upper : null
        };
    
    });
