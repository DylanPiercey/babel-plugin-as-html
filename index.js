'use strict'

var BEFORE_OPEN_TAG = /[\n\t\r\s]+</mg
var AFTER_CLOSE_TAG = />[\n\t\r\s]+/mg
var BEFORE_CLOSE_ATTR = /\s+>/mg
var MULTI_SPACE = /\s{2,}/mg

/**
 * Babel plugin that looks for TemplateLiterals that are using the name `html` and minifies the contents.
 */
module.exports = function babelPluginAsHtml (babel) {
  var t = babel.types

  return {
    visitor: {
      CallExpression: function CallExpression (path) {
        var node = path.node

        if (t.isIdentifier(node.callee, { name: 'html' })) {
          if (t.isTemplateLiteral(node.arguments[0])) {
            transform(node.arguments[0].quasis)
          } else if (t.isTaggedTemplateExpression(node.arguments[0])) {
            transform(node.arguments[0].quasi.quasis)
          }
        }
      },
      TaggedTemplateExpression: function TaggedTemplateExpression (path) {
        var node = path.node

        if (t.isIdentifier(node.tag, { name: 'html' })) {
          transform(node.quasi.quasis)
        }
      }
    }
  }
}

/**
 * Transform an array of template literal values, minifying the html.
 */
function transform (quasis) {
  for (var i = quasis.length; i--;) {
    var el = quasis[i]
    var value = el.value
    if (el.type !== 'TemplateElement') continue
    value.raw = minify(value.raw)
    value.cooked = minify(value.cooked)
  }
}

/**
 * Take a string of html and remove all whitespace.
 */
function minify (html) {
  return String(html)
    .replace(BEFORE_OPEN_TAG, '<')
    .replace(AFTER_CLOSE_TAG, '>')
    .replace(BEFORE_CLOSE_ATTR, '>')
    .replace(MULTI_SPACE, ' ')
}
