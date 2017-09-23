import * as React from "react";
import {observer} from "mobx-react";
import {Snackbar} from "react-toolbox/lib/snackbar";

const NetworkErrorMessage = observer(props => (
    <Snackbar active={true} label='Load failed - Check Internet'/>
));

export default NetworkErrorMessage;
