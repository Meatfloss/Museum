(function () {
  'use strict';

  angular
    .module('monkcaps.admin')
    .controller('MonkcapsAdminController', MonkcapsController);

  MonkcapsController.$inject = ['$scope', '$timeout', '$state', '$window', 'monkcapResolve', 'dynastyResolve', 'Authentication', 'FileUploader'];

  function MonkcapsController($scope, $timeout, $state, $window, monkcap, dynasties, Authentication, FileUploader) {
    var vm = this;

    vm.monkcap = monkcap;
    vm.authentication = Authentication;

    vm.dynasties = _.map(dynasties, 'name');
    var dynasty = _.find(dynasties, { 'name': vm.monkcap.dynasty });
    if (dynasty) {
      vm.categories = dynasty.categories;
    }

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.monkcap.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/monkcap/picture',
      alias: 'newPicture',
      monkcap: vm.monkcap,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    vm.updateDynasty = updateDynasty;

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // update Dynasty
    function updateDynasty(dynasty) {
      vm.categories = _.find(dynasties, { 'name': vm.monkcap.dynasty }).categories;
    }

    // add monkcap data
    function onBeforeUploadItem(item) {
      item.formData.push({ monkcapId: vm.monkcap._id });
      // console.log(item);
    }
    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.monkcap.imageURL;
    }

    // Remove existing Monkcap
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.monkcap.$remove($state.go('admin.monkcaps.list'));
      }
    }

    // Save Monkcap
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.monkcapForm');
        return false;
      }

      // Create a new monkcap, or update the current instance
      vm.monkcap.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.monkcaps.list'); // should we send the User to the list or the updated Monkcap's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
