<template>
<div>
    <b-card v-if="currentShow === null">
        <p>Inserisci il titolo dello spettacolo e il nome della compagnia:</p>
        <b-input class="mt-2" placeholder="Titolo" v-model="showDetails.title"></b-input>
        <b-input class="mt-2" placeholder="Compagnia" v-model="showDetails.company"></b-input>
        <b-button class="mt-2" @click="acquireShowData()">Acquire</b-button>
    </b-card>
    <div v-if="currentShow">
        <div v-if="calculatedOutcomes === null">
            <p>Inserisci gli importi lordi dei C1 per ogni replica, clicca su aggiungi se vuoi inserire una replica e clicca su invia una volta che li avrai inseriti tutti</p>
            <b-button @click="addStageTemplate()">Aggiungi un C1 +</b-button>
        </div>
        <div v-for="(stage, index) in stages" :key="index">
            <b-card class="mt-4 mb-4">
                <b-row>
                    <b-col>
                        <b-input v-model="stage.date" :disabled="stagesSent" placeholder="data"></b-input>
                    </b-col>
                    <b-col>
                        <b-input v-model="stage.amount" :disabled="stagesSent" placeholder="importo lordo C1"></b-input>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <div v-if="calculatedOutcomes === null">
            <b-button v-if="stagesSent" @click="calculateOutcomes(currentShow._id)">Calcola</b-button>
            <b-button v-if="!stagesSent && stages.length > 0" @click="sendStages(currentShow._id)">Invia</b-button>
        </div>
    </div>
    <div class="mt-6" v-if="calculatedOutcomes !== null">
        <p>Ecco i dati da inviare alla compagnia:</p>
        <p>Per i C1 inseriti il totale lordo è di {{calculatedOutcomes.outcome.total}}, il totale lordo della compagnia è di {{calculatedOutcomes.outcome.companyTotal}}</p>
        <p>L'impnibile della comagnia ammonta a {{calculatedOutcomes.outcome.companyTaxable}} e le tasse al 10% della compagnia a {{calculatedOutcomes.outcome.companyTaxes}}</p>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            showDetails: {
                title: '',
                company: '',
            },
            stages: [],
            operations: null,
        }
    },
    computed: {
        ...mapGetters({
            currentShow: 'currentShow',
            stagesSent: 'stagesSent',
            calculatedOutcomes: 'calculatedOutcomes'
        }),
    },
    methods: {
        acquireShowData() {
            this.$store.dispatch("fetchCurrentShow", this.showDetails);
        },
        addStageTemplate() {
            this.stages.push({
                date: '',
                amount: ''
            });
        },
        sendStages(id) {
            for (let i = 0; i < this.stages.length; i++) {
                this.stages[i].id = id;
                this.$store.dispatch("sendStages", this.stages[i]);
            }
        },
        calculateOutcomes(id) {
            this.$store.dispatch("calculateOutcomes", id);
        },
    }
}
</script>
