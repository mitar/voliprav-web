"use strict";
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
exports.__esModule = true;
var history_1 = require("history");
// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
exports["default"] = process.env.BROWSER && (0, history_1.createBrowserHistory)();
