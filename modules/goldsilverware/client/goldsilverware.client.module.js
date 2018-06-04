(function (app) {
  'use strict';

  app.registerModule('goldsilverware', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('goldsilverware.admin', ['core.admin']);
  app.registerModule('goldsilverware.admin.routes', ['core.admin.routes']);
  app.registerModule('goldsilverware.services');
  app.registerModule('goldsilverware.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
