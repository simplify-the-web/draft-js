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

const getShadowRootIfExistsFromNode = require('getShadowRootIfExistsFromNode');

function getWindowForNode(node: ?Node): any {
  const shadowRoot = getShadowRootIfExistsFromNode(node);
  if (shadowRoot) {
    return shadowRoot;
  }
  if (!node || !node.ownerDocument || !node.ownerDocument.defaultView) {
    return window;
  }
  return node.ownerDocument.defaultView;
}

module.exports = getWindowForNode;
