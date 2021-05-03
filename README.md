<p align="center">
    <h1 align="center">react-autosaver</h1>
</p>

<p align="center">
  <a href="https://github.com/IntegryHQ/react-autosaver/">
    <img src="https://flat.badgen.net/npm/v/react-autosaver" />
  </a>
  <img src="https://flat.badgen.net/npm/dm/react-autosaver" />
  <img src="https://flat.badgen.net/npm/types/react-autosaver" />
  <a href="https://bundlephobia.com/result?p=react-autosaver">
  <img src="https://flat.badgen.net/bundlephobia/min/react-autosaver" />
  </a>
  <a href="https://github.com/IntegryHQ/react-autosaver/">
    <img src="https://flat.badgen.net/github/tag/IntegryHQ/react-autosaver" />
  </a>
  <img src="https://flat.badgen.net/badge/license/MIT/green" />
  <img src="https://flat.badgen.net/github/issues/IntegryHQ/react-autosaver" />
  <img src="https://flat.badgen.net/github/open-prs/IntegryHQ/react-autosaver" />
  <img src="https://flat.badgen.net/snyk/IntegryHQ/react-autosaver" />
</p>

> ⚠️ This library is currently pre-release and the API is subject to change without warning!

## Introduction

### Who is this package for?

Consider using this component if:

1. You are looking to integrate auto-save functionality in an input-based form
2. You are looking for a solution where auto-save occurs with a configurable delay
3. You are looking to bind auto-save events to input events such as blur or when user becomes idle

### What does this package do?

1. Exposes a component called `AutoSaver` that has a prop `onAutosave` which allows you to specify a callback whenever the component determines that auto save should occur

2. Exposes a component called `WatchChanges` which can be placed as a child of the parent `AutoSaver`. This component can bind to inputs using React refs and triggers whenever the following happens:

- An input is blurred
- An input `onChange` callback fires and then becomes idle
- `didChangeHappen` callback function is manually called

3. Allows configuring a global auto-save delay for the `onAutosave` callback

4. Allows configuring auto-save delays per `WatchChanges` instance, so you can fine tune exactly how soon or late the autosave event is triggered on per-component basis

## Installation

Install the library using a package manager of your choice:

```shell
# npm
npm i react-autosaver --save

# yarn
yarn add react-autosaver
```

Import components as needed:

```js
import { AutoSave } from 'react-autosaver';
```

> This library has the following peer dependencies:

```json
"prop-types": "^15.7.2"
"react": "^16.8.0"
"react-dom": "^16.8.0"
```

## How to Use

### Minimal example

Here is a fully functional example showing `react-autosaver` in action:

```jsx
import React, { useState, useCallback } from 'react';
import { AutoSave, WatchChanges } from 'react-autosaver';

export default function App() {
  const [input, setInput] = useState('');

  const triggerAutoSave = useCallback(() => {
    console.log('Lets autosave now!');
  }, []);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <AutoSave onAutosaveTriggered={triggerAutoSave}>
      {() => (
        <WatchChanges triggerMode="BLUR">
          {({ autosaveInputRef }) => {
            return (
              <>
                <label>I trigger autosave on blur</label>
                <input
                  ref={autosaveInputRef}
                  value={input}
                  onChange={onInputChange}
                />
              </>
            );
          }}
        </WatchChanges>
      )}
    </AutoSave>
  );
}
```

### Triggering auto-save manually

`WatchChanges` exposes a `didChangeHappen` callback function which you can call manually. You are not restricted to using inputs bound with a ref, and can manually trigger autosave whenever you determine a save should occur based on your application logic.

```jsx
<WatchChanges triggerMode="IDLE" inputInputIdleDelay={1500}>
  {({ didChangeHappen }) => {
    return (
      <>
        <label>Custom input which autosaves manually</label>
        <input
          onChange={() => {
            didChangeHappen();
          }}
        />
      </>
    );
  }}
</WatchChanges>
```

### Features

- TypeScript support
- **ES modules** support
- Does not rely on other third-party dependencies

## Testing

`// TODO`

## Contributing

`// TODO`
