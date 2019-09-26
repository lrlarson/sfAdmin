<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">

        <button type="button" class="btn btn-secondary" @click="goToSubmittedEvents" >Go To Submitted Events</button>
        <br />
        <br />
        <button type="button" class="btn btn-secondary" @click="goToEditEvents" >Go To Edit Events</button>
        <br />
        <br />

      </div>
      <div class="col-9">Pod Story Status - click to edit
        <br />

        <div id="editor" v-if="showEditor" >
          <div class="col-7">
            <select v-model="selectedPodStory.DISP" >
                <option v-for="disp in disciplines" v-bind:value="disp.VALUE">
                {{ disp.LABEL }}
              </option>
            </select>
            <input v-model="selectedPodStory.TITLE">
            <label >Title</label>
            <input type="checkbox" v-model="selectedPodStory.EVENTINDB">
            <label >In DB</label>
            <input type="checkbox" v-model="selectedPodStory.EVENTINDB">
            <label >Have Image</label>
            <input type="checkbox" v-model="selectedPodStory.PROCESSED">
            <label >Set to Complete</label>
          </div>

      </div>


        <br/>
        <table class="table" style="word-break: break-word!important">
          <thead>
          <tr>
            <th scope="col">Disp.</th>
            <th scope="col">Title</th>
            <th scope="col">Event in DB</th>
            <th scope="col">Have Image</th>
            <th scope="col">Processed</th>
            <th scope="col">Last Edit By</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="event in podData" @click="rowClick(event.ID)">
            <td>{{event.DISCIPLINE}}</td>
            <td>{{event.TITLE}}</td>
            <td>{{event.EVENTINDB}}</td>
            <td>{{event.HAVEIMAGE}}</td>
            <td>{{event.PROCESSED}}</td>
            <td>{{event.LASTEDITBY}}</td>
          </tr>
          </tbody>                                 `
        </table>
      </div>
      <div class="col-1"></div>

    </div>

  </div>
</template>

<script>
    import axios from "axios";
    import {dataURL} from "../main";

    export default {
        name: "PodStatus",
        data: function () {
           return {
               podData: [],
               tempPodData:[],
               showEditor: false,
               selectedPodStory:{},
               disciplines:[]
           }
        },
        methods:{
            fetchPodStatus:function () {
               var vm = this;
               axios.get(dataURL + '?method=getPodStatus')
                .then(function (response) {
                    vm.podData = response.data;
                })
            },
            upDatePodStatus:function (id) {
                var vm = this;
                axios.get(dataURL + '?method=updateSpecificPodStatus&ID=' + id)
                    .then(function (response) {
                        vm.tempPodData = response.data;
                        vm.selectedPodStory = vm.tempPodData[0];
                    })
            },
            goToEditEvents:function(){
                console.log('edit events clicked')
                this.$parent.selectedComponent = 'NewEventEdit';
            },
            goToSubmittedEvents:function(){

                this.$parent.selectedComponent = 'SubmittedEvents';
            },
            rowClick(id){
                this.showEditor = true;
                this.upDatePodStatus(id);
            },
            getDisps: function () {
                var vm = this;
                axios.get(dataURL + '?method=getDisps')
                    .then(function (response) {
                        vm.disciplines = response.data;
                    })
            },
        },
        created() {
            this.getDisps();
            this.fetchPodStatus();
        }
    }
</script>


<style scoped>
  table{
    cursor: pointer;

  }
  tr:hover{
    background: lightgray !important;
  }
  tr:nth-child(even) {background: lightblue}
</style>
