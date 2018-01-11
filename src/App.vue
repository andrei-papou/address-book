<template>

    <div id="app">
        <router-view></router-view>
    </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import TopBar from '@/components/TopBar';

export default {
    name: 'app',
    components: {
        TopBar
    }
}

</script>

<style lang="scss">

@import './assets/scss/main.scss';

</style>
