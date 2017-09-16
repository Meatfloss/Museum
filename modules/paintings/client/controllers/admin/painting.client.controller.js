(function () {
  'use strict';

  angular
    .module('paintings.admin')
    .controller('PaintingsController', PaintingsController);

  PaintingsController.$inject = ['$scope', '$timeout', '$state', '$window', 'paintingResolve', 'authorsResolve', 'Authentication', 'FileUploader'];

  function PaintingsController($scope, $timeout, $state, $window, painting, authors, Authentication, FileUploader) {
    var vm = this;

    vm.painting = painting;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.painting.author = vm.painting.author && chooseDropDown(vm.painting.author, authors, 'name');
    // vm.types = ['Album, Ink on Paper', 'Hanging Scroll, Ink and Color on Paper'];
    vm.colorTypes = ['Ink', 'Color', 'Ink and Color', 'Oil'];
    vm.materialTypes = ['Paper', 'Silk'];
    vm.scrollTypes = ['Album', 'Hanging Scroll', 'Hand Scroll', 'Mounted and Framed'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.painting.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/painting/picture',
      alias: 'newPicture',
      painting: vm.painting,
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

    // add painting data
    function onBeforeUploadItem(item) {
      item.formData.push({ paintingId: vm.painting._id });
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
      vm.imageURL = vm.painting.imageURL;
    }

    // select for dropdownlist
    function chooseDropDown(item, list, field) {
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (list[i][field] === item[field]) {
            return list[i];
          }
        }
      }
    }

    // Remove existing Painting
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.painting.$remove($state.go('admin.paintings.list'));
      }
    }

    // Save Painting
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.paintingForm');
        return false;
      }

      // Create a new painting, or update the current instance
      vm.painting.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.paintings.list'); // should we send the User to the list or the updated Painting's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
