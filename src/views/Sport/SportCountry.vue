<script setup>
import Betslip from '@/components/Betslip.vue';
import LeftBar from '@/components/LeftBar.vue';
</script>

<template>
    <section>
        <!--Sub-Header Tabs Here-->
        <section class="main__tab__slide">
            <ul class="nav nav-tabs" id="myTabmain" role="tablist">
                <li class="nav-item" role="presentation" v-for="i in sportsFilter">
                    <RouterLink :to="'/sport/' + i.name" class="prescore__items">
                        <button class="nav-link active" id="main-tab" data-bs-toggle="tab" data-bs-target="#mainTab"
                            type="button" role="tab" aria-selected="true">
                            <!-- <span class="icons"><i class="fa fa-home"></i></span> -->
                            <span>{{ i.name }}</span>
                        </button>
                    </RouterLink>

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

                                            <LeftBar />

                                            <div class="col-xxl-10 col-xl-9 col-lg-9">
                                                <!--Home Page Tabs Here-->
                                                <div class="tab-pane text-white fade show active" id="mainTab"
                                                    role="tabpanel" tabindex="0">



                                                    <!--Main body-->
                                                    <div class="main__body__wrap left__right__space">
                                                        
                                                        <div class="row" style="margin-top: 16px">
                                                            <div class="col-lg-3">
                                                                <select name="" class="form-control bg-dark text-white border-0">
                                                                    <option value="">Lütfen Seçin</option>
                                                                </select>  
                                                            </div>

                                                            <div class="col-lg-3">
                                                                <select name="" class="form-control bg-dark text-white border-0">
                                                                    <option value="">Lig</option>
                                                                </select>  
                                                            </div>
                                                        </div>

                                                        <!--Live__heightlight Here-->
                                                        <div class="live__heightlight mb__30 mt-3">

                                                            <div class="section__title">
                                                                <h4>
                                                                    {{ categoryName }}
                                                                </h4>
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
                                                                                    <div
                                                                                        class="right__cate__items d-none d-lg-flex">
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
                                                                                    <div
                                                                                        class="right__cate__items d-none d-lg-flex">
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
                                                                                    <div
                                                                                        class="right__cate__items d-none d-lg-flex">
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
                                                                                    <div
                                                                                        class="mart__point__items d-none d-lg-flex">
                                                                                        <a href="#0"
                                                                                            class="twing opo twing__right">
                                                                                            <i class="icon-twer"></i>
                                                                                        </a>
                                                                                        <a href="#0" class="mart opo">
                                                                                            <i class="icon-pmart"></i>
                                                                                        </a>
                                                                                        <a href="javascript:;"
                                                                                            class="point__box bg__none">
                                                                                            1
                                                                                        </a>
                                                                                        <a href="javascript:;"
                                                                                            class="point__box bg__none">
                                                                                            X
                                                                                        </a>
                                                                                        <a href="javascript:;"
                                                                                            class="point__box bg__none">
                                                                                            2
                                                                                        </a>
                                                                                    </div>
                                                                                    <div
                                                                                        class="cart__point cart__point__two d-none d-lg-flex">
                                                                                        Goals
                                                                                    </div>
                                                                                    <div
                                                                                        class="mart__point__two clearfix d-none d-lg-flex">
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
                                                                                <div class="table__items b__bottom py-2"
                                                                                    v-for="i in matches">
                                                                                    <div class="t__items mb-2"
                                                                                        style=" min-width: 350px;">
                                                                                        <div class="t__items__left w-100">
                                                                                            <div class="row">
                                                                                                <div class="col-2">
                                                                                                    <div>
                                                                                                        <small>
                                                                                                            {{ i.date.date
                                                                                                            }}
                                                                                                        </small>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <small>
                                                                                                            {{ i.date.hour
                                                                                                            }}
                                                                                                        </small>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="col-8 col-lg-6 p-0 text-truncate">
                                                                                                    <span>
                                                                                                        <img v-bind:src="i.jerseys?.[0]"
                                                                                                            class="d-inline"
                                                                                                            style="width: 16px">
                                                                                                        {{
                                                                                                            i.competition.competitors[0].name
                                                                                                        }}

                                                                                                        <div class="py-1">
                                                                                                        </div>

                                                                                                        <img v-bind:src="i.jerseys?.[1]"
                                                                                                            class="d-inline"
                                                                                                            style="width: 16px">
                                                                                                        {{
                                                                                                            i.competition.competitors[1].name
                                                                                                        }}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="col-2 d-flex flex-column">
                                                                                                    <h6 class="mt-1">
                                                                                                        0
                                                                                                    </h6>
                                                                                                    <h6 class="mt-2">
                                                                                                        0
                                                                                                    </h6>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="col-2 text-center d-none d-lg-flex align-items-center justify-content-center p-0">
                                                                                                    <a href=""
                                                                                                        style="margin-left: 10px">
                                                                                                        <i
                                                                                                            class="icon-pmart"></i>
                                                                                                    </a>
                                                                                                    <a href=""
                                                                                                        style="margin: 0px 10px 0px 10px">
                                                                                                        <i
                                                                                                            class="icon-twer"></i>
                                                                                                        <small>{{
                                                                                                            i.markets.length
                                                                                                        }}</small>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        class="cart__point d-none flex-column">
                                                                                        <small>
                                                                                            0
                                                                                        </small>
                                                                                        <small>
                                                                                            0
                                                                                        </small>
                                                                                    </div>
                                                                                    <div class="mart__point__items">
                                                                                        <a href="javascript:;"
                                                                                            class="point__box odd"
                                                                                            :data-odd="i.market1.outcomes[0].odds.toFixed(2)"
                                                                                            :data-oddmarketid="i.market1.marketId"
                                                                                            :data-outcomeid="i.market1.outcomes[0].outComeId"
                                                                                            :data-matchid="i.competition.matchId"
                                                                                            :data-marketname="i.market1.marketName">
                                                                                            {{
                                                                                                i.market1.outcomes[0].odds.toFixed(2)
                                                                                            }}
                                                                                        </a>
                                                                                        <a href="javascript:;"
                                                                                            class="point__box odd">
                                                                                            {{
                                                                                                i.market1.outcomes[1].odds.toFixed(2)
                                                                                            }}
                                                                                        </a>
                                                                                        <a href="javascript:;"
                                                                                            class="point__box odd">
                                                                                            {{
                                                                                                i.market1.outcomes[2].odds.toFixed(2)
                                                                                            }}
                                                                                        </a>

                                                                                        <div class="d-block d-lg-none">
                                                                                            <a href=""
                                                                                                style="margin-left: 10px">
                                                                                                <i class="icon-pmart"></i>
                                                                                            </a>
                                                                                            <a href=""
                                                                                                style="margin: 0px 10px 0px 10px">
                                                                                                <i class="icon-twer"></i>
                                                                                                <small>123</small>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        class="cart__point cart__point__two d-none d-lg-flex">
                                                                                        2,6
                                                                                    </div>
                                                                                    <div
                                                                                        class="mart__point__two d-none d-lg-flex">
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
                                                                                                <i class="fa fa-star"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="table__footer">
                                                                                    <a href="#0" class="lobby">
                                                                                        Tüm Maçlar
                                                                                    </a>
                                                                                    <a href="#0" class="footerpoing">
                                                                                        <span>{{ matches.length }}</span>
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
        -
    </section>
    -
</section></template>

<script>

import { VAPP, _V, FUNC, SESSION } from '@/helpers/V_APP.js'
import $ from 'jquery';


export default {
    data() {
        return {
            // bet: null
            activeCoupon: null,
            topKombis: [1, 2, 3, 4, 5, 7, 8, 9, 10],
            categoryName: null
        }
    },
    async created() {
        // TOKEN YOK İSE OTURUM AÇ SAYFASINA YÖNLENDİR
        if (SESSION.sessionController('token') === false)
            this.$router.push('/sign-in');

        this.categoryName = this.$route.params.name;
    },
    props: {
        matches: null,
        sports: null
    },
    computed: {
        sportsFilter() {
            // OBJEYE DÖNŞTÜR & ANA KATEGORİLERİN AKTİF OLANLARINI FİLTRELE
            return Object.values(this.sports).filter(p => p._is.main && p._is.active);

        },
    },


}
</script>  
