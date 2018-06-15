(function () {
  'use strict';

  angular
    .module('sculpture.admin')
    .controller('SculptureAdminController', SculptureController);

  SculptureController.$inject = ['$scope', '$timeout', '$state', '$window', 'sculptureResolve', 'dynastyResolve', 'Authentication', 'FileUploader'];

  function SculptureController($scope, $timeout, $state, $window, sculpture, dynasties, Authentication, FileUploader) {
    var vm = this;

    vm.sculpture = sculpture;
    vm.authentication = Authentication;

    vm.dynasties = _.map(dynasties, 'name');
    var dynasty = _.find(dynasties, { 'name': vm.sculpture.dynasty });
    if (dynasty) {
      vm.categories = dynasty.categories;
    }

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.sculpture.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/sculptureItem/picture',
      alias: 'newPicture',
      sculpture: vm.sculpture,
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
      vm.categories = _.find(dynasties, { 'name': vm.sculpture.dynasty }).categories;
    }

    // add sculpture data
    function onBeforeUploadItem(item) {
      item.formData.push({ sculptureId: vm.sculpture._id });
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
      vm.imageURL = vm.sculpture.imageURL;
    }

    // Remove existing Sculpture
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.sculpture.$remove($state.go('admin.sculpture.list'));
      }
    }

    // Save Sculpture
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.sculptureForm');
        return false;
      }

      // Create a new sculpture, or update the current instance
      vm.sculpture.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.sculpture.list'); // should we send the User to the list or the updated Sculpture's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
