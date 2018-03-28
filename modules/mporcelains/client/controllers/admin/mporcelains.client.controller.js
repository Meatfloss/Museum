(function () {
  'use strict';

  angular
    .module('mporcelains.admin')
    .controller('MporcelainsAdminController', MporcelainsController);

  MporcelainsController.$inject = ['$scope', '$timeout', '$state', '$window', 'mporcelainsResolve', 'dynastyResolve', 'Authentication', 'FileUploader'];

  function MporcelainsController($scope, $timeout, $state, $window, mporcelains, dynasties, Authentication, FileUploader) {
    var vm = this;

    vm.mporcelains = mporcelains;
    vm.authentication = Authentication;

    vm.dynasties = _.map(dynasties, 'name');
    var dynasty = _.find(dynasties, { 'name': vm.mporcelains.dynasty });
    if (dynasty) {
      vm.categories = dynasty.categories;
    }

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.mporcelains.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/mporcelains/picture',
      alias: 'newPicture',
      mporcelains: vm.mporcelains,
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
      vm.categories = _.find(dynasties, { 'name': vm.mporcelains.dynasty }).categories;
    }

    // add mporcelains data
    function onBeforeUploadItem(item) {
      item.formData.push({ mporcelainsId: vm.mporcelains._id });
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
      vm.imageURL = vm.mporcelains.imageURL;
    }

    // Remove existing Mporcelains
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mporcelains.$remove($state.go('admin.mporcelains.list'));
      }
    }

    // Save Mporcelains
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mporcelainsForm');
        return false;
      }

      // Create a new mporcelains, or update the current instance
      vm.mporcelains.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.mporcelains.list'); // should we send the User to the list or the updated Mporcelains's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
