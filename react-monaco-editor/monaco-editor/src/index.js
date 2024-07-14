
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMonacoEditor from './ReactMonacoEditor'

class ReactMonacoEditorWrapper extends HTMLElement {
  connectedCallback() {
    const initialValue = this.getAttribute('initial-value') || '';
    const filePath = this.getAttribute('filePath') || '';
    const onValueChange = (newValue) => {
      this.dispatchEvent(new CustomEvent('valueChange', { detail: newValue }));
    };

    ReactDOM.render(
      React.createElement(ReactMonacoEditor, { filePath: filePath, initialValue: initialValue, onValueChange: onValueChange }),
      this
    );
  }
}

customElements.define('react-monaco-editor', ReactMonacoEditorWrapper);
