;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .controller('Main', Main)

  Main.$inject = ['$timeout', '$state', 'Products', 'Votes', 'Money', 'ngDialog', '$modal']

  function Main ($timeout, $state, Products, Votes, Money, ngDialog, $modal) {
    var vm = this

  }

})()
