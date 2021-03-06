'use strict';

const co         = require('co');
const log        = require('./log');
const snsHandler = require('./snsHandler');
const http       = require('./http');
const reqContext = require('./requestContext');

module.exports.handler = snsHandler(
  co.wrap(function* (event, context) {
    reqContext.set("source-type", "sns");

    log.debug("this is a DEBUG log");
    log.info("this is an INFO log");
    log.warn("this is a WARNING log");
    log.error("this is an ERROR log");

    let host = reqContext.get()["x-correlation-host"];
    if (host) {
      let uri  = `https://${host}/dev/api-c`;
      
      log.info("calling api-c", { uri });
    
      let reply = yield http({
        uri     : uri,
        method  : 'GET'
      });
    
      log.info(reply);
    }  
  })
);