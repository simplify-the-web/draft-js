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
 * Query document using shadow root node selector to find shadow root
 */
function getShadowRootFromSelector(selector: string): any {
  const rootNode = document.querySelector(selector);
  if (rootNode) {
    return rootNode.shadowRoot;
  } else {
    return null;
  }
}

module.exports = getShadowRootFromSelector;
