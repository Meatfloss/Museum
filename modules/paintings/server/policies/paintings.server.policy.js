'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Paintings Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/paintings',
      permissions: '*'
    }, {
      resources: '/api/paintings/:paintingId',
      permissions: '*'
    }, {
      resources: '/api/paintings/byauthor/:authorId',
      permissions: ['get']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/paintings',
      permissions: ['get']
    }, {
      resources: '/api/paintings/:paintingId',
      permissions: ['get']
    }, {
      resources: '/api/paintings/byauthor/:authorId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/paintings',
      permissions: ['get']
    }, {
      resources: '/api/paintings/:paintingId',
      permissions: ['get']
    }, {
      resources: '/api/paintings/byauthor/:authorId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Paintings Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an paint is being processed and the current user created it then allow any manipulation
  if (req.painting && req.user && req.painting.user && req.painting.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
