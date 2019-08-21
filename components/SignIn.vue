<template>
  <div>

    <el-col :span="4" style="margin: 20px;">  </el-col>
    <el-col :span="14" style="margin: 20px;">
      Sign In
      <br />
      <br />
    <el-input placeholder="email" v-model="email" label="Emai"l></el-input>

      <br />
      <br />
    <el-input placeholder="password" show-password="false" v-model="password" label="Password" type="password"></el-input>
      <br />
      <br /> <br />
      <br />

    <button @click="checkPassword">Submit</button>
      <br />
      <br /> <br />
      <br />
    <div v-if="message">
      not a valid login
    </div>
    </el-col>
    <el-col :span="4" style="margin: 20px;"> </el-col>
  </div>

</template>

<script>
  import SubmittedEvents from './SubmittedEvents';
  import {dataURL} from "../main";

  export default {
        name: "SignIn",
        data:function () {
           return{
              email:'',
             password:'',
             message:''
           }
        },
      methods:{
         gotoApprovals: function () {
           this.$parent.selectedComponent = 'SubmittedEvents';
         } ,
        checkPassword:function () {
           var vm = this;
          axios.get(dataURL + '?method=checkPassword&email=' + vm.email + '&password=' + vm.password )
            .then(function (response) {
              if(response.data[0].COUNT == 1) {
                  vm.$user.copy({
                      name: vm.email
                  })
                  vm.gotoApprovals();
              }else {
                 vm.message = 'Not Valid';
                 vm.email = '';
                 vm.password = '';
              }
            })

        }
      }
    }
</script>

<style scoped>

</style>
