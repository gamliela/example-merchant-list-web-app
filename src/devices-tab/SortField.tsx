import * as React from "react";
import {observer} from "mobx-react";
import style from "./style.scss"
import {MerchantDevicesModel} from "./MerchantDevicesModel";
import {Dropdown} from "react-toolbox/lib/dropdown";

type SortFieldType = "deviceType" | "deviceVendor" | "deviceId" | "deviceIsPaired";

const SortField = observer((props: { model: MerchantDevicesModel }) => (
    <div className={style.SortField}>
        <Dropdown
            onChange={props.model.setSortField}
            source={[
                {value: "deviceType", label: "Sort by Type"},
                {value: "deviceVendor", label: "Sort by Vendor"},
                {value: "deviceId", label: "Sort by Device ID"},
                {value: "deviceIsPaired", label: "Sort by Pairing Status"}
            ]}
            value={props.model.sortField}
        />
    </div>
));

export default SortField;

export {SortFieldType};