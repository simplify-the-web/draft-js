/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 * @emails oncall+draft_js
 */

import type {ShadowRootSelector} from 'DraftDOMTypes';

const camelize = require('camelize');
const getShadowRootFromSelector = require('getShadowRootFromSelector');
const hyphenate = require('hyphenate');

// function asString(value) /*?string*/ {
//   return value == null ? value : String(value);
// }

// function getShadowElementStyleProperty(node: Node, name: string) /*?string*/ {
//   let computedStyle;

//   // W3C Standard
//   if (window.getComputedStyle) {
//     // In certain cases such as within an iframe in FF3, this returns null.
//     computedStyle = window.getComputedStyle(node, null);
//     if (computedStyle) {
//       return asString(computedStyle.getPropertyValue(hyphenate(name)));
//     }
//   }
//   // Safari
//   if (document.defaultView && document.defaultView.getComputedStyle) {
//     computedStyle = document.defaultView.getComputedStyle(node, null);
//     // A Safari bug causes this to return null for `display: none` elements.
//     if (computedStyle) {
//       return asString(computedStyle.getPropertyValue(hyphenate(name)));
//     }
//     if (name === 'display') {
//       return 'none';
//     }
//   }
//   // Internet Explorer
//   if (node.currentStyle) {
//     if (name === 'float') {
//       return asString(
//         node.currentStyle.cssFloat || node.currentStyle.styleFloat,
//       );
//     }
//     return asString(node.currentStyle[camelize(name)]);
//   }
//   return asString(node.style && node.style[camelize(name)]);
// }

/**
 * @param {DOMNode} element [description]
 * @param {string} name Overflow style property name.
 * @return {boolean} True if the supplied ndoe is scrollable.
 */
function _isNodeScrollable(element: Node, name: string) {
  var overflow = element.style && element.style[name];
  return overflow === 'auto' || overflow === 'scroll';
}

/**
 * Loop through nodes looking for a scrollable node until reaching
 * the ShadowRoot node.
 */
function getShadowRootScrollParent(
  node: ?Node,
  shadowRootSelector: ShadowRootSelector,
) {
  if (!node) {
    return null;
  }
  if (shadowRootSelector === null) {
    return null;
  }
  const shadowRoot = getShadowRootFromSelector(shadowRootSelector);
  while (node && node !== shadowRoot) {
    if (
      _isNodeScrollable(node, 'overflow') ||
      _isNodeScrollable(node, 'overflowY') ||
      _isNodeScrollable(node, 'overflowX')
    ) {
      return node;
    }
    node = node.parentNode;
  }
  return shadowRoot;
}

module.exports = getShadowRootScrollParent;
