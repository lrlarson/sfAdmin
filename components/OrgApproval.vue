<template>
    <div>
      <el-col :span="5" style="margin: 20px;">
        <el-button @click="backButtonClickedOrg">Return to Submitted Events</el-button>
        <br />
        <br />
        <br />
        <el-button @click="addBlankOrg">Add a New Organization</el-button>
        <br />
        <br />
        <el-checkbox v-model="edit">Edit an Existing Org.</el-checkbox>
        <div v-if="!edit">
          <table class="table" style="word-break: break-word!important">
            <thead>
            <tr>
              <th scope="col">Submitted New Orgs:</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="org in submittedOrgs" @click="submittedOrgClick(org.ID)">
              <td>{{org.NEWORG_NAME}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="edit">
          <el-select
            v-model="editOrg"
            filterable
            remote
            @input="getOrgDetails"
            reserve-keyword
            placeholder="select the org..."
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

            <el-form-item label="Org. Name">
              <el-input placeholder="" v-model="submittedOrgDetail.NEWORG_NAME" label="Org. Name"></el-input>
            </el-form-item>
            <el-form-item label="Org. Address">
              <el-input placeholder="" v-model="submittedOrgDetail.NEWORG_ADDRESS" label="Org. Address"></el-input>
            </el-form-item>
            <el-form-item label="Org. City">
              <el-input placeholder="" v-model="submittedOrgDetail.NEWORG_CITY" label="Org. City"></el-input>
            </el-form-item>
            <el-form-item label="Org. Zip">
              <el-input placeholder="" v-model="submittedOrgDetail.NEWORG_ZIP" label="Org. Zip"></el-input>
            </el-form-item>
            <el-form-item label="Org. Web">
              <el-input placeholder="" v-model="submittedOrgDetail.NEWORG_WEB" label="Org. Web address"></el-input>
            </el-form-item>
            <el-form-item label="Org. Phone">
              <el-input placeholder="" v-model="submittedOrgDetail.NEWORG_PHONE" label="Org. Phone"></el-input>
            </el-form-item>
            <el-form-item label="Museum">
              <el-checkbox v-model="submittedOrgDetail.NEWMUSEUM"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="margin-left: 40px;">
            <div v-if="!edit">
            <el-form-item label="Submitter Email">
              <el-input placeholder="" v-model="submittedOrgDetail.SUBMITTEREMAIL" label="Submitter Email"></el-input>
            </el-form-item>
            <el-form-item label="Does Org. Already Exist?">
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


          <div class="submissionButtons" v-if="!edit" >
            <button v-if="message" class="btn-secondary subbutton" @click="sendMessage">Send this Message to the Submitter</button>
            <br />


            <button class="btn-success subbutton" @click="insertNewOrg"  >Approve and Post This Organzation</button>
            <br />



                <button class="btn-danger subbbutton" @click="setOrgToPublished" v-if="approval">Delete this Submitted Org.</button>
            <br />
          </div>
          <div v-if="edit">
            <button class="btn-success subbutton" @click="saveEdits"  >Save Edits</button>
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

        name: "OrgApproval",
        data: function(){
          return {
            selectedOrgID:'',

            submittedOrgs:[],
            submittedOrgDetail:{},
            options4: [],
            value9: [],
            list: [],
            loading: false,
            states:[],
            message:'',
            options: [{
              value: 'sfartseditor@gmail.com',
              label: 'Catherinec'
            }, {
              value: 'sfartsmonthly@gmail.com',
              label: 'Geraldine'
            }, {
              value: 'lrlarson@larsonassoc.org',
              label: 'Larry'
            },  ],
            sender: '',
            approval:true,
            edit:false,
            editOrg:'',
            newOrg:false
          }
        },


      methods:{
        backButtonClickedOrg: function ($event) {
          console.log('backbuttonclicked');
          this.$parent.selectedComponent = 'SubmittedEvents';
          // eventBus.returnToSubmissionsPage($event);
          //this.$emit('returnWasClicked','');
        },
        bohunk:function($event){
          alert('bohunk');
          this.getUserOrgs();
        },
         addBlankOrg:function(){
           let vm = this;
            vm.submittedOrgDetail.NEWORG_ADDRESS='';
             vm.submittedOrgDetail.NEWORG_CITY='';
             vm.submittedOrgDetail.NEWORG_NAME='';
             vm.submittedOrgDetail.NEWORG_PHONE='';
             vm.submittedOrgDetail.NEWORG_WEB='';
             vm.submittedOrgDetail.NEWORG_ZIP='';
             vm.submittedOrgDetail.SUBMITTEREMAIL='';
             vm.approval = false;
         },

        getOrgDetails:function(){
            let vm = this;
            vm.approval = true;
          axios.get(dataURL + '?method=getOrgDetails&orgID=' + vm.editOrg)
            .then(function (response) {
              vm.submittedOrgDetail = response.data[0];
              console.log(response);
              vm.submittedOrgDetail.NEWORG_ADDRESS=vm.submittedOrgDetail.ORG_ADDRESS;
              vm.submittedOrgDetail.NEWORG_CITY=vm.submittedOrgDetail.ORG_CITY;
              vm.submittedOrgDetail.NEWORG_NAME=vm.submittedOrgDetail.ORG_NAME;
              vm.submittedOrgDetail.NEWORG_PHONE=vm.submittedOrgDetail.ORG_PHONE;
              vm.submittedOrgDetail.NEWORG_WEB=vm.submittedOrgDetail.ORG_WEB;
              vm.submittedOrgDetail.NEWORG_ZIP=vm.submittedOrgDetail.ORG_ZIP;
              vm.submittedOrgDetail.NEWMUSEUM=vm.submittedOrgDetail.MUSEUM;
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
                email:vm.submittedOrgDetail.SUBMITTEREMAIL,
                text:vm.message,
               type:'New Organization Request',
                Sender:vm.sender,
                title:vm.submittedOrgDetail.NEWORG_NAME,
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
        insertNewOrg:function(){
          var vm = this;


        $.ajax({
              url: dataURL,
              data: {
              Org_Address:vm.submittedOrgDetail.NEWORG_ADDRESS,
              Org_City:vm.submittedOrgDetail.NEWORG_CITY,
              Org_Name:vm.submittedOrgDetail.NEWORG_NAME,
              Org_Phone:vm.submittedOrgDetail.NEWORG_PHONE,
              Org_Web:vm.submittedOrgDetail.NEWORG_WEB,
              Org_Zip:vm.submittedOrgDetail.NEWORG_ZIP,
              SubmitterEmail:vm.submittedOrgDetail.SUBMITTEREMAIL,
              museum:vm.submittedOrgDetail.MUSEUM,

                method: 'createOrg',
                returnFormat: 'json'
              },
              method: 'GET',
              dataType: "json",
              success: function (d, r, o) {
                  //alert('in success');
                //console.log('in success')
                //console.log('new org  ' + d.ORG_NUM);
                vm.submittedOrgDetail.NEWMUSEUM = false;
                if (vm.approval==true) {
                  vm.setOrgToPublished();
                } else{
                  vm.clearNewOrg();
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
        saveEdits:function(){
          var vm = this;


          $.ajax({
              url: dataURL,
              data: {
                Org_Address:vm.submittedOrgDetail.NEWORG_ADDRESS,
                Org_City:vm.submittedOrgDetail.NEWORG_CITY,
                Org_Name:vm.submittedOrgDetail.NEWORG_NAME,
                Org_Phone:vm.submittedOrgDetail.NEWORG_PHONE,
                Org_Web:vm.submittedOrgDetail.NEWORG_WEB,
                Org_Zip:vm.submittedOrgDetail.NEWORG_ZIP,
                Org_Num:vm.editOrg,
                Museum:vm.submittedOrgDetail.NEWMUSEUM,
                method: 'updateOrgRecord',
                returnFormat: 'json'
              },
              method: 'GET',
              dataType: "json",
              success: function (d, r, o) {
                vm.edit = false;
                vm.submittedOrgDetail = [];
                //alert('in success');
                //console.log('in success')
                //console.log('new org  ' + d.ORG_NUM);

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
        getUserOrgs:function(){
          var vm = this;
          axios.get(dataURL + '?method=getUserOrgs')
            .then(function (response) {
              vm.submittedOrgs = response.data;
              console.log(response.data);
            })
        },
        setOrgToPublished:function(){
          var vm = this;
          axios.get(dataURL + '?method=setOrgToProcessed&id=' + vm.submittedOrgDetail.ID)
            .then(function (response) {
              console.log(response);
              vm.submittedOrgDetail = '';
              vm.message = '';
              vm.approval = true;
             vm.getUserOrgs();
            })
        },

        clearNewOrg:function(){
          var vm = this;
          vm.submittedOrgDetail = '';
          vm.message = '';
          vm.approval = true;
          vm.getUserOrgs();
        },

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
        submittedOrgClick:function (id) {
          var vm = this;
          axios.get(dataURL + '?method=getSubmittedOrgDetails&id=' + id)
            .then(function (response) {
              vm.submittedOrgDetail = response.data[0];
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
          this.getUserOrgs();
      },
      mounted(){
          this.getAllOrgs();
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
  .el-select-dropdown el-popper is-multiple{
    display: inline-block;
  }

</style>
