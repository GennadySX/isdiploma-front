import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import ruLang from './entries/ru-Ru';
import esLang from './entries/es-ES';

const AppLocale = {
    en: enLang,
    ru: ruLang,
    es: esLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ru.data);
addLocaleData(AppLocale.es.data);

export default AppLocale;
