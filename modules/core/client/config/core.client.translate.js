(function () {
  'use strict';

  angular.module('core').config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    var translationsEN = {
      CompanyName: 'Sai Yang Tang',
      HomePrefaceTitle: 'Sai Yang Tang Art Network Museum Establishment of Reflections',
      HomePrefaceParagraph1: 'For decades, Sai Yang Tang has always been called by collectors in New York as a mysterious “Overseas Summer Palace”. Now, this mysterious, deeply-closed curtain is being rolled up with the establishment of the Kwong Lam (Sai Yang Tang) Online Museum of Art. With the onset of the glorious era of the Chinese nation, it is hoped that www.kwonglammuseumofart.org will help carry forward the fine traditions and pass them onto future generations by making public the secret treasures of Sai Yang Tang, handing down glorious chapters of the ancient culture and civilization of the Chinese nation.',
      HomePrefaceParagraph2: 'In an on-going collection project that has spanned two different centuries, we at Sai Yang Tang have been searching for Chinese treasures scattered in the West and purchased some of them at hefty prices for secret collection. Our collected treasures include a calligraphic work by Wang Xizhi (Jin dynasty); General Pei’s Poetry Scroll by Yan Zhenqing (Tang dynasty); Manjianghong Verse Scroll by Yue Fei (Southern Song dynasty); 南宋 龚开《骏骨图》真迹 Horses???, an orignal painting by Gong Kai (Southern Song dynasty); 《送子天皇图》Donating the Son to the Emperor???, a painting by Wu Daozi (Tang dynasty),《陵烟阁二十四功臣像》the Lingyange Portraits of 24 Officials with Meritorious Service (Tang dynasty) and calligraphy in Shoujin style and birds-and- flower paintings by Emperor Song Huizong (Song dynasty).宋徽宗《瘦金体书法、花鸟画》',
      HomePrefaceParagraph3: 'Our collections bronze wares range from the Xia, Shang, Zhou dynasties to the Tang dynasty. Pottery wares and porcelain from famous kilns throughout history and various arts and crafts run the whole gauntlet. That they all have the good fortune of being displayed before the eyes of my countrymen and other friends alike in celebration of the cultural renaissance of the Chinese nation—this is my decades-old aspiration and the purpose of founding Sai Yang Tang. What great joy I would derive by making a humble and modest contribution to the culture and civilization of China ─ my motherland!',
      HomePrefaceParagraph4: 'Lin Ji-Guang Yu Shiyang book in the morning of 2015-4-27',
      AboutTitile: 'About Kwong Lum',
      AboutParagraph1: 'Kwong Lum started collecting ancient Chinese artwork as a nine-year-old in Hong Kong under the guidance of his art teacher, Ding Yanyong, himself hailed as leading figure in the renewal of the ancient China tradition for modern expression and a fervent collector, who taught him Chinese painting, calligraphy and most of all, the appraisal and collection of Chinese antiques. Thus began his Sai Yang Tang Collection. ',
      AboutParagraph2: 'As a renowned Chinese artist, scholar and collector, Lum has immensely enlarged the volume of his collection by adding in ancient masters’ painting and calligraphy, bronzes, sculpture and porcelain ware of different dynasties, purchased throughout the world at auctions or from private collectors. Today, his Sai Yang Tang Collection in the United States, boasting of its invaluable art treasures of ancient China, enjoys a far-reaching reputation of “A Smaller-Sized Overseas Palace Museum.” In 1999, a Kwong Lum National Art Treasure Exhibition was held by Asian Cultural Center in New York, commemorating the 50th Anniversary on the formation of Sai Yang Tang Collection. ',
      AboutParagraph3: 'China’s CCTV “National Treasure Archives” program has made a special trip to New York to interview Lum and they documented four television episodes in the CCTV broadcast.',
      AboutParagraph4: 'In 2012, Guangdong Government built a museum named “Kwong Lum Art Museum” at Jiangmen City. The museum opened in 2014 and houses Lum’s Paintings and treasures of Sai Yang Tang’s Collection. ',
      AboutParagraph5: 'Lum will be launching his On-Line Museum and hold series of Exhibitions of his Collection. The first will be on Ancient and Gilt Bronzes, with over one hundred Bronze pieces. This collection starts from the Qijia Culture at the end of the third millennium B.C., and Erlitou period up to Han Dynasty. Highlighted by rare and prestigious bronze objects with technical excellence, unsurpassed refinement, signifying political power, devout spiritual beliefs, and exalted social status.',
      VARIABLE_REPLACEMENT: '{{name}}',
      BUTTON_LANG_ZH: 'Chinese',
      BUTTON_LANG_EN: 'English'
    };

    var translationsZH = {
      CompanyName: '世阳堂',
      HomePrefaceTitle: '林缉光(世阳堂) 艺术网络博物馆成立感言',
      HomePrefaceParagraph1: '＂世阳堂＂​​在美国纽约数十年来一直被收藏家们称为神秘的＂海外小故宫＂，现在开始卷起神秘深闭的帘幕，成立＂林缉光 ​​(世阳堂) 艺术网络博物馆＂。 www.kwonglammuseumofart.org 在＂中华盛世＂即将到来的时候，希能乘先启后，将世阳堂的秘藏公之于世, 为中华民族的古文化与文明，传递辉煌的篇章。',
      HomePrefaceParagraph2: '＂世阳堂＂​​横夸两个世纪的收藏岁月中，并在海外一直追寻流落在西方的中华国宝，以高价收购而秘藏之，例如: 晋 王羲之《丧乱帖》、唐 颜真卿《裴将军诗卷》、南宋 岳飞《满江红词​​卷》、南宋 龚开《骏骨图》真迹、唐 吴道子《送子天皇图》真迹、唐《陵烟阁二十四功臣像》、宋徽宗《瘦金体书法、花鸟画》等。青铜器从夏、商、周以至唐代。历代名窑瓷器、杂相等应有尽有,若然幸展现于国人面前，以庆祝中华文化复兴，此是我数十年之心愿与＂世阳堂＂​​之宗旨。能为我的祖国中华民族文化与文明尽微薄之力，岂不乐哉！',
      HomePrefaceParagraph3: '',
      HomePrefaceParagraph4: '林緝光 書於世陽堂中 2015-4-27 晨三時',
      AboutTitile: '关于林缉光',
      AboutParagraph1: '林緝光先生在美國紐約建立的世陽堂數十年來被收藏家們譽為海外小故宮，但真正看到世陽堂藏品的人並不多。羊年伊始，林緝光先生開始將數十年的秘藏在世陽堂畫廊公開展覽並置於網絡上，成立“紐約林緝光世陽堂藝術網絡博物館”，供天下之愛惜中華文物之人士研究和鑑賞。這次公開展覽並上網的第一組展品為一百件國寶級青銅器。值此機遇，華美人文學會於3月14日（週六）下午二時至四時假世陽堂畫廊舉辦講座，特邀林緝光先生做專題講座，講述中國從五千年前的齊家文化和二裡頭文化期直至兩千年前的漢代青銅器，并解釋本次世陽堂展出的青銅器藏品，使其知曉於世。同時，林先生也將講述他六十多年來對青銅器的收藏與鑒證經驗，與聽眾分享他的研究成果和心得。',
      AboutParagraph2: '在這次展出的一百件珍品中，夏朝的青銅人面獸身像代表着華夏在四千年前亦有如埃及那樣的人面獸身像存世，可能因為氣候的風吹雨打而湮沒了。商代青銅器存世以鼎為最多，在商後期還有人面方鼎以及人面盉等傳世，同時以動物造型的青銅器如象尊、虎食人尊、鳥食人尊等。西周與東周的青銅器在這次展覽中也有不少，春秋戰國的青銅在“世陽堂”的藏品中獨特，神奇與精美。存世稀有的秦代完整一套的青銅金銀錯編鐘為這次展覽的亮點之一。對於唐代的鎮國三劍（神龍執法劍、玉龍劍與尚方寶劍）也是這次展覽之精華。',
      AboutParagraph3: '如今集書畫家丶詩人丶收藏家於一身，堪稱“美國紐約文藝界領袖式風雲人物”的林緝光先生，出生於澳門氹仔。他自10歲始便致力于中國藝術品的收藏，迄今已近半個世 紀之久。他幼年跟藝術大師和古代藝術品收藏鑒賞大家丁衍庸先生學習書法丶繪畫丶古典文學以及古代藝術品鑒定技術，在十幾嵗時便已擁有了自己初具規模的“世陽堂”藝術品珍藏，其中的稀世瑰寶包括北宋大師黃庭堅所書的蘇轼詞作《念奴嬌•赤壁懷古》手 卷丶清初大畫家石濤與八大山人的山水力作和一套商王武丁之玉玺及骨玺。',
      AboutParagraph4: '如今，林緝光建於紐約市的“世陽堂”古代藝術珍藏與畫廊因其價值連城的各類國寶級藏品而被譽爲“海外小故宮”，其珍藏大可同北京和台北的故宮一比短長。各類“超級國寶”中有帝堯的玄圭，商王武丁的十枚骨制令玺，張旭和吳道子共同創作的書畫長卷，由唐太宗親自爲贊、閻立本所畫的《淩煙閣》二十四功臣像，宋徽宗的《禦鷹圖》大中堂，北宋黃庭堅的“大江東去”書法長卷，米芾的雲 山，唐代武則天的石雕頭像，同北京故宮的藏品相配的宋朝紫檀蓮花寶座以及中國古代如柴、汝、官、哥、定等諸大名窯的精美珍瓷，不一而足。民族英雄文天祥的曠世之作《過零丁洋詩》的原跡也為林先生收藏。',
      AboutParagraph5: '2012年廣東江門市建立了一座以林緝光先生命名的博物館，將林先生珍藏的諸多燦爛國寶展現在億萬國人面前。中央電視臺“國寶檔案”節目曾專程來紐約采訪林緝光先生，制成四集電視片在中央電視臺播放。',
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
      'Sign Up': '注册',
      'Sign In': '登录',
      'Sign Out': '登出',
      'Dynasty': '朝代',
      'Type': '种类',
      'Width': '宽度',
      'Height': '高度',
      'Length': '长度',
      'Name': '名字',
      'Description': '描述',
      'Author': '作者',
      'Mark': '题款',
      'Top Diameter': '口径',
      'Bottom Diameter': '足径',
      'Xia': '夏',
      'Shang': '商',
      'Zhou': '周',
      'Qin': '秦',
      'Han': '汉',
      'Three Kindoms': '三国',
      'Sui': '隋',
      'Tang': '唐',
      'Yuan': '元',
      'Ming': '明',
      'Qing': '清',
      'Modern': '现代',
      'All': '全部',
      'Sign in using your social accounts': '使用社交账户登录',
      'Or with your account': '或者您自己的账户',
      'Username': '用户名',
      'Password': '密码',
      'Username is required.': '请输入用户名',
      'Password is required.': '请输入密码',
      'or': '或',
      'Forgot your password?': '忘记密码了？',
      'Or sign up using your email': '或者用您的邮箱注册',
      'First Name': '名字',
      'First name is required.': '请输入名字',
      'Last Name': '姓氏',
      'Last name is required.': '请输入姓氏',
      'Email': '邮件',
      'Email address is required.': '请输入邮箱',
      'Email address is invalid.': '邮箱地址不符合要求',
      'Password Requirements': '密码要求',
      'The password must be at least 10 characters long.': '密码长度至少10个字母',
      'The password must contain at least one lowercase letter.': '密码至少包含一个小写字母',
      'The password must contain at least one uppercase letter.': '密码至少包含一个大写字母',
      'The password must contain at least one special character.': '密码至少包含一个特殊字符',
      'The password must contain at least one number.': '密码至少包含一个数字',
      'Please enter a passphrase or password with 10 or more characters, numbers, lowercase, uppercase, and special characters.': '请确保输入的密码长度在10个或以上，必须包含数字，大写字母，小写字母以及特殊字符',
      'Save Profile': '保存账户信息',
      'Profile Saved Successfully': '账户信息更新成功',
      'Select Image': '选择图片',
      'Upload': '上传',
      'Cancel': '取消',
      'Current Password': '当前密码',
      'New Password': '新密码',
      'Enter a new password.': '填写新密码',
      'Your current password is required.': '请填写当前密码',
      'Verify Password': '确认密码',
      'Verify your new password.': '确认您新的密码',
      'Passwords do not match.': '密码不匹配',
      'Save Password': '保存密码',
      'Password Changed Successfully': '密码修改成功',
      'Settings': '账户设置',
      'Restore your password': '找回您的密码',
      'Enter your account username.': '请输入您的用户名',
      'Enter a username.': '请输入一个用户名',
      'Submit': '提交',
      'Password reset is invalid': '密码重置失败',
      'Ask for a new password reset': '再次申请密码重置',
      'Password successfully reset': '密码重置成功',
      'Continue to home page': '返回主页',
      'Reset your password': '重置您的密码',
      'Enter the password again to verify.': '请再次输入密码以确认',
      'Update Password': '修改密码',
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