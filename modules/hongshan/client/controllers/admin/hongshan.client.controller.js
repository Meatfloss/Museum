(function () {
  'use strict';

  angular
    .module('hongshan.admin')
    .controller('HongshanController', HongshanController);

  HongshanController.$inject = ['$scope', '$timeout', '$state', '$window', 'hongshanResolve', 'Authentication', 'FileUploader'];

  function HongshanController($scope, $timeout, $state, $window, hongshan, Authentication, FileUploader) {
    var vm = this;

    vm.hongshan = hongshan;
    vm.authentication = Authentication;
    vm.types = ['Hongshan Type 1', 'Hongshan Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.hongshan.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/hongshan/picture',
      alias: 'newPicture',
      hongshan: vm.hongshan,
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

    // add hongshan data
    function onBeforeUploadItem(item) {
      item.formData.push({ hongshanId: vm.hongshan._id });
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
      vm.imageURL = vm.hongshan.imageURL;
    }

    // Remove existing Hongshan
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.hongshan.$remove($state.go('admin.hongshan.list'));
      }
    }

    // Save Hongshan
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.hongshanForm');
        return false;
      }

      // Create a new hongshan, or update the current instance
      vm.hongshan.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.hongshan.list'); // should we send the User to the list or the updated Hongshan's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
