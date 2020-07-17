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
 * Loop through parent nodes and check for a ShadowRoot object
 */
function getShadowRootIfExistsFromNode(node: ?node): any {
  if (!node) {
    return null;
  }

  for (; node; node = node.parentNode) {
    if (node.toString() === '[object ShadowRoot]') {
      return node;
    }
  }
  return null;
}

module.exports = getShadowRootIfExistsFromNode;
