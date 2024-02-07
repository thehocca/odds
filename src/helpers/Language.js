import TR from './languages/tr.js';
import EN from './languages/en.js';

function Language() {

    // URI PARÇALA
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var lang = urlParams.get('lang');

    // URLDE ?LANG= PARAMETRESİ VAR MI
    if (lang) {

        // VAR İSE LOCALSTORAGE A KAYDET VE İLGİLİ DİL DOSYASINI GERİ DÖNDÜR
        switch (lang) {
            case 'tr':
                localStorage.setItem('lang', 'tr');
                return { name: 'TR', content: TR };
                break;

            case 'en':
                localStorage.setItem('lang', 'en');
                return { name: 'EN', content: EN };
                break;

            default:
                localStorage.setItem('lang', 'tr')
                return { name: 'EN', content: EN };
        }


    } else { // LOCALSTORAGE DA LANG VAR İSE İLGİLİ DİL DOSYASINI GERİ DÖNDÜR
        var lang;
        if (localStorage.getItem('lang')) {

            switch (localStorage.getItem('lang')) {
                case 'tr':
                    lang = { name: 'TR', content: TR };
                    break;

                case 'en':
                    lang = { name: 'EN', content: EN };
                    break;

                default:
                    lang = { name: 'EN', content: EN };
            }

            return lang;
        } else { // VARSAYILAN DİL

            lang = { name: 'TR', content: TR };

            localStorage.setItem('lang', lang);
            return lang;
        }

    }


};

export default Language;