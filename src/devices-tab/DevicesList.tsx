import * as React from 'react';
import {observer} from 'mobx-react';
import {DeviceItemModel} from "./DeviceItemModel";
import DeviceListItem from "./DeviceListItem";
import {List} from 'react-toolbox/lib/list';

const DevicesList = observer((props: {list: DeviceItemModel[]}) =>
    <List selectable ripple>
        {
            props.list.map(item =>
                <DeviceListItem key={item.merchantDevice.deviceId} item={item}/>
            )
        }
    </List>
);

export default DevicesList;
