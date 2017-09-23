import * as React from "react";
import {observer} from "mobx-react";
import style from "./style.scss"
import {ProgressBar} from "react-toolbox/lib/progress_bar";

const Spinner = observer(props => (
    <div className={style.spinnerContainer}>
        <ProgressBar type='circular' mode='indeterminate' multicolor/>
    </div>
));

export default Spinner;
