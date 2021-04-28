/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 * @emails oncall+draft_js
 */

function isHTMLElement(node: ?Node): boolean {
  if (!node || !node.ownerDocument) {
    return false;
  }
  if (!node.ownerDocument.defaultView) {
    return node instanceof HTMLElement;
  }
  // *Fixes Bug on sites that use custom elements*
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
  // ***********************************************************
  // If node doesn't match HTMLElement then also check for a
  // HTMLElementOrig property that is set by custom elements
  if (
    node instanceof node.ownerDocument.defaultView.HTMLElement ||
    node instanceof node.ownerDocument.defaultView.HTMLElementOrig
  ) {
    return true;
  }
  return false;
}

module.exports = isHTMLElement;
