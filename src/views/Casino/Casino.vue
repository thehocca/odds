<script setup>
    import Loader from '@/components/Loader.vue'
</script>

<template>
    <div>
        <section class="main__tab__slide">
            <ul class="nav nav-tabs" id="myTabmain" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="main-tab8cas" data-bs-toggle="tab" data-bs-target="#casinot8"
                        type="button" role="tab" aria-selected="false">
                        <span class="icons"><i class="icon-game"></i></span>
                        <span>Hepsi</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation" v-for="category in categories">
                    <button class="nav-link active" id="main-tab8cas" data-bs-toggle="tab" data-bs-target="#casinot8"
                        type="button" role="tab" aria-selected="false">
                        <span class="icons"><i class="icon-game"></i></span>
                        <span>{{ category.name }}</span>
                    </button>
                </li>
            </ul>
        </section>

        <section class="main__body__area">
            <div class="container">
                <div class="row g-0">
                    <div class="casino__tab__area">
                        <div class="tab-content" id="nav-tabCcasino">

                            <input class="input casino-search" @keyup="searchFunc($event.target.value)" placeholder="Ara..">

                            <!--all games-->
                            <div class="tab-pane mt__30 fade text-white show active" id="casinot8" role="tabpanel" aria-labelledby="casinot1" tabindex="0">
                        
                                <!--All Games-->
                                <div class="common__head mb__30">
                                    <span class="icons"><i class="icon-game"></i></span>
                                    <span>Tüm Oyunlar</span>
                                </div>
                                <div class="row g-4 pb-60">
                                    <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6" v-for="i in games">
                                        <div class="casino__box">
                                            <div class="img" :style="{ backgroundImage: 'url(\'https://static.sportsbookdemo.com/assets/img/slots/' + i.infos.brand.charAt(0).toUpperCase() + i.infos.brand.slice(1) + '/' + i.infos.slotId + '.jpg\')' }">
                                                <div class="casino__overlay">
                                                    <RouterLink :to="'/casino/'+i.id" class="play-btn">
                                                            <img src="/img/games/play.png" alt="img">
                                                    </RouterLink>
                                                </div>
                                            </div>                                          
                                        </div>
                                    </div>
                               
              
                                </div>
                                <!--All Games-->

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Loader v-if="loader" :text="loaderText" />
    </div>
</template>

<script>
import { _V } from '/src/helpers/V_APP.js'
import Swal from 'sweetalert2'


export default {
    data() {
        return {
            categories: [
                {
                    id: 1,
                    name: 'Netent',
                },
                {
                    id: 2,
                    name: 'Kaju',
                },
                {
                    id: 1,
                    name: 'Netent',
                },
                {
                    id: 2,
                    name: 'Netent',
                },
                {
                    id: 1,
                    name: 'Netent',
                },
                {
                    id: 2,
                    name: 'Kaju',
                },
                {
                    id: 1,
                    name: 'Netent',
                },
                {
                    id: 2,
                    name: 'Netent',
                },
            ],
            search: null,
            loaderText: 'Yükleniyor',
            games: [],
        }
    },
    async created() {
        // OYUNLARI ÇEK
        await this.getGames();
    },
    methods: {
        searchFunc(e) {
            if (e) // ARAMA BÖLÜMÜ DOLU İSE
                this.games = this.games.filter(o => o?.infos?.name?.toLowerCase()?.includes(e?.toLowerCase()));
            else // ARAMA BÖLÜMÜ BOŞ İSE
                this.getGames();
        },
        async getGames() {

            // LOADER AÇ
            this.loader = true;

            const checkGames = async (attempt = 0) => {
                if (_V.RGAMES) {
                    this.games = _V.RGAMES;
                    this.loader = false;
                } else if (attempt < 10) {
                    setTimeout(() => checkGames(attempt + 1), 500);
                } else {
                    Swal.fire('Error code: 1003');
                    this.loader = false;
                }

                
            };

            await checkGames();
        }
    }
}
</script>