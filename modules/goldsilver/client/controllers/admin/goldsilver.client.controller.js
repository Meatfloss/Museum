(function () {
  'use strict';

  angular
    .module('goldsilver.admin')
    .controller('GoldsilverController', GoldsilverController);

  GoldsilverController.$inject = ['$scope', '$timeout', '$state', '$window', 'goldsilverResolve', 'Authentication', 'FileUploader'];

  function GoldsilverController($scope, $timeout, $state, $window, goldsilver, Authentication, FileUploader) {
    var vm = this;

    vm.goldsilver = goldsilver;
    vm.authentication = Authentication;
    vm.types = ['Goldsilver Type 1', 'Goldsilver Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.goldsilver.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/goldsilverItem/picture',
      alias: 'newPicture',
      goldsilver: vm.goldsilver,
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

    // add goldsilver data
    function onBeforeUploadItem(item) {
      item.formData.push({ goldsilverId: vm.goldsilver._id });
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
      vm.imageURL = vm.goldsilver.imageURL;
    }

    // Remove existing Goldsilver
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.goldsilver.$remove($state.go('admin.goldsilver.list'));
      }
    }

    // Save Goldsilver
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.goldsilverForm');
        return false;
      }

      // Create a new goldsilver, or update the current instance
      vm.goldsilver.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.goldsilver.list'); // should we send the User to the list or the updated Goldsilver's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
