import { html, LitElement } from 'lit';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';
// import * as extractCSS from "component-css-extractor";

class LitReactWrapper extends LitElement {
  
  static get properties(){
    return {
      mountPoint: Object,
      props: Object,
      element: Object,
      styles: Array
    }
  }
  
  constructor(){
    super();
    this.props={};
  }
  
  render() {
    return html`
      <div id="mountPoint"></div>
    `;
  }

  createElement() {
    console.log(this.element)
    console.log(React.createRef(this.element))
    this.reactElement = React.createElement(this.element, this.props, React.createElement('slot'));
    console.log(this.reactElement)
    return this.reactElement;
  }
  
  renderElement(){
    const jss = create({
      ...jssPreset(),
      insertionPoint: this.mountPoint
    });
    ReactDOM.render(
      <StylesProvider jss={jss} sheetsManager={new Map()}>
        {this.createElement()}
      </StylesProvider>,
      this.mountPoint
    );
  }

  firstUpdated() {
    this.mountPoint = this.shadowRoot.getElementById('mountPoint');
    this.renderElement();
    console.log(this.shadowRoot)
    for(var o in document.getElementsByTagName("style")){
      this.shadowRoot.appendChild(document.getElementsByTagName("style")[o])
    }
    console.log(this.shadowRoot.getElementById('mountPoint').firstChild)
    retargetEvents(this.shadowRoot);
  }

  updated(changedProperties){
    if(changedProperties)
    console.log(document.getElementsByTagName("style"))
      this.renderElement();
  }

}

window.customElements.define('lit-react-wrapper', LitReactWrapper);