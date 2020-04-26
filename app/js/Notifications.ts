import {LocalNotifications, ScheduleOptions} from 'nativescript-local-notifications';

const dailyNotificationID = 1;

export class Notifications {
    private readonly i18n: (string) => string = null;

    public constructor(i18n: (string) => string) {
        this.i18n = i18n;
    }

    public setUp() {
        LocalNotifications.requestPermission()
            .then((granted) => {
                if (!granted) {
                    throw new Error('Notification permission not granted');
                }
                return LocalNotifications.getScheduledIds();
            })
            .then(scheduledIds => {
                if (!scheduledIds.includes(dailyNotificationID)) {
                    console.log('setting up new daily notification');
                    return LocalNotifications.schedule(this.getDailyNotificationOptions());
                }
                return [dailyNotificationID] as Array<number>;
            })
            .catch(error => {
                console.error(error);
            })
    }

    private getDailyNotificationOptions(): ScheduleOptions[] {
        let at = new Date();
        at.setDate(at.getDate() + 1);
        at.setHours(18, 0, 0, 0);
        return [{
            id: dailyNotificationID,
            title: this.i18n('notifications.daily.title'),
            body: this.i18n('notifications.daily.body'),
            channel: 'Daily Checkup',
            interval: "day",
            at: at
        }];
    }
}