import {configureBasicAuth, getJson, getMockJson} from "./util-fetch";

const URL_MERCHANT_DEVICES = "https://api-dev.smart-connect.cloud/Merchant/49a19efb-1208-462e-b745-cca8ada4d21c?apikey=a27dddccefe5d626c7d3e9c5084ce53a80d824c045703cae369d470f796a4893";
const URL_DEVICE_INFO = "https://amqp-dev.smart-connect.cloud/api/queues/%2f/";
const API_USER = "test";
const API_PASSWORD = "test12345";

const enum DEVICE_TYPE {
    PAX_S900 = 0,
    PAX_S800 = 1,
    PAX_S300 = 2,
    PAX_D210e = 3,
}

const DEVICE_TYPE_NAMES = {
    [DEVICE_TYPE.PAX_S900]: "PAX_S900",
    [DEVICE_TYPE.PAX_S800]: "PAX S800",
    [DEVICE_TYPE.PAX_S300]: "PAX S300",
    [DEVICE_TYPE.PAX_D210e]: "PAX D210e"
};

// utility function that tells if we should use mock data or not.
// set useMockData=true in app url to use this feature.
function useMockData(): boolean {
    return /[?&]useMockData=true(&.*)?$/g.test(document.location.search || "");
}

type MerchantDevice = {
    [key: string]: any,
    deviceId: string,
    deviceVendor: string,
    deviceIsPaired: boolean,
    deviceType: DEVICE_TYPE
}

const getMechantDevicesMock = {
    "merchantDevices": [{
        "deviceId": "1000000017",
        "deviceIsPaired": true,
        "deviceVendor": "Smartpay",
        "deviceType": 1
    }, {
        "deviceId": "2233445566",
        "deviceIsPaired": false,
        "deviceVendor": "CBA",
        "deviceType": 2
    }, {
        "deviceId": "2582916600",
        "deviceIsPaired": false,
        "deviceVendor": "Smartpay",
        "deviceType": 3
    }, {
        "deviceId": "5011393900",
        "deviceIsPaired": true,
        "deviceVendor": "Smartpay",
        "deviceType": 3
    }, {
        "deviceId": "51361080000022",
        "deviceIsPaired": false,
        "deviceVendor": "Smartpay",
        "deviceType": 3
    }, {
        "deviceId": "756768544",
        "deviceIsPaired": false,
        "deviceVendor": "Smartpay",
        "deviceType": 3
    }]
};

// will call a static URL to get list of devices, and convert result to list of devices.
// note that we are not checking data integrity here (we assume data is valid).
function getMerchantDevices(): Promise<MerchantDevice[]> {
    const promise = useMockData() ? getMockJson(getMechantDevicesMock) : getJson(URL_MERCHANT_DEVICES);
    return promise
        .then((data: any) => data.merchantDevices && data.merchantDevices.map((device: any) => ({
            deviceId: device.deviceId,
            deviceVendor: device.deviceVendor,
            deviceIsPaired: device.deviceIsPaired,
            deviceType: device.deviceType
        })));
}

type DeviceInfo = {
    isOnline: boolean,
    idleSince?: string
}

const getDeviceInfoMock = {
    state: "running",
    idle_since: "2017-09-15 4:42:15"
};

function getDeviceInfo(merchantDevice: MerchantDevice): Promise<DeviceInfo> {
    const url = `${URL_DEVICE_INFO}${merchantDevice.deviceVendor}.${merchantDevice.deviceId}`;
    const promise = useMockData() ? getMockJson(getDeviceInfoMock) : getJson(url, configureBasicAuth(API_USER, API_PASSWORD));
    return promise
        .then((data) => ({
            isOnline: data.state === "running",
            idleSince: data.idle_since
        }))
        // for simplicity we assume that all network errors mean that.
        // in reality we should have checked some corner cases as well.
        .catch(() => ({isOnline: false}));
}

export {
    DEVICE_TYPE,
    DEVICE_TYPE_NAMES,
    MerchantDevice,
    getMerchantDevices,
    DeviceInfo,
    getDeviceInfo
};
