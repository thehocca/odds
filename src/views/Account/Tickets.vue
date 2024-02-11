<template>
    <section class="dashboard__body mt__30 pb-60">
        <div class="container">
            <div class="row g-4">
                <div class="col-xxl-3 col-xl-3 col-lg-4">
                    <div class="dashboard__side__bar">
                        <ul class="account__menu">
                            <li>
                                <RouterLink to="/account/tickets" class="active">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Kuponlarım
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Kişisel Bilgilerim
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account/password">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Şifremi Değiştir
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account/history">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Hesap Özeti
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account/language">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Dil Ayarları
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/sign-out">
                                    <span class="icons">
                                        <i class="fas fa-sign-out-alt text-white"></i>
                                    </span>
                                    <span>
                                        Çıkış
                                    </span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xxl-9 col-xl-9 col-lg-8">
                    <div class="dashboard__body__wrap">
                        <h3 class="account__head mb__30">
                            Kuponlarım
                        </h3>
                        <div class="cainoform__wrap clearfix">
                            <ul class="account-tickets">
                                <li>
                                    <RouterLink to="/account/tickets" class="active">
                                        Beklemede
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/account/tickets/won">
                                        Kazandı
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/account/tickets/lost">
                                        Kaybetti
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/account/tickets/cashout">
                                        Cashout
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/account/tickets/cancelled">
                                        İptal
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                        <div class="casinoform__tabe">
                            <div class="p-3 text-white b__bottom" style="background-color: #212121; border-bottom: solid 1px #191919" v-for="i in tickets">
                                <div class="row">
                                    <div class="col-12 col-lg-2">
                                        <span v-if="i.results.status === 'pending'" class="text-warning"><b> BEKLİYOR </b></span>
                                        <span v-else-if="i.results.status === 'won'" class="text-success"><b> KAZANDI </b></span>
                                        <span v-else-if="i.results.status === 'sold'" class="text-danger"><b> KAYBETTİ </b></span>
                                    </div>
                                    <div class="col-5 col-lg-3">
                                        {{ i.dates.create2 }}
                                    </div>
                                    <div class="col-3 col-lg-2 text-center">
                                        {{ i.totalBets + ' x ' + i.totalStake + ' ' + i.currency }}
                                    </div>
                                    <div class="col-3 col-lg-2 text-center">
                                        {{ i.ticketPossibleWin + ' ' + i.currency }}
                                    </div>
                                    <div class="col-6 col-lg-2 pt-3 pt-lg-0">
                                        <RouterLink to="/" class="btn btn-sm theme-button w-100 py-2">
                                            CASHOUT <b>3 {{ i.currency }}</b>
                                        </RouterLink>
                                    </div>
                                    <div class="col-6 col-lg-1 pt-3 pt-lg-0">
                                        <RouterLink :to="'/account/tickets/detail/'+i.cid" class="btn btn-sm btn-primary py-2">
                                            İNCELE
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { FUNC } from '@/helpers/V_APP';
import {_V} from '/src/helpers/V_APP.js'

export default {
    data() {
        return {
            loader: false,
            loaderText: 'Yükleniyor',
            tickets: null,
            filter: null,
        }
    },
    props: ['userInfo'],
    async created() {
        await this.getTickets();
    },
    methods: {
        async getTickets() {

            // LOADER AÇ
            this.loader = true;

            const checkTickets = async (attempt = 0) => {
                if (_V.TICKETS) {

                    // URLDEN GELEN FILTER PARAMETRESİNİ AL
                    if (this.$route.query.filter)
                        this.filter = this.$route.query.filter;
                    else
                        this.filter = 'pending';

                        console.log(_V.TICKETS);

                    // TICKETLERI FİLTRELE
                    const filteredTickets = await _V.TICKETS.filter(elem => elem.results.status == this.filter);

                    // console.log(filteredTickets);

                    if (filteredTickets.length > 0) {
                        this.tickets = FUNC.ticketMutation(filteredTickets);
                    }

                    // LOADER KAPAT
                    this.loader = false;
                } else if (attempt < 10) {
                    setTimeout(() => checkTickets(attempt + 1), 500);
                } else {
                    alert('Tickets error!');
                }
            };

            await checkTickets();
        }
    }


}
</script>