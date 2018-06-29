<template>
  <div>
    <!---
    <el-header>
      Submitted Events Editor
      <br />
      <br />
      <br />
    </el-header>
    --->
    <el-row :gutter="20">


      <el-col :span="5" style="margin: 20px;">
        <el-button @click="backButtonClicked">Return to Submitted Events</el-button>
        <br />
        <br />

        <el-button @click="returnToEventEdit">Return to Event Edit</el-button>
        <br />
        <br />
         <span>New Event Creation for {{Org_Name}}</span>
        <br />
        <br />
        <table class="table" style="word-break: break-word!important; font-size: small; max-height: 600px;">
          <thead>
          <tr>

            <th scope="col">Event Name</th>
            <th scope="col">Date</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="event in eventsForOrg">

            <td>{{event.EVENT_NAME}}<br />{{event.EVENT_NUM}}</td>
            <td>{{event.DATE_STRING}}</td>
          </tr>
          </tbody>
        </table>
      </el-col>

      <div >
        <el-col :span="18">
          <el-form >
            <el-row :gutter="17">
              <el-col :span="8">
                <el-form-item label="Event Name">
                  <el-input placeholder="Event Name" v-model="EVENT_NAME" label="Event Name" id="Event_Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Select Venue">
                  <el-select style="min-width: 248px;"
                             v-model="newVenueID"
                             @input="setNewEventID"
                             filterable
                             :value="VENUEID"
                             remote
                             reserve-keyword
                             placeholder="New Venue Name"
                             :remote-method="remoteMethod2"
                             :loading="loading">
                    <el-option
                      v-for="item in options5"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item label="Selected Event Venue">
                  <el-input placeholder="Selected Venue" v-model="VENUE_NAME" label="Venue Name"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="17">
              <el-col :span="16">
                <el-form-item label="Event Description">
                  <el-input type="textarea" v-model="EVENT_DESCRIPTION" :rows=6 ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <br />
                <br />
                <el-form-item label="Discipline">
                  <el-select v-model="DISP_NUM" placeholder="Select">
                    <el-option
                      v-for="item in disciplines"
                      :key="item.LABEL"
                      :label="item.LABEL"
                      :value="item.VALUE">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Discipline2">
                  <el-select v-model="DISP_NUM2" placeholder="Select">
                    <el-option
                      v-for="item in disciplines2"
                      :key="item.LABEL"
                      :label="item.LABEL"
                      :value="item.VALUE">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Event Phone">
                  <el-input placeholder="Event Venue" v-model="EVENTPHONE" label="Event Phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <br />
            <br />
            <el-row>
              <el-tabs type="border-card">
                <el-tab-pane label="Ticket Prices">

                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="Ticket String">
                        <el-input type="textarea" v-model="TICKETSTRING" :rows=2 ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-checkbox v-model="FREE" style="margin-left: -22px;">Free Event</el-checkbox>
                      <br />
                      <el-checkbox v-model="CHILD">Child Discount</el-checkbox>
                      <br />
                      <el-checkbox v-model="STUDENT" style="margin-left: 14px;">Student Discount</el-checkbox>
                      <br />
                      <el-checkbox v-model="SENIOR" style="margin-left: 6px;">Senior Discount</el-checkbox>
                      <br />
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="Time and Date">
                  <el-row :gutter="27">
                    <el-col :span="6" class="column">
                      <el-form-item label="Start Date" style="margin-left: 40px;">
                        <input type="date" v-model="STARTDATE"    />
                      </el-form-item>
                      <el-form-item label="End Date" style="margin-left: 40px;">
                        <input type="date" v-model="ENDDATE"    />
                      </el-form-item>
                      <el-form-item label="Date String">
                        <el-input placeholder="Date String" v-model="DATESTRING" label="Date String"></el-input>
                      </el-form-item>
                      <el-form-item label="Time String">
                        <el-input placeholder="Time String" v-model="TIMESTRING" label="Time String"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-tabs type="border-card">
                        <el-tab-pane label="Weekly Cycle (Days of the Week)">
                          <el-col :span="6" >

                            <el-checkbox v-model="GALLERY_MUSEUM_EVENT" @change="weeklyChecked">Weekly Event</el-checkbox>
                            <el-checkbox v-model="FRIDAY" >Friday</el-checkbox>
                            <el-checkbox v-model="SATURDAY" >Saturday</el-checkbox>
                            <el-checkbox v-model="SUNDAY">Sunday</el-checkbox>
                            <el-checkbox v-model="MONDAY">Monday</el-checkbox>
                            <el-checkbox v-model="TUESDAY">Tuesday</el-checkbox>
                            <el-checkbox v-model="WEDNESDAY">Wednesday</el-checkbox>
                            <el-checkbox v-model="THURSDAY">Thursday</el-checkbox>
                          </el-col>
                          <el-col :span="6" style="display: flex">


                          </el-col>
                        </el-tab-pane>
                        <el-tab-pane label="Non Daily Cycle (Specific Dates)">
                          <el-checkbox v-model="PERFORMING_ARTS_EVENT" @change="specificDatesChecked">Specific Dates Event</el-checkbox>
                          <table>
                            <tr>
                              <td><el-checkbox v-model="D1">1</el-checkbox></td>
                              <td><el-checkbox v-model="D2">2</el-checkbox></td>
                              <td><el-checkbox v-model="D3">3</el-checkbox></td>
                              <td><el-checkbox v-model="D4">4</el-checkbox></td>
                              <td><el-checkbox v-model="D5">5</el-checkbox></td>
                              <td><el-checkbox v-model="D6">6</el-checkbox></td>
                              <td><el-checkbox v-model="D7">7</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="D8">8</el-checkbox></td>
                              <td><el-checkbox v-model="D9">9</el-checkbox></td>
                              <td><el-checkbox v-model="D10">10</el-checkbox></td>
                              <td><el-checkbox v-model="D11">11</el-checkbox></td>
                              <td><el-checkbox v-model="D12">12</el-checkbox></td>
                              <td><el-checkbox v-model="D13">13</el-checkbox></td>
                              <td><el-checkbox v-model="D14">14</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="D15">15</el-checkbox></td>
                              <td><el-checkbox v-model="D16">16</el-checkbox></td>
                              <td><el-checkbox v-model="D17">17</el-checkbox></td>
                              <td><el-checkbox v-model="D18">18</el-checkbox></td>
                              <td><el-checkbox v-model="D19">19</el-checkbox></td>
                              <td><el-checkbox v-model="D20">20</el-checkbox></td>
                              <td><el-checkbox v-model="D21">21</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="D22">22</el-checkbox></td>
                              <td><el-checkbox v-model="D23">23</el-checkbox></td>
                              <td><el-checkbox v-model="D24">24</el-checkbox></td>
                              <td><el-checkbox v-model="D25">25</el-checkbox></td>
                              <td><el-checkbox v-model="D26">26</el-checkbox></td>
                              <td><el-checkbox v-model="D27">27</el-checkbox></td>
                              <td><el-checkbox v-model="D28">28</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="D29">29</el-checkbox></td>
                              <td><el-checkbox v-model="D30">30</el-checkbox></td>
                              <td><el-checkbox v-model="D31">31</el-checkbox></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>

                            </tr>
                          </table>
                        </el-tab-pane>
                      </el-tabs>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="Event Web Site">
                  <div>
                    <el-form-item label="Event Web Site">
                      <el-input placeholder="Event Web Site" v-model="EVENTWEB" label="Event Web Site" id="inputEventWe"></el-input>
                    </el-form-item>
                    <iframe  name="Event"  id="eventWebSite"  scrolling="auto" style="width:95%;height:600px" :src="EVENTWEB"></iframe>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Ticket Web Site">
                  <div>
                    <el-form-item label="Ticket Web Site">
                      <el-input placeholder="Ticket Web Site" v-model="TICKETURL" label="Ticket Web Site" id="inputTicketWeb"></el-input>
                    </el-form-item>
                    <iframe  name="Ticket"  id="ticketWebSite"  scrolling="auto" style="width:95%;height:600px" :src="TICKETURL"></iframe>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Save/Edit Tools">
                  <div v-if="newEventMode">
                    <el-button style="background-color: lightgreen" @click="postEvent">Create this Event</el-button>


                  </div>
                  <div v-else>
                    <el-button style="background-color: lightgreen" @click="updateEvent">Save The Edits</el-button>

                    <el-button style="background-color: #f56c6c" @click="deleteEvent">Delete this Event</el-button>
                  </div>
                  <div v-if="editsSaved">
                    <br />
                    <br />
                    <br />
                    Edits Saved
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-row>

          </el-form>
        </el-col>

      </div>
    </el-row>
  </div>
