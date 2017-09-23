import {fromPromise, FULFILLED, IPromiseBasedObservable, PENDING, REJECTED} from "mobx-utils";
import {getMerchantDevices} from "../shared_modules/BackendService";
import {action, computed, observable} from "mobx";
import {DeviceItemModel} from "./DeviceItemModel";
import {SortFieldType} from "./SortField";

// manage a list of devices. allows searching & sorting.
export class MerchantDevicesModel {

    // observable promise that resolved to an array of DeviceItemModel.
    // once list of devices is returned from server, we create a new DeviceItemModel that wraps each one of them.
    devicesList: IPromiseBasedObservable<DeviceItemModel[]> =
        fromPromise(getMerchantDevices().then(devices => devices.map(device => new DeviceItemModel(device))));

    // current field used for sorting
    @observable sortField: SortFieldType = "deviceType";

    // current field used for search
    @observable queryString = "";

    @computed
    get resolvedDevicesList(): DeviceItemModel[] {
        return (this.devicesList.state === FULFILLED) && this.devicesList.value;
    }

    // are we currently loading the list?
    @computed
    get isLoading() {
        return this.devicesList.state === PENDING;
    }

    // did we have error in load?
    @computed
    get isLoadingError() {
        return this.devicesList.state === REJECTED;
    }

    // list after search & sort
    @computed
    get listForDisplay(): DeviceItemModel[] {
        return this.resolvedDevicesList
            .filter(item => item.matchMerchantDevice(this.queryString))
            .sort(DeviceItemModel.compareMarchantDevice.bind(null, this.sortField))
    }

    // update sort field
    @action.bound
    setSortField(field: SortFieldType) {
        this.sortField = field;
    }

    // update search string
    @action.bound
    setQueryString(s: string) {
        this.queryString = s;
    }

}
