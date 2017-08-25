import { WacAllowParser } from '../src/index';

describe('WacAllowParser', () => {
  describe('A WacAllowParser instance', () => {
    let parser;
    beforeAll(() => {
      parser = new WacAllowParser();
    });

    describe('parseString', () => {
      test('parses the empty string', () => {
        expect(parser.parseString('')).toEqual({
          user: new Set(),
          public: new Set(),
        });
      });

      test('parses a user with empty permissions', () => {
        expect(parser.parseString('user=""')).toEqual({
          user: new Set(),
          public: new Set(),
        });
      });

      test('parses a user with whitespace as permissions', () => {
        expect(parser.parseString('user="  "')).toEqual({
          user: new Set(),
          public: new Set(),
        });
      });

      test('parses a user with a single permission', () => {
        expect(parser.parseString('user="read"')).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });

      test('parses a user with three permissions', () => {
        expect(parser.parseString('user="read write append"')).toEqual({
          user: new Set(['read', 'write', 'append']),
          public: new Set(),
        });
      });

      test('parses permissions with irregular whitespace and capitalization', () => {
        expect(parser.parseString('user=" READ  wriTe   Append "')).toEqual({
          user: new Set(['read', 'write', 'append']),
          public: new Set(),
        });
      });

      test('parses permissions without quotes', () => {
        expect(parser.parseString('user=read write append')).toEqual({
          user: new Set(['read', 'write', 'append']),
          public: new Set(),
        });
      });

      test('parses two users with multiple permissions', () => {
        expect(parser.parseString('user="read write append",public="read append"')).toEqual({
          user: new Set(['read', 'write', 'append']),
          public: new Set(['read', 'append']),
        });
      });

      test('parses three users with multiple permissions', () => {
        expect(parser.parseString('user="read write append",public="read append", other="read"')).toEqual({
          user: new Set(['read', 'write', 'append']),
          public: new Set(['read', 'append']),
          other: new Set(['read']),
        });
      });
    });

    describe('parseHeaders', () => {
      test('parses a plain object', () => {
        const headers = {
          'other': 'other',
          'wac-allow': 'user="read"',
        };
        expect(parser.parseHeaders(headers)).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });

      test('parses a Headers object', () => {
        const headers = new Map();
        headers.set('other', 'other');
        headers.set('wac-allow', 'user="read"');
        expect(parser.parseHeaders(headers)).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });
    });

    describe('parseResponse', () => {
      test('parses a Response object', () => {
        const headers = new Map();
        headers.set('wac-allow', 'user="read"');
        const response = { headers };
        expect(parser.parseResponse(response)).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });
    });

    describe('parse', () => {
      test('parses a string', () => {
        expect(parser.parse('user="read"')).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });

      test('parses a plain object with headers', () => {
        const headers = {
          'other': 'other',
          'wac-allow': 'user="read"',
        };
        expect(parser.parse(headers)).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });

      test('parses a Headers object', () => {
        const headers = new Map();
        headers.set('other', 'other');
        headers.set('wac-allow', 'user="read"');
        expect(parser.parse(headers)).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });

      test('parses a Response object', () => {
        const headers = new Map();
        headers.set('wac-allow', 'user="read"');
        const response = { headers };
        expect(parser.parse(response)).toEqual({
          user: new Set(['read']),
          public: new Set(),
        });
      });
    });
  });
});