</template>

<script>
  import {eventBus} from "../main";
  import axios from "axios";
  import moment from 'moment';
  import {dataURL} from "../main";
    export default {
        name: "BlankEvent",
        props:{
          selectedOrg:''
        },
        data:function () {
          return{
            disciplines:[],
            disciplines2:[],
            loading:'',
            states2:[],
            list2:[],
            options5:[],
            eventsForOrg:[],
            DISP_NUM:'',
            DISP_NUM2:'',
            VENUEID:'',
            EVENT_NAME: '',
            VENUE_NAME:'',
            EVENT_DESCRIPTION: '',
            STARTDATE: '',
            ENDDATE:'',
            TIMESTRINGP: '',
            DATESTRING:'',
            TICKETSTRING:'',
            FREE:'',
            CHILD:'',
            STUDENT:'',
            SENIOR:'',
            FRIDAY:'',
            SATURDAY:'',
            SUNDAY:'',
            MONDAY:'',
            TUESDAY:'',
            WEDNESDAY:'',
            THURSDAY:'',
            D1:'',
            D2:'',
            D3:'',
            D4:'',
            D5:'',
            D6:'',
            D7:'',
            D8:'',
            D9:'',
            D10:'',
            D11:'',
            D12:'',
            D13:'',
            D14:'',
            D15:'',
            D16:'',
            D17 :'',
            D18:'',
            D19:'',
            D20:'',
            D21:'',
            D22:'',
            D23:'',
            D24:'',
            D25:'',
            D26:'',
            D27:'',
            D28:'',
            D29:'',
            D30:'',
            D31:'' ,
            editsSaved:'' ,
            newVenueID:'',
            EVENTPHONE:'',
            TIMESTRING:'',
            GALLERY_MUSEUM_EVENT:'',
           PERFORMING_ARTS_EVENT:'',
            EVENTWEB:'',
            TICKETURL:'',
            Org_Name:'',
            newEventMode:true,


        }
        },
        methods:{
          getDateDiff:function(){
            var date1 = moment(this.STARTDATE);
            var date2 = moment(this.ENDDATE);
            var dateDiff = date2.diff(date1,'days');
            return dateDiff;
          },
          returnToEventEdit:function(){
            this.$parent.selectedComponent = 'NewEventEdit';
          } ,

          clearAfterSave:function(){
            let vm = this;
              vm.DISP_NUM='';
              vm.DISP_NUM2='';
              vm.VENUEID='';
              vm.EVENT_NAME='';
              vm.VENUE_NAME='';
              vm.EVENT_DESCRIPTION='';
              vm.STARTDATE='';
              vm.ENDDATE='';
              vm.TIMESTRING='';
              vm.DATESTRING='';
              vm.TICKETSTRING='';
              vm.FREE='';
              vm.CHILD='';
              vm.STUDENT='';
              vm.SENIOR='';
              vm.FRIDAY='';
              vm.SATURDAY='';
              vm.SUNDAY='';
              vm.MONDAY='';
              vm.TUESDAY='';
              vm.WEDNESDAY='';
              vm.THURSDAY='';
              vm.D1='';
              vm.D2='';
              vm.D3='';
              vm.D4='';
              vm.D5='';
              vm.D6='';
              vm.D7='';
              vm.D8='';
              vm.D9='';
              vm.D10='';
              vm.D11='';
              vm.D12='';
              vm.D13='';
              vm.D14='';
              vm.D15='';
              vm.D16='';
              vm.D17 ='';
              vm.D18='';
              vm.D19='';
              vm.D20='';
              vm.D21='';
              vm.D22='';
              vm.D23='';
              vm.D24='';
              vm.D25='';
              vm.D26='';
              vm.D27='';
              vm.D28='';
              vm.D29='';
              vm.D30='';
              vm.D31='';
              vm.editsSaved='';
              vm.newVenueID='';
              vm.EVENTPHONE='';
              vm.TIMESTRING='';
              vm.GALLERY_MUSEUM_EVENT='';
              vm.PERFORMING_ARTS_EVENT='';
              vm.EVENTWEB='';
              vm.TICKETURL='';

          } ,

          postEvent:function(){
            console.log('in post');
            var vm = this;
            if (!vm.DISP_NUM2){
              vm.DISP_NUM2 = 11;
            }

            var dateDiff = this.getDateDiff();
            console.log('date diff = ' + dateDiff);
            $.ajax({
                url: dataURL,
                data: {
                  event_description:vm.EVENT_DESCRIPTION,
                  disp_num:vm.DISP_NUM,
                  disp_num2:vm.DISP_NUM2,
                  end_date:vm.ENDDATE,
                  event_name:vm.EVENT_NAME,
                  org_num:vm.selectedOrg,
                  start_date:vm.STARTDATE,
                  ticket_String:vm.TICKETSTRING,
                  time_String:vm.TIMESTRING,
                  venueid:vm.VENUEID,
                  ticketURL:vm.TICKETURL,
                  free:vm.FREE,
                  student:vm.STUDENT,
                  senior:vm.SENIOR,
                  child:vm.CHILD,
                  event_Phone:vm.EVENTPHONE,
                  date_string:vm.DATESTRING,
                  eventWeb:vm.EVENTWEB,
                  gallery_museum_event:vm.GALLERY_MUSEUM_EVENT,
                  performing_arts_event:vm.PERFORMING_ARTS_EVENT,
                  saturday:vm.SATURDAY,
                  sunday:vm.SUNDAY,
                  monday:vm.MONDAY,
                  tuesday:vm.TUESDAY,
                  wednesday:vm.WEDNESDAY,
                  thursday:vm.THURSDAY,
                  friday:vm.FRIDAY,
                  eventWebLink:vm.EVENTWEB,
                  ticketURL:vm.TICKETURL,
                  eventPhone:vm.EVENTPHONE,
                  d1:vm.D1,
                  d2:vm.D2,
                  d3:vm.D3,
                  d4:vm.D4,
                  d5:vm.D5,
                  d6:vm.D6,
                  d7:vm.D7,
                  d8:vm.D8,
                  d9:vm.D9,
                  d10:vm.D10,
                  d11:vm.D11,
                  d12:vm.D12,
                  d13:vm.D13,
                  d14:vm.D14,
                  d15:vm.D15,
                  d16:vm.D16,
                  d17:vm.D17,
                  d18:vm.D18,
                  d19:vm.D19,
                  d20:vm.D20,
                  d21:vm.D21,
                  d22:vm.D22,
                  d23:vm.D23,
                  d24:vm.D24,
                  d25:vm.D25,
                  d26:vm.D26,
                  d27:vm.D27,
                  d28:vm.D28,
                  d29:vm.D29,
                  d30:vm.D30,
                  d31:vm.D31,
                  dateDiff,

                  venue_name:vm.VENUE_NAME,

                  method: 'postNewEventRecord',
                  returnFormat: 'json'
                },
                method: 'GET',
                dataType: "json",
                success: function (d, r, o) {

                  console.log(d);

                    vm.$root.$emit('NewIdAdded', d.EVENT_NUM);
                    vm.getNewEventsForOrg();
                    vm.clearAfterSave();
                },
                error: function (jqXHR, exception) {
                  var msg = '';
                  if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                  } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                  } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                  } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                  } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                  } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                  } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                  }
                  alert(msg);
                },
              }
            )


          },

          getDisps: function () {
            var vm = this;
            axios.get(dataURL + '?method=getDisps')
              .then(function (response) {
                vm.disciplines = response.data;
              })
          },

            updateEvent:function(){

            },
          deleteEvent:function(){

          },
          setNewEventID:function(selected){
            this.newVenueID = selected;
            this.VENUEID = this.newVenueID;
            this.getNewVenueName();
          },
          getNewVenueName:function(){
            var vm = this;
            axios.get(dataURL + '?method=getVenueName&venueID=' + vm.newVenueID)
              .then(function (response) {
                console.log(response) ;
                vm.VENUE_NAME= response.data[0].VENUE_NAME;

              })
          } ,
          weeklyChecked:function(){
            var vm = this;

            vm.PERFORMING_ARTS_EVENT = false

          },
          getDisps2: function () {
            var vm = this;
            axios.get(dataURL + '?method=getDisps2')
              .then(function (response) {
                vm.disciplines2 = response.data;
              })
          },
          getNewEventsForOrg:function(){
            var vm = this;

            console.log('in get events org_ID = ' + vm.selectedOrg);
            axios.get(dataURL + '?method=getEventsForOrgRecent&orgID=' + vm.selectedOrg)
              .then(function (response) {
                vm.eventsForOrg = response.data;
              })
          } ,
          backButtonClicked: function ($event) {
            console.log('backbuttonclicked');
            this.$parent.selectedComponent = 'SubmittedEvents';
            // eventBus.returnToSubmissionsPage($event);
            //this.$emit('returnWasClicked','');
          },
          remoteMethod2(query) {
            if (query !== '') {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.options5 = this.list2.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              this.options5 = [];
            }
          } ,
          specificDatesChecked:function(){
            var vm = this;

            vm.eventDetails[0].GALLERY_MUSEUM_EVENT = false

          },
          getAllVenues:function(){
            var vm = this;
            axios.get(dataURL + '?method=getAllVenues')
              .then(function (response) {
                console.log(response);
                vm.states2 = response.data;
                vm.list2 = vm.states2.map(item => {
                  return {value:item.ID,label:item.VENUE_NAME}
                })
              })
          },

          getOrgName:function(){
            var vm = this;

            console.log('in get org name org_ID = ' + vm.selectedOrg);
            axios.get(dataURL + '?method=getOrgName&orgID=' + vm.selectedOrg)
              .then(function (response) {
                console.log(response);
                vm.Org_Name = response.data[0].ORG_NAME;
              })
          } ,
        },
      created(){
        this.getDisps();
        this.getDisps2();
        this.getNewEventsForOrg();
        this.getOrgName();
        this.getAllVenues();

      }
    }
</script>

<style scoped >
  table{
    cursor: pointer;

  }
  .el-table_row tr:nth-child(even) {
    background: oldlace!important;
  }
  tr:nth-child(odd) {background: #f0f9eb}
  .el-table  {

  }

  .orgCell{
    word-break: break-word!important;
  }

  .el-table_row .success-row {
    background: #f0f9eb;
  }
  .el-table .cell {

    word-break: break-word!important;
    line-height: 23px;
  }
  .currentPostings{
    font-size: smaller;
  }
  .el-table th>.cell{
    text-align: center;
  }

  .el-form-item input{
    margin-top: 30px;
    margin-left: -190px;
    border: none;
  }
  .column {
    line-height:1px !important;
  }
  .el-form-item{
    margin-bottom: 1px;
  }
  tr:hover{
    background: lightgray !important;
  }
</style>
