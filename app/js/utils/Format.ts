import {Settings} from "@/js/Settings";
import * as NSIntl from 'nativescript-intl';

const dateFormatter = new NSIntl.DateTimeFormat(Settings.getDateTimeLocale(), {
    day: 'numeric', month: 'long', year: 'numeric'
})

export function formatDate(date: Date): string {
    return dateFormatter.format(date);
}