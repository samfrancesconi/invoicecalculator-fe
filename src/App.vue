<template>
<div id="app" class="d-flex justify-content-center align-items-center">
     <img style="position: absolute; top: 1%; left:50%; transform: translate(-50%)" src="https://freemilano.files.wordpress.com/2020/09/factory32-logo.jpg">
    <div>
        <center v-if="!insertingNewShow && !viewingDash">
            <h1>Ciao ! Benvenuto nella dashboard</h1>
            <b-button style="margin:10px"  @click="insertingNewShow = true">Aggiungi un nuovo show</b-button>
            <b-button style="margin:10px"  @click="viewingDash = true">Vedi shows salvati</b-button>
        </center>
    </div>
    <ShowInsertionForm v-if="insertingNewShow" />
    <ShowsDashboard v-if="viewingDash" />
</div>
</template>

<script>
import ShowInsertionForm from './components/ShowInsertionForm.vue'
import ShowsDashboard from './components/ShowsDashboard.vue'

export default {
    components: {
        ShowInsertionForm,
        ShowsDashboard
    },
    data() {
        return {
            insertingNewShow: false,
            viewingDash: false,
        }
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
