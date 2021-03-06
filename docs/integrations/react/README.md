# unifire-react

If this is your first time here, please start with the Core Concepts section to get to know Unifire.

The `unifire-react` NPM package is a first-party repo providing tight, customizable integration with Unifire.


## Install

```
yarn add unifire-react
```

or

```
npm i unifire-react
```

## Provider

If you intend to use a single-store setup, start by adding `<Provider>` at the root of your application as follows:

```js
import { store } from '../path/to/my/store';
import { Provider } from 'unifire-react';

const App = () => (
  <Provider value={store}>
    ...
  </Provider>
);

export default App;
```

This will allow `unifire-react`'s other methods to automatically tap into your app-wide store from any component.

## Observer

The `Observer` HOC accepts a component. You can use it as follows:

```js
import { Observer } from 'unifire-react';

const Counter = ({ count, fire }) => (
  <div>
    <button onClick={() => fire('decrement')}>-</button>
    <span>{count}</span>
    <button onClick={() => fire('increment')}>-</button>
  </div>
);

export default Observer(Counter);
```

Notice in the code example above that `Counter` is a pure function. The component accepts an object containing properties from the following sources:

1. the props passed to it by its parent component, if any
2. `store.state`
3. `store.fire`

Unifire will detect which state properties your component reads and only redraw the component when one of those state properties changes.

> Be sure to avoid naming collisions as all properties are merged into the same object.

If you wish to use a multi-store setup, you can overload `Observer` by passing a Unifire instance as the first argument. Even if your app has a global store registered via the `Provider` HOC, passing a store instance to `Observer` will cause this component to bind to the passed store rather than the global store.

```js
import { counterStore } from '../path/to/my/store';
import { Observer } from 'unifire-react';

const Counter = ({ count, fire }) => (
  <div>
    <button onClick={() => fire('decrement')}>-</button>
    <span>{count}</span>
    <button onClick={() => fire('increment')}>-</button>
  </div>
);

export default Observer(counterStore, Counter);
```

## useUnifireState

The `useUnifireState` hook is very similar to react's own `useState` hook. Let's write the same `Counter` component we wrote above using `useUnifireState` instead of `Observer`.

```js
import { useUnifireState } from 'unifire-react';

const Counter = () => {
  const [ count, setCount ] = useUnifireState('count');
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>-</button>
    </div>
  );
};

export default Counter;
```

In this example, `useUnifireState` subscribes this component to `store.state.count` and returns `count` and `setCount`.

As with the `Observer` HOC, you can overload `useUnifireState` by providing a Unifire instance.

```js
import { counterStore } from '../path/to/my/store';
import { useUnifireState } from 'unifire-react';

const Counter = () => {
  const [ count, setCount ] = useUnifireState(counterStore, 'count');
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>-</button>
    </div>
  );
};

export default Counter;
```

## useUnifire

Where `useUnifireState` allows you to access a single state property per call and does not expose `fire`, `useUnifire` allows you to access multiple state properties and exposes `fire` all in one line of code.

```js
import { useUnifire } from 'unifire-react';

const Counter = () => {
  const [ state, fire ] = useUnifire([ 'count', 'someOtherProp' ]);
  return (
    <div>
      <h3>{state.someOtherProp}</h3>
      <button onClick={() => fire('decrement')}>-</button>
      <span>{state.count}</span>
      <button onClick={() => fire('increment')}>-</button>
    </div>
  );
};

export default Counter;
```

`useUnifire` accepts an array of state property names and returns `store.state` and `store.fire`.

You can, of course, destructure `state` if you prefer.

```js
const [ { count, someOtherProp }, fire ] = useUnifire([ 'count', 'someOtherProp' ]);
```

As with the other exports documented, `useUnifire` allows you to optionally pass a Unifire instance.

```js
import { counterStore } from '../path/to/my/store';
import { useUnifire } from 'unifire-react';

const Counter = () => {
  const [ state, fire ] = useUnifire(counterStore, [ 'count', 'someOtherProp' ]);
  return (
    <div>
      <h3>{state.someOtherProp}</h3>
      <button onClick={() => fire('decrement')}>-</button>
      <span>{count}</span>
      <button onClick={() => fire('increment')}>-</button>
    </div>
  );
};

export default Counter;
```
