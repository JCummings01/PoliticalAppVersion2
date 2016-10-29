;(function () {
  var app = angular.module('PoliticalApp', ['ngRoute', 'ui.bootstrap', 'toastr', 'ui.router', 'ngDialog'])

  app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home')

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
            templateUrl: '/app/views/main.html'
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
        $rootScope.toState = toState
        $rootScope.toStateParams = toStateParams
      })
    }
  ])
})()
