'use strict';

angular.module('uaAssessmentVanilla')
    .controller('MainCtrl', function($scope, $http) {

        //I would have used ng-resource, but I felt like it was adding an extra module without much benefit.
        $http.get('data/sample-data.json')
            .success(function(data){
                $scope.sampleData = data;
                $scope.totalItems = data.length;
                $scope.totalContacts = $scope.sampleData.length;
                $scope.pages = Math.ceil(data.length / ($scope.rowLimit || 10));
            });

        //Load an array of short:long state names for a more user-friendly list of state names.
        $http.get('data/states.json')
            .success(function(data){
                $scope.states = data;
            });

        //This determines the keys that will be shown in the table.
        $scope.keys = [
            'last_name',
            'first_name',
            'email'
        ];

        $scope.currentPage = 1;
        $scope.rowLimit = 10;
        $scope.byState = '';
        $scope.sortBy = {
            key:'',
            descending:false
        };

        // Set current page, with safety of checking to make sure that page exists.
        $scope.setCurrentPage = function(value){
            if(value <= $scope.pages){
                $scope.currentPage = value;
            }
        };

        //Utility function. Ng-repeat can't take just an integer.
        $scope.getAry = function(num){
            if(num){
                return new Array(num);
            }
            return [];
        };

        //Toggle sorting
        $scope.toggleSort = function(key){
            $scope.sortBy = {
                key: key,
                descending: !$scope.sortBy.descending
            };
        };

        //Reset filters to initial values.
        $scope.clearFilters = function(){
            $scope.rowLimit = 10;
            $scope.byState = '';
            $scope.sortBy.key = '';
            $scope.sortBy.descending = false;
        };

        /*
            Calculate both the current number of pages from the previous filters, plus where to begin the current index
            calculated against the values of currentPage, rowLimit and the length of the resulting array.
         */
        $scope.paginate = function(value, curIndex, totalResults) {
            var begin, end, index;
            $scope.pages = Math.ceil(totalResults.length / $scope.rowLimit);
            begin = ($scope.currentPage - 1) * $scope.rowLimit;
            end = begin + $scope.rowLimit;
            index = totalResults.indexOf(value);
            return (begin <= index && index < end);
        };

        //Whenever one of the search values change, move to page one.
        $scope.$watchGroup(['byState','byName','rowLimit'], function(newVals, oldVals, scope){
            scope.currentPage = 1;
        });

        $scope.userSelected = function(user){
            $scope.currentPerson = user;
        }
    });