(function () {
  'use strict';

  angular
    .module('lacquer.admin')
    .controller('LacquerController', LacquerController);

  LacquerController.$inject = ['$scope', '$timeout', '$state', '$window', 'lacquerResolve', 'Authentication', 'FileUploader'];

  function LacquerController($scope, $timeout, $state, $window, lacquer, Authentication, FileUploader) {
    var vm = this;

    vm.lacquer = lacquer;
    vm.authentication = Authentication;
    vm.types = ['Lacquer Type 1', 'Lacquer Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.lacquer.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/lacquerItem/picture',
      alias: 'newPicture',
      lacquer: vm.lacquer,
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

    // add lacquer data
    function onBeforeUploadItem(item) {
      item.formData.push({ lacquerId: vm.lacquer._id });
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
      vm.imageURL = vm.lacquer.imageURL;
    }

    // Remove existing Lacquer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.lacquer.$remove($state.go('admin.lacquer.list'));
      }
    }

    // Save Lacquer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.lacquerForm');
        return false;
      }

      // Create a new lacquer, or update the current instance
      vm.lacquer.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.lacquer.list'); // should we send the User to the list or the updated Lacquer's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
