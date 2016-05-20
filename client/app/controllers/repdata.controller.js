;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .controller('RepData', RepData)

  RepData.$inject = ['$state', '$timeout', 'Products', 'Votes', 'Money', 'Bio', 'ngDialog', '$modal', 'nvd3']

  function RepData ($state, $timeout, Products, Votes, Money, Bio, ngDialog, $modal, nvd3) {
    var vm = this
    // var politicalApp = angular.module('politicalApp', ['ngResource', 'ngRoute', ])
    // politicalApp.controller('stateRepController', function ($scope, stateReps, $routeParams) {

    var stateId = $routeParams.id
    var lowercaseStateName = stateId.toLowerCase()
    $scope.reps = {}
    $scope.state = $routeParams.id
    $scope.lowercase = lowercaseStateName
    $scope.message
    console.log($scope.lowercase)

    vm.getRepresentatives = function () {
      stateReps.getReps(stateId)
        .then(function (results) {
          // console.log(results)
          $scope.reps = results
        })
        .catch(function (results) {
          $scope.message = 'Daily API Call Limit has been exceeded.'
        })
    }
    vm.getRepresentatives()

  }
})()
