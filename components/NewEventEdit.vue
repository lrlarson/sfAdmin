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
          <el-select style="min-width: 248px;"
            v-model="selectedOrg"
            @input="getEventsForOrg"
            filterable
            remote
            reserve-keyword
            placeholder="Select Organization"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br/>
          <br/>
          <br/>
          <el-checkbox v-model="newEventMode">
              Create a New Event
          </el-checkbox>
          <br/>
          <br/>
          <div v-if="newEventMode">
               <el-button @click="blankClick">Completely New Event for this Org.</el-button>
            <br/>
            <br/>
            <el-button @click="setUpSamePatternEvent">New Event based on Selected Event</el-button>
            <br/>
            <br/>
          </div>
          <table class="table" style="word-break: break-word!important; font-size: small; max-height: 600px;">
            <thead>
            <tr>

              <th scope="col">Event Name</th>
              <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="event in eventsForOrg" @click="rowClick(event.EVENT_NUM)">

              <td>{{event.EVENT_NAME}}<br />{{event.EVENT_NUM}}</td>
              <td>{{event.DATE_STRING}}</td>
            </tr>
            </tbody>
          </table>
        </el-col>

      <div v-for="event in eventDetails" v-if="eventDetails[0].VENUE_NAME" >
        <el-col :span="18">
          <el-form >
            <el-row :gutter="17">
              <el-col :span="8">
                <el-form-item label="Event Name">
                  <el-input placeholder="Event Name" v-model="event.EVENT_NAME" label="Event Name" id="Event_Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Event Venue">
                  <el-input placeholder="Event Venue" v-model="event.VENUE_NAME" label="Venue Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Select New Venue">
                <el-select style="min-width: 248px;"
                           v-model="newVenueID"
                           @input="setNewEventID"
                           filterable
                           :value="event.VENUEID"
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
            </el-row>
            <el-row :gutter="17">
              <el-col :span="16">
                <el-form-item label="Event Description">
                  <el-input type="textarea" v-model="event.EVENT_DESCRIPTION" :rows=6 ></el-input>
                </el-form-item>

                <el-form-item label="Original Submitter">
                  <el-input  v-model="event.EMAIL"  ></el-input>
                </el-form-item>
                <el-form-item label="SF/Arts Submitter">
                  <el-input  v-model="event.EDITOR"  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <br />
                <br />
                <el-form-item label="Discipline">
                  <el-select v-model="event.DISP_NUM" placeholder="Select">
                    <el-option
                      v-for="item in disciplines"
                      :key="item.LABEL"
                      :label="item.LABEL"
                      :value="item.VALUE">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Discipline2">
                  <el-select v-model="event.DISP_NUM2" placeholder="Select">
                    <el-option
                      v-for="item in disciplines2"
                      :key="item.LABEL"
                      :label="item.LABEL"
                      :value="item.VALUE">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Event Phone">
                  <el-input placeholder="Event Venue" v-model="event.EVENTPHONE" label="Event Phone"></el-input>
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
                        <el-input type="textarea" v-model="event.TICKETSTRING" :rows=2 ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-checkbox v-model="event.FREE" style="margin-left: -22px;">Free Event</el-checkbox>
                      <br />
                      <el-checkbox v-model="event.CHILD">Child Discount</el-checkbox>
                      <br />
                      <el-checkbox v-model="event.STUDENT" style="margin-left: 14px;">Student Discount</el-checkbox>
                      <br />
                      <el-checkbox v-model="event.SENIOR" style="margin-left: 6px;">Senior Discount</el-checkbox>
                      <br />
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="Time and Date">
                  <el-row :gutter="27">
                    <el-col :span="6" class="column">
                      <el-form-item label="Start Date" style="margin-left: 40px;">
                        <input type="date" v-model="event.STARTDATE"    />
                      </el-form-item>
                      <el-form-item label="End Date" style="margin-left: 40px;">
                        <input type="date" v-model="event.ENDDATE"    />
                      </el-form-item>
                      <el-form-item label="Date String">
                        <el-input placeholder="Date String" v-model="event.DATESTRING" label="Date String"></el-input>
                      </el-form-item>
                      <el-form-item label="Time String">
                        <el-input placeholder="Time String" v-model="event.TIMESTRING" label="Time String"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-tabs type="border-card">
                        <el-tab-pane label="Weekly Cycle (Days of the Week)">
                          <el-col :span="6" >

                            <el-checkbox v-model="event.GALLERY_MUSEUM_EVENT" @change="weeklyChecked">Weekly Event</el-checkbox>
                            <el-checkbox v-model="event.FRIDAY" >Friday</el-checkbox>
                            <el-checkbox v-model="event.SATURDAY" >Saturday</el-checkbox>
                            <el-checkbox v-model="event.SUNDAY">Sunday</el-checkbox>
                            <el-checkbox v-model="event.MONDAY">Monday</el-checkbox>
                            <el-checkbox v-model="event.TUESDAY">Tuesday</el-checkbox>
                            <el-checkbox v-model="event.WEDNESDAY">Wednesday</el-checkbox>
                            <el-checkbox v-model="event.THURSDAY">Thursday</el-checkbox>
                          </el-col>
                          <el-col :span="6" style="display: flex">


                          </el-col>
                        </el-tab-pane>
                        <el-tab-pane label="Non Daily Cycle (Specific Dates)">
                          <el-checkbox v-model="event.PERFORMING_ARTS_EVENT" @change="specificDatesChecked">Specific Dates Event</el-checkbox>
                          <table>
                            <tr>
                              <td><el-checkbox v-model="event.D1">1</el-checkbox></td>
                              <td><el-checkbox v-model="event.D2">2</el-checkbox></td>
                              <td><el-checkbox v-model="event.D3">3</el-checkbox></td>
                              <td><el-checkbox v-model="event.D4">4</el-checkbox></td>
                              <td><el-checkbox v-model="event.D5">5</el-checkbox></td>
                              <td><el-checkbox v-model="event.D6">6</el-checkbox></td>
                              <td><el-checkbox v-model="event.D7">7</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="event.D8">8</el-checkbox></td>
                              <td><el-checkbox v-model="event.D9">9</el-checkbox></td>
                              <td><el-checkbox v-model="event.D10">10</el-checkbox></td>
                              <td><el-checkbox v-model="event.D11">11</el-checkbox></td>
                              <td><el-checkbox v-model="event.D12">12</el-checkbox></td>
                              <td><el-checkbox v-model="event.D13">13</el-checkbox></td>
                              <td><el-checkbox v-model="event.D14">14</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="event.D15">15</el-checkbox></td>
                              <td><el-checkbox v-model="event.D16">16</el-checkbox></td>
                              <td><el-checkbox v-model="event.D17">17</el-checkbox></td>
                              <td><el-checkbox v-model="event.D18">18</el-checkbox></td>
                              <td><el-checkbox v-model="event.D19">19</el-checkbox></td>
                              <td><el-checkbox v-model="event.D20">20</el-checkbox></td>
                              <td><el-checkbox v-model="event.D21">21</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="event.D22">22</el-checkbox></td>
                              <td><el-checkbox v-model="event.D23">23</el-checkbox></td>
                              <td><el-checkbox v-model="event.D24">24</el-checkbox></td>
                              <td><el-checkbox v-model="event.D25">25</el-checkbox></td>
                              <td><el-checkbox v-model="event.D26">26</el-checkbox></td>
                              <td><el-checkbox v-model="event.D27">27</el-checkbox></td>
                              <td><el-checkbox v-model="event.D28">28</el-checkbox></td>
                            </tr>
                            <tr>
                              <td><el-checkbox v-model="event.D29">29</el-checkbox></td>
                              <td><el-checkbox v-model="event.D30">30</el-checkbox></td>
                              <td><el-checkbox v-model="event.D31">31</el-checkbox></td>
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
                      <el-input placeholder="Event Web Site" v-model="event.EVENTWEB" label="Event Web Site" id="inputEventWe"></el-input>
                    </el-form-item>
                    <iframe  name="Event"  id="eventWebSite"  scrolling="auto" style="width:95%;height:600px" :src="event.EVENTWEB"></iframe>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Ticket Web Site">
                  <div>
                    <el-form-item label="Ticket Web Site">
                      <el-input placeholder="Ticket Web Site" v-model="event.TICKETURL" label="Ticket Web Site" id="inputTicketWeb"></el-input>
                    </el-form-item>
                    <iframe  name="Ticket"  id="ticketWebSite"  scrolling="auto" style="width:95%;height:600px" :src="event.TICKETURL"></iframe>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Messages New">
                  <div>
                    <el-form-item label="Send a Direct Message to Submitter">
                      <el-input type="textarea" v-model="message" :rows=4 ></el-input>
                    </el-form-item>
                    <el-select v-model="sender" placeholder="Select Sender" v-if="message">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="submissionButtons" v-if="!edit" >
                      <button v-if="message" class="btn-secondary subbutton" @click="sendMessage">Send this Message to the Submitter</button>
                      <br />
                    </div>
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
      <div v-else>
        Brand new Event
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
    name: "NewEventEdit",
    data: function(){
      return{
        eventDetails:[],
        orgID:'',
        orgName:'',
        eventsForOrg:[],
        disciplines:[],
        disciplines2:[],
        payload:[] ,
        options4: [],
        selectedOrg: '',
        list: [],
        loading: false,
        states:[],
        states2:[],
        list2:[],
        options5:[],
        newVenueID:'',
        editsSaved:false,
        newEventMode:false,
          knowOrgID:false,
        brandNewEventMode:false,
          message:'',
          options: [{
              value: 'sfartseditor@gmail.com',
              label: 'Catherine'
          }, {
              value: 'sfartsmonthly@gmail.com',
              label: 'Geraldine'
          }, {
              value: 'lrlarson@larsonassoc.org',
              label: 'Larry'
          },  ],
          sender: '',
        selectedOrgID:'' ,
        selectedOrg:''


      }
    },
    props:{

    },
    methods: {
      fetchEventDetails: function () {
        var vm = this;
        console.log('in event edit -- selectedEventID = ' + vm.selectedEventID);
        axios.get(dataURL + '?method=getPostedEvent&event_num=' + vm.selectedEventID)
          .then(function (response) {
            vm.eventDetails = response.data;
            //vm.eventDetails.STARTDATE = moment(vm.eventDetails.STARTDATE).format('DD/MM/YYY');
           // console.log('start date - ' + vm.eventDetails[0].STARTDATE);
          })

      },
        sendMessage:function(){
            var vm = this;

            if (!vm.sender){
                alert('Please select a sender');
                return;
            }



            $.ajax({
                    url: dataURL,
                    data: {
                        email:vm.eventDetails[0].EMAIL,
                        text:vm.message,
                        type:'New Event Question',
                        Sender:vm.sender,
                        title:vm.eventDetails[0].EVENT_NAME,
                        method: 'messageToSubmitter',
                        returnFormat: 'json'
                    },
                    method: 'GET',
                    dataType: "json",
                    success: function (d, r, o) {
                        console.log('in  message success');
                        vm.message = 'sent';
                        alert('success') ;

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
      blankClick:function(){
       //this.$parent.selectedComponent = 'BlankEvent';
        eventBus.blankEventWasClicked(this.selectedOrg);
       // this.$root.$emit('BlankClicked', this.selectedOrg);

      } ,
      setUpSamePatternEvent:function(){
        if (!this.selectedEventID){
          alert('Pick an Event to Model First');
          return;
        }
         let vm = this;
         vm.eventDetails[0].EVENT_NAME = '';
         vm.eventDetails[0].EVENT_DESCRIPTION = '';
        vm.eventDetails[0].STARTDATE = '';
        vm.eventDetails[0].ENDDATE = '';
        vm.eventDetails[0].TIMESTRING = '';
        vm.eventDetails[0].DATESTRING = '';
        vm.eventDetails[0].TICKETSTRING = '';
        vm.eventDetails[0].FREE = '';
        vm.eventDetails[0].CHILD = '';
        vm.eventDetails[0].STUDENT = '';
        vm.eventDetails[0].SENIOR = '';
        vm.eventDetails[0].FRIDAY = '';
        vm.eventDetails[0].SATURDAY = '';
        vm.eventDetails[0].SUNDAY = '';
        vm.eventDetails[0].MONDAY = '';
        vm.eventDetails[0].TUESDAY = '';
        vm.eventDetails[0].WEDNESDAY = '';
        vm.eventDetails[0].THURSDAY = '';
         vm.eventDetails[0].D1 = '';
        vm.eventDetails[0].D2='';
        vm.eventDetails[0].D3='';
        vm.eventDetails[0].D4='';
        vm.eventDetails[0].D5='';
        vm.eventDetails[0].D7='';
        vm.eventDetails[0].D8='';
        vm.eventDetails[0].D9='';
        vm.eventDetails[0].D10='';
        vm.eventDetails[0].D11='';
        vm.eventDetails[0].D12='';
        vm.eventDetails[0].D13='';
        vm.eventDetails[0].D14='';
        vm.eventDetails[0].D15='';
        vm.eventDetails[0].D16='';
        vm.eventDetails[0].D17 ='';
        vm.eventDetails[0].D18='';
        vm.eventDetails[0].D19='';
        vm.eventDetails[0].D20='';
        vm.eventDetails[0].D21='';
        vm.eventDetails[0].D22='';
        vm.eventDetails[0].D23='';
        vm.eventDetails[0].D24='';
        vm.eventDetails[0].D25='';
        vm.eventDetails[0].D26='';
        vm.eventDetails[0].D27='';
        vm.eventDetails[0].D28='';
        vm.eventDetails[0].D29='';
        vm.eventDetails[0].D30='';
        vm.eventDetails[0].D31='';



      } ,

      setUpNewPatternEvent:function(){

        let vm = this;
        vm.eventDetails[0].EVENT_NAME = '';
        vm.eventDetails[0].EVENT_DESCRIPTION = '';
        vm.eventDetails[0].STARTDATE = '';
        vm.eventDetails[0].ENDDATE = '';
        vm.eventDetails[0].TIMESTRING = '';
        vm.eventDetails[0].DATESTRING = '';
        vm.eventDetails[0].TICKETSTRING = '';
        vm.eventDetails[0].FREE = '';
        vm.eventDetails[0].CHILD = '';
        vm.eventDetails[0].STUDENT = '';
        vm.eventDetails[0].SENIOR = '';
        vm.eventDetails[0].FRIDAY = '';
        vm.eventDetails[0].SATURDAY = '';
        vm.eventDetails[0].SUNDAY = '';
        vm.eventDetails[0].MONDAY = '';
        vm.eventDetails[0].TUESDAY = '';
        vm.eventDetails[0].WEDNESDAY = '';
        vm.eventDetails[0].THURSDAY = '';
        vm.eventDetails[0].D1 = '';
        vm.eventDetails[0].D2='';
        vm.eventDetails[0].D3='';
        vm.eventDetails[0].D4='';
        vm.eventDetails[0].D5='';
        vm.eventDetails[0].D7='';
        vm.eventDetails[0].D8='';
        vm.eventDetails[0].D9='';
        vm.eventDetails[0].D10='';
        vm.eventDetails[0].D11='';
        vm.eventDetails[0].D12='';
        vm.eventDetails[0].D13='';
        vm.eventDetails[0].D14='';
        vm.eventDetails[0].D15='';
        vm.eventDetails[0].D16='';
        vm.eventDetails[0].D17 ='';
        vm.eventDetails[0].D18='';
        vm.eventDetails[0].D19='';
        vm.eventDetails[0].D20='';
        vm.eventDetails[0].D21='';
        vm.eventDetails[0].D22='';
        vm.eventDetails[0].D23='';
        vm.eventDetails[0].D24='';
        vm.eventDetails[0].D25='';
        vm.eventDetails[0].D26='';
        vm.eventDetails[0].D27='';
        vm.eventDetails[0].D28='';
        vm.eventDetails[0].D29='';
        vm.eventDetails[0].D30='';
        vm.eventDetails[0].D31='';
        vm.eventDetails[0].VENUEID = '';
        vm.eventDetails[0].VENUE_NAME = '';
        vm.eventDetails[0].EVENTPHONE = '';
        vm.eventDetails[0].DISP_NUM = '';
        vm.eventDetails[0].DISP_NUM2 = '';

        this.brandNewEventMode = true;
      },
      rowClick: function(eventNum){
        this.selectedEventID = eventNum;
        this.newVenueID = '';
        this.editsSaved = false;
        this.fetchEventDetails();
      },

      setUpNewEvent:function(){
            this.eventDetails = {
              foo:'bar'
            }
      } ,

      getAllOrgs:function(){
        var vm = this;
        axios.get(dataURL + '?method=getAllOrgs')
          .then(function (response) {
            console.log(response);
            vm.states = response.data;
            vm.list = vm.states.map(item => {
              return {value:item.ORG_NUM,label:item.ORG_NAME}
            })
          })
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
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
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
      },


      weeklyChecked:function(){
        var vm = this;

        vm.eventDetails[0].PERFORMING_ARTS_EVENT = false

      },
      specificDatesChecked:function(){
        var vm = this;

        vm.eventDetails[0].GALLERY_MUSEUM_EVENT = false

      },
      getEventsForOrg: function (selected) {
        this.selectedOrg = selected;
        var vm = this;
        console.log('in get events org_ID = ' + vm.selectedOrg);
        axios.get(dataURL + '?method=getEventsForOrgRecent&orgID=' + vm.selectedOrg)
          .then(function (response) {
            vm.eventsForOrg = response.data;
          })

      },
      setNewEventID:function(selected){
        this.newVenueID = selected;
        this.eventDetails[0].VENUEID = this.newVenueID;
        this.getNewVenueName();
      },
      getNewVenueName:function(){
         var vm = this;
        axios.get(dataURL + '?method=getVenueName&venueID=' + vm.newVenueID)
          .then(function (response) {
            console.log(response) ;
            vm.eventDetails[0].VENUE_NAME= response.data[0].VENUE_NAME;

          })
      } ,
      setProcessedToOn:function(){
        var vm = this;
        axios.get(dataURL + '?method=setProcessedToOn&id=' + vm.selectedEventID)
          .then(vm.backButtonClicked());
      },
      getDate: function(value) {
        var vm = this;
        console.log('in get Date')
        vm.eventDetails.STARTDATE = moment(vm.eventDetails.STARTDATE,'DD/MM/YYY').format('DD/MM/YYY')
      },
      getOrgID: function () {
        var vm = this;
        console.log('in getting org ID -- selectedEventID = ' + vm.selectedEventID);
        axios.get(dataURL + '?method=getOrgID&id=' + vm.selectedEventID)
          .then(function (response) {
            console.log(response.data);
            vm.orgID = response.data[0].ORG_NUM;
            vm.orgName = response.data[0].ORG_NAME;
            vm.getEventsForOrg(vm.orgID);
          })
      },
      tableRowClassName: function ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      getDisps: function () {
        var vm = this;
        axios.get(dataURL + '?method=getDisps')
          .then(function (response) {
            vm.disciplines = response.data;
          })
      },
      getDateDiff:function(){
        var date1 = moment(this.eventDetails[0].STARTDATE);
        var date2 = moment(this.eventDetails[0].ENDDATE);
        var dateDiff = date2.diff(date1,'days');
        return dateDiff;
      },
      saveEdits:function(){
        var vm = this;
        if (!vm.eventDetails[0].DISP_NUM2){
          vm.eventDetails[0].DISP_NUM2 = 11;
        }

        var dateDiff = this.getDateDiff();
        console.log('date diff = ' + dateDiff);
        $.ajax({
            url: dataURL,
            data: {
              event_description:vm.eventDetails[0].EVENT_DESCRIPTION,
              id:vm.eventDetails[0].ID,
              disp_num:vm.eventDetails[0].DISP_NUM,
              disp_num2:vm.eventDetails[0].DISP_NUM2,
              endDate:vm.eventDetails[0].ENDDATE,
              event_name:vm.eventDetails[0].EVENT_NAME,
              org_num:vm.orgID,
              startDate:vm.eventDetails[0].STARTDATE,
              ticketString:vm.eventDetails[0].TICKETSTRING,
              timeString:vm.eventDetails[0].TIMESTRING,
              venue_id:vm.eventDetails[0].VENUE_ID,
              ticketURL:vm.eventDetails[0].TICKETURL,
              free:vm.eventDetails[0].FREE,
              student:vm.eventDetails[0].STUDENT,
              senior:vm.eventDetails[0].SENIOR,
              child:vm.eventDetails[0].CHILD,
              eventPhone:vm.eventDetails[0].EVENTPHONE,
              dateString:vm.eventDetails[0].DATESTRING,
              email:vm.eventDetails[0].EMAIL,
              eventWeb:vm.eventDetails[0].EVENTWEB,
              gallery_museum_event:vm.eventDetails[0].GALLERY_MUSEUM_EVENT,
              performing_arts_event:vm.eventDetails[0].PERFORMING_ARTS_EVENT,
              saturday:vm.eventDetails[0].SATURDAY,
              sunday:vm.eventDetails[0].SUNDAY,
              monday:vm.eventDetails[0].MONDAY,
              tuesday:vm.eventDetails[0].TUESDAY,
              wednesday:vm.eventDetails[0].WEDNESDAY,
              thursday:vm.eventDetails[0].THURSDAY,
              friday:vm.eventDetails[0].FRIDAY,
              d1:vm.eventDetails[0].D1,
              d2:vm.eventDetails[0].D2,
              d3:vm.eventDetails[0].D3,
              d4:vm.eventDetails[0].D4,
              d5:vm.eventDetails[0].D5,
              d6:vm.eventDetails[0].D6,
              d7:vm.eventDetails[0].D7,
              d8:vm.eventDetails[0].D8,
              d9:vm.eventDetails[0].D9,
              d10:vm.eventDetails[0].D10,
              d11:vm.eventDetails[0].D11,
              d12:vm.eventDetails[0].D12,
              d13:vm.eventDetails[0].D13,
              d14:vm.eventDetails[0].D14,
              d15:vm.eventDetails[0].D15,
              d16:vm.eventDetails[0].D16,
              d17:vm.eventDetails[0].D17,
              d18:vm.eventDetails[0].D18,
              d19:vm.eventDetails[0].D19,
              d20:vm.eventDetails[0].D20,
              d21:vm.eventDetails[0].D21,
              d22:vm.eventDetails[0].D22,
              d23:vm.eventDetails[0].D23,
              d24:vm.eventDetails[0].D24,
              d25:vm.eventDetails[0].D25,
              d26:vm.eventDetails[0].D26,
              d27:vm.eventDetails[0].D27,
              d28:vm.eventDetails[0].D28,
              d29:vm.eventDetails[0].D29,
              d30:vm.eventDetails[0].D30,
              d31:vm.eventDetails[0].D31,

              method: 'updateSubmission',
              returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {

              console.log(d);
              vm.backButtonClicked();
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

      deleteEvent:function(){
       var vm = this;
       console.log('org id = ' + vm.eventDetails[0].ORG_NUM);
        axios.get(dataURL + '?method=deleteEvent&Event_Num=' + vm.eventDetails[0].EVENT_NUM)
          .then(function (response) {
               vm.getNewEventsForOrg();
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
      postEvent:function(){
        var vm = this;
        if (!vm.eventDetails[0].DISP_NUM2){
          vm.eventDetails[0].DISP_NUM2 = 11;
        }

        var dateDiff = this.getDateDiff();
        console.log('date diff = ' + dateDiff);
        $.ajax({
            url: dataURL,
            data: {
              event_description:vm.eventDetails[0].EVENT_DESCRIPTION,
              id:vm.eventDetails[0].ID,
              disp_num:vm.eventDetails[0].DISP_NUM,
              disp_num2:vm.eventDetails[0].DISP_NUM2,
              end_date:vm.eventDetails[0].ENDDATE,
              event_name:vm.eventDetails[0].EVENT_NAME,
              org_num:vm.eventDetails[0].ORG_NUM,
              start_date:vm.eventDetails[0].STARTDATE,
              ticket_String:vm.eventDetails[0].TICKETSTRING,
              time_String:vm.eventDetails[0].TIMESTRING,
              venueid:vm.eventDetails[0].VENUEID,
              ticketURL:vm.eventDetails[0].TICKETURL,
              free:vm.eventDetails[0].FREE,
              student:vm.eventDetails[0].STUDENT,
              senior:vm.eventDetails[0].SENIOR,
              child:vm.eventDetails[0].CHILD,
              event_Phone:vm.eventDetails[0].EVENTPHONE,
              date_string:vm.eventDetails[0].DATESTRING,
              email:vm.eventDetails[0].EMAIL,
              eventWeb:vm.eventDetails[0].EVENTWEB,
              gallery_museum_event:vm.eventDetails[0].GALLERY_MUSEUM_EVENT,
              performing_arts_event:vm.eventDetails[0].PERFORMING_ARTS_EVENT,
              saturday:vm.eventDetails[0].SATURDAY,
              sunday:vm.eventDetails[0].SUNDAY,
              monday:vm.eventDetails[0].MONDAY,
              tuesday:vm.eventDetails[0].TUESDAY,
              wednesday:vm.eventDetails[0].WEDNESDAY,
              thursday:vm.eventDetails[0].THURSDAY,
              friday:vm.eventDetails[0].FRIDAY,
              eventWebLink:vm.eventDetails[0].EVENTWEB,
              ticketURL:vm.eventDetails[0].TICKETURL,
              eventPhone:vm.eventDetails[0].EVENTPHONE,
              d1:vm.eventDetails[0].D1,
              d2:vm.eventDetails[0].D2,
              d3:vm.eventDetails[0].D3,
              d4:vm.eventDetails[0].D4,
              d5:vm.eventDetails[0].D5,
              d6:vm.eventDetails[0].D6,
              d7:vm.eventDetails[0].D7,
              d8:vm.eventDetails[0].D8,
              d9:vm.eventDetails[0].D9,
              d10:vm.eventDetails[0].D10,
              d11:vm.eventDetails[0].D11,
              d12:vm.eventDetails[0].D12,
              d13:vm.eventDetails[0].D13,
              d14:vm.eventDetails[0].D14,
              d15:vm.eventDetails[0].D15,
              d16:vm.eventDetails[0].D16,
              d17:vm.eventDetails[0].D17,
              d18:vm.eventDetails[0].D18,
              d19:vm.eventDetails[0].D19,
              d20:vm.eventDetails[0].D20,
              d21:vm.eventDetails[0].D21,
              d22:vm.eventDetails[0].D22,
              d23:vm.eventDetails[0].D23,
              d24:vm.eventDetails[0].D24,
              d25:vm.eventDetails[0].D25,
              d26:vm.eventDetails[0].D26,
              d27:vm.eventDetails[0].D27,
              d28:vm.eventDetails[0].D28,
              d29:vm.eventDetails[0].D29,
              d30:vm.eventDetails[0].D30,
              d31:vm.eventDetails[0].D31,
              dateDiff,

              venue_name:vm.eventDetails[0].VENUE_NAME,
                editor:  global.$user.name,

              method: 'postNewEventRecord',
              returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {

              console.log(d);
              //eventBus.newEventID($event);
              //eventBus.newEventID(d.EVENT_NUM);
              //eventBus.$emit('newEventIDAdded',d.EVENT_NUM);
              if (!vm.newEventMode) {
                vm.notifySubmitter();
                vm.$root.$emit('NewIdAdded', d.EVENT_NUM);
                vm.setProcessedToOn();
                vm.getNewEventsForOrg();
              }  else{
                vm.newEventMode = false;
                vm.getNewEventsForOrg();
                vm.eventDetails = [];
              }

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
      updateEvent:function(){
        var vm = this;
        if (!vm.eventDetails[0].DISP_NUM2){
          vm.eventDetails[0].DISP_NUM2 = 11;
        }
        if (!vm.eventDetails[0].SUBMISSIONID){
          vm.eventDetails[0].SUBMISSIONID=1;
        }
        var dateDiff = this.getDateDiff();
        console.log('date diff = ' + dateDiff);
        $.ajax({
            url: dataURL,
            data: {
              event_description:vm.eventDetails[0].EVENT_DESCRIPTION,
              id:vm.eventDetails[0].DISP_NUM,
              id2:vm.eventDetails[0].DISP_NUM2,
              end_date:vm.eventDetails[0].ENDDATE,
              event_name:vm.eventDetails[0].EVENT_NAME,
              org_num:vm.eventDetails[0].ORG_NUM,
              start_date:vm.eventDetails[0].STARTDATE,
              ticket_String:vm.eventDetails[0].TICKETSTRING,
              time_String:vm.eventDetails[0].TIMESTRING,
              venueid:vm.eventDetails[0].VENUEID,
              ticketURL:vm.eventDetails[0].TICKETURL,
              free:vm.eventDetails[0].FREE,
              student:vm.eventDetails[0].STUDENT,
              senior:vm.eventDetails[0].SENIOR,
              child:vm.eventDetails[0].CHILD,
              event_Phone:vm.eventDetails[0].EVENTPHONE,
              date_string:vm.eventDetails[0].DATESTRING,
              email:vm.eventDetails[0].EMAIL,
              eventWeb:vm.eventDetails[0].EVENTWEB,
              gallery_museum_event:vm.eventDetails[0].GALLERY_MUSEUM_EVENT,
              performing_arts_event:vm.eventDetails[0].PERFORMING_ARTS_EVENT,
              saturday:vm.eventDetails[0].SATURDAY,
              sunday:vm.eventDetails[0].SUNDAY,
              monday:vm.eventDetails[0].MONDAY,
              tuesday:vm.eventDetails[0].TUESDAY,
              wednesday:vm.eventDetails[0].WEDNESDAY,
              thursday:vm.eventDetails[0].THURSDAY,
              friday:vm.eventDetails[0].FRIDAY,
              eventWebLink:vm.eventDetails[0].EVENTWEB,
              ticketURL:vm.eventDetails[0].TICKETURL,
              eventPhone:vm.eventDetails[0].EVENTPHONE,
              d1:vm.eventDetails[0].D1,
              d2:vm.eventDetails[0].D2,
              d3:vm.eventDetails[0].D3,
              d4:vm.eventDetails[0].D4,
              d5:vm.eventDetails[0].D5,
              d6:vm.eventDetails[0].D6,
              d7:vm.eventDetails[0].D7,
              d8:vm.eventDetails[0].D8,
              d9:vm.eventDetails[0].D9,
              d10:vm.eventDetails[0].D10,
              d11:vm.eventDetails[0].D11,
              d12:vm.eventDetails[0].D12,
              d13:vm.eventDetails[0].D13,
              d14:vm.eventDetails[0].D14,
              d15:vm.eventDetails[0].D15,
              d16:vm.eventDetails[0].D16,
              d17:vm.eventDetails[0].D17,
              d18:vm.eventDetails[0].D18,
              d19:vm.eventDetails[0].D19,
              d20:vm.eventDetails[0].D20,
              d21:vm.eventDetails[0].D21,
              d22:vm.eventDetails[0].D22,
              d23:vm.eventDetails[0].D23,
              d24:vm.eventDetails[0].D24,
              d25:vm.eventDetails[0].D25,
              d26:vm.eventDetails[0].D26,
              d27:vm.eventDetails[0].D27,
              d28:vm.eventDetails[0].D28,
              d29:vm.eventDetails[0].D29,
              d30:vm.eventDetails[0].D30,
              d31:vm.eventDetails[0].D31,
              dateDiff:dateDiff,

              venue_name:vm.eventDetails[0].VENUE_NAME,
              Event_Num:vm.eventDetails[0].EVENT_NUM,
              submissionID:vm.eventDetails[0].SUBMISSIONID,

              method: 'upDateEventRecord',
              returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {
               vm.editsSaved = true;
              console.log(d);
              //eventBus.newEventID($event);
              //eventBus.newEventID(d.EVENT_NUM);
              //eventBus.$emit('newEventIDAdded',d.EVENT_NUM);
              //vm.backButtonClicked($event);


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
      notifySubmitter:function(){
        var vm = this;
        axios.get(dataURL + '?method=notifySubmitter&email=' + vm.eventDetails[0].EMAIL + '&Text=' + vm.eventDetails[0].EVENT_NAME)
          .then(function (response) {
            console.log('notified');
          })
      },

      getDisps2: function () {
        var vm = this;
        axios.get(dataURL + '?method=getDisps2')
          .then(function (response) {
            vm.disciplines2 = response.data;
          })
      },
      backButtonClicked: function ($event) {
        console.log('backbuttonclicked');
        this.$parent.selectedComponent = 'SubmittedEvents';
        // eventBus.returnToSubmissionsPage($event);
        this.$emit('returnWasClicked','');
      }
    },
    created() {

      //this.fetchEventDetails();
      this.getDisps();
      this.getDisps2();
      this.getAllOrgs();
      this.getAllVenues();

      eventBus.$on('orgWasSelected', (orgID) =>{
          alert('callback');
          this.knowOrgID = true;
          this.selectedOrg = orgID;
          this.getEventsForOrg(this.selectedOrg);
      })
       /*
      eventBus.$on('newEventIDAdded',(newEvent)=>{
        this.fetchEventDetails();
      })
      eventBus.$on('submissionRowWasClicked',()=>{
        this.fetchEventDetails();
      })
        */
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

