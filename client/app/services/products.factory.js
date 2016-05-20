;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .factory('Products', Products)

  Products.$inject = ['$http', '$q', '$timeout']

  function Products ($http, $q, $timeout) {
    var factory = {}

    // factory.getRepInfo = function (req, res) {
    //   var defer = $q.defer()
    //   $http.get('/getRevUpdates/')
    //     .success(function (data, status, headers, config) {
    //       defer.resolve(data)
    //     })
    //     .error(function (data, status, headers, config) {
    //       console.log('Error getting user Rev Updates')
    //     })
    //   return defer.promise
    // }

    // politicalApp.factory('stateReps', function ($resource, $http, $q) {
    // var repList = {}
    var defer = $q.defer()
    // var data = $resource('/templates/state/:id', {id: '@_id'})
    // return ({
    //   getReps: getReps
    // })

    factory.getReps = function (stateId) {
      $http.get('/get_state_members/' + stateId)
        .success(function (data, status, headers, config) {
          defer.resolve(data)
          console.log(data)
        })
        .error(function (data, status, headers, config) {
          defer.reject(data)
        })
      return defer.promise
    }
    // })

    return factory
  }
}())
