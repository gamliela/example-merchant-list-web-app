import * as React from "react";
import * as ReactDOM from "react-dom";
import {useStrict} from "mobx";
import 'react-toolbox/lib/commons.scss';
import 'material-design-icons/iconfont/material-icons.css';
import App from "./App";

// mobx configuration
useStrict(true);

ReactDOM.render(
    <App/>,
    document.getElementById('app-root'));
