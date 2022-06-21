// 加一个配置文件 你自己的 Cookie 安全字符串
exports.keys = 'hdddjsjdnasdnas'

// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.list = {
  pageSize: 5,
  serverUrl: 'http://hacker-news.firebaseio.com/v0',
}

// add middleware robot
exports.middleware = [
  'robot'
];

