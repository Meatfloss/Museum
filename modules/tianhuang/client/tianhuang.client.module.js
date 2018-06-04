(function (app) {
  'use strict';

  app.registerModule('tianhuang', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('tianhuang.admin', ['core.admin']);
  app.registerModule('tianhuang.admin.routes', ['core.admin.routes']);
  app.registerModule('tianhuang.services');
  app.registerModule('tianhuang.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
