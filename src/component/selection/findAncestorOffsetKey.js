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

'use strict';

import type {ShadowRootSelector} from 'DraftDOMTypes';

const getCorrectDocumentFromNode = require('getCorrectDocumentFromNode');
const getCorrectDocumentOrShadowRootFromNode = require('getCorrectDocumentOrShadowRootFromNode');
const getSelectionOffsetKeyForNode = require('getSelectionOffsetKeyForNode');
/**
 * Get the key from the node's nearest offset-aware ancestor.
 */
function findAncestorOffsetKey(
  node: Node,
  shadowRootSelector: ?ShadowRootSelector,
): ?string {
  let searchNode = node;
  let rootNode;
  if (shadowRootSelector) {
    rootNode = getCorrectDocumentOrShadowRootFromNode(node, shadowRootSelector);
  } else {
    rootNode = getCorrectDocumentFromNode(node).documentElement;
  }
  while (
    searchNode &&
    searchNode !==
      getCorrectDocumentOrShadowRootFromNode(node, shadowRootSelector)
        .documentElement
  ) {
    const key = getSelectionOffsetKeyForNode(searchNode);
    if (key != null) {
      return key;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

module.exports = findAncestorOffsetKey;
