const HEADER_NAME = 'wac-allow';

export default class WacAllowParser {
  /** Parses the given WAC-Allow string */
  parseString(value = '') {
    // Always include user and public
    const permissions = {
      user: new Set(),
      public: new Set(),
    };

    // Find all user entries in the string
    let entry;
    const entryMatcher = /(\w+)\s*=\s*"?\s*((?:\s*[^"\s]+)*)\s*"?/g;
    while (entry = entryMatcher.exec(value)) {
      // Create a permissions set for the user
      const [, user, allowed] = entry;
      if (!(user in permissions))
        permissions[user] = new Set();

      // Add all the user's permissions to the set
      if (allowed.length > 0) {
        for (const permission of allowed.split(/\s+/))
          permissions[user].add(permission.toLowerCase());
      }
    }
    return permissions;
  }

  /** Parses the given headers object */
  parseHeaders(headers = {}) {
    const header = typeof headers.get === 'function' ?
      headers.get(HEADER_NAME) : headers[HEADER_NAME];
    return this.parseString(header) || '';
  }

  /** Parses the given response object */
  parseResponse({ headers } = {}) {
    return this.parseHeaders(headers);
  }
}
