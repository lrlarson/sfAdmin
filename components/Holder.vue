<template>
  <transition name="el-fade-in-linear">

  <component :is="selectedComponent"  v-bind.sync="{selectedEventID:selectedEventID,newEventID:newEventID,selectedOrg:orgID}"></component>

  </transition>
</template>

<script>
  import SubmittedEvents from './SubmittedEvents';
  import EventEdit from './EventApproval';
  import OrgApproval from './OrgApproval';
  import VenueApproval from './VenueApproval';
  import SignIn from './SignIn';
  import {eventBus} from "../main";
  import NewEventEdit from './NewEventEdit';
  import BlankEvent from './BlankEvent';
  import RecentEventEntries from "./RecentEventEntries";
  import PodStatus from "./PodStatus";
  import BadSummaries from "./BadSummaries";

  export default {
        name: "Holder",
      data: function () {
        return{
          selectedComponent: 'SignIn',
          selectedEventID:'',
          newEventID:'' ,
           orgID:''


        }
      },

      components:{
          SubmittedEvents:SubmittedEvents,
          EventEdit:EventEdit,
          OrgApproval:OrgApproval,
          VenueApproval:VenueApproval,
          SignIn:SignIn,
          NewEventEdit:NewEventEdit,
          BlankEvent:BlankEvent,
          RecentEventEntries:RecentEventEntries,
          PodStatus:PodStatus,
          BadSummaries:BadSummaries
      },
      created(){

        eventBus.$on('blankEventWasClicked',(orgID => {
                //console.log('bblank was clicked  ' + orgID);
                this.orgID = orgID;
                this.selectedComponent = BlankEvent;
          })
        ),

        eventBus.$on('testWasClicked',()=>{
          this.selectedComponent = 'EventEdit';
        }),
        eventBus.$on('submissionRowWasClicked',(id)=>{
          this.selectedEventID = id;
         // alert('received event'+ this.selectedEventID);
          this.selectedComponent = 'EventEdit';
        }),
        eventBus.$on('returnToSubmissionsPage',()=>{
          console.log('return event heard');
          this.selectedComponent = 'SubmittedEvents';
        }),
          eventBus.$on('returnWasClicked',()=>{
            console.log('return event heard');
            this.selectedComponent = 'SubmittedEvents';
          }),
          eventBus.$on('goToOrgApproval',()=>{
            console.log('go to org heard');
            this.selectedComponent = 'OrgApproval';
          }),
          eventBus.$on('newEventIDAdded',(id)=>{
           // console.log('new id received' + id);
            this.newEventID=id;
            this.selectedComponent = 'SubmittedEvents';
          }) ,
          eventBus.$on('orgWasSelected',(org_num)=>{
           // alert('event bus called' + org_num);
            this.orgID = org_num;
            console.log('orgWasSelected' + org_num);

            //this.selectedComponent = 'SubmittedEvents';
          }) ,
          this.$root.$on('NewIdAdded', data => {
            console.log('new root :' +  data);
            this.newEventID = data;
          })

      }
    }
</script>

<style scoped>

</style>
