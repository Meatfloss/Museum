(function () {
  'use strict';

  angular
    .module('sculpture.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sculpture', {
        abstract: true,
        url: '/sculpture',
        template: '<ui-view/>'
      })
      .state('sculpture.landing', {
        url: '/landing',
        templateUrl: 'modules/sculpture/client/views/landing-sculpture.client.view.html',
        controller: 'SculptureLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Ancient Sculpture List'
        }
      })
      .state('sculpture.list', {
        url: '',
        templateUrl: 'modules/sculpture/client/views/list-sculpture.client.view.html',
        controller: 'SculptureListController',
        controllerAs: 'vm',
        resolve: {
          sculptureListResolve: getSculptureList
        },
        data: {
          pageTitle: 'Sculpture List'
        }
      })
      .state('sculpture.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/sculpture/client/views/list-sculpture.client.view.html',
        controller: 'SculptureListController',
        controllerAs: 'vm',
        resolve: {
          sculptureListResolve: getSculptureList
        },
        data: {
          pageTitle: 'Sculpture List'
        }
      })
      .state('sculpture.view', {
        url: '/:sculptureId',
        templateUrl: 'modules/sculpture/client/views/view-sculpture.client.view.html',
        controller: 'SculptureController',
        controllerAs: 'vm',
        resolve: {
          sculptureResolve: getSculpture
        },
        data: {
          pageTitle: 'Painting {{ sculptureResolve.title }}'
        }
      });
  }

  getSculpture.$inject = ['$stateParams', 'SculptureService'];
  function getSculpture($stateParams, SculptureService) {
    return SculptureService.get({
      sculptureId: $stateParams.sculptureId
    }).$promise;
  }

  // getAllSculpture.$inject = ['$stateParams', 'SculptureService'];
  // function getAllSculpture($stateParams, SculptureService, SculptureListService) {
  //   return SculptureService.query().$promise;
  // }

  getSculptureList.$inject = ['$stateParams', 'SculptureListService'];
  function getSculptureList($stateParams, SculptureListService) {
    return SculptureListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'SculptureDynastyService'];
  function getDynasties($stateParams, SculptureService) {
    return SculptureService;
  }
}());
