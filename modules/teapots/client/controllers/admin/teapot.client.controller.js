(function () {
  'use strict';

  angular
    .module('teapots.admin')
    .controller('TeapotsController', TeapotsController);

  TeapotsController.$inject = ['$scope', '$timeout', '$state', '$window', 'teapotResolve', 'Authentication', 'FileUploader'];

  function TeapotsController($scope, $timeout, $state, $window, teapot, Authentication, FileUploader) {
    var vm = this;

    vm.teapot = teapot;
    vm.authentication = Authentication;
    vm.types = ['Teapot Type 1', 'Teapot Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];
    vm.reignTitleList = {
      'Ming':['Hongwu', 'Jianwen', 'Yongle', 'Hongxi', 'Xuande', 'Zhengtong', 'Jingtai', 'Tianshun', 'Chenghua', 'Hongzhi', 'Zhengde', 'Jiajing', 'Longqing', 'Wanli', 'Taichang', 'Tianqi', 'Chongzhen'],
      'Qing':['Shunzhi', 'Kangxi', 'Yongzheng', 'Qianlong', 'Jiaqing', 'Daoguang', 'Xianfeng', 'Tongzhi', 'Guangxu', 'Xuantong']
    };
    vm.reignTitles = vm.reignTitleList[vm.teapot.dynasty];


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.teapot.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/teapot/picture',
      alias: 'newPicture',
      teapot: vm.teapot,
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



    //update Dynasty
    function updateDynasty(dynasty)
    {
      vm.reignTitles = vm.reignTitleList[dynasty];
    }


    // add teapot data
    function onBeforeUploadItem(item) {
      item.formData.push({ teapotId: vm.teapot._id });
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
      vm.imageURL = vm.teapot.imageURL;
    }

    // Remove existing Teapot
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.teapot.$remove($state.go('admin.teapots.list'));
      }
    }

    // Save Teapot
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teapotForm');
        return false;
      }

      // Create a new teapot, or update the current instance
      vm.teapot.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.teapots.list'); // should we send the User to the list or the updated Teapot's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
