;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .factory('Money', Money)

  Money.$inject = ['$http', '$q', '$timeout']

  function Money ($http, $q, $timeout) {
    var factory = {}

    // politicalApp.factory('osMoney', function ($resource, $http, $q) {
    var defer = $q.defer()
    // return ({
    // getMoney: getMoney
    // })

    factory.getMoney = function (candidateId) {
      $http.get('/get_member_money/' + candidateId)
        .success(function (data, status, headers, config) {
          defer.resolve(data)
        // console.log(data)
        })
        .error(function (data, status, headers, config) {
          console.log('error from moneygrab on mainJS!')
        })
      return defer.promise
    }
    return factory
  }
})()
