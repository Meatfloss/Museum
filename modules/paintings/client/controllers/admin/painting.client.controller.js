(function () {
  'use strict';

  angular
    .module('paintings.admin')
    .controller('PaintingsController', PaintingsController);

  PaintingsController.$inject = ['$scope', '$state', '$window', 'paintingResolve', 'authorsResolve','Authentication'];

  function PaintingsController($scope, $state, $window, painting, authors, Authentication) {
    var vm = this;

    vm.painting = painting;
    vm.authentication = Authentication;
    vm.authors =  authors;
    vm.painting.author = vm.painting.author && chooseDropDown(vm.painting.author, authors, 'name');

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    //select for dropdownlist
    function chooseDropDown(item, list, field)
    {
      if(list && list.length > 0)
      {
        for(var i=0; i<list.length; i++)
        {
          if(list[i][field] === item[field])
          {
            return list[i];
          }
        }
      }    
    }

    // Remove existing Painting
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.painting.$remove($state.go('admin.paintings.list'));
      }
    }

    // Save Painting
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.paintingForm');
        return false;
      }

      // Create a new painting, or update the current instance
      vm.painting.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.paintings.list'); // should we send the User to the list or the updated Painting's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
