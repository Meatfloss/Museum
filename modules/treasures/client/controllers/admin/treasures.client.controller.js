(function () {
  'use strict';

  angular
    .module('treasures.admin')
    .controller('TreasuresController', TreasuresController);

  TreasuresController.$inject = ['$scope', '$timeout', '$state', '$window', 'treasuresResolve', 'Authentication', 'FileUploader'];

  function TreasuresController($scope, $timeout, $state, $window, treasures, Authentication, FileUploader) {
    var vm = this;

    vm.treasures = treasures;
    vm.authentication = Authentication;
    vm.types = ['Treasures Type 1', 'Treasures Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.treasures.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/treasuresItem/picture',
      alias: 'newPicture',
      treasures: vm.treasures,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // add treasures data
    function onBeforeUploadItem(item) {
      item.formData.push({ treasuresId: vm.treasures._id });
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
      vm.imageURL = vm.treasures.imageURL;
    }

    // Remove existing Treasures
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.treasures.$remove($state.go('admin.treasures.list'));
      }
    }

    // Save Treasures
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.treasuresForm');
        return false;
      }

      // Create a new treasures, or update the current instance
      vm.treasures.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.treasures.list'); // should we send the User to the list or the updated Treasures's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
