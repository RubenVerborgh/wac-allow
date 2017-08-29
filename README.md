# JavaScript WAC-Allow parser
[![npm version](https://badge.fury.io/js/wac-allow.svg)](https://www.npmjs.com/package/wac-allow)
[![Build Status](https://travis-ci.org/solid/wac-allow.svg?branch=master)](https://travis-ci.org/solid/wac-allow)

This npm library parses the `WAC-Allow` HTTP header,
which indicates the permissions of the user and the public
on the resource.

## The WAC-Allow HTTP header
The `WAC-Allow` header,
as used by the [Solid](https://github.com/solid/node-solid-server/) server,
lists the permissions of the currently logged in user on the given resource,
as well as the permissions of anonymous users.
Example:

```
WAC-Allow: user="read write", public="read"
```

## Installation
```bash
$ npm install wac-allow
```

## Usage
### `parse` method
This library exports a convenience method `parse`,
which returns a key/value object of users
and the set of permissions they have.
The `user` key represents the current user;
the `public` key represents everyone that is not logged in.
Both keys are always present,
regardless of whether they occur in the parsed `WAC-Allow` header.
Example:
```javascript
import * as WacAllow from 'wac-allow';

// The input can be a string, or a Response or Header object
fetch('https://drive.verborgh.org/profile/card').then(response => {
  const { user, public } = WacAllow.parse(response);
  console.log('Current user permissions:', user);    // new Set(["read"])
  console.log('Anonyous user permissions:', public); // new Set(["read"])
});
```

### `WacAllowParser` class
Alternatively, you can use the `WacAllowParser` class,
which offers specific methods per type.
Example:
```javascript
import { WacAllowParser } from 'wac-allow';

const parser = new WacAllowParser();
console.log(parser.parseString('user="read write", public="read"'));

fetch('https://drive.verborgh.org/profile/card').then(response => {
  // All options below return the same result
  console.log(parser.parse(response));
  console.log(parser.parseResponse(response));
  console.log(parser.parseHeaders(response.headers));
  console.log(parser.parseString(response.headers.get('WAC-Allow')));
});
```
