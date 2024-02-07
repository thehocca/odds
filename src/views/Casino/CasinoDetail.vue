<script setup>
import Loader from '@/components/Loader.vue'
</script>

<template>
    <Loader v-if="loader" :text="loaderText" />

    <iframe v-if="gameStatus" :src="game" style="width: 100%; height: 100vh; position: fixed; top: 0px; z-index: 99999 !important;" frameborder="0"></iframe>
</template>

<script>
import { FUNC } from '../../helpers/V_APP';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            loader: false,
            loaderText: 'Yükleniyor',
            gameStatus: false,
            game: null,
        }
    },
    async created() {

        // LOADER AÇ
        this.loader = true;

        // OYUNU ÇEK
        await FUNC.postRequest('https://api.sportsbookdemo.com/Slots/join.game', { slotId: this.$route.params.id }, (res, status) => {
            if (status == 200) {
                this.game = res.data.SessionUrl;
                this.gameStatus = true;
            } else {
                Swal.fire('Error code: 1004 <br> Status code: '+status);
            }
            this.loader = false;
        });

    }
}
</script>