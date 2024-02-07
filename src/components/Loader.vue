<template>
    <div class="custom-loader">
        <div class="spinner"></div>
        <h4 class="text-white text">{{ text }}</h4>
    </div>
</template>

<script>
    export default {
        props: {
            text: String
        }
    }
</script>