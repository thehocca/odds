<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import BottomBar from '@/components/BottomBar.vue'
import Loader from '@/components/Loader.vue'
</script>

<template>
    <Header v-if="sessionToken" :userInfo="userInfo" />
    <RouterView :sports="sports" :matches="matches" :userInfo="userInfo" />
    <Footer v-if="sessionToken" :userInfo="userInfo" />
    <BottomBar v-if="sessionToken" :userInfo="userInfo" />

    <Loader :text="loaderText" v-if="loader" />
</template>


<script>
import {_V, FUNC, SESSION, Socket, BET,CON } from '/src/helpers/V_APP.js'
// import Custom from '/src/helpers/Custom.js'
import $ from 'jquery';


export default {
    data() {
        return {
            sessionToken: null,
            loader: false,
            loaderText: 'Yükleniyor',
            matches: [],
            sports: [],
            userInfo: null,
            CON: new Socket(),
        }
    },

    async created() {

        this.sessionToken = SESSION.sessionController('token');

        // TOKEN YOK İSE OTURUM AÇ SAYFASINA YÖNLENDİR
        if (SESSION.sessionController('token') === false) {
            this.$router.push('/sign-in');
        } else {
            const CON = new Socket();
            await this.USER_CONTROLLER();
        }

        $(document).on('click', 'a.odd', () => {
            $(this).stop().toggleClass('active');

            var odd = $(this).attr('data-odd');
            var oddmarketid = $(this).attr('data-oddmarketid');
            var outcomeid = $(this).attr('data-outcomeid');
            var matchid = $(this).attr('data-matchid');
            var marketname = $(this).attr('data-marketname');
            
            // MAÇ EKLE
            BET.addMatch(matchid, odd, matchid, outcomeid, marketname);

            // BETSLIP GUNCELLE 
            function addBetslip() {

                var calculateTicketSummary = BET.calculateTicketSummary()
                // $('div.right-bar-betslip h3.current-coupon').html(BET.ActiveCoupon.length);
                // $('div.right-bar-betslip div.header a.select').html(BET.currentSelections);
                $('span.ticket-amount').html(calculateTicketSummary.ticketAmount);
                $('h5.ticket-possible-win span.amount').html(calculateTicketSummary.ticketPossibleWin.toFixed(2));

                // MOBİL
                $('div.betslip-content div.multiple__items').remove();

                $.each(BET.ActiveCoupon, function (index, value) {
                    $.each(value.outComes, function (index, outcome) {
                        // $('div.right-bar-betslip div.content ul.list').prepend('<li class="match"><div class="team"><span>' + outcome.marketName + '</span><small>' + value.competition.competitors[0].name + ' - ' + value.competition.competitors[1].name + '</small></div><div class="rate"><b>' + outcome.oddValue + '</b><a class="removeOdd" data-match-id="' + value.matchId + '" data-outcome-id="' + outcome.outComeId + '" href=javascript:;""><img class="ml-1" src="/images/icons/close.3a28975095163870fadbb7cf24f40efc.svg"></a></div></li>');

                        // $('div.betslip-content').prepend('<div class="multiple__items"><div class="multiple__head"><div class="multiple__left"><span>'+value.competition.competitors[0].name+' vs ' +value.competition.competitors[1].name+ '</span></div></div></div>')
                        $('div.betslip-content').prepend('<div class="multiple__items"></div>')
                        $('div.betslip-content div.multiple__items:first-child').prepend('<div class="multiple__head"></div>')
                        $('div.betslip-content div.multiple__items:first-child div.multiple__head').prepend('<div class="multiple__left"></div><a href="javascript:;" data-match-id="' + value?.matchId + '" data-outcome-id="' + outcome?.outComeId + '" class="cros remove-odd""><i class="fa fa-close"></i></a>')
                        $('div.betslip-content div.multiple__items:first-child div.multiple__head div.multiple__left:first-child').prepend('<span>'+value.competition?.competitors[0]?.name + ' vs ' + value?.competition?.competitors[1]?.name+'</span>')
                        $('div.betslip-content div.multiple__items:first-child').append('<div class="multiple__point"></div>')
                        $('div.betslip-content div.multiple__items:first-child div.multiple__point').prepend('<span class="pbox">'+outcome?.oddValue+'</span>')
                        $('div.betslip-content div.multiple__items:first-child div.multiple__point').append('<span class="rightname"><span class="point">'+outcome?.marketName+'</span></span>')
                        // $('div.betslip-content div.multiple__items:first-child div.multiple__head div.multiple__left:first-child').prepend('')

                        // MOBİL
                        // $('section.mobile-right-bar div.list a.select').html(BET.currentSelections);
                        // $('section.mobile-right-bar div.content div.list ul.list').prepend('<li class="match"><div class="team"><span>' + outcome.marketName + '</span><small>' + value.competition.competitors[0].name + ' - ' + value.competition.competitors[1].name + '</small></div><div class="rate text-right pr-1"><b>' + outcome.oddValue + '</b><a class="removeOdd" data-match-id="' + value.matchId + '" data-outcome-id="' + outcome.outComeId + '" href=javascript:;""><img class="ml-1" src="/images/icons/close.3a28975095163870fadbb7cf24f40efc.svg"></a></div></li>');
                        // $('section.mobile-right-bar p.ticket-amount').html(calculateTicketSummary.ticketAmount);
                        // $('section.mobile-right-bar p.ticket-possible-win').html(calculateTicketSummary.ticketPossibleWin.toFixed(2));




                    });
                });


            }
            addBetslip();


            // BETSLIP SİL
            $(document).on('click', 'a.remove-odd', function () {
                var matchId = $(this).attr('data-match-id');
                var outcomeId = $(this).attr('data-outcome-id');

                // alert(matchId+'   '+outcomeId);

                BET.removeMatch(matchId, outcomeId);
                addBetslip();
                // console.log( addBetslip());
                $('[data-outcomeid=' + outcomeId + '] [data-matchid=' + matchId + ']').parent().removeClass('active');

                return false;
            })

            // BETSLIP TEMİZLE
            $(document).on('click', 'a.clear-betslip', function () {
                BET.clearBets();
                addBetslip();

                $('a.odd').removeClass('active');
                return false;
            });

            // KUPON OLUŞTUR
            $(document).on('click', 'a.save-coupon', async () => {
                
                await this.CON.PlaceBet();  

                $('body').append('<div class="custom-loader"><h1 style="font-size: 90px" class="text-white"></h1></div>');

                let counter = 6;
                const interval = setInterval(() => {
                    if (counter <= 0) {
                        clearInterval(interval);
                        $('.custom-loader').hide();
                        return;
                    }
                    counter--;
                    $('.custom-loader h1').html(counter);
                }, 1000);                
            });


        });

        




        $(document).on('click', '.main-menu a', function () {
            $('.main-menu a').removeClass('active');
            $(this).addClass('active');
        });

        var q = location.pathname;
        if (!['/', '/casino', '/live-casino'].includes(q)) {
            $('.main-menu a').removeClass('active');
        }

        $(document).on('change', function () {
            var q = location.pathname;
            if (!['/', '/casino', '/live-casino'].includes(q)) {
                $('.main-menu a').removeClass('active');
            }
        });
    },

    methods: {
        async USER_CONTROLLER() {

            const checkUser = async (attempt = 0) => {
                if (_V.USER) {
                    this.userInfo = _V.USER;

                    // LOADER AÇ
                    this.loader = true;

                    // İSTEK AT
                    await FUNC.postRequest(_V.rest.base + "/Books/timeline/", {}, (book, status) => {

                        this.matches = FUNC.homeMatches(book.data, this.sports);
                        this.sports = book.sports;

                        console.log(this.matches);

                        // LOADER KAPAT
                        this.loader = false;

                        // // HİÇ MAÇ YOK İSE
                        if (this.matches.length < 1)
                            alert('No match found.');
                    });


                } else if (attempt < 10) {
                    setTimeout(() => checkUser(attempt + 1), 500);
                } else {
                    alert('UserInfo error!');
                }
            };

            await checkUser();
        }
    },
}
</script>
