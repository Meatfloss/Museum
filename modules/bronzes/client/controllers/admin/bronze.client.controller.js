(function () {
  'use strict';

  angular
    .module('bronzes.admin')
    .controller('BronzesController', BronzesController);

  BronzesController.$inject = ['$scope', '$timeout', '$state', '$window', 'bronzeResolve', 'Authentication', 'FileUploader'];

  function BronzesController($scope, $timeout, $state, $window, bronze, Authentication, FileUploader) {
    var vm = this;

    vm.bronze = bronze;
    vm.authentication = Authentication;
    vm.types = ['Bronze Type 1', 'Bronze Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.bronze.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/bronze/picture',
      alias: 'newPicture',
      bronze: vm.bronze,
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

    // add bronze data
    function onBeforeUploadItem(item) {
      item.formData.push({ bronzeId: vm.bronze._id });
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
      vm.imageURL = vm.bronze.imageURL;
    }

    // Remove existing Bronze
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bronze.$remove($state.go('admin.bronzes.list'));
      }
    }

    // Save Bronze
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bronzeForm');
        return false;
      }

      // Create a new bronze, or update the current instance
      vm.bronze.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bronzes.list'); // should we send the User to the list or the updated Bronze's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
