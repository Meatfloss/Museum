(function () {
  'use strict';

  angular
    .module('korean.admin')
    .controller('KoreanAdminController', KoreanController);

  KoreanController.$inject = ['$scope', '$timeout', '$state', '$window', 'koreanResolve', 'dynastyResolve', 'Authentication', 'FileUploader'];

  function KoreanController($scope, $timeout, $state, $window, korean, dynasties, Authentication, FileUploader) {
    var vm = this;

    vm.korean = korean;
    vm.authentication = Authentication;

    vm.dynasties = _.map(dynasties, 'name');
    var dynasty = _.find(dynasties, { 'name': vm.korean.dynasty });
    if (dynasty) {
      vm.categories = dynasty.categories;
    }

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.korean.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/koreanItem/picture',
      alias: 'newPicture',
      korean: vm.korean,
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
      vm.categories = _.find(dynasties, { 'name': vm.korean.dynasty }).categories;
    }

    // add korean data
    function onBeforeUploadItem(item) {
      item.formData.push({ koreanId: vm.korean._id });
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
      vm.imageURL = vm.korean.imageURL;
    }

    // Remove existing Korean
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.korean.$remove($state.go('admin.korean.list'));
      }
    }

    // Save Korean
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.koreanForm');
        return false;
      }

      // Create a new korean, or update the current instance
      vm.korean.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.korean.list'); // should we send the User to the list or the updated Korean's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
