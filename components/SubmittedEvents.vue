<template>
  <div class="container-fluid">
    <div class="row">
     <div class="col-2">
       <br />
       <br />
       <span  v-if="countOfUserOrgs">There are {{countOfUserOrgs}} User Orgs Submitted</span>
       <br />
        <button type="button" class="btn btn-secondary" @click="goToApprovals" >Go To Org. Approvals</button>
        <br />
       <br />
       <span  v-if="countOfUserVenues">There are {{countOfUserVenues}} Venues Submitted</span>
       <br />
       <button type="button" class="btn btn-secondary" @click="goToVenues" >Go To Venue Approvals</button>
       <br />
       <br />
       <button type="button" class="btn btn-secondary" @click="goToEditEvents" >Go To Edit Events</button>
       <br />
       <br />
       <button type="button" class="btn btn-secondary" @click="goToRecentEvents" >Go To Recently Approved Events</button>
       <br />
       <br />
       <button type="button" class="btn btn-secondary" @click="goToPodStatus" >Go To Pod Status</button>
       <br />
       <br />
       <button type="button" class="btn btn-secondary" @click="goToBadSummaries" >Go To Duplicated Summaries</button>
       <br />
       <br />
     </div>
    <div class="col-9">Submitted Events - click event to approve/edit/delete
      <br />
      <span v-if="newEventID">The last event_ID added was {{newEventID}}</span>



      <br/>
        <table class="table" style="word-break: break-word!important">
          <thead>
            <tr>
              <th scope="col">Prod. Org.</th>
              <th scope="col">Event</th>
              <th scope="col">Start Date</th>
              <th scope="col">Submitter</th>
              <th scope="col">Edited</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in subEvents" @click="rowClick(event.ID)">
              <td>{{event.ORG_NAME}}</td>
              <td>{{event.EVENT_NAME}}</td>
              <td>{{event.STARTDATE | moment("dddd, MMMM Do")}}</td>
              <td>{{event.EMAIL}}</td>
              <td>{{event.EMAILSENT}}</td>
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
  import NewEventEdit from './NewEventEdit';
  import {eventBus} from "../main";
  import OrgApproval from './OrgApproval';
  import VenueApproval from './VenueApproval'
  import {dataURL} from "../main";
  import EventEdit from './EventApproval'
  import BadSummaries from "./BadSummaries";

  export default {
      name: "SubmittedEvents",
      props: {
        newEventID: ''
      },
      data: function () {
        return {
          subEvents: [],
          selectedComponent: 'SubmittedEvents',
          selectedEventID: '',
          newEvent: '1',
          countOfUserOrgs:'',
          countOfUserVenues:'',

        }
      },
      props: {
        newEventID: ''
      },
      methods: {
        fetchEvents: function () {
          var vm = this;
          axios.get(dataURL + '?method=getWebSubmissions')
            .then(function (response) {
              vm.subEvents = response.data;
            })
        },
        testClick: function () {
          this.newEventID = 66666;
        },
        rowClick: function ($event) {
          console.log('rowClick' + $event);
          eventBus.submissionRowWasClicked($event);

        },
        updateEventNum: function (newID) {
          console.log('newID = ' + newID);
          console.log('in update event num function ' + newID);
          this.newEventID = newID;
          console.log('this.newEventID = ' + this.newEventID);
          this.fetchEvents();
        },
        goToApprovals:function(){
          console.log('approvals clicked')
          this.$parent.selectedComponent = 'OrgApproval';
        },
        goToVenues:function(){
          console.log('venues clicked')
          this.$parent.selectedComponent = 'VenueApproval';
        },
        goToEditEvents:function(){
          console.log('edit events clicked')
          this.$parent.selectedComponent = 'NewEventEdit';
        },
        goToRecentEvents:function(){
            this.$parent.selectedComponent = 'RecentEventEntries';
        } ,
         goToPodStatus:function(){
           this.$parent.selectedComponent = 'PodStatus';
         },
        goToBadSummaries:function(){
          this.$parent.selectedComponent = 'BadSummaries';
        },
        getCountOfUserOrgs:function(){
          var vm = this;
          axios.get(dataURL + '?method=getCountUserOrgs')
            .then(function (response) {
              vm.countOfUserOrgs = response.data[0].COUNT;
              console.log(response.data[0].COUNT);
            })
        },
        getCountOfUserVenues:function(){
          var vm = this;
          axios.get(dataURL + '?method=getCountUserVenues')
            .then(function (response) {
              console.log(response.data[0].COUNT);
              vm.countOfUserVenues = response.data[0].COUNT;
              //console.log(response.data[0].COUNT);
            })
        }
      },
      mounted() {
        //this.fetchEvents();
        this.getCountOfUserOrgs();
        this.getCountOfUserVenues();
      },
      beforeMount(){
        this.fetchEvents();
      } ,
      components: {
        EventEdit: EventEdit,
        OrgApproval:OrgApproval,
        NewEventEdit:NewEventEdit
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
