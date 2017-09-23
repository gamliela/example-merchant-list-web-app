import * as React from "react";
import {observer} from "mobx-react";
import style from "./style.scss"
import {MerchantDevicesModel} from "./MerchantDevicesModel";
import {Input} from "react-toolbox/lib/input";

const SearchField = observer((props: {model: MerchantDevicesModel}) => (
    <div className={style.SearchField}>
        <Input type='text'
               label='Search'
               icon='search'
               value={props.model.queryString}
               onChange={props.model.setQueryString}
        />
    </div>
));

export default SearchField;
