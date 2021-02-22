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

import type {ShadowRootSelector} from 'DraftDOMTypes';

const getShadowRootFromSelector = require('getShadowRootFromSelector');

function getCorrectDocumentOrShadowRootFromNode(
  node: ?Node,
  shadowRootSelector: ShadowRootSelector,
): Node {
  if (shadowRootSelector != null) {
    return getShadowRootFromSelector(shadowRootSelector);
  }
  if (!node || !node.ownerDocument) {
    return document;
  }
  return node.ownerDocument;
}

module.exports = getCorrectDocumentOrShadowRootFromNode;
