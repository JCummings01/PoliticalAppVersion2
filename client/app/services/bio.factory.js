;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .factory('bio', bio)

  bio.$inject = ['$http', '$q', '$timeout']

  function bio ($http, $q, $timeout) {
    var factory = {}

    // politicalApp.factory('osBio', function ($resource, $http, $q) {
    // var candBio = {}

    factory.getReps = function (stateId) {
      var defer = $q.defer()
      $http.get('/get_state_members/' + stateId)
         .success(function (data, status, headers, config) {
           console.log(data)
           defer.resolve(data)
         })
         .error(function (data, status, headers, config) {
           console.log('error from biograbber on mainJS!')
         })
      return defer.promise
    }
    // var data = $resource('#/member/:candidateId', {id: '@_id'})
    // return ({
    // getBio: getBio
    // })

    // factory.getBio = function (candidateId) {
    //   $http.get('/get_member_bio/' + candidateId)
        // .success(function (data, status, headers, config) {
        //   defer.resolve(data)
        // console.log(data)
        // })
        // .error(function (data, status, headers, config) {
        //   console.log('error from biograbber on mainJS!')
        // })
    //   return defer.promise
    // }
    return factory
  }
})()
