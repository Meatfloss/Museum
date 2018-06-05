(function (app) {
  'use strict';

  app.registerModule('snuff', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('snuff.admin', ['core.admin']);
  app.registerModule('snuff.admin.routes', ['core.admin.routes']);
  app.registerModule('snuff.services');
  app.registerModule('snuff.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
