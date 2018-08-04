var objectAssign = require('object-assign');
var process = require('./lib/process');
var RETURN_VALUE = function (inValue) { return inValue };
var DEFAULT_FORMAT = 'tar';

/**
 * Configure the plugin
 * @param {Options} inOptions
 */
function <%= ProjectName %>(inOptions) {
  var options = objectAssign({
    format: DEFAULT_FORMAT,
    returnValue: RETURN_VALUE
  }, inOptions);

  this.options = options;
}


/**
 * Implement the plugin
 */
<%= ProjectName %>.prototype.apply = function (compiler) {
  var self = this;
  var updateOptions = function (compilation) {
    Object.assign(self.options, {
      output: self.options.output(compiler.options.output.path, self.options.ext),
      assets: compilation.assets
    })
  };

  if (compiler.hooks) {
    // webpack >=4.0
    compiler.hooks.emit.tap('<%= ProjectName %>', function (compilation) {
      updateOptions(compilation);
      return process(self.options);
    });
  } else {
    // webpack < 4.0:
    compiler.plugin('emit', function (compilation) {
      updateOptions(compilation);
      return process(self.options);
    });
  }
};

module.exports = <%= ProjectName %>;
