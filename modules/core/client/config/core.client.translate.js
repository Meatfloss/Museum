(function () {
  'use strict';

  angular.module('core').config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    var translationsEN = {
      CompanyName: 'Sai Yang Tang',
      HomePrefaceTitle: 'Sai Yang Tang Art Network Museum Establishment of Reflections',
      HomePrefaceParagraph1: '"Shi Yang Tong" in New York for decades has been collectors known as the mysterious "overseas small Palace", now began to roll up the curtain of mysterious deep closed, the establishment of "Lin Ji Guang (World Yang Tong) Art Network Museum." Www.kwonglammuseumofart.org In the "Golden Age of China" is about to come, Xi can take the first after the Chinese nation\'s ancient culture and civilization, pass a brilliant chapter.',
      HomePrefaceParagraph2: '"World-yang Church" cross-boast two centuries (20-21) has sixty years of collection years, has been pursuing in the overseas Chinese living in the West, to high-priced acquisition and secret, if fortunate enough to show people To celebrate the revival of Chinese culture, this is my decades of volunteer and the "World Yang Tong," the purpose. For my motherland Chinese culture to make modest force, would not Le zai!',
      HomePrefaceParagraph3: 'Lin Ji-Guang Yu Shiyang book in the morning of 2015-4-27',
      VARIABLE_REPLACEMENT: '{{name}}',
      BUTTON_LANG_ZH: 'Chinese',
      BUTTON_LANG_EN: 'English'
    };

    var translationsZH = {
      CompanyName: '世阳堂',
      HomePrefaceTitle: '林緝光(世陽堂) 藝術網絡博物館成立感言',
      HomePrefaceParagraph1: '"世陽堂" 在美國紐約數十年來一直被收藏家們稱為神秘 的 "海外小故宮"，現在開始捲起神秘深閉 的簾幕，成立 "林緝光(世陽堂)藝術網絡博物館"。 www.kwonglammuseumofart.org 在"中華盛世 "即將到來的時候，希能乘先啟後，為中華民族的古文化與文明，傳遞輝煌的篇章。',
      HomePrefaceParagraph2: '"世陽堂" 橫誇兩個世紀(20-21) 至今六十多年的收藏歲月中， 在海外一直追尋流落在西方的中華國寶，以高價收購 而秘藏之，若然有幸展現於國人面前，以慶祝中華文 化復興，此是我數十年之志願與 "世陽堂" 之宗旨。能為我的祖國中華民族文化盡微薄之力，豈不樂哉！',
      HomePrefaceParagraph3: '林緝光 書於世陽堂中 2015-4-27 晨三時',
      'About': '关于林缉光',
      'Exhibitions': '展览',
      'Contact': '联系',
      'Collections': '藏品',
      'Articles': '鉴赏文章',
      'Paintings': '书画',
      'Bronzes': '青铜器',
      'Zisha Teapots': '紫砂壶',
      'Famille Rose': '粉彩',
      'Famille Rose Enamel': '珐琅彩',
      'Statues': '雕像',
      'Others': '其他',
      'Coming Soon': '待定',
      'Edit Profile': '编辑账号',
      'Edit Profile Picture': '编辑账号图片',
      'Change Password': '修改密码',
      'Manage Social Accounts': '管理社交账号',
      VARIABLE_REPLACEMENT: '{{namezh}}',
      BUTTON_LANG_ZH: '中文',
      BUTTON_LANG_EN: '英文'
    };
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('zh', translationsZH);
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }]);
}());
