<script setup>
import Betslip from '../components/Betslip.vue';
</script>

<template>
    <section>
        <!--Sub-Header Tabs Here-->
        <section class="main__tab__slide">
            <ul class="nav nav-tabs" id="myTabmain" role="tablist">
                <li class="nav-item" role="presentation" v-for="i in sportsFilter">
                    <button class="nav-link active" id="main-tab" data-bs-toggle="tab" data-bs-target="#mainTab"
                        type="button" role="tab" aria-selected="true">
                        <!-- <span class="icons"><i class="fa fa-home"></i></span> -->
                        <span>{{ i.name }}</span>
                    </button>
                </li>
                <!-- Object.values(sports).find(o => o._is.main == true) -->
            </ul>
        </section>
        <!--Sub-Header Tabs Here-->

        <!--Global Main Body-->
        <section class="main__body__area">
            <div class="container-fluid p-0">
                <div class="row g-0">
                    <div class="col-xxl-10 col-xl-9 col-lg-9">
                        <div class="left__site__section">
                            <div class="tab-content" id="myTabContentmain">
                                <!--Global Main Body-->
                                <div class="popular__events__body">
                                    <div class="container-fluid p-0">
                                        <div class="row g-0">
                                            <div class="col-xxl-2 col-xl-3 col-lg-3">
                                                <div class="popular__events__left display991 leftscroll-side">
                                                    <div class="popular__events__head">
                                                        <h5>
                                                            Popular events
                                                        </h5>
                                                        <ul>
                                                            <li>
                                                                <span><img src="/img/leftmenu/cup.png" alt="img"></span>
                                                                <span>Eorld Cup 2022</span>
                                                            </li>
                                                            <li>
                                                                <span><img src="/img/leftmenu/europ.png" alt="img"></span>
                                                                <span>Euroleague. Season 22/23</span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    <div class="star__wrap">
                                                        <span><img src="/img/leftmenu/start.png" alt="img"></span>
                                                        <span>Favorites</span>
                                                    </div>
                                                    <div class="prematch__wrap">
                                                        <div class="nav" id="nav-tabpre" role="tablist">
                                                            <button class="nav-link active" id="nav-home-tabpre"
                                                                data-bs-toggle="tab" data-bs-target="#nav-homepre"
                                                                type="button" role="tab" aria-controls="nav-homepre"
                                                                aria-selected="true">Live</button>
                                                            <button class="nav-link " id="nav-profile-tabpre"
                                                                data-bs-toggle="tab" data-bs-target="#nav-profilepre"
                                                                type="button" role="tab" aria-controls="nav-profilepre"
                                                                aria-selected="false">Prematch</button>
                                                        </div>
                                                        <div class="tab-content" id="nav-tabContentpre">
                                                            <div class="tab-pane fade text-white show active"
                                                                id="nav-homepre" role="tabpanel"
                                                                aria-labelledby="nav-home-tabpre" tabindex="0">
                                                                <div
                                                                    class="prematch__scopre this____parent__remove sidebar-livematch">
                                                                    <div class="accordion" id="accordionExample">
                                                                        <div class="accordion-item">
                                                                            <h2 class="accordion-header" id="headingOne">
                                                                                <button class="accordion-button "
                                                                                    type="button" data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapseOne"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapseOne">
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-2 left-chokoboko">
                                                                                        <span class="mt-1"><i
                                                                                                class="icon-football"></i></span>
                                                                                        <span class="score text-white">
                                                                                            Soccer
                                                                                        </span>
                                                                                    </span>
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-1 icon-rightfs10">
                                                                                        2
                                                                                        <i
                                                                                            class="fa-solid fa-chevron-down"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </h2>
                                                                            <div id="collapseOne"
                                                                                class="accordion-collapse collapse show"
                                                                                aria-labelledby="headingOne"
                                                                                data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Brazil
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Argentina
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 pt-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Canada
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Portugal
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 align-items-center pt-2 justify-content-between text-white">
                                                                                        <span>
                                                                                            Spain
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Germany
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="accordion-item">
                                                                            <h2 class="accordion-header" id="headingtwos">
                                                                                <button class="accordion-button collapsed"
                                                                                    type="button" data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapsetwos"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapsetwos">
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-2 left-chokoboko">
                                                                                        <span class="mt-1"><i
                                                                                                class="icon-tennis"></i></span>
                                                                                        <span class="score text-white">
                                                                                            Tennis
                                                                                        </span>
                                                                                    </span>
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-1 icon-rightfs10">
                                                                                        4
                                                                                        <i
                                                                                            class="fa-solid fa-chevron-down"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </h2>
                                                                            <div id="collapsetwos"
                                                                                class="accordion-collapse collapse"
                                                                                aria-labelledby="headingtwos"
                                                                                data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Brazil
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Argentina
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 pt-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Canada
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Portugal
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 align-items-center pt-2 justify-content-between text-white">
                                                                                        <span>
                                                                                            Spain
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Germany
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="accordion-item">
                                                                            <h2 class="accordion-header" id="headingthrees">
                                                                                <button class="accordion-button collapsed"
                                                                                    type="button" data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapsethrees"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapsethrees">
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-2 left-chokoboko">
                                                                                        <span class="mt-1"><i
                                                                                                class="icon-basketball"></i></span>
                                                                                        <span class="score text-white">
                                                                                            Basketball
                                                                                        </span>
                                                                                    </span>
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-1 icon-rightfs10">
                                                                                        4
                                                                                        <i
                                                                                            class="fa-solid fa-chevron-down"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </h2>
                                                                            <div id="collapsethrees"
                                                                                class="accordion-collapse collapse"
                                                                                aria-labelledby="headingthrees"
                                                                                data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Brazil
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Argentina
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 pt-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Canada
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Portugal
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 align-items-center pt-2 justify-content-between text-white">
                                                                                        <span>
                                                                                            Spain
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Germany
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="accordion-item">
                                                                            <h2 class="accordion-header" id="headingfour">
                                                                                <button class="accordion-button collapsed"
                                                                                    type="button" data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapsefour"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapsefour">
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-2 left-chokoboko">
                                                                                        <span class="mt-1"><i
                                                                                                class="icon-volly"></i></span>
                                                                                        <span class="score text-white">
                                                                                            Volleyball
                                                                                        </span>
                                                                                    </span>
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-1 icon-rightfs10">
                                                                                        3
                                                                                        <i
                                                                                            class="fa-solid fa-chevron-down"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </h2>
                                                                            <div id="collapsefour"
                                                                                class="accordion-collapse collapse"
                                                                                aria-labelledby="headingfour"
                                                                                data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Brazil
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Argentina
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 pt-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Canada
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Portugal
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 align-items-center pt-2 justify-content-between text-white">
                                                                                        <span>
                                                                                            Spain
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Germany
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="accordion-item">
                                                                            <h2 class="accordion-header" id="headingfive">
                                                                                <button class="accordion-button collapsed"
                                                                                    type="button" data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapsefive"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapsefive">
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-2 left-chokoboko">
                                                                                        <span class="mt-1"><i
                                                                                                class="icon-handball"></i></span>
                                                                                        <span class="score text-white">
                                                                                            Handball
                                                                                        </span>
                                                                                    </span>
                                                                                    <span
                                                                                        class="d-flex align-items-center gap-1 icon-rightfs10">
                                                                                        5
                                                                                        <i
                                                                                            class="fa-solid fa-chevron-down"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </h2>
                                                                            <div id="collapsefive"
                                                                                class="accordion-collapse collapse"
                                                                                aria-labelledby="headingfive"
                                                                                data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Brazil
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Argentina
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 b__bottom pb-2 pt-2 align-items-center justify-content-between text-white">
                                                                                        <span>
                                                                                            Canada
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Portugal
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        class="d-flex fs14 align-items-center pt-2 justify-content-between text-white">
                                                                                        <span>
                                                                                            Spain
                                                                                        </span>
                                                                                        <span>
                                                                                            Vs
                                                                                        </span>
                                                                                        <span>
                                                                                            Germany
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade text-white " id="nav-profilepre"
                                                                role="tabpanel" aria-labelledby="nav-profile-tabpre"
                                                                tabindex="0">
                                                                <div class="multiple__components">
                                                                    <div class="prematch__scopre">
                                                                        <a href="sportsbetting.html"
                                                                            class="prescore__items">
                                                                            <div class="prescore__left">
                                                                                <span><i class="icon-football"></i></span>
                                                                                <span class="score">
                                                                                    Soccer
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        <a href="lives.html" class="prescore__items">
                                                                            <div class="prescore__left">
                                                                                <span><i class="icon-tennis"></i></span>
                                                                                <span class="score">
                                                                                    Tennis
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        <a href="livecasino.html" class="prescore__items">
                                                                            <div class="prescore__left">
                                                                                <span><i class="icon-basketball"></i></span>
                                                                                <span class="score">
                                                                                    Basketball
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        <a href="lives.html" class="prescore__items">
                                                                            <div class="prescore__left">
                                                                                <span><i class="icon-ttennis"></i></span>
                                                                                <span class="score">
                                                                                    Table Tennis
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        <a href="lives.html" class="prescore__items">
                                                                            <div class="prescore__left">
                                                                                <span><i class="icon-volly"></i></span>
                                                                                <span class="score">
                                                                                    Volleyball
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        <a href="lives.html" class="prescore__items">
                                                                            <div class="prescore__left">
                                                                                <span><i class="icon-handball"></i></span>
                                                                                <span class="score">
                                                                                    Handball
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-10 col-xl-9 col-lg-9">
                                                <!--Home Page Tabs Here-->
                                                <div class="tab-pane text-white fade show active" id="mainTab"
                                                    role="tabpanel" tabindex="0">

                                                    <!--Match Fixing Slider-->
                                                    <div class="mx-4">
                                                        <div class="top-kombis pt-3">
                                                            <div class="match mb-4" v-for="i in topKombis">
                                                                <a href="javascript:;" class="match__fixing__items">
                                                                    <div class="match__head">
                                                                        <div class="match__head__left">
                                                                            <span class="icons">
                                                                                <i class="icon-football"></i>
                                                                            </span>
                                                                            <span>
                                                                                World Cup 2022
                                                                            </span>
                                                                        </div>
                                                                        <span class="today">
                                                                            Today / 22:00
                                                                        </span>
                                                                    </div>
                                                                    <div class="match__vs">
                                                                        <div class="match__vs__left">
                                                                            <span>
                                                                                Argentina
                                                                            </span>
                                                                            <span class="flag">
                                                                                <img src="/img/matchfixing/arjentina.png"
                                                                                    alt="flag">
                                                                            </span>
                                                                        </div>
                                                                        <span class="vs">
                                                                            Vs
                                                                        </span>
                                                                        <div class="match__vs__left">
                                                                            <span class="flag">
                                                                                <img src="/img/matchfixing/france.png"
                                                                                    alt="flag">
                                                                            </span>
                                                                            <span>
                                                                                France
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="match__result">
                                                                        <span class="matchborder"></span>
                                                                        <span class="match__text">
                                                                            Match Reult
                                                                        </span>
                                                                    </div>
                                                                    <ul class="match__point">
                                                                        <li>
                                                                            <span>1</span>
                                                                            <span>8.55</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>X</span>
                                                                            <span>6.50</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>2</span>
                                                                            <span>3.20</span>
                                                                        </li>
                                                                    </ul>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--Match Fixing Slider-->

                                                    <!--Main body-->
                                                    <div class="main__body__wrap left__right__space">

                                                        <!--Live__heightlight Here-->
                                                        <div class="live__heightlight mb__30">
                                                            <div class="section__title">
                                                                <h4>
                                                                    Live Highlights
                                                                </h4>
                                                            </div>
                                                            <div class="heightlight__tab">
                                                                <div class="nav b__bottom" id="nav-tabheight"
                                                                    role="tablist">
                                                                    <button class="nav-link active" id="lightlighttab"
                                                                        data-bs-toggle="tab" data-bs-target="#height1"
                                                                        type="button" role="tab" aria-selected="true">
                                                                        <span class="icons">
                                                                            <i class="icon-football"></i>
                                                                        </span>
                                                                        <span>
                                                                            Football
                                                                        </span>
                                                                    </button>
                                                                    <button class="nav-link " id="lightlighttab2tennis"
                                                                        data-bs-toggle="tab" data-bs-target="#height2tennis"
                                                                        type="button" role="tab" aria-selected="false">
                                                                        <span class="icons">
                                                                            <i class="icon-tennis"></i>
                                                                        </span>
                                                                        <span>
                                                                            Tennis
                                                                        </span>
                                                                    </button>
                                                                    <button class="nav-link " id="lightlighttab3basket"
                                                                        data-bs-toggle="tab" data-bs-target="#basketbtab"
                                                                        type="button" role="tab" aria-selected="false">
                                                                        <span class="icons">
                                                                            <i class="icon-basketball"></i>
                                                                        </span>
                                                                        <span>
                                                                            Basketball
                                                                        </span>
                                                                    </button>
                                                                    <button class="nav-link " id="lightlighttabvolly"
                                                                        data-bs-toggle="tab" data-bs-target="#vollyballs"
                                                                        type="button" role="tab" aria-selected="false">
                                                                        <span class="icons">
                                                                            <i class="icon-volly"></i>
                                                                        </span>
                                                                        <span>
                                                                            Volleyball
                                                                        </span>
                                                                    </button>
                                                                    <button class="nav-link " id="lightlighttab5cricket"
                                                                        data-bs-toggle="tab" data-bs-target="#crickettab"
                                                                        type="button" role="tab" aria-selected="false">
                                                                        <span class="icons">
                                                                            <i class="icon-cricket"></i>
                                                                        </span>
                                                                        <span>
                                                                            Cricket
                                                                        </span>
                                                                    </button>

                                                                </div>
                                                            </div>
                                                            <div class="height__table">
                                                                <div class="tab-content" id="nav-tabContentheight">
                                                                    <!--Football-->
                                                                    <div class="tab-pane fade text-white show active"
                                                                        id="height1" role="tabpanel"
                                                                        aria-labelledby="nav-home-tabpre" tabindex="0">
                                                                        <div class="main__table">
                                                                            <div class="section__head b__bottom">
                                                                                <div class="left__head">
                                                                                    <span class="icons">
                                                                                        <i class="icon-football"></i>
                                                                                    </span>
                                                                                    <span>
                                                                                        Football
                                                                                    </span>
                                                                                </div>
                                                                                <div class="right__catagoris">
                                                                                    <div class="right__cate__items d-none d-lg-flex">
                                                                                        <select name="cate1"
                                                                                            id="categoris74">
                                                                                            <option value="1">
                                                                                                Result 1X2
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                Result 1X3
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                Result 1X4
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                Result 1X5
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div class="right__cate__items d-none d-lg-flex">
                                                                                        <select name="cate1"
                                                                                            id="categoris2">
                                                                                            <option value="1">
                                                                                                Over/Under
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                ....
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                ....
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                ....
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div class="right__cate__items d-none d-lg-flex">
                                                                                        <select name="cate1"
                                                                                            id="categoris3">
                                                                                            <option value="1">
                                                                                                Both teams to score?
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                ...
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                ....
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                ...
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="table__wrap">
                                                                                <div
                                                                                    class="table__items table__pointnone__items">
                                                                                    <div class="t__items">
                                                                                        <div class="t__items__left">

                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="cart__point">

                                                                                    </div>
                                                                                    <div class="mart__point__items">
                                                                                        <a href="#0"
                                                                                            class="twing opo twing__right">
                                                                                            <i class="icon-twer"></i>
                                                                                        </a>
                                                                                        <a href="#0" class="mart opo">
                                                                                            <i class="icon-pmart"></i>
                                                                                        </a>
                                                                                        <a href="#0box"
                                                                                            class="point__box bg__none">
                                                                                            1
                                                                                        </a>
                                                                                        <a href="#0box"
                                                                                            class="point__box bg__none">
                                                                                            X
                                                                                        </a>
                                                                                        <a href="#0box"
                                                                                            class="point__box bg__none">
                                                                                            2
                                                                                        </a>
                                                                                    </div>
                                                                                    <div
                                                                                        class="cart__point cart__point__two d-none d-lg-flex">
                                                                                        Goals
                                                                                    </div>
                                                                                    <div class="mart__point__two clearfix d-none d-lg-flex">
                                                                                        <div class="mart__point__left">
                                                                                            <a href="#box"
                                                                                                class="point__box bg__none">
                                                                                                Over
                                                                                            </a>
                                                                                            <a href="#box"
                                                                                                class="point__box bg__none">
                                                                                                Under
                                                                                            </a>
                                                                                        </div>
                                                                                        <div class="mart__point__right">
                                                                                            <a href="#0"
                                                                                                class="point__box bg__none">
                                                                                                Yes
                                                                                            </a>
                                                                                            <a href="#0"
                                                                                                class="point__box bg__none">
                                                                                                No
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="table__items b__bottom" v-for="i in matches">
                                                                                    <div class="t__items">
                                                                                        <div class="t__items__left">
                                                                                            <h6>
                                                                                                <img v-bind:src="i.jerseys?.[0]"  class="uniform">
                                                                                                {{ i.competition.competitors[0].name }}
                                                                                            </h6>
                                                                                            <span class="text">                                                                                                <img v-bind:src="i.jerseys?.[0]"  class="uniform">
                                                                                                <img v-bind:src="i.jerseys?.[1]"  class="uniform">
                                                                                                {{ i.competition.competitors[1].name }}
                                                                                            </span>
                                                                                            <p>
                                                                                                <a href="#0">
                                                                                                    <!-- Live -->
                                                                                                </a>
                                                                                                <span>
                                                                                                    {{ i.date.date + ' ' + i.date.hour }}
                                                                                                </span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="cart__point d-none d-lg-flex">
                                                                                        <span>
                                                                                            0
                                                                                        </span>
                                                                                        <span>
                                                                                            0
                                                                                        </span>
                                                                                    </div>
                                                                                    <div class="mart__point__items">
                                                                                        <a href="#0"
                                                                                            class="twing twing__right">
                                                                                            <i class="icon-twer"></i>
                                                                                        </a>
                                                                                        <a href="#0" class="mart">
                                                                                            <i class="icon-pmart"></i>
                                                                                        </a>
                                                                                        <a href="#0box" class="point__box">
                                                                                            {{ i.market1.outcomes[0].odds.toFixed(2) }}
                                                                                        </a>
                                                                                        <a href="#0box" class="point__box">
                                                                                            {{ i.market1.outcomes[1].odds.toFixed(2) }}
                                                                                        </a>
                                                                                        <a href="#0box" class="point__box">
                                                                                            {{ i.market1.outcomes[2].odds.toFixed(2) }}
                                                                                        </a>
                                                                                    </div>
                                                                                    <div
                                                                                        class="cart__point cart__point__two d-none d-lg-flex">
                                                                                        2,6
                                                                                    </div>
                                                                                    <div class="mart__point__two d-none d-lg-flex">
                                                                                        <div class="mart__point__left">
                                                                                            <a href="#box"
                                                                                                class="point__box">
                                                                                                8.55
                                                                                            </a>
                                                                                            <a href="#box"
                                                                                                class="point__box">
                                                                                                2.70
                                                                                            </a>
                                                                                        </div>
                                                                                        <div class="mart__point__right">
                                                                                            <a href="#0"
                                                                                                class="point__box bg__none">
                                                                                                <i class="fa fa-lock"></i>
                                                                                            </a>
                                                                                            <a href="#0"
                                                                                                class="point__box bg__none">
                                                                                                <i
                                                                                                    class="fa fa-star"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                      
                                                                                <div class="table__footer">
                                                                                    <a href="#0" class="lobby">
                                                                                        Open Football lobby
                                                                                    </a>
                                                                                    <a href="#0" class="footerpoing">
                                                                                        <span>322</span>
                                                                                        <span><i
                                                                                                class="fas fa-angle-right"></i></span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!--Football-->



                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--Live__heightlight End-->




                                                        <!--Footer Content Here-->
                                                        <div class="footer__content__section pt-60 pb-60">
                                                            <div class="footer__content__items">
                                                                <h5>
                                                                    Sports Betting at Sportingbet
                                                                </h5>
                                                                <p>
                                                                    Nulla facilisis scelerisque leo, nec accumsan metus.
                                                                    Vestibulum molestie augue vel erat molestie accumsan. In
                                                                    placerat dolor ut leo porttitor facilisis in a ante.
                                                                    Quisque vitae nibh arcu. Nam vitae cursus purus.
                                                                    Suspendisse sit amet auctor massa. Nulla ac urna in erat
                                                                    molestie maximus. Aliquam a velit vitae ex vehicula
                                                                    suscipit non in enim. Phasellus iaculis libero non dui
                                                                    consequat, vitae vulputate ipsum posuere. Praesent
                                                                    sagittis ipsum venenatis pharetra eleifend. Maecenas
                                                                    commodo mauris vitae leo faucibus fermentum at quis
                                                                    arcu. Nunc malesuada purus ex, vitae posuere turpis
                                                                    pellentesque eget. Curabitur rutrum a tellus et
                                                                    suscipit. Phasellus rhoncus dui et enim aliquet, et
                                                                    tincidunt mi laoreet. Nulla sagittis nibh purus, quis
                                                                    commodo nulla molestie nec. Donec et purus accumsan,
                                                                    sodales nunc at, pretium orci.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <!--Footer Content End-->

                                                    </div>
                                                    <!--Main body-->

                                                    <!--Footer Start-->
                                                    <footer
                                                        class="footer__section main__footer__section media991__pb60 pt-60">
                                                        <div class="container-fluid p-0">

                                                            <!--Footer Top-->
                                                            <div class="footer__top pb-60">
                                                                <div class="row g-5">
                                                                    <div class="col-xxl-2 col-xl-4 col-lg-4 col-md-4 col-sm-4 wow fadeInUp"
                                                                        data-wow-delay="0.9s">
                                                                        <div class="widget__items">
                                                                            <div class="footer-head">
                                                                                <h3 class="title">
                                                                                    General Info
                                                                                </h3>
                                                                            </div>
                                                                            <div class="content-area">
                                                                                <ul class="quick-link">
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> About Us
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Contact Us
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Faq
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="sportsbetting.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Sports
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Sportsbook
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="livecasino.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Live Betting
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Virtuals
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xxl-2 col-xl-4 col-lg-4 col-md-4 col-sm-4 wow fadeInUp"
                                                                        data-wow-delay="0.7s">
                                                                        <div class="widget__items">
                                                                            <div class="footer-head">
                                                                                <h3 class="title">
                                                                                    Casino
                                                                                </h3>
                                                                            </div>
                                                                            <div class="content-area">
                                                                                <ul class="quick-link">
                                                                                    <li>
                                                                                        <a href="casino.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Top
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="casino.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> New
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Popular
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Slots
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Table Games
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Jackpots
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Live Casino
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> All Games
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xxl-2 col-xl-4 col-lg-4 col-md-4 col-sm-4 wow fadeInUp"
                                                                        data-wow-delay="0.5s">
                                                                        <div class="widget__items">
                                                                            <div class="footer-head">
                                                                                <h3 class="title">
                                                                                    Live Casino
                                                                                </h3>
                                                                            </div>
                                                                            <div class="content-area">
                                                                                <ul class="quick-link">
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Top Reted
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Club Royale
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Roulette
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Blackjack
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Games Shows
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Baccarat & Dice
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#0">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Poker
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="livecasino.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> All Live Casino
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-sm-4 wow fadeInUp"
                                                                        data-wow-delay="0.2s">
                                                                        <div class="widget__items">
                                                                            <div class="footer-head">
                                                                                <h3 class="title">
                                                                                    Promotions
                                                                                </h3>
                                                                            </div>
                                                                            <div class="content-area">
                                                                                <ul class="quick-link">
                                                                                    <li>
                                                                                        <a href="promotions.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Casino
                                                                                            Promotions
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="sportsbetting.html">
                                                                                            <img src="/img/footer/rightarrow.png"
                                                                                                alt="angle"> Sport
                                                                                            Promotions
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#0">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Tournaments
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#0">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Achevements
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="bonuses.html">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Bonus Shop
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-sm-4 wow fadeInUp"
                                                                    data-wow-delay="0.2s">
                                                                    <div class="widget__items">
                                                                        <div class="footer-head">
                                                                            <h3 class="title">
                                                                                Help
                                                                            </h3>
                                                                        </div>
                                                                        <div class="content-area">
                                                                            <ul class="quick-link">
                                                                                <li>
                                                                                    <a href="#0">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Help
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="betslipcheck.html">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Bet Slip Check
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="deposit.html">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Deposites /
                                                                                        Withdrwals
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="sportsbetting.html">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Sports Results
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="sportsbetting.html">
                                                                                        <img src="/img/footer/rightarrow.png"
                                                                                            alt="angle"> Sports Stats
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--Footer Top-->
                                                        
                                                        <!--Footer bottom-->
                                                        <div class="footer__bottom">
                                                            <p>
                                                                Copyright &copy; 2024 <a href="index.html"
                                                                    class="text--base">SportOdds</a> - All Right
                                                                Reserved
                                                            </p>
                                                            <ul class="bottom__ling">
                                                                <li>
                                                                    <a href="#0">
                                                                        Affiliate program
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#0">
                                                                        Terms & conditions
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#0">
                                                                        Bonus terms & conditions
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <!--Footer bottom-->
                                                    </div>
                                                </footer>
                                                <!--Footer End-->

                                            </div>
                                            <!--Home Page Tabs Here-->




                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--Global Main Body-->
                        </div>
                    </div>
                </div>

                <Betslip />
            </div>
        </div>
        <!--footer Bottom Menu-->
        <ul class="footer__menu d-lg-none">
            <li>
                <a href="sportsbetting.html" class="d-grid justify-content-center">
                    <span><i class="fas fa-table-tennis"></i></span>
                    <span class="texta">Sports</span>
                </a>
            </li>
            <li>
                <a href="#0" class="d-grid justify-content-center" data-bs-toggle="modal" data-bs-target="#eventsp">
                    <span><i class="fa-solid fa-gift"></i></span>
                    <span class="texta">Events</span>
                </a>
            </li>
            <li class="header-bartwo d-lg-none">
                <span class="bars"><i class="fas fa-bars"></i></span>
                <span class="cros"> <i class="fa-solid fa-xmark"></i></span>
            </li>
            <li>
                <a href="#0" class="d-grid justify-content-center" data-bs-toggle="modal" data-bs-target="#betsp">
                    <span> <i class="fas fa-ticket-alt"></i></span>
                    <span class="texta">My Bet</span>
                </a>
            </li>
            <li>
                <a href="dashboard.html" class="d-grid justify-content-center">
                    <span> <i class="far fa-user-circle"></i></span>
                    <span class="texta"> Account</span>
                </a>
            </li>
        </ul>
        <!--footer Bottom Menu-->
    </section>
    <!--Global Main Body-->
</section></template>

<script>

import { VAPP, _V, FUNC, SESSION } from '../helpers/V_APP.js'
import $ from 'jquery';


export default {
    data() {
        return {
            // bet: null
            activeCoupon: null,
            topKombis: [1, 2, 3, 4, 5, 7, 8, 9, 10],
        }
    },
    async created() {
        // TOKEN YOK İSE OTURUM AÇ SAYFASINA YÖNLENDİR
        if (SESSION.sessionController('token') === false)
            this.$router.push('/sign-in');
    },
    props: {
        matches: Object,
        sports: Object
    },
    computed: {
        sportsFilter() {
        // OBJEYE DÖNŞTÜR & ANA KATEGORİLERİN AKTİF OLANLARINI FİLTRELE
        return Object.values(this.sports).filter(p => p._is.main && p._is.active);

    },
  },

    
}
</script>  
