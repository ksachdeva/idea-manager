'use strict';

import * as bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: 'ideaserver'
});

export default function getLogger(): bunyan.Logger {
  return log;
}
