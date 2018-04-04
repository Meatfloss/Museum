(function (app) {
  'use strict';

  app.registerModule('boneseal', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('boneseal.admin', ['core.admin']);
  app.registerModule('boneseal.admin.routes', ['core.admin.routes']);
  app.registerModule('boneseal.services');
  app.registerModule('boneseal.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
