<template>
  <div>
    <el-col :span="5" style="margin: 20px;">
      <el-button @click="backButtonClickedOrg">Return to Submitted Events</el-button>
      <br />
      <br />
      <br />
      <el-button @click="addBlankVenue" v-if="!edit">Add a New Venue</el-button>
      <br />
      <br />
      <el-checkbox v-model="edit">Edit an Existing Venue</el-checkbox>
      <div v-if="!edit">
        <table class="table" style="word-break: break-word!important">
          <thead>
          <tr>
            <th scope="col">Submitted New Venues:</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="venue in submittedVenues" @click="submittedVenueClick(venue.ID)">
            <td>{{venue.NEWVENUENAME}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <el-select
          v-model="editVenue"
          filterable
          remote
          @input="getVenueDetails"
          reserve-keyword
          placeholder="Start typing the name..."
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </el-col>
    <el-col :span="17">

        <el-form>
          <el-col :span="3"></el-col>
          <el-col :span="8" style="margin-left: 40px;">
             <el-row>
            <el-form-item label="Venue Name">
              <el-input placeholder="" v-model="submittedVenueDetail.NEWVENUENAME" label="Venue Name"></el-input>
            </el-form-item>
            <el-form-item label="Venue. Address">
              <el-input placeholder="" v-model="submittedVenueDetail.NEWVENUEADDRESS" label="Venue Address"></el-input>
            </el-form-item>
            <el-form-item label="Venue City">
              <el-input placeholder="" v-model="submittedVenueDetail.NEWVENUECITY" label="Venue City"></el-input>
            </el-form-item>
            <el-form-item label="Venue Zip">
              <el-input placeholder="" v-model="submittedVenueDetail.NEWVENUEZIP" label="Venue Zip"></el-input>
            </el-form-item>
            <el-form-item label="Venue Web">
            <el-input placeholder="" v-model="submittedVenueDetail.NEWVENUEWEB" label="Venue Web address"></el-input>
          </el-form-item>
            <el-form-item label="Venue Phone">
              <el-input placeholder="" v-model="submittedVenueDetail.NEWVENUEPHONE" label="Venue Phone"></el-input>
            </el-form-item>
            </el-row>
          </el-col>

          <el-col :span="12" style="margin-left: 40px;">
              <div v-if="!edit">
            <el-form-item label="Submitter Email">
              <el-input placeholder="" v-model="submittedVenueDetail.SUBMITTEREMAIL" label="Submitter Email"></el-input>
            </el-form-item>
            <el-form-item label="Does Venue Already Exist?">
              <el-select
                v-model="value9"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="Start typing the name..."
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
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
            <br />
              </div>
            `     </el-col>
        </el-form>

      <div>


        <div class="submissionButtons" >
          <div v-if="!edit">
          <button v-if="message" class="btn-secondary subbutton" @click="sendMessage">Send this Message to the Submitter</button>
          <br />


          <button class="btn-success subbutton" @click="insertNewVenue"   >Approve and Post This Venue</button>
          <br />



          <button class="btn-danger subbbutton" @click="setVenueToPublished" v-if="approval">Delete this Submitted Venue</button>
          </div>
          <div v-else>
            <button class="btn-success subbutton" @click="saveEdits"   >Submit Changes</button>
          </div>
          <br />

        </div>
      </div>

    </el-col>



  </div>
</template>

<script>

  import {eventBus} from "../main";
  import axios from "axios";
  import moment from 'moment';
  import {dataURL} from "../main";

  export default {

    name: "VenueApproval",
    data: function(){
      return {
        selectedVenueID:'',
        submittedVenues:[],
        submittedVenueDetail:{},
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states:[],
        message:'',
        options: [{
          value: 'margo.crabtree@gmail.com',
          label: 'Margo'
        }, {
          value: 'sfam@sbcglobal.net',
          label: 'Betsy'
        }, {
          value: 'lrlarson@larsonassoc.org',
          label: 'Larry'
        },  ],
        sender: '' ,
        approval:true ,
        edit:false,
        editVenue:''
      }
    },


    methods:{
      backButtonClickedOrg: function ($event) {
        console.log('backbuttonclicked');
        this.$parent.selectedComponent = 'SubmittedEvents';
        // eventBus.returnToSubmissionsPage($event);
        //this.$emit('returnWasClicked','');
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
              email:vm.submittedVenueDetail.SUBMITTEREMAIL,
              text:vm.message,
              type:'New Venue Request',
              Sender:vm.sender,
              title:vm.submittedVenueDetail.NEWVENUENAME,
              method: 'messageToSubmitter',
              returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {
              console.log('in  message success');
              vm.message = 'sent';

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
      addBlankVenue:function(){
         let vm = this;
        vm.submittedVenueDetail.NEWVENUEADDRESS = '';
        vm.submittedVenueDetail.NEWVENUECITY = '';
        vm.submittedVenueDetail.NEWVENUENAME = '';
        vm.submittedVenueDetail.NEWVENUEPHONE = '';
        vm.submittedVenueDetail.NEWVENUEWEB = '';
        vm.submittedVenueDetail.NEWVENUEZIP = '';
        vm.submittedVenueDetail.SUBMITTEREMAIL='';
        vm.approval = false;
      },

      getVenueDetails:function(){
        let vm = this;
        axios.get(dataURL + '?method=getVenueDetails&ID=' + vm.editVenue)
          .then(function (response) {
            vm.submittedVenueDetail = response.data[0];
            console.log(response);
            vm.submittedVenueDetail.NEWVENUEADDRESS=vm.submittedVenueDetail.VENUE_ADDRESS;
            vm.submittedVenueDetail.NEWVENUECITY=vm.submittedVenueDetail.VENUE_CITY;
            vm.submittedVenueDetail.NEWVENUENAME=vm.submittedVenueDetail.VENUE_NAME;
            vm.submittedVenueDetail.NEWVENUEPHONE=vm.submittedVenueDetail.VENUE_PHONE;
            vm.submittedVenueDetail.NEWVENUEWEB=vm.submittedVenueDetail.VENUE_WEB;
            vm.submittedVenueDetail.NEWVENUEZIP=vm.submittedVenueDetail.VENUE_ZIP;

          })

      },
      saveEdits:function(){
         let vm = this;
        $.ajax({
            url: dataURL,
            data: {
              Venue_Address:vm.submittedVenueDetail.NEWVENUEADDRESS,
              Venue_City:vm.submittedVenueDetail.NEWVENUECITY,
              Venue_Name:vm.submittedVenueDetail.NEWVENUENAME,
              Venue_Phone:vm.submittedVenueDetail.NEWVENUEPHONE,
              Venue_Web:vm.submittedVenueDetail.NEWVENUEWEB,
              Venue_Zip:vm.submittedVenueDetail.NEWVENUEZIP,
              ID:vm.editVenue,

              method: 'updateVenue',
              returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {
              //alert('in success');
              //console.log('in success')
              //console.log('new org  ' + d.ORG_NUM);

              vm.approval = true;
              vm.edit = false;
              vm.submittedVenueDetail = [];

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
      } ,
      insertNewVenue:function(){
        var vm = this;


        $.ajax({
            url: dataURL,
            data: {
              Venue_Address:vm.submittedVenueDetail.NEWVENUEADDRESS,
              Venue_City:vm.submittedVenueDetail.NEWVENUECITY,
              Venue_Name:vm.submittedVenueDetail.NEWVENUENAME,
              Venue_Phone:vm.submittedVenueDetail.NEWVENUEPHONE,
              Venue_Web:vm.submittedVenueDetail.NEWVENUEWEB,
              Venue_Zip:vm.submittedVenueDetail.NEWVENUEZIP,
              SubmitterEmail:vm.submittedVenueDetail.SUBMITTEREMAIL,

              method: 'createVenue',
              returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {
              //alert('in success');
              //console.log('in success')
              //console.log('new org  ' + d.ORG_NUM);
              vm.setVenueToPublished();
              vm.approval = true;

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
      getUserVenues:function(){
        var vm = this;
        axios.get(dataURL + '?method=getUserVenues')
          .then(function (response) {
            vm.submittedVenues = response.data;
            console.log(response.data);
          })
      },
      setVenueToPublished:function(){
        var vm = this;
        axios.get(dataURL + '?method=setVenueToProcessed&id=' + vm.submittedVenueDetail.ID)
          .then(function (response) {
            console.log(response);
            vm.submittedVenueDetail = '';
            vm.approval = true;
            vm.message = '';
            vm.getUserVenues();
          })
      },
      getAllVenues:function(){
        var vm = this;
        axios.get(dataURL + '?method=getAllVenues')
          .then(function (response) {
            console.log(response);
            vm.states = response.data;
            vm.list = vm.states.map(item => {
              return {value:item.ID,label:item.VENUE_NAME}
            })
          })
      },
      submittedVenueClick:function (id) {
        var vm = this;
        axios.get(dataURL + '?method=getSubmittedVenueDetails&id=' + id)
          .then(function (response) {
            vm.submittedVenueDetail = response.data[0];
            vm.approval = true;
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
      }


    },
    created(){
      this.getUserVenues();
    },
    mounted(){
      this.getAllVenues();
    }
  }
</script>

<style scoped>

  table{
    cursor: pointer;

  }
  td:focus{
    background-color: #e6a23c;
  }
  tr:hover{
    background: lightgray !important;
  }
  tr:nth-child(even) {background: lightblue}

  .btn-success{

    margin-top: 20px;
  }
  .btn-danger{
    margin-top: 20px;
  }

</style>
