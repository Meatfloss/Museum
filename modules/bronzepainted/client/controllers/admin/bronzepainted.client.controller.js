(function () {
  'use strict';

  angular
    .module('bronzepainted.admin')
    .controller('BronzepaintedController', BronzepaintedController);

  BronzepaintedController.$inject = ['$scope', '$timeout', '$state', '$window', 'bronzepaintedResolve', 'Authentication', 'FileUploader'];

  function BronzepaintedController($scope, $timeout, $state, $window, bronzepainted, Authentication, FileUploader) {
    var vm = this;

    vm.bronzepainted = bronzepainted;
    vm.authentication = Authentication;
    vm.types = ['Bronzepainted Type 1', 'Bronzepainted Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.bronzepainted.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/bronzepaintedItem/picture',
      alias: 'newPicture',
      bronzepainted: vm.bronzepainted,
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

    // add bronzepainted data
    function onBeforeUploadItem(item) {
      item.formData.push({ bronzepaintedId: vm.bronzepainted._id });
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
      vm.imageURL = vm.bronzepainted.imageURL;
    }

    // Remove existing Bronzepainted
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bronzepainted.$remove($state.go('admin.bronzepainted.list'));
      }
    }

    // Save Bronzepainted
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bronzepaintedForm');
        return false;
      }

      // Create a new bronzepainted, or update the current instance
      vm.bronzepainted.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bronzepainted.list'); // should we send the User to the list or the updated Bronzepainted's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
