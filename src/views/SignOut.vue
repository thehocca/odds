<template>
   
</template>    

<script>
    import {SESSION} from '../helpers/V_APP.js'

    export default {
        beforeCreate () {
            SESSION.delSession('token');
            window.location.href = "/"
        },
    }
</script>  