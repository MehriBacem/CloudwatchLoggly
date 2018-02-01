'use strict';

const co         = require('co');
const log        = require('./log');
const http       = require('./http');
const apiHandler = require('./apiHandler');
const sns        = require('./sns');

const reqContext = require('./requestContext');
const snsTopic   = process.env.snsTopic;


module.exports.handler = apiHandler(
  co.wrap(function* (event, context) {
    reqContext.set("character-a", "tywin");

    log.debug("this is a DEBUG log");
    log.info("this is an INFO log");
    log.warn("this is a WARNING log");
    log.error("this is an ERROR log");

    
    yield sns.publish(snsTopic, "Burn them all");

    log.info("published SNS message", { snsTopic });

    return {
      message: 'A Lannister always pays his debts'
    };
  })
);