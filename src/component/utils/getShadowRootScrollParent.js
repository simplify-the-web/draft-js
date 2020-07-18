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

/**
 * @param {DOMNode} element [description]
 * @param {string} name Overflow style property name.
 * @return {boolean} True if the supplied ndoe is scrollable.
 */
function _isNodeScrollable(element, name) {
  var overflow = element.style[name];
  return overflow === 'auto' || overflow === 'scroll';
}

/**
 * Loop through nodes looking for a scrollable node until reaching
 * the ShadowRoot node.
 */
function getShadowRootScrollParent(node, shadowRootSelector) {
  if (!node) {
    return null;
  }
  const shadowRoot = document.querySelector(shadowRootSelector).shadowRoot;
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
