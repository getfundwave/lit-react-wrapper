### Lit React Wrapper 1.0.0

Use React or Material-UI components in your lit-element web component.

### Install

```
npm i lit-react-wrapper
```

### Usage

```
// Import the lit-react-wrapper to your existing web component project
import "lit-react-wrapper";

// Import the react component
import {ProfileCard} from "my-react-project";

// Props to be sent to the react component
let props = {"name":"Isha Sharma","organization":"Fundwave"}

// Render the react component inside your web component
<lit-react-wrapper .element=${ProfileCard} .props=${props}></lit-react-wrapper>
```
