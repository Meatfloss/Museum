(function (app) {
  'use strict';

  app.registerModule('sealxi', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('sealxi.admin', ['core.admin']);
  app.registerModule('sealxi.admin.routes', ['core.admin.routes']);
  app.registerModule('sealxi.services');
  app.registerModule('sealxi.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
