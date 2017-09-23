import * as React from 'react';
import {observer} from 'mobx-react';
import TabsModel from "./TabsModel";
import MerchantDevicesTab from "./devices-tab/MerchantDevicesTab";
import {Tabs, Tab} from "react-toolbox/lib/tabs";
import style from "./style.scss"

@observer
class App extends React.Component {

    // tab state manager
    private tabsModel = new TabsModel();

    render() {
        return (
            <Tabs index={this.tabsModel.tabIndex} onChange={this.tabsModel.setTabIndex} inverse theme={style}>
                <Tab label='Merchant Devices'>
                    <MerchantDevicesTab/>
                </Tab>
                <Tab label='Merchant Info'>
                    <div>Just a concept example...</div>
                </Tab>
            </Tabs>
        );
    }
}

export default App;
