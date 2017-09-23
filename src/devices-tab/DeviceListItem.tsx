import * as React from "react";
import {observer} from "mobx-react";
import {DeviceItemModel} from "./DeviceItemModel";
import {DEVICE_TYPE_NAMES, MerchantDevice} from "../shared_modules/BackendService";
import {Card, CardTitle, CardText} from "react-toolbox/lib/card";
import {ListItem as OriginalListItem} from "react-toolbox/lib/list";
import {Avatar} from "react-toolbox/lib/avatar";
import style from "./style.scss";
import Spinner from "../shared_modules/Spinner/Spinner";
import NetworkErrorMessage from "../shared_modules/NetworkErrorMessage/NetworkErrorMessage";

// React Toolbox has bug in ListItem typescript definition (missing properties), so we must override it here
const ListItem = OriginalListItem as any;

@observer
class DeviceListItem extends React.Component<{ item: DeviceItemModel }> {
    render() {
        const {isCollapsed, toggle} = this.props.item;
        return <ListItem
            selectable
            leftIcon={isCollapsed ? 'keyboard_arrow_down' : 'close'}
            itemContent={<DeviceCard item={this.props.item}/>}
            onClick={toggle}
        />;
    }
}

@observer
class DeviceCard extends React.Component<{ item: DeviceItemModel }> {
    render() {
        const {isCollapsed, merchantDevice, toggle} = this.props.item;
        const pairedSting = merchantDevice.deviceIsPaired ? "Device is paired" : "Device is not paired";
        return (
            <Card theme={style} title={pairedSting}>
                <CardTitle
                    avatar={<Avatar style={{backgroundColor: merchantDevice.deviceIsPaired ? 'limegreen' : 'tomato'}}
                                    icon="power"/>}
                    title={getTitle(merchantDevice)}
                    subtitle={merchantDevice.deviceId}
                />
                {!isCollapsed && this.renderDeviceInfo()}
            </Card>
        );
    }

    renderDeviceInfo() {
        if (this.props.item.isLoading)
            return <Spinner/>;
        else if (this.props.item.isLoadingError)
            return <NetworkErrorMessage/>;
        else {
            const isOnlineString = this.props.item.resolvedDeviceInfo.isOnline ? "Yes" : "No";
            const lastUsedString = this.props.item.resolvedDeviceInfo.idleSince || "Never";
            return (
                <div>
                    <CardText>Is Device Online? {isOnlineString}</CardText>
                    <CardText>Last Used Time: {lastUsedString}</CardText>
                </div>
            );
        }
    }
}

function getTitle({deviceType, deviceVendor}: MerchantDevice) {
    return [DEVICE_TYPE_NAMES[deviceType], deviceVendor].filter(Boolean).join(", ")
}

export default DeviceListItem;
