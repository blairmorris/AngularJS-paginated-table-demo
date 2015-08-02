'use strict';

angular.module('uaAssessmentVanilla')
.filter('name', function(){
        return function(list, input){
            var results = [];
            var re = new RegExp(input, "i");
            if(input && input.length){
                angular.forEach(list, function(contact){
                    var fullName = contact.first_name + ' ' + contact.last_name;
                    if(fullName.search(re) >= 0){
                        results.push(contact);
                    }
                });
            } else {
                results = list;
            }
            return results;
        }
    });