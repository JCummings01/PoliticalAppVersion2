;(function () {
  var app = angular.module('PoliticalApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'toastr', 'ui.router', 'ngDialog'])

  app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/map')

    $stateProvider
      .state('/home', {
        url: '/home',
        views: {
          'content@': {
            templateUrl: '/app/views/my-account.html'
          }
        }
      })
      .state('/map', {
        url: '/map',
        views: {
          'content@': {
            templateUrl: '/app/views/map.html'
          }
        }
      })
      .state('state', {
        url: '/state',
        views: {
          'content@': {
            templateUrl: '/app/views/state.html'
          }
        }
      })
      .state('rep', {
        url: '/rep',
        views: {
          'content@': {
            templateUrl: '/app/views/staterep.html'
          }
        }
      })
      .state('member', {
        url: '/member',
        views: {
          'content@': {
            templateUrl: '/app/views/member.html'
          }
        }
      })
  })
  app.run(['$rootScope', '$state', '$stateParams', 'Products', 'Votes', 'Money', 'bio',
    function ($rootScope, $state, $stateParams, Products, Votes, Money, bio) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        // track the state the user wants to go to; authorization service needs this
        $rootScope.toState = toState
        $rootScope.toStateParams = toStateParams
      })
    }
  ])
})()
