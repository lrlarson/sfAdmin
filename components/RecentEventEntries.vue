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
      <div class="col-9">Recently Approved Events - click event to approve/edit/delete
        <br />




        <br/>
        <table class="table" style="word-break: break-word!important">
          <thead>
          <tr>
            <th scope="col">Event ID</th>
            <th scope="col">Org. Name</th>
            <th scope="col">Event Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">Editor</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="event in subEvents" @click="rowClick(event.ORG_NUM)">
            <td>{{event.EVENT_NUM}}</td>
            <td>{{event.ORG_NAME}}</td>
            <td>{{event.EVENT_NAME}}</td>
            <td>{{event.DATE_STRING}}</td>
            <td>{{event.EDITOR}}</td>
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
    import NewEventEdit from './NewEventEdit';
    import {eventBus} from "../main";

    export default {
        name: "RecentEventEntries" ,
        data: function () {
            return {
                subEvents: [],
                selectedEventID: '',
                selectedComponent: 'RecentEventEntries',
            }
        },
        methods:{
            fetchEvents: function () {
                var vm = this;
                axios.get(dataURL + '?method=getRecentEvents')
                    .then(function (response) {
                        vm.subEvents = response.data;
                    })
            },
            goToEditEvents:function(){
                console.log('edit events clicked')
                this.$parent.selectedComponent = 'NewEventEdit';
            },
            goToSubmittedEvents:function(){

                this.$parent.selectedComponent = 'SubmittedEvents';
            },

            rowClick: function ($event) {
                console.log('rowClick' + $event);
                //eventBus.submissionRowWasClicked($event);

            }
        },
        created() {
            this.fetchEvents();
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
