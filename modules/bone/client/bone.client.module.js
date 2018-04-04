(function (app) {
  'use strict';

  app.registerModule('bone', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bone.admin', ['core.admin']);
  app.registerModule('bone.admin.routes', ['core.admin.routes']);
  app.registerModule('bone.services');
  app.registerModule('bone.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
