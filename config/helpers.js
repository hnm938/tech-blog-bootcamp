const Handlebars = require("handlebars");

// Define a blocks object to store content for each block
Handlebars.blocks = {};

// Custom Handlebars helper to extend layouts
Handlebars.registerHelper("extend", function (name, context) {
  let block = Handlebars.blocks[name];
  if (!block) {
    block = Handlebars.blocks[name] = [];
  }
  block.push(context.fn(this));
});

// Custom Handlebars helper to insert content into blocks
Handlebars.registerHelper("block", function (name) {
  const val = (Handlebars.blocks[name] || []).join("\n");
  // Clear the block content for reusability
  Handlebars.blocks[name] = [];
  return new Handlebars.SafeString(val);
});

module.exports = Handlebars;
