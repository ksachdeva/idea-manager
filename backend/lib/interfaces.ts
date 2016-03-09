'use strict';

import * as restify from 'restify';

export interface RequestEx extends restify.Request {
  user?: any;
}
