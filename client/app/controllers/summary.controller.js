;(function () {
  'use strict'

  angular.module('PoliticalApp')
    .controller('Summary', Summary)

  Summary.$inject = ['$state', '$timeout', 'Products', 'Votes', 'Money', 'Bio', 'ngDialog', '$modal', 'nvd3']

  function Summary ($state, $timeout, Products, Votes, Money, Bio, ngDialog, $modal, nvd3) {
    var vm = this

    vm.bio = {}
    vm.bills = {}
    vm.moneys = {}
    vm.bioguide = {}
    vm.chartdata = chartData
    vm.candidateId = $routeParams.candidateId
    var candidateId = $routeParams.candidateId
    var chartData = []

    vm.getBios = function () {
      Bio.getBio(candidateId)
        .then(function (results) {
          $scope.bio = results
          $scope.bioguide = results.uniqueId
          getVotingRecord(results.uniqueId)
        // console.log(results.uniqueId)
        // console.log(results)
        })
    }
    vm.getBios()

    vm.getContributions = function () {
      Money.getMoney(candidateId)
        .then(function (results) {
          vm.moneys = results
          makeChartData(results)
        // console.log(results)
        })
    }
    vm.getContributions()

    vm.makeChartData = function (results) {
      for (var i = 0; i < results.length; i++) {
        chartData.push({
          key: results[i].industry_name,
          y: parseInt(results[i].total)
        })
      }
    // console.log(chartData)
    }

    vm.getVotingRecord = function (uniqueId) {
      Votes.getVotes(uniqueId)
        .then(function (results) {
          $scope.bills = results
        })
    }

    vm.options = {
      chart: {
        type: 'pieChart',
        height: 550,
        donut: true,
        x: function (d) {return d.key;},
        y: function (d) {return d.y;},
        showLabels: false,

        pie: {
          startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
          endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
        },
        transitionDuration: 500,
        legend: {
          margin: {
            top: 5,
            right: 70,
            bottom: 5,
            left: 0
          }
        }
      }
    }

    vm.data = chartData

  }
})()
