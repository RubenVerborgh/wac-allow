import WacAllowParser from './WacAllowParser';

// Default parser instance
const parser = new WacAllowParser();
function parse(...args) { return parser.parse(...args); }

export {
  WacAllowParser,
  parse,
};
