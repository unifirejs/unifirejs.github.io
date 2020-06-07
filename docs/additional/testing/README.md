# Writing Tests

### State Mutations are Applied Synchronously

You can assert that a state change has been applied immediately after assigning it.

```js
import Unifire from 'unifire';

it('should change count', () => {
  const state = { count: 0 };
  const store = unifire({ state });

  store.state.count++;
  expect(store.state.count).toBe(1);
});
```

### Subscribers are Called Asynchronously

Unifire batches synchronous, sequential state mutations to optimize component redraws. This means that Unifire applies state mutations synchronously and calls subscribers asynchronously. The result is that you cannot expect a subscriber to have been called immediately after making a state change that will trigger that subscriber. Rather, you must wait until there have been no state changes for a tick. In order to help you accomplish this, Unifire exports a `tick` method from `unifire/devtools`. You can use it as follows.

```js
import Unifire from 'unifire';
import { tick } from 'unifire/devtools';

it('should call the count subscriber', async () => {
  const state = { count: 0 };
  const store = unifire({ state });
  const spy = jest.fn();

  store.subscribe([ 'count' ], ({ count }) => spy(count));
  store.state.count++;
  await tick();
  expect(spy).toHaveBeenCalledWith(store.state.count);
});
```

Because components rely on subscribers, this same behavior applies to component tests. (For brevity, I've excluded boilerplate code including the `<App>` component definition.)

```js
import { tick } from 'unifire/devtools';

it('should update the component', async () => {
  // Mount a component
  const wrapper = mount(<App />);
  // Assert that the initial value is correct
  expect(wrapper.find('.value').text()).toBe('0');
  // Mutate count
  store.state.count = 1;
  // Wait for Unifire to batch
  await tick();
  // Assert that the new value is correct
  expect(wrapper.find('.value').text()).toBe('1');
});
```
