import {DEVICE_TYPE_NAMES, MerchantDevice, DeviceInfo, getDeviceInfo} from "../shared_modules/BackendService";
import {action, computed, observable} from "mobx";
import {SortFieldType} from "./SortField";
import {fromPromise, FULFILLED, IPromiseBasedObservable, PENDING, REJECTED} from "mobx-utils";

export class DeviceItemModel {

    constructor(public merchantDevice: MerchantDevice) {

    }

    // collapsed/expanded state
    @observable isCollapsed = true;

    // observable promise that resolved to DeviceInfo.
    @observable deviceInfo: IPromiseBasedObservable<DeviceInfo> = null;

    // insensitive case match predicate - tells whether a given search screen match this merchant device
    matchMerchantDevice(queryString: string) {
        if (!queryString)
            return true;
        queryString = queryString.toLowerCase();
        const device = this.merchantDevice;
        return (device.deviceId && device.deviceId.toLowerCase().indexOf(queryString) > -1) ||
            (device.deviceVendor && device.deviceVendor.toLowerCase().indexOf(queryString) > -1) ||
            (DEVICE_TYPE_NAMES[device.deviceType] && DEVICE_TYPE_NAMES[device.deviceType].toLowerCase().indexOf(queryString) > -1);
    }

    // will compare 2 merchant devices, according to specific property
    // if sortField is deviceType, we will sort by name (string) instead of value (enum number)
    static compareMarchantDevice(sortField: SortFieldType, item1: DeviceItemModel, item2: DeviceItemModel): number {
        const str1 = (sortField != "deviceType") ? String(item1.merchantDevice[sortField]) : DEVICE_TYPE_NAMES[item1.merchantDevice[sortField]];
        const str2 = (sortField != "deviceType") ? String(item2.merchantDevice[sortField]) : DEVICE_TYPE_NAMES[item2.merchantDevice[sortField]];
        return (str1 < str2) ? -1 : ((str1 > str2) ? 1 : 0);
    }

    @action.bound
    toggle() {
        this.isCollapsed = !this.isCollapsed;
        if (!this.isCollapsed)
            this.reloadDeviceInfo();
    }

    private reloadDeviceInfo() {
        this.deviceInfo = fromPromise(getDeviceInfo(this.merchantDevice));
    }

    @computed
    get resolvedDeviceInfo(): DeviceInfo {
        return this.deviceInfo && (this.deviceInfo.state === FULFILLED) && this.deviceInfo.value;
    }

    // are we currently loading the list?
    @computed
    get isLoading() {
        return this.deviceInfo && this.deviceInfo.state === PENDING;
    }

    // did we have error in load?
    @computed
    get isLoadingError() {
        return this.deviceInfo && this.deviceInfo.state === REJECTED;
    }


}

export default DeviceItemModel;
