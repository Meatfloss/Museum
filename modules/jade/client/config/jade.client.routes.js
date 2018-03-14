(function () {
  'use strict';

  angular
    .module('jade.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('jade', {
        abstract: true,
        url: '/jade',
        template: '<ui-view/>'
      })
      .state('jade.landing', {
        url: '/landing',
        templateUrl: 'modules/jade/client/views/landing-jade.client.view.html',
        controller: 'JadeLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Ancient Jade List'
        }
      })
      .state('jade.list', {
        url: '',
        templateUrl: 'modules/jade/client/views/list-jade.client.view.html',
        controller: 'JadeListController',
        controllerAs: 'vm',
        resolve: {
          jadeListResolve: getJadeList
        },
        data: {
          pageTitle: 'Jade List'
        }
      })
      .state('jade.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/jade/client/views/list-jade.client.view.html',
        controller: 'JadeListController',
        controllerAs: 'vm',
        resolve: {
          jadeListResolve: getJadeList
        },
        data: {
          pageTitle: 'Jade List'
        }
      })
      .state('jade.view', {
        url: '/:jadeId',
        templateUrl: 'modules/jade/client/views/view-jade.client.view.html',
        controller: 'JadeController',
        controllerAs: 'vm',
        resolve: {
          jadeResolve: getJade
        },
        data: {
          pageTitle: 'Painting {{ jadeResolve.title }}'
        }
      });
  }

  getJade.$inject = ['$stateParams', 'JadeService'];
  function getJade($stateParams, JadeService) {
    return JadeService.get({
      jadeId: $stateParams.jadeId
    }).$promise;
  }

  // getAllJade.$inject = ['$stateParams', 'JadeService'];
  // function getAllJade($stateParams, JadeService, JadeListService) {
  //   return JadeService.query().$promise;
  // }

  getJadeList.$inject = ['$stateParams', 'JadeListService'];
  function getJadeList($stateParams, JadeListService) {
    return JadeListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'JadeDynastyService'];
  function getDynasties($stateParams, JadeService) {
    return JadeService;
  }
}());
