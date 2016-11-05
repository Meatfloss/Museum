'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/lodash/lodash.js',
        'public/lib/angular-translate/angular-translate.js'
        // 'cdn.rawgit.com/SlexAxton/messageformat.js/v0.3.0/messageformat.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-animate.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-cookies.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-sanitize.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate/2.10.0/angular-translate.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate-interpolation-messageformat/2.10.0/angular-translate-interpolation-messageformat.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate-storage-cookie/2.10.0/angular-translate-storage-cookie.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate-storage-local/2.10.0/angular-translate-storage-local.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate-loader-url/2.10.0/angular-translate-loader-url.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate-loader-static-files/2.10.0/angular-translate-loader-static-files.js',
        // 'cdnjs.cloudflare.com/ajax/libs/angular-translate-handler-log/2.10.0/angular-translate-handler-log.js'
        // endbower
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: ['gruntfile.js'],
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
