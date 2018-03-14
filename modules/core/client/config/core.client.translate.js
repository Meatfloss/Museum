(function () {
  'use strict';

  angular.module('core').config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    var translationsEN = {
      CompanyName: 'Sai Yang Tang',
      HomePrefaceTitle: 'Words from Kwong Lam, the Founder',
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
      HomePrefaceTitle: '贞观(世阳堂) 艺术网络博物馆成立感言',
      HomePrefaceParagraph1: '＂世阳堂＂​​在美国纽约数十年来一直被收藏家们称为神秘的＂海外小故宫＂，现在开始卷起神秘深闭的帘幕，成立＂贞观 ​​(世阳堂) 艺术网络博物馆＂。 www.kwonglammuseumofart.org 在＂中华盛世＂即将到来的时候，希能乘先启后，将世阳堂的秘藏公之于世, 为中华民族的古文化与文明，传递辉煌的篇章。',
      HomePrefaceParagraph2: '＂世阳堂＂似秉乘上天的使命, 从前数代的清朝时期已开始珍藏历代文物并夸越了两个世纪, 而到了这一代的我, 九歲开始有幸从师于旅居香港的著名艺术家、教育家与收藏和鉴定专家丁衍庸先生的协助与栽培而成为入室弟子与义子, 开始收藏国宝级文物如从张大千手中购入的晉 王羲之《丧乱帖》、唐 颜真卿《裴将军诗》、南宋 岳飞《滿江红词卷》与文天祥《过零汀洋诗卷》等, 而奠定了 “世阳堂” 镇堂之宝并成为后来收藏大家的基礎。我在丁衍庸老师义父的悉心戮力栽培下, 数年间发挥与生俱来的灵气与潛能而练就了一双非凡的鹰眼, 百无一失的奇妙鉴证方法, 己能和丁老师共同研究考证历代文物的真伪, 从唐宋与各朝代的古书画、青铜器与陶瓷、古玉器和雜相等无一不在考证之列。带著丰富的知识与经驗留学加拿大, 而在海外数十年的岁月中追寻流落在西方的中华国宝，并从私人收藏家、拍卖行与古董商等以高价收购国宝而秘藏之，例如: 晋 王羲之《瞻近帖》、王献之《地黃汤帖》、唐 吴道子《寒山写真图》、《送子天皇图》、唐 阎立本《陵煙阁二十四功臣像》、唐 张宣《百子图》、宋徽宗廋金体书法《秾芳诗卷》、《千字文》、《御鹰图》与花鸟画等、南宋 龚开《骏骨图》、元 赵子昂《蜀道难》等。青铜器从夏、商、周以至唐代, 历代名窑瓷器、七千年玉雕“中华神盾”和杂相等应有尽有, 若有幸能展现于世人面前，全球有兴趣东方文化的人们可以值此艺术平台, 无论身在何处可用手机输入网址www.kwonglammuseumofart.org便能看到博物馆的全部收藏, 或在电脑上清澈地观看每件藏品之美, 而更容易研究中华的古艺术文明与现代开放和富強的中国。而国人更能深入了解祖先们和自已血肉相连, 世世代代同是黃河与长江澎湃波涛洶湧的浪花, 面对历史先贤与英雄的敬仰而自励, 让孩子们知道中国月亮大而圆美而亮的自信。为促进全球人们对中华艺术文化的热爱、学习与鉴赏, 此是＂世阳堂＂数代人之宗旨与我数十年之云山绕梦, 以促成世界文化的交流与复兴和富強为己任。而更感谢上苍让我生于今世, 能以“世阳堂网络博物馆” 为艺术文化与文明尽微薄之力。此生岂只幸运与喜悅快乐所能形容哉！',
      HomePrefaceParagraph3: '',
      HomePrefaceParagraph4: '林缉光 书于世阳堂中',
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
      'Liao': '辽',
      'Pre Tang': '唐前',
      'Tang': '唐',
      'Five Dynasties': '五代',
      'Northern Song': '北宋',
      'Southern Song': '南宋',
      'Jin': '金',
      'Yuan': '元',
      'Ming': '明',
      'Qing': '清',
      'Modern': '现代',
      'Hongwu': '洪武',
      'Jianwen': '建文',
      'Yongle': '永乐',
      'Hongxi': '洪熙',
      'Xuande': '宣德',
      'Zhengtong': '正统',
      'Jingtai': '景泰',
      'Tianshun': '天顺',
      'Chenghua': '成化',
      'Hongzhi': '弘治',
      'Zhengde': '正德',
      'Jiajing': '嘉靖',
      'Longqing': '隆庆',
      'Wanli': '万历',
      'Taichang': '泰昌',
      'Tianqi': '天启',
      'Chongzhen': '崇祯',
      'Shunzhi': '顺治',
      'Kangxi': '康熙',
      'Yongzheng': '雍正',
      'Qianlong': '乾隆',
      'Jiaqing': '嘉庆',
      'Daoguang': '道光',
      'Xianfeng': '咸丰',
      'Tongzhi': '同治',
      'Guangxu': '光绪',
      'Xuantong': '宣统',
      'All': '全部',
      'Ancient Ceramics': '历代陶瓷',
      'Er Litou Culture (Bronze Age)': '二里头文化(青铜时代)',
      'Shang Dynasty': '商',
      'Warring States': '战国',
      'Han Dynasty': '汉',
      'Western Gin': '西晋',
      'Eastern Gin': '东晋',
      'Southern Dynasty': '南朝',
      'Tang / Five Dynasties': '唐/五代',
      'Tang Sancai': '唐三彩',
      'Yue Yao': '越窑',
      'Mise Porcelain': '秘色瓷',
      'Changsha Yao': '长沙窑',
      'Jiaxian Yao': '郏县窑',
      'Marbled Porcelain': '绞胎瓷',
      'Tongguan Yao': '铜官窑',
      'Xing Yao': '邢窑',
      'Ding Yao': '定窑',
      'Chai Yao': '柴窑',
      'Blue and White Porcelain': '青花',
      'Liao(Xixia) Dynasty': '辽(西夏)',
      'Song Dynasty (North & South)': '宋朝(北宋/南宋)',
      'Ru Yao': '汝窑',
      'Guan Yao': '官窑',
      'Ge Yao': '哥窑',
      'Jun Yao': '钧窑',
      'Longquan Yao': '龙泉窑',
      'Yingqing Yao': '影青窑',
      'Jizhou Yao': '吉州窑',
      'Yaozhou Yao': '耀州窑',
      'Cizhou Yao': '磁州窑',
      'Bacun Yao': '扒村窑',
      'Dengfeng Yao': '登封窑',
      'Jian Yao': '建窑',
      'Jin Dynasty': '金',
      'Chai Yao Porcelain': '片柴值千金',
      'Yuan Dynasty Porcelain': '元朝瓷器',
      'Ming Dynasty Porcelain': '明朝瓷器',
      'Qing Dynasty Porcelain': '清朝瓷器',
      'Ancient Jade Collection': '古玉珍藏',
      'Neolithic Age': '新石器时代',
      'Zhou Dynasty': '周',
      'Spring & Autumn Period': '春秋',
      'Qin Dynasty': '秦',
      'Sui Dynasty': '隋',
      'Tang Dynasty': '唐',
      'Song Dynasty': '宋',
      'Yuan Dynasty': '元',
      'Ming Dynasty': '明',
      'Qing Dynasty': '清',
      'Hongshan Culture': '红山文化',
      'Liangzhu Culture': '良渚文化',
      'Qijia Culture': '齐家文化',
      'Longshan Culture': '龙山文化',
      'Turtle and Oracle Bones': '龟甲骨珍藏',
      'Emperor Wu Ding Bone Seals': '商王武丁骨玺',
      'Ancient Swords': '古代宝剑',
      'Ancient Glassware': '古玻璃器',
      'Gold and Silver Ware': '金银器珍藏',
      'Lacquer Ware': '漆器',
      'Tianhuang Stone': '田黄石珍藏',
      'Ancient Seal Xi': '历代印玺',
      'Cloisonne Enamel': '掐丝珐琅',
      'Bronze Painted Famille-Rose Enamel': '铜胎画珐琅',
      'Crystal Collection': '水晶珍藏',
      'Amber and Agate': '琥珀与玛瑙',
      'Snuff Bottles': '鼻烟壶',
      'Four Treasures': '文房四宝',
      'Ancient Currency': '古代货币',
      'Buddha Sculptures': '佛像雕塑',
      'Category': '种类',
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
      'Ink and Color': '设色水墨',
      'Color': '设色',
      'Ink': '水墨',
      'Oil': '油彩',
      'Acrylic': '丙烯',
      'Canvas': '帆布',
      'Ink Rubbings': '墨拓片',
      'Paper': '纸本',
      'Silk': '绢本',
      'Mounted and Framed': '镜框',
      'Hanging Scroll': '立轴',
      'Hand Scroll': '手卷',
      'Album': '册页',
      'Unknown': '未知',
      'READ MORE': '显示更多',
      'HIDE': '隐藏',
      'Posted on': '发布于',
      'view all': '显示全部',
      VARIABLE_REPLACEMENT: '{{namezh}}',
      BUTTON_LANG_ZH: '中文',
      BUTTON_LANG_EN: '英文'
    };
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('zh', translationsZH);
    $translateProvider.registerAvailableLanguageKeys(['en', 'zh'], {
      'en_*': 'en',
      'zh_*': 'zh'
    }).determinePreferredLanguage();
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
  }]);
}());
