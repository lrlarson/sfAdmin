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
         <div>
           <button @click="showNewEditor">Add New Pod Story</button>
         </div>
        <div id="editor" v-if="showEditor" >
          <div class="col-10">
            <select v-model="selectedPodStory.DISP" >
              <option v-for="disp in disciplines" v-bind:value="disp.VALUE">
                {{ disp.LABEL }}
              </option>
            </select>
            <input v-model="selectedPodStory.TITLE" style="min-width: 250px;">
            <label>Copy #</label>
            <select v-model="selectedPodStory.COPYNUMBER" >
              <option v-for="number in copyNumbers" v-bind:value="number">
                {{ number }}
              </option>
            </select>

            <input type="checkbox" v-model="selectedPodStory.EVENTINDB">
            <label >In DB</label>
            <input type="checkbox" v-model="selectedPodStory.HAVEIMAGE">
            <label >Have Image</label>
            <input type="checkbox" v-model="selectedPodStory.PROCESSED">
            <label >Set to Complete</label>
            <button @click="editPodStatus">Update Status</button>
          </div>

        </div>
        <div id="editorNew" v-if="showEditorNew" >
          <div class="col-10">
            <select v-model="selectedPodStory.DISP" >
              <option v-for="disp in disciplines" v-bind:value="disp.VALUE">
                {{ disp.LABEL }}
              </option>
            </select>
            <input v-model="selectedPodStory.TITLE" style="min-width: 250px;">
            <label>Copy #</label>
            <select v-model="selectedPodStory.COPYNUMBER" >
              <option v-for="number in copyNumbers" v-bind:value="number">
                {{ number }}
              </option>
            </select>

            <input type="checkbox" v-model="selectedPodStory.EVENTINDB">
            <label >In DB</label>
            <input type="checkbox" v-model="selectedPodStory.HAVEIMAGE">
            <label >Have Image</label>
            <input type="checkbox" v-model="selectedPodStory.PROCESSED">
            <label >Set to Complete</label>
            <button @click="insertNewPodStatus">Save</button>
          </div>

        </div>


        <br/>
        <table class="table" style="word-break: break-word!important">
          <thead>
          <tr>
            <th scope="col">Disp.</th>
            <th scope="col">Title</th>
            <th scope="col">Copy #</th>
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
            <td>{{event.COPYNUMBER}}</td>
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
               disciplines:[],
               showEditorNew: false,
               copyNumbers:[1,2,3,4,5,6,7,8,9,10,11,13]
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
                this.showEditorNew = false;
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
            editPodStatus:function () {
              var vm = this;
              axios.get(dataURL + '?method=editSpecificPodStatus&ID=' + vm.selectedPodStory.ID + '&disp=' + vm.selectedPodStory.DISP + '&title=' + vm.selectedPodStory.TITLE + '&eventInDB=' +  vm.selectedPodStory.EVENTINDB + '&haveImage=' + vm.selectedPodStory.HAVEIMAGE + '&processed=' + vm.selectedPodStory.PROCESSED + '&lastEditBy=' + global.$user.name + '&copyNumber='+vm.selectedPodStory.COPYNUMBER)
                .then(function (response) {
                     vm.showEditor = false;
                    vm.fetchPodStatus();
                })
            },
            insertNewPodStatus:function(){
              var vm = this;
                axios.get(dataURL + '?method=insertNewPodStatus&disp=' + vm.selectedPodStory.DISP + '&title=' + vm.selectedPodStory.TITLE + '&eventInDB=' +  vm.selectedPodStory.EVENTINDB + '&haveImage=' + vm.selectedPodStory.HAVEIMAGE + '&processed=' + vm.selectedPodStory.PROCESSED + '&lastEditBy=' + global.$user.name + '&copyNumber='+vm.selectedPodStory.COPYNUMBER)
                    .then(function (response) {
                        vm.showEditorNew = false;
                        vm.fetchPodStatus();
                    })
            },
            showNewEditor:function () {
               this.selectedPodStory.ID = 0;
               this.selectedPodStory.DISP = null;
               this.selectedPodStory.TITLE = '';
               this.selectedPodStory.EVENTINDB = false;
               this.selectedPodStory.HAVEIMAGE = false;
               this.selectedPodStory.PROCESSED = false;
               this.showEditor = false;
               this.showEditorNew = true;
            }
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
