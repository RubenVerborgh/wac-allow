import { parse } from '../src/index';

describe('wac-allow', () => {
  describe('parse', () => {
    test('parses a string', () => {
      expect(parse('user="read"')).toEqual({
        user: new Set(['read']),
        public: new Set(),
      });
    });

    test('parses a plain object with headers', () => {
      const headers = {
        'other': 'other',
        'wac-allow': 'user="read"',
      };
      expect(parse(headers)).toEqual({
        user: new Set(['read']),
        public: new Set(),
      });
    });

    test('parses a Headers object', () => {
      const headers = new Map();
      headers.set('other', 'other');
      headers.set('wac-allow', 'user="read"');
      expect(parse(headers)).toEqual({
        user: new Set(['read']),
        public: new Set(),
      });
    });

    test('parses a Response object', () => {
      const headers = new Map();
      headers.set('wac-allow', 'user="read"');
      const response = { headers };
      expect(parse(response)).toEqual({
        user: new Set(['read']),
        public: new Set(),
      });
    });
  });
});
