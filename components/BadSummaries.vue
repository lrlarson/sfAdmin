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
      <div class="col-9">Pod Editorial = Event Description
        <br />





        <br/>
        <table class="table" style="word-break: break-word!important">
          <thead>
          <tr>
            <th scope="col">Disp.</th>
            <th scope="col">Event Name</th>
            <th scope="col">Org. Name</th>
            <th scope="col">Date String</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="event in podData" @click="goToOrg(event.ORG_NUM)" >
            <td>{{event.DISCIPLINE}}</td>
            <td>{{event.EVENT_NAME}}</td>
            <td>{{event.ORG_NAME}}</td>
            <td>{{event.DATESTRING}}</td>

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
    import {eventBus} from "../main";

    export default {
        name: "PodStatus",
        data: function () {
           return {
               podData: []

           }
        },
        methods:{
            fetchDecriptionStatus:function () {
               var vm = this;
               axios.get(dataURL + '?method=getBadEventSummaries')
                .then(function (response) {
                    vm.podData = response.data;
                })
            },
          goToEditEvents:function(){
            console.log('edit events clicked')
            this.$parent.selectedComponent = 'NewEventEdit';
          },
          goToSubmittedEvents:function(){

            this.$parent.selectedComponent = 'SubmittedEvents';
          },
          goToOrg:function (orgNum) {
            alert('org num is =' + orgNum);
            //this.$parent.$emit('orgWasSelected',orgNum);
              eventBus.orgWasSelected(orgNum);
            this.$parent.selectedComponent = 'NewEventEdit';
          }

        },
        created() {

            this.fetchDecriptionStatus();
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
