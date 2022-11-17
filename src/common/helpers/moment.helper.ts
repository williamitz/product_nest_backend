import * as moment from 'moment-timezone';
import { ELanguage } from '../interfaces/language.enum';

const _defaultTimeZone = 'America/Lima';
const _defaultLanguage = ELanguage.spanish;
// moment.locale( 'en' );

/**
 * 
 * @param timeZone 
 * @param language 
 * @returns Current UTC date: exmaple 2013-02-04T10:35:24-08:00
 */
export const currentDate = ( timeZone: string = _defaultTimeZone, language: ELanguage = _defaultLanguage ) => {
    return moment().tz( timeZone ).format(); // 2013-02-04T10:35:24-08:00
}


// 
// 