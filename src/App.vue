<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader.vue'
</script>

<template>
   <Header v-if="sessionToken" :userInfo="userInfo" />
   <RouterView :sports="sports" :matches="matches" :userInfo="userInfo" />
   <Footer v-if="sessionToken" :userInfo="userInfo" />

   <Loader :text="loaderText" v-if="loader" />
</template>


<script>
import { VAPP, USER, _V, FUNC, SESSION, Socket, BET } from '/src/helpers/V_APP.js'
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
            userInfo: {},
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

        $(document).on('click', 'a.odd', function () {
            var odd = $(this).attr('data-odd');
            var oddmarketid = $(this).attr('data-oddmarketid');
            var outcomeid = $(this).attr('data-outcomeid');
            var matchid = $(this).attr('data-matchid');
            var marketname = $(this).attr('data-marketname');

            // MAÇ EKLE
            BET.addMatch(matchid, odd, matchid, outcomeid, marketname);

            // BETSLIP GUNCELLE 
            function betSlipList() {

                var calculateTicketSummary = BET.calculateTicketSummary()
                $('div.right-bar-betslip h3.current-coupon').html(BET.ActiveCoupon.length);
                $('div.right-bar-betslip div.header a.select').html(BET.currentSelections);
                $('div.right-bar-betslip p.ticket-amount').html(calculateTicketSummary.ticketAmount);
                $('div.right-bar-betslip p.ticket-possible-win').html(calculateTicketSummary.ticketPossibleWin.toFixed(2));
                $('div.right-bar-betslip div.content ul.list li.match').remove();

                // MOBİL
                $('section.mobile-right-bar div.content div.list ul.list li.match').remove();

                $.each(BET.ActiveCoupon, function (index, value) {
                    $.each(value.outComes, function (index, outcome) {
                        $('div.right-bar-betslip div.content ul.list').prepend('<li class="match"><div class="team"><span>' + outcome.marketName + '</span><small>' + value.competition.competitors[0].name + ' - ' + value.competition.competitors[1].name + '</small></div><div class="rate"><b>' + outcome.oddValue + '</b><a class="removeOdd" data-match-id="' + value.matchId + '" data-outcome-id="' + outcome.outComeId + '" href=javascript:;""><img class="ml-1" src="/images/icons/close.3a28975095163870fadbb7cf24f40efc.svg"></a></div></li>');
                        
                        // MOBİL
                        $('section.mobile-right-bar div.list a.select').html(BET.currentSelections);
                        $('section.mobile-right-bar div.content div.list ul.list').prepend('<li class="match"><div class="team"><span>' + outcome.marketName + '</span><small>' + value.competition.competitors[0].name + ' - ' + value.competition.competitors[1].name + '</small></div><div class="rate text-right pr-1"><b>' + outcome.oddValue + '</b><a class="removeOdd" data-match-id="' + value.matchId + '" data-outcome-id="' + outcome.outComeId + '" href=javascript:;""><img class="ml-1" src="/images/icons/close.3a28975095163870fadbb7cf24f40efc.svg"></a></div></li>');
                        $('section.mobile-right-bar p.ticket-amount').html(calculateTicketSummary.ticketAmount);
                        $('section.mobile-right-bar p.ticket-possible-win').html(calculateTicketSummary.ticketPossibleWin.toFixed(2));

                       


                    });
                });


            }
            betSlipList();


            // BETSLIP SİL
            $(document).on('click', 'a.removeOdd', function () {
                var matchId = $(this).attr('data-match-id');
                var outcomeId = $(this).attr('data-outcome-id');

                BET.removeMatch(matchId, outcomeId);
                betSlipList();

                $('[data-outcomeid=' + outcomeId + '] [data-matchid=' + matchId + '] ').parent().removeClass('active');
                return false;
            })

            // BETSLIP TEMİZLE
            $(document).on('click', 'a.clear-betslip', function () {
                BET.clearBets();
                betSlipList();

                $('a.odd').removeClass('active');
                return false;
            });

            // KUPON OLUŞTUR
            $(document).on('click', 'a.save-coupon', async function () {
                await CON.PlaceBet();  
            });

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

                        this.matches = FUNC.homeMatches(book.data);
                        this.sports = book.sports;

                        // LOADER KAPAT
                        this.loader = false;

                        // HİÇ MAÇ YOK İSE
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
