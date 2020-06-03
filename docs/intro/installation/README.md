# Installation

### Modern vs Legacy Bundles

In order to deliver smaller bundles, Unifire exports modern JavaScript targetting evergreen browsers. That means when you call

```js
import Unifire from 'unifire';
import { memoize } from 'unifire/utils';
```

you get the smallest, most modern code possible.


If you need to target older browsers, we've got you covered. Just change your import path to the desired file as follows

```js
// Import commonjs versions of Unifire
import Unifire from 'unifire/dist/unifire';
import { memoize } from 'unifire/utils/dist/utils';
```

Available files are

* `unifire.modern` - this is the default
* `unifire` - commonjs
* `unifire.esm` - esmodule
* `unifire.umd` - umd

### Build System

```
yarn add unifire
```

```
npm i unifire
```

### CDN

(I should default to the UMD build here for both index and utils.)

You can download Unifire's UMD build from unpkg directly at [https://unpkg.com/unifire@1.0.0/dist/unifire.umd.js](https://unpkg.com/unifire@1.0.0/dist/unifire.umd.js).
