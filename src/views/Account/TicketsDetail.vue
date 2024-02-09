<script setup>
    import Loader from '@/components/Loader.vue'
</script>

<template>
    <div class="container text-white mt-2 p-3">
        <h5>TicketId: {{ id }}</h5>
        <div class="mt-3 p-3 rounded" style="background-color: #252525;">
            <div class="row">
                <div class="col-6">
                    <ul>
                        <li><h5>Tarih:</h5></li>
                        <li class="mt-3"><h5>Bahis Miktarı:</h5></li>
                        <li class="mt-3"><h5>Maks. Kazanç:</h5></li>
                        <li class="mt-3"><h5>Durum:</h5></li>
                        <li class="mt-3"><h5>Sistem:</h5></li>
                    </ul>
                </div>
                <div class="col-6">
                    <ul style="text-align: right;">
                        <li><h5>{{ ticket[0]?.dates?.create1 }}</h5></li>
                        <li class="mt-3"><h5>{{ ticket[0]?.totalStake + ' ' + ticket[0]?.currency }}</h5></li>
                        <li class="mt-3"><h5>{{ ticket[0]?.ticketPossibleWin + ' ' + ticket[0]?.currency }}</h5></li>
                        <li class="mt-3"><h5>
                            <span v-if="ticket[0]?.results?.status == 'pending'">Bekliyor</span>
                            <span v-if="ticket[0]?.results?.status == 'won'">Kazandı</span>
                            <span v-if="ticket[0]?.results?.status == 'lost'">Kaybetti</span>
                            <span v-if="ticket[0]?.results?.status == 'cashout'">Cashout</span>
                            <span v-if="ticket[0]?.results?.status == 'cancelled'">İptal</span>
                        </h5></li>
                        <li class="mt-3"><h5><span v-if="ticket[0]?.type == 'single'">Tekli</span></h5></li>
                    </ul>
                </div>
            </div>
        </div>  
        
        <Loader v-if="loader" :text="loaderText" />

    </div>
</template>

<script>
import {_V, FUNC} from '/src/helpers/V_APP.js'

export default {
   data() {
       return {
           loader: false,
           loaderText: 'Yükleniyor',
           ticket: [],
           id: this.$route.params.id,
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

    
                   // TICKETLERI FİLTRELE
                   this.ticket  = await _V.TICKETS.filter(elem => elem.cid == this.$route.params.id);
     
                   this.ticket = FUNC.ticketMutation(this.ticket)

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