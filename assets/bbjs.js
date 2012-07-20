// Models
var User = Backbone.Model.extend();

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'http://bbjs:8887/users.json'
});

// Views 

var UserListView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.model.bind("reset", this.render, this);
  },

  render: function(eventName) {
    _.each(this.model.models, function(user) {
      console.log(user)
        $(this.el).append(new UserListItemView({model: user}).render().el);
      }, this);

    return this;
  }
});

var UserListItemView = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#tpl-user-list-item').html()),

  render: function(eventName) {
    console.log(this.model.toJSON())
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var UserView = Backbone.View.extend({
  template: _.template($('#tpl-user-details').html()),

  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

// Router
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "list",
    "user/:uid": "UserDetails"
  },

  list: function() {
    this.userList     = new UserCollection();
    this.userListView = new UserListView({model: this.userList});
    this.userList.fetch();
    $('#selection').html(this.userListView.render().el);
  },

  userDetails: function(uid) {
    this.user     = this.userList.get(uid);
    this.userView = new UserView({model: this.user});
    $('#user-details').html(this.userView.render().el);
  }
});

console.log('starting on line 68')
var app = new AppRouter();
Backbone.history.start();