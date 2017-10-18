(function() {
    var app = window.app = window.app || {};
    
    app.loadDependency = function(path, modules, done) {
        var loaded = 0;
        
        var load = function() {
            loaded += 1;
            if (loaded === modules.length) done();
        };
        
        modules.forEach(function(mod, i) {
            console.log('loading \'' + path + mod + '.js\'');
            var script = document.createElement('script');
            script.onload = load;
            script.src = path + mod + '.js';
            document.head.appendChild(script);
        });
        
    };
}());
