import * as React from 'react';
import {observer} from 'mobx-react';
import {MerchantDevicesModel} from "./MerchantDevicesModel";
import style from "./style.scss"
import Spinner from "../shared_modules/Spinner/Spinner";
import NetworkErrorMessage from "../shared_modules/NetworkErrorMessage/NetworkErrorMessage";
import SearchField from "./SearchField";
import SortField from "./SortField";
import DevicesList from "./DevicesList";

@observer
class MerchantDevicesTab extends React.Component {

    // tab state manager
    private model = new MerchantDevicesModel();

    render() {
        if (this.model.isLoading)
            return <Spinner/>;
        else if (this.model.isLoadingError)
            return <NetworkErrorMessage/>;
        else
            return (
                <div>
                    <div className={style.fieldsContainer}>
                        <SearchField model={this.model}/>
                        <SortField model={this.model}/>
                    </div>
                    <DevicesList list={this.model.listForDisplay}/>
                </div>
            )
    }
}

export default MerchantDevicesTab;
