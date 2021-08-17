import moment from 'moment';

const format = 'MM/DD/YYYY';
console.log(`Hoy es ${moment().format(format)}`);
console.log(`Naci el ${moment('200206-01','YYYYMM-DD').format(format)}`);
console.log(`Desde mi nacimiento han pasado ${moment().diff(moment('200206-01','YYYYMM-DD'), 'years')} años.`);
console.log(`Desde mi nacimiento han pasado ${moment().diff(moment('200206-01','YYYYMM-DD'), 'days')} dias.`);