colorBlocks.factory('Game', ['$http', '$q', 'DataFactory',  function GameFactory($http, $q, DataFactory) {
  var users = [];
  var defaultColors = ['red', 'blue', 'magenta', 'green', 'pink'];

  function getAll() {
    return $http.get('/users');
  }

  function findUser() {
    var user_name = '';

    return $q(function(resolve, reject) {

      // Get user name
      while(!user_name.length) {
        user_name = prompt('Pick a user name');
      }

      // Get all users
      getAll()
        .then(function(result) {
          users = result.data;

          // If new user resolve with user_name else reject with user_name
          if(userExists(user_name)) {
            console.log('old user');
            getUser(user_name)
              .then(function (result) {
                DataFactory.user = result.data[0];
                DataFactory.colors = result.data[0].colors;
                resolve()
              })
              .catch(function (err) {
                console.log('GET user err:', err);
                reject()
              })
          } else {
            console.log('new user');
            addUser(user_name)
              .then(function (result) {
                getUser(user_name)
                  .then(function (result) {
                    DataFactory.user = result.data[0];
                    DataFactory.colors = result.data[0].colors;
                    resolve();
                  })
                  .catch(function (err) {
                    reject();
                    console.log('GET user err:', err);
                  });
              })
              .catch(function (err) {
                console.log('POST user err:', err);
                reject();
              })
          }

        })
        .catch(function (err) {
          console.log('GET users error:', err);
          reject();
        });
    });
  }

  function getUser(user_name) {
    return $http.get('/users/' + user_name);
  }

  function userExists(user_name) {
    return users.some(function (user) {
      return user.name === user_name;
    });
  }

  function addUser(user_name) {
    return $http.post('/users', {user_name: user_name, colors: defaultColors});
  }

  function updateSettings(user, colors) {
    return $http.post('/settings/' + user.id, {colors: colors});
  }

  return {
    addUser: addUser,
    getAll: getAll,
    getUser: getUser,
    findUser: findUser,
    updateSettings: updateSettings
  };
}]);
