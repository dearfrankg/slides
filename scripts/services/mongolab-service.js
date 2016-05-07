'use strict';

/* Services */

app.factory('Slide', ['$resource', '$location', function( $resource, $location ) {

  var ie = (typeof XDomainRequest !== 'undefined');
  var host, server;

  if (ie) {
    // mongolab proxy server - because ie doesn't support CORS and mongolab doersn't support JSONP
    host = $location.host();
    server = 'http://' + host + '\\:8000';
  }
  else {
    // the real mongolab server
    server = 'https://api.mongolab.com';
  }

  var url = server + '/api/1/databases/presentations/collections/presentations/:id';

  var Project = $resource(
    url,
    { apiKey: '503f0450e4b04102cdfdc589' },
    { update: { method: 'PUT' } }
  );

  Project.prototype.update = function(cb) {
    return Project.update({id: this._id.$oid},
    angular.extend({}, this, {_id:undefined}), cb);
  };

  Project.prototype.destroy = function(cb) {
    return Project.remove({id: this._id.$oid}, cb);
  };

  return Project;

}]);
