import util from 'util';
import logger from './logger.js';

console.log('procss:', process.version);
console.log('buffer', Buffer.from('abcd'));
console.log('util:', util.format('%s:%s', 'foo', 'bar'));
logger('log', 'logger');
