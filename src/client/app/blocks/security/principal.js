(function() {
    'use strict';

    angular
        .module('blocks.security')
        .factory('principal', principal);

    principal.$inject = ['$q', '$http','$rootScope','configuration','$window'];

    /* @ngInject */
    function principal($q, $http,$rootScope,configuration,$window) {
        var _identity = undefined,
            _authenticated = false;

        var service = {
            isIdentityResolved: isIdentityResolved,
            isAuthenticated: isAuthenticated,
            isInRole: isInRole,
            isInAnyRole: isInAnyRole,
            authenticate: authenticate,
            identity: identity,
            cleanUp: cleanUp
        };

        return service;

        ////////////////

        function isIdentityResolved(){
            return angular.isDefined(_identity);
        }

        function isAuthenticated(){
            return _authenticated;
        }

        function isInRole(role){
            if (!_authenticated || !_identity.roles) return false;

            return _identity.roles.indexOf(role) != -1;
        }

        function isInAnyRole(roles){
            if (!_authenticated || !_identity.roles) return false;

            for (var i = 0; i < roles.length; i++) {
                if (this.isInRole(roles[i])) return true;
            }

            return false;
        }

        function authenticate(user){
            var deferred = $q.defer();
            var data = {
                'grant_type':'passsword',
                'client_id': configuration.clientId,
                'client_secret':configuration.clientSecret,
                'username': user.email,
                'password': user.password
            };

            $http.post(configuration.oauthUri + '/oauth/token', data)
                .success(function(token) {
                    $window.sessionStorage["auth-token"]=token.access_token;
                    $http.defaults.headers.common['Authorization'] = "Bearer "+token.access_token;
                    $rootScope.$broadcast('authentication-successful',token);
                    deferred.resolve(token);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function identity(force){

            var deferred = $q.defer();

            if (force === true) _identity = undefined;

            // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            $http.get(configuration.oauthUri + '/me', { ignoreErrors: true })
                .success(function(data) {
                    _identity = data;
                    _authenticated = true;
                    deferred.resolve(_identity);
                })
                .error(function () {
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                });

            return deferred.promise;

        }

        function cleanUp(){
            _identity = undefined;
            _authenticated = false;
            delete $window.sessionStorage["auth-token"];
            delete $http.defaults.headers.common['Authorization'];
            $rootScope.$broadcast('user-signedout',null);

        }
    }
})();
