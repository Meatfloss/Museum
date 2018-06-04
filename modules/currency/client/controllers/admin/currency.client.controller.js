(function () {
  'use strict';

  angular
    .module('currency.admin')
    .controller('CurrencyController', CurrencyController);

  CurrencyController.$inject = ['$scope', '$timeout', '$state', '$window', 'currencyResolve', 'Authentication', 'FileUploader'];

  function CurrencyController($scope, $timeout, $state, $window, currency, Authentication, FileUploader) {
    var vm = this;

    vm.currency = currency;
    vm.authentication = Authentication;
    vm.types = ['Currency Type 1', 'Currency Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.currency.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/currencyItem/picture',
      alias: 'newPicture',
      currency: vm.currency,
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

    // add currency data
    function onBeforeUploadItem(item) {
      item.formData.push({ currencyId: vm.currency._id });
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
      vm.imageURL = vm.currency.imageURL;
    }

    // Remove existing Currency
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.currency.$remove($state.go('admin.currency.list'));
      }
    }

    // Save Currency
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.currencyForm');
        return false;
      }

      // Create a new currency, or update the current instance
      vm.currency.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.currency.list'); // should we send the User to the list or the updated Currency's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
