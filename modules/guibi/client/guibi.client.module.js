(function (app) {
  'use strict';

  app.registerModule('guibi', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('guibi.admin', ['core.admin']);
  app.registerModule('guibi.admin.routes', ['core.admin.routes']);
  app.registerModule('guibi.services');
  app.registerModule('guibi.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
