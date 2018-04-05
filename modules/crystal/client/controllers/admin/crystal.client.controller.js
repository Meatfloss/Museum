(function () {
  'use strict';

  angular
    .module('crystal.admin')
    .controller('CrystalController', CrystalController);

  CrystalController.$inject = ['$scope', '$timeout', '$state', '$window', 'crystalResolve', 'Authentication', 'FileUploader'];

  function CrystalController($scope, $timeout, $state, $window, crystal, Authentication, FileUploader) {
    var vm = this;

    vm.crystal = crystal;
    vm.authentication = Authentication;
    vm.types = ['Crystal Type 1', 'Crystal Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.crystal.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/crystalItem/picture',
      alias: 'newPicture',
      crystal: vm.crystal,
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

    // add crystal data
    function onBeforeUploadItem(item) {
      item.formData.push({ crystalId: vm.crystal._id });
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
      vm.imageURL = vm.crystal.imageURL;
    }

    // Remove existing Crystal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.crystal.$remove($state.go('admin.crystal.list'));
      }
    }

    // Save Crystal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.crystalForm');
        return false;
      }

      // Create a new crystal, or update the current instance
      vm.crystal.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.crystal.list'); // should we send the User to the list or the updated Crystal's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
