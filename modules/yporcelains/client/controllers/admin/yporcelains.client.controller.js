(function () {
  'use strict';

  angular
    .module('yporcelains.admin')
    .controller('YporcelainsController', YporcelainsController);

  YporcelainsController.$inject = ['$scope', '$timeout', '$state', '$window', 'yporcelainsResolve', 'Authentication', 'FileUploader'];

  function YporcelainsController($scope, $timeout, $state, $window, yporcelains, Authentication, FileUploader) {
    var vm = this;

    vm.yporcelains = yporcelains;
    vm.authentication = Authentication;
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];
    vm.reignTitleList = {
      'Ming': ['Hongwu', 'Jianwen', 'Yongle', 'Hongxi', 'Xuande', 'Zhengtong', 'Jingtai', 'Tianshun', 'Chenghua', 'Hongzhi', 'Zhengde', 'Jiajing', 'Longqing', 'Wanli', 'Taichang', 'Tianqi', 'Chongzhen'],
      'Qing': ['Shunzhi', 'Kangxi', 'Yongzheng', 'Qianlong', 'Jiaqing', 'Daoguang', 'Xianfeng', 'Tongzhi', 'Guangxu', 'Xuantong']
    };
    vm.reignTitles = vm.reignTitleList[vm.yporcelains.dynasty];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.yporcelains.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/yporcelainsItem/picture',
      alias: 'newPicture',
      yporcelains: vm.yporcelains,
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
      vm.reignTitles = vm.reignTitleList[dynasty];
    }

    // add yporcelains data
    function onBeforeUploadItem(item) {
      item.formData.push({ yporcelainsId: vm.yporcelains._id });
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
      vm.imageURL = vm.yporcelains.imageURL;
    }

    // Remove existing Yporcelains
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.yporcelains.$remove($state.go('admin.yporcelains.list'));
      }
    }

    // Save Yporcelains
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.yporcelainsForm');
        return false;
      }

      // Create a new yporcelains, or update the current instance
      vm.yporcelains.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.yporcelains.list'); // should we send the User to the list or the updated Yporcelains's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
