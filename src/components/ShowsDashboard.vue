<template>
<div>
    <h2>Ecco la lista degli spettacoli inseriti:</h2>
    <div v-for="show in shows" :key="show._id">
        <b-card>
            <h3 class="text-center">{{show.name}}</h3>
            <h5 class="text-center">{{show.company}}</h5>
            <center>
                <b-button v-b-toggle="show._id" size="sm">Vedi dettagli</b-button>
            </center>
            <b-collapse :id="show._id" class="mt-2">
                <b-card v-for="(stage, index) in show.stages" :key="index">
                    <h6>Dettagli delle repliche:</h6>
                    <h6>{{stage.date}}</h6>
                    <h6>{{stage.amount}} Euro</h6>
                </b-card>
                <b-card>
                    <p>Il totale lordo è di {{show.stats.total}} Euro, il totale lordo della compagnia è di {{show.stats.companyTotal}} Euro</p>
                    <p>L'impnibile della comagnia ammonta a {{show.stats.companyTaxable}} Euro e le tasse al 10% della compagnia a {{show.stats.companyTaxes}} Euro</p>
                </b-card>
            </b-collapse>
        </b-card>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"

export default {
    components: {

    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            shows: 'shows',
        }),
    },
    mounted() {
        this.$store.dispatch('fetchShows');
    }
}
</script>

<style>
body,
html {
    height: 100%;
    width: 100%;
}

#app {
    padding: 15px;
    height: 100%;
    width: 100%;
}
</style>
