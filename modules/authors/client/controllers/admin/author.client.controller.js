(function () {
  'use strict';

  angular
    .module('authors.admin')
    .controller('AuthorsController', AuthorsController);

  AuthorsController.$inject = ['$scope', '$state', '$window', 'authorResolve', 'Authentication'];

  function AuthorsController($scope, $state, $window, author, Authentication) {
    var vm = this;

    vm.author = author;
    vm.authentication = Authentication;
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Five Dynasties', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.minvalue = 1;
    vm.maxvalue = 10;

    // Remove existing Author
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.author.$remove($state.go('admin.authors.list'));
      }
    }

    // Save Author
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.authorForm');
        return false;
      }

      // Create a new auhtor, or update the current instance
      vm.author.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.authors.list'); // should we send the User to the list or the updated Author's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
