;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .factory('Votes', Votes)

  Votes.$inject = ['$http', '$q', '$timeout']

  function Votes ($http, $q, $timeout) {
    var factory = {}
    var defer = $q.defer()

    factory.getVotes = function (uniqueId) {
      $http.get('/get_member_votes/' + uniqueId)
        .success(function (data, status, headers, config) {
          defer.resolve(data)
          console.log(data)
        })
        .error(function (data, status, headers, config) {
          console.log('error from votegrab on mainJS!')
        })
      return defer.promise
    }
    return factory
  }
}())
