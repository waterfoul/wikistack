module.exports = {
  Page: require('./page'),
  User: require('./user'),
  syncAll: function(){
    return Promise.all([
      module.exports.Page.sync(),
      module.exports.User.sync()
    ]);
  }
}
