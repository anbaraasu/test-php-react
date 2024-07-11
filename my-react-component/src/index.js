
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

class MyComponentWrapper extends HTMLElement {
  connectedCallback() {
    const initialValue = this.getAttribute('initial-value') || '';
    const onValueChange = (newValue) => {
      this.dispatchEvent(new CustomEvent('valueChange', { detail: newValue }));
    };

    ReactDOM.render(
      <MyComponent initialValue={initialValue} onValueChange={onValueChange} />,
      this
    );
  }
}

customElements.define('my-react-component', MyComponentWrapper);
