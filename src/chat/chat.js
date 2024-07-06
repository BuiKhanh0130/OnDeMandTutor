import { CometChat } from '@cometchat-pro/chat';

var appID = '25999559cf6c1884';
var region = 'us';
var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
    () => {
        console.log('Initialization completed successfully');
    },
    (error) => {
        console.log('Initialization failed with error:', error);
    },
);
