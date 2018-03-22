(function (app) {
  'use strict';

  app.registerModule('liangzhu', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('liangzhu.admin', ['core.admin']);
  app.registerModule('liangzhu.admin.routes', ['core.admin.routes']);
  app.registerModule('liangzhu.services');
  app.registerModule('liangzhu.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
