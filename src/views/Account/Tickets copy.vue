<template>
    <div>
        <section class="main__tab__slide">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button class="nav-link active">
                        <span>Beklemede</span>
                    </button>
                </li>

                <li class="nav-item">
                    <button class="nav-link">
                        <span>Kazandı</span>
                    </button>
                </li>

                <li class="nav-item">
                    <button class="nav-link">
                        <span>Kaybetti</span>
                    </button>
                </li>

                <li class="nav-item">
                    <button class="nav-link">
                        <span>Cashout</span>
                    </button>
                </li>

                <li class="nav-item">
                    <button class="nav-link">
                        <span>İptal</span>
                    </button>
                </li>
            </ul>
        </section>
       
        <section class="main__body__area">
            <div class="container">
                <div class="row g-0">
                   
                    <div class="col-12 text-white"  v-for="i in tickets">
                        sdf
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
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

                    // TICKETLERI FİLTRELE
                    this.tickets  = _V.TICKETS.filter(elem => elem.results.status == this.filter);

                    
                    console.log(this.tickets);
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