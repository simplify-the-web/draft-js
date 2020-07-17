/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 * @emails oncall+draft_js
 */

const getShadowRootIfExistsFromNode = require('getShadowRootIfExistsFromNode');

function getCorrectDocumentFromNode(node: ?Node, checkForShadow): Document {
  if (checkForShadow) {
    const shadowRoot = getShadowRootIfExistsFromNode(node);
    if (shadowRoot) {
      return shadowRoot;
    }
  }
  if (!node || !node.ownerDocument) {
    return document;
  }
  return node.ownerDocument;
}

module.exports = getCorrectDocumentFromNode;
