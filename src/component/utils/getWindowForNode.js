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

const getShadowRootFromSelector = require('getShadowRootFromSelector');

function getWindowForNode(
  node: ?Node,
  shadowRootSelector: ShadowRootSelector,
): any {
  if (shadowRootSelector !== null) {
    return getShadowRootFromSelector(shadowRootSelector);
  }
  if (!node || !node.ownerDocument || !node.ownerDocument.defaultView) {
    return window;
  }
  return node.ownerDocument.defaultView;
}

module.exports = getWindowForNode;
