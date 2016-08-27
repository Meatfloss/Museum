(function (app) {
  'use strict';

  app.registerModule('authors', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('authors.admin', ['core.admin']);
  app.registerModule('authors.admin.routes', ['core.admin.routes']);
  app.registerModule('authors.services');
  app.registerModule('authors.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
