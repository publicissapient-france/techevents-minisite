(function() {
    var createPackage = function(pkgName) {
        var splits = pkgName.split(".");
        var parent = window;
        $.each(splits, function(i, split) {
            if(!_.has(parent, split)) {
                parent[split] = {};
            }
            parent = parent[split];
        });
        return parent;
    };

    /**
     * AMD-like package definition system, to prepare application to be module-oriented.
     *
     * @param pkgName the name of the package to define or extend.
     * @param [options] optional options for this definition.
     * @param definitionMethod the package definition / extension method.
     */
    window.definePackage = function(pkgName, optionsOrMethod, methodIfOptions) {
        var pkg = createPackage(pkgName);
        var definitionMethod = methodIfOptions || optionsOrMethod;
        var definitionResult = definitionMethod(pkg);
        if(definitionResult) {
            _.extend(pkg, definitionResult);
        }
    };

})();

definePackage("fwk", function(pkg) {
    /**
     * Mixin to allow the usage of "super" method call in a backbone 'extend' class structure.
     *
     * Thanks to maxbrunsfeld
     * https://gist.github.com/1542120
     */
    var SuperMixin = pkg.SuperMixin = {
        // The super method takes two parameters: a method name
        // and an array of arguments to pass to the overridden method.
        // This is to optimize for the common case of passing 'arguments'.
        _super : function(methodName, args) {
            // Keep track of how far up the prototype chain we have traversed,
            // in order to handle nested calls to _super.
            this._superCallObjects || (this._superCallObjects = {});
            var currentObject = this._superCallObjects[methodName] || this,
                parentObject  = this.__findSuper__(methodName, currentObject);
            if(!parentObject||!parentObject[methodName]) {
                throw "No parent implementation found for method " + methodName;
            }
            this._superCallObjects[methodName] = parentObject;
            var result = parentObject[methodName].apply(this, args || []);
            delete this._superCallObjects[methodName];
            return result;
        },
        // Find the next object up the prototype chain that has a
        // different implementation of the method.
        __findSuper__ : function(methodName, childObject) {
            var object = childObject;
            while (object[methodName] === childObject[methodName]) {
                object = object.constructor.__super__;
            }
            return object;
        }
    };

    /**
     * base abstract class with initializer, Events mixin & backbone extend method.
     */
    var Class = pkg.Class = function() {
        this.initialize && this.initialize.apply(this, arguments);
    };
    // add Events behaviour
    _.extend(Class.prototype, Backbone.Events);
    // add super call capability
    _.extend(Class.prototype, SuperMixin);
    // add extend method
    Class.extend = Backbone.Model.extend;

});