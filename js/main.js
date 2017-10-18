/* global m,Velocity */
(function() {
    
    var util = window.util = window.util || {
        q: function(sel, ctx) {
            return (ctx || document).querySelector(sel);
        },
        qq: function(sel, ctx) {
            return [].slice.call((ctx || document).querySelectorAll(sel));
        },
        v: function(sel, args, ctx, speed) {
            return Velocity(this.q(sel, ctx), args, speed || 250);
        }
    };
    
    var app = window.app = window.app || {};
    
    var menuItems   = {};
    app.shared      = {};
    app.cmp         = { common: {} };
    app.model       = {};
    
    var layout = function(route, content) {
        return m('div#layout', [
            m(app.cmp.common.menu, {
                items: menuItems
            }),
            m('div#header', {
                class: route.class
            }, m('span', route.title)),
            m('div#content', content),
            m('div#loading',
                m('img', {  src: '/images/loading.gif' })
            )
        ]);
    };
    
    var render = function(route, args) {
        return {
          oninit: function() {
              document.title = route.title;
          },
          view: function() {
              var content = m(route.component, args || {});
              
              return layout(route, content);
          }
        };
    };
    
    var loadRoutes = function() {
        menuItems = {
            '/': {
                title: 'Home',
                icon: 'tree',
                class: 'primary',
                component: app.cmp.home
            },
            '/about': {
                title: 'About',
                icon: 'question',
                class: 'secondary',
                component: app.cmp.about
            }
        };
        m.route.mode = 'pathname';
        var routes = {};
        
        for(var i in menuItems) {
        
            if(menuItems.hasOwnProperty(i) && !routes.hasOwnProperty(i))
                routes[i] = render(menuItems[i]);
        }
        
        m.route(document.body, '/', routes);
    };
    
    var dependencies = {
        components: [
            'home', 'about', 'common/menu', 'common/detail-box', 'common/toggle', 'common/form'
        ]
    };
    
    // load dependencies
    var count = 0;
    
    var done = function(){
        if(++count == Object.keys(dependencies).length) {
            loadRoutes();
        }
    };
    
    for(var category in dependencies) {
        if(dependencies.hasOwnProperty(category) && dependencies[category].length)
            app.loadDependency('/js/' + category + '/', dependencies[category], done);
    }
    
}());