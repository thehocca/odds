<template>
    <div class="col-xxl-2 col-xl-3 col-lg-3">
        <div class="right__site__section display991">
            <div class="betslip__wrap">
                <h5 class="betslip__title">
                    Betslip
                </h5>
                <div class="nav" id="nav-taboo" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                        type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        Tekli
                    </button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        Kombin
                    </button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                        type="button" role="tab" aria-selected="false">
                        Sistem
                    </button>
                </div>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade text-white show active" id="nav-home" role="tabpanel"
                        aria-labelledby="nav-home-tab" tabindex="0">
                        <div class="multiple__components">

                            <div class="betslip-content">


                            </div>



                            <div class="total__odds">
                                <div class="total__head">
                                    <h6 class="odd">
                                        Bahis Sayısı
                                    </h6>
                                    <span class="ticket-amount">
                                        0
                                    </span>
                                </div>
                                <div class="wrapper">
                                    <div class="result">
                                        <span>Tutar</span>
                                        <span class="result">1 {{ userInfo?.finance?.currency }}</span>
                                    </div>
                                    <div class="buttons">
                                        <button type="button">5</button>
                                        <button type="button">10</button>
                                        <button type="button">50</button>
                                    </div>
                                </div>
                            </div>
                            <div class="possible__pay">
                                <h6>Maks. Kazanç:</h6>
                                <h5 class="ticket-possible-win">
                                    <span class="text-success amount" style="font-size: 14px; margin-right: 5px; color: #FFFFFF;">0</span>    
                                    <span>{{ userInfo?.finance.currency }}</span>
                                </h5>

                            </div>
                            <a href="javascript:;" class="cmn--btn2 text-dark save-coupon">
                                <span>KUPON OLUŞTUR</span>
                            </a>
                        </div>
                        <div class="setting__area">
                            <div class="tab-content" id="nav-tabContentsetting">
                                <div class="tab-pane fade text-white" id="nav-homeett2" role="tabpanel"
                                    aria-labelledby="nav-home-tabsetting2" tabindex="0">
                                    <div class="sign__bets__wrap">
                                        <h5 class="betslip__title">
                                            Betslip
                                        </h5>
                                        <div class="setting__boxes">
                                            <div class="check__wrap">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="check1a">
                                                    <label class="form-check-label" for="check1a">
                                                        Oran değişiklerini kabul et.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nav" id="nav-tabseting" role="tablist">
                                <a href="javascript:;" class="nav-link clear-betslip" id="nav-home-tabsetting"
                                    data-bs-toggle="tab" data-bs-target="#nav-homesett" type="button" role="tab"
                                    aria-controls="nav-home" aria-selected="true">
                                    <span class="icons"><i class="icon-trush"></i></span>
                                    <span class="text">
                                        Hepsini Sil
                                    </span>
                                </a>
                                <button class="nav-link" id="nav-home-tabsetting2" data-bs-toggle="tab"
                                    data-bs-target="#nav-homeett2" type="button" role="tab" aria-controls="nav-profile"
                                    aria-selected="false">
                                    <span class="icons"><i class="icon-setting"></i></span>
                                    <span class="text">
                                        Ayarlar
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade text-white" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                        tabindex="0">
                        <div class="multiple__components">
                            <div class="multiple__items">
                                <div class="multiple__head">
                                    <div class="multiple__left">
                                        <span class="icons">
                                            <i class="icon-football"></i>
                                        </span>
                                        <span>
                                            Real Kashmir vs Trau FC
                                        </span>
                                    </div>
                                    <a href="#0" class="cros">
                                        <i class="icon-cross"></i>
                                    </a>
                                </div>
                                <div class="multiple__point">
                                    <span class="pbox">
                                        50.2
                                    </span>
                                    <span class="rightname">
                                        <span class="fc">
                                            Trau FC
                                        </span>
                                        <span class="point">
                                            1x2
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="multiple__items">
                                <div class="multiple__head">
                                    <div class="multiple__left">
                                        <span class="icons">
                                            <i class="icon-football"></i>
                                        </span>
                                        <span>
                                            Stodder, Timo vs Kopriva, Vit
                                        </span>
                                    </div>
                                    <a href="#0" class="cros">
                                        <i class="icon-cross"></i>
                                    </a>
                                </div>
                                <div class="multiple__point">
                                    <span class="pbox">
                                        3.66
                                    </span>
                                    <span class="rightname">
                                        <span class="fc">
                                            Stodder, Timo
                                        </span>
                                        <span class="point">
                                            Winner
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="total__odds">
                                <div class="total__head">
                                    <h6 class="odd">
                                        Toplam Bahisler
                                    </h6>
                                    <span>
                                        25
                                    </span>
                                </div>
                                <div class="wrapper">
                                    <div class="result">
                                        <span>Stake amount, $</span>
                                        <span class="result">0.00 $</span>
                                    </div>
                                    <div class="buttons">
                                        <button type="button">5</button>
                                        <button type="button">10</button>
                                        <button type="button">50</button>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:" class="cmn--btn2 text-dark">
                                <span>KUPON OLUŞTUR</span>
                            </a>
                        </div>
                    </div>
                    <div class="tab-pane fade text-white" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab"
                        tabindex="0">
                        <div class="multiple__components">
                            <div class="multiple__items">
                                <div class="multiple__head">
                                    <div class="multiple__left">
                                        <span class="icons">
                                            <i class="icon-football"></i>
                                        </span>
                                        <span>
                                            Real Kashmir vs Trau FC
                                        </span>
                                    </div>
                                    <a href="#0" class="cros">
                                        <i class="icon-cross"></i>
                                    </a>
                                </div>
                                <div class="multiple__point">
                                    <span class="pbox">
                                        50.2
                                    </span>
                                    <span class="rightname">
                                        <span class="fc">
                                            Trau FC
                                        </span>
                                        <span class="point">
                                            1x2
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="multiple__items">
                                <div class="multiple__head">
                                    <div class="multiple__left">
                                        <span class="icons">
                                            <i class="icon-football"></i>
                                        </span>
                                        <span>
                                            Stodder, Timo vs Kopriva, Vit
                                        </span>
                                    </div>
                                    <a href="#0" class="cros">
                                        <i class="icon-cross"></i>
                                    </a>
                                </div>
                                <div class="multiple__point">
                                    <span class="pbox">
                                        3.66
                                    </span>
                                    <span class="rightname">
                                        <span class="fc">
                                            Stodder, Timo
                                        </span>
                                        <span class="point">
                                            Winner
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="total__odds">
                                <div class="total__head">
                                    <h6 class="odd">
                                        Toplam Bahisler
                                    </h6>
                                    <span class="">
                                        0
                                    </span>
                                </div>
                                <div class="wrapper">
                                    <div class="result">
                                        <span>Stake amount, $</span>
                                        <span class="result">0.00 $</span>
                                    </div>
                                    <div class="buttons">
                                        <button type="button">5</button>
                                        <button type="button">10</button>
                                        <button type="button">50</button>
                                    </div>
                                </div>
                            </div>
                            <a href="signin.html" class="cmn--btn2  text-dark">
                                <span>KUPON OLUŞTUR</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div></template>

<script>
    export default {
        props: ['userInfo']
    }
</script>