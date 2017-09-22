import * as React from 'react';
import {observer} from 'mobx-react';
import {Tabs} from "react-toolbox/lib/tabs";
import {Tab} from "react-toolbox/lib/tabs";
import style from "./style.scss"
import TabsModel from "./TabsModel";

@observer
class App extends React.Component {

    // tab state manager
    private tabsModel = new TabsModel();

    render() {
        return (
            <Tabs index={this.tabsModel.tabIndex} onChange={this.tabsModel.setTabIndex} inverse theme={style}>
                <Tab label='Merchant Devices'>
                    <div>Merchant Devices</div>
                </Tab>
                <Tab label='Merchant Info'>
                    <div>Merchant Info</div>
                </Tab>
            </Tabs>
        );
    }
}

export default App;
