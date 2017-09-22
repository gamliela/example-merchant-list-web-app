import {action, observable} from "mobx";

class TabsModel {

    // current selected tab
    @observable tabIndex: number = 0;

    // update selected tab
    @action.bound
    setTabIndex(index: number) {
        this.tabIndex = index;
    }

}

export default TabsModel;
