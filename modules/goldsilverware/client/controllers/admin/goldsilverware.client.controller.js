(function () {
  'use strict';

  angular
    .module('goldsilverware.admin')
    .controller('GoldsilverwareController', GoldsilverwareController);

  GoldsilverwareController.$inject = ['$scope', '$timeout', '$state', '$window', 'goldsilverwareResolve', 'Authentication', 'FileUploader'];

  function GoldsilverwareController($scope, $timeout, $state, $window, goldsilverware, Authentication, FileUploader) {
    var vm = this;

    vm.goldsilverware = goldsilverware;
    vm.authentication = Authentication;
    vm.types = ['Goldsilverware Type 1', 'Goldsilverware Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.goldsilverware.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/goldsilverwareItem/picture',
      alias: 'newPicture',
      goldsilverware: vm.goldsilverware,
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

    // add goldsilverware data
    function onBeforeUploadItem(item) {
      item.formData.push({ goldsilverwareId: vm.goldsilverware._id });
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
      vm.imageURL = vm.goldsilverware.imageURL;
    }

    // Remove existing Goldsilverware
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.goldsilverware.$remove($state.go('admin.goldsilverware.list'));
      }
    }

    // Save Goldsilverware
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.goldsilverwareForm');
        return false;
      }

      // Create a new goldsilverware, or update the current instance
      vm.goldsilverware.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.goldsilverware.list'); // should we send the User to the list or the updated Goldsilverware's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
