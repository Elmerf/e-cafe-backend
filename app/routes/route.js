'use strict';

module.exports = function(app) {
    var todoList = require('../controllers/controller');

    app.route('/')
        .get(todoList.index);

    app.route('/menus/favorited')
        .get(todoList.favoritedMenus);
    
    app.route('/menus')
        .get(todoList.allMenu);
};