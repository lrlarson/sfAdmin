<template>
  <div id="app">
    <Holder/>
  </div>
</template>

<script>
import SubmittedEvents from './components/SubmittedEvents'
import Holder from './components/Holder'
import EventEdit from './components/EventApproval'
import OrgApproval from './components/OrgApproval'
import VenueApproval from './components/VenueApproval'
import NewEventEdit from './components/NewEventEdit'
import BlankEvent from './components/BlankEvent'
import RecentEventEntries from "./components/RecentEventEntries";
import PodStatus from "./components/PodStatus";

export default {
  name: 'App',
  components: {
    SubmittedEvents,
    Holder,
   // EventEdit,
    OrgApproval,
    VenueApproval,
    NewEventEdit,
    BlankEvent,
      RecentEventEntries,
      PodStatus
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
