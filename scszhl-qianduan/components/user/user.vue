<!-- 用户管理 -->
<template>
	<div>
	    <el-container class="home-container">
	      <el-header class="home-header">
	        <span class="home_title">智能教室系统</span>
	        <div style="display: flex;align-items: center;margin-right: 7px">
	        <div v-if="!this.username">
	        	<router-link to="/login">登录</router-link>
	        </div>
	        	<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
    {{this.username}}
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

	        </div>
	      </el-header>
	      <el-container>
	        <el-aside width="180px" class="home-aside">
	          <div style="display: flex;justify-content: flex-start;width: 180px;text-align: left;">

	            <el-menu style="background: #ececec;width: 180px;" unique-opened router>
	            	<template v-for="(item,index) in this.menu" v-if="!item.hidden">
	            		<el-submenu :key="index" :index="index+''">
	            			<template slot="title">
	            				<span slot="title">{{item.name}}</span>
	            			</template>
	            			<el-menu-item width="180px"
                                style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                                v-for="child in item.childMenu"
                                :index="child.path"
                                :key="child.path">{{child.name}}
                  			</el-menu-item>
	            		</el-submenu>
	            	</template>
	            </el-menu>

	          </div>
	        </el-aside>
	          <el-main>
	            <el-breadcrumb separator-class="el-icon-arrow-right">
	              <el-breadcrumb-item :to="{ path: '#' }">首页</el-breadcrumb-item>
	              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
	            </el-breadcrumb>

<!-- 用户基本资料-->
<template>
  <div>
    <el-container>
    	<el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
    		<div style="display: inline">
    			<el-input
			    placeholder="通过用户名搜索用户记得回车哦"
			    style="width: 300px;margin: 0px;padding: 0px;"
            	size="mini"
            	:disabled="advanceSearchViewVisible"
            	@keyup.enter.native="searchUser"
			    v-model="keywords">
			    <i slot="prefix" class="el-input__icon el-icon-search"></i>
			    </el-input>
			    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchUser">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px" @click="showAdvanceSearchView"
                     ><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
    	</div>
    	<div style="margin-left: 5px;margin-right: 20px;display: inline">
    		<el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddUserView">
            添加用户
          </el-button>
    	</div>
    	</el-header>
    	<el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="el-fade-in">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span="7">
                  账号可用:
                  <el-radio-group v-model="user.enable">
                    <el-radio :label='false'>不可用</el-radio>
                    <el-radio style="margin-left: 15px" :label='true'>可用</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="7">
                  账号冻结:
                  <el-radio-group v-model="user.locked">
                    <el-radio :label='false'>未冻结</el-radio>
                    <el-radio style="margin-left: 15px" :label='true'>冻结</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="5" :offset="19">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchUser">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="this.users"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              prop="username"
              align="left"
              fixed
              label="用户名"
              width="90">
            </el-table-column>
            <el-table-column
              prop="enable"
              width="85"
              align="left"
              label="账号可用"
              :formatter="formatBoolean">
            </el-table-column>
            <el-table-column
              prop="locked"
              label="账号冻结"
              width="85"
              :formatter="formatBoolean">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditUserView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-popover
                    placement="top-start"
                    title="角色信息"
                    width="200"
                    trigger="hover">
                    <el-table :data="scope.row.roles" empty-text="暂无角色">
                      <el-table-column width="100" property="description" label="角色中文名"></el-table-column>
                      <el-table-column width="100" property="name" label="角色名"></el-table-column>
                    </el-table>
                    <el-button slot="reference"  style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" >查看高级资料</el-button>
                  </el-popover>

                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini" @click="deleteUser(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="users.length>0" :disabled="multipleSelection.length==0" @click='deleteManyUsers'>批量删除
            </el-button>
            <el-pagination
              background
              :hide-on-single-page="totalCount<=2"
              :page-size="2"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
      </div>
  </el-main>
    </el-container>
    <el-form :model="adduser" :rules="rules" ref="addUserForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="用户名:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="adduser.username" size="mini" style="width: 150px"
                            placeholder="请输入用户名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="密码:" prop="password">
                  <el-input prefix-icon="el-icon-edit" v-model="adduser.password" size="mini" style="width: 150px"
                            placeholder="请输入密码"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="角色:" prop="roleIds">
              <el-select
                  v-model="adduser.roleIds"
                  multiple
                  remote
                  filterable
                  placeholder="请选择任意值"
                  :remote-method="searchAllRole"
                  :loading="selectRolesLoading">
                  <el-option
                    v-for="item in allRole"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>


                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="addUser('addUserForm')">确 定</el-button>
  </span>
        </el-dialog>

      </div>
    </el-form>

<el-form :model="updateuser" :rules="rules" ref="updateUserForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogUpdateVisible"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="用户名:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="updateuser.username" size="mini" style="width: 150px"
                            placeholder="请输入用户名"></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="3">
              <div>
                <el-form-item label="账号可用:" prop="enable">
                  <el-switch
                    v-model="updateuser.enable"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <el-form-item label="账号冻结:" prop="locked">
                  <el-switch
                    v-model="updateuser.locked"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="14">
              <div>
                <el-form-item label="角色:" prop="roleIds">
                <el-transfer v-model="choiceRole" :data="this.generateRole" :titles="roleTransferTitles"></el-transfer>

                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="updateUser('updateUserForm')">确 定</el-button>
  </span>
        </el-dialog>

      </div>
    </el-form>

  </div>
</template>

	          </el-main>
	      </el-container>
	    </el-container>
  </div>
</template>
<script>
  import axios from 'axios';

	export default {
		data(){

			return {
				user:{
					username:'',
					enable:'',
					locked:''
				},
				users:[],
				keywords:'',
				faangledoubleup: 'fa-angle-double-up',
    		faangledoubledown: 'fa-angle-double-down',
    		advanceSearchViewVisible: false,
    		multipleSelection: [],
    		tableLoading: false,
        selectRolesLoading:false,
    		totalCount: -1,
 		    currentPage: 1,
 		    dialogTitle: '',
 		    dialogVisible: false,
        dialogUpdateVisible:false,
 		    adduser:{
 		    	username:'',
 		    	password:'',
 		    	enable:true,
		      locked:false,
 		    	roleIds:[]
 		    },
        updateuser:{
          id:'',
          username:'',
          password:'',
          enable:'',
          locked:'',
          roleIds:[]
        },
 		    rules: {
        username: [{required: true, message: '必填:用户名', trigger: 'blur'}],
          password: [{required: true, message: '必填:密码', trigger: 'blur'},
              {
                pattern: /(\w{2})/,
                message: '密码长度应大于2',
                trigger: 'blur'
              }]
		    },
		    roles:[],
        allRole:[],

        generateRole:[],
        choiceRole:[],
        roleTransferTitles:['全部角色', '已有角色']
			}
		},
		computed:{
			username(){
				return this.$store.state.username;
			},
			menu(){
				return this.$store.state.menu;
			}
		},
		methods:{
			handleCommand(cmd){
		        var _this = this;
		        if (cmd == 'logout') {
		          this.$confirm('注销登录, 是否继续?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(() => {
		            _this.getRequest("/logout");
		            _this.$store.commit('logout');
		            _this.$router.replace({path: '/login'});
		          }).catch(() => {
		            _this.$message({
		              type: 'info',
		              message: '取消'
		            });
		          });
		        }
	      },
	      showAdvanceSearchView() {
	        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	        console.log(this.multipleSelection);
	      },
	      currentChange(currentChange) {
	        this.currentPage = currentChange;
	        this.loadUsers();
	      },
	      //搜索用户
	      searchUser(){
	      	this.loadUsers();
	      },
	      //装载用户
	      loadUsers(){
	      	var _this=this;
	      	this.tableLoading=true;
	      	console.log('enable:'+this.user.enable);
	      	this.getRequest("/user/user",{
	      		username:this.keywords,
	      		enable:this.user.enable,
	      		locked:this.user.locked,
	      		pageIndex:this.currentPage,
	      		pageSize:2
	      	})
	      	.then(resp =>{
	      		this.tableLoading=false;
	      		if (resp && resp.status == 200) {
	      			var data=resp.data;
	      			_this.users=data.users;
	      			_this.totalCount=data.count;
	      		}
	      	})
	      },
	      formatBoolean(row, column, cellValue){
	      	var ret = ''  //你想在页面展示的值
                if (cellValue) {
                    ret = "是"  //根据自己的需求设定
                } else {
                    ret = "否"
                }
                return ret;
	      },
	      deleteManyUsers() {
	        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          var ids = '';
	          for (var i = 0; i < this.multipleSelection.length; i++) {
	            ids += this.multipleSelection[i].id + ",";
	          }
	          this.doDelete(ids);
	        }).catch(() => {
	        });
	      },
	      deleteUser(row) {
	        this.$confirm('此操作将永久删除[' + row.username + '], 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          this.doDelete(row.id);
	        }).catch(() => {
	        });
	      },
	      doDelete(ids) {
	        this.tableLoading = true;
	        var _this = this;
	        this.deleteRequest("/user/"+ids).then(resp => {
	          _this.tableLoading = false;
	          if (resp && resp.status == 200) {
	            var data = resp.data;

	            _this.loadUsers();
	          }
	        })
     	 },
	      addUser(formName) {
	        var _this = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            //添加
                this.tableLoading = true;
                this.postRequest("/user/add", this.adduser).then(resp => {
                  _this.tableLoading = false;
                  if (resp && resp.status == 200) {
                    var data = resp.data;

                    _this.dialogVisible = false;
                    _this.emptyAddUserData();
                    _this.loadUsers();
                  }
                })
	          } else {
	            return false;
	          }
	        });
	      },
        updateUser(formName){
          var _this = this;
          this.updateuser.roleIds=this.choiceRole;
          console.log(this.updateuser)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.updateuser.id) {
                //更新
                this.tableLoading = true;
                this.putRequest("/user/update", this.updateuser).then(resp => {
                  _this.tableLoading = false;
                  if (resp && resp.status == 200) {
                    var data = resp.data;
                    _this.dialogUpdateVisible = false;
                    _this.emptyAddUserData();
                    _this.loadUsers();
                  }
                })
              } else {
                //无用户id
                return false;
              }
            } else {
              return false;
            }
          });
        },
	      cancelEidt() {
	        this.dialogVisible = false;
          this.dialogUpdateVisible=false;
	        this.emptyAddUserData();
          this.emptyUpdateUserData();
	      },
	      emptyAddUserData() {
	        this.adduser = {
	          username: '',
	          password: '',
            enable:true,
            locked:false,
	          roleIds: ''
	        }
	      },
        emptyUpdateUserData() {
          this.updateuser = {
            username: '',
            password: '',
            enable:true,
            locked:false,
            roleIds: ''
          }
        },
	      emptyUserData(){
	      	this.user={
	      		username:'',
    				enable:'',
    				locked:''
	      	}
	      },
	      showAddUserView(){
	      	this.dialogTitle = "添加用户名";
	        this.dialogVisible = true;
	      },
	      showEditUserView(row){
          this.generateData();
          var choiceData=[];
          for (let i = 0; i < row.roles.length; i++) {
            var curRole=row.roles[i];
            choiceData.push(curRole.id);
          }
          this.choiceRole=choiceData;
        	this.dialogTitle = "编辑员工";
        	this.updateuser=row;
        	this.dialogUpdateVisible = true;
	      },
	      cancelSearch() {
	        this.advanceSearchViewVisible = false;
	        this.emptyUserData();
	        this.loadUsers();
	      },
        searchAllRole(){
          var _this=this;
          this.getRequest("/user/role",{
            pageSize:100
          })
          .then(resp =>{
            if (resp && resp.status == 200) {
              var data=resp.data;
              _this.allRole=data.roles;
            }
          })
        },
        generateData(){
          var _this=this;
          this.getRequest("/user/role",{
            pageSize:100
          })
          .then(resp =>{
            if (resp && resp.status == 200) {
              var data=resp.data.roles;
              console.log(data[0].id)
              const dataRole = [];
              for (let i = 0; i < data.length; i++) {
                dataRole.push({
                  key: data[i].id,
                  label:data[i].name
                });
              }
              this.generateRole=dataRole;
            }
          })
        }
        
        // formatDate(value) {
        //   var date = new Date(value);
        //   var year = date.getFullYear();
        //   var month = date.getMonth() + 1;
        //   var day = date.getDate();
        //   if (month < 10) {
        //     month = "0" + month;
        //   }
        //   if (day < 10) {
        //     day = "0" + day;
        //   }
        //   return year + "-" + month + "-" + day;
        // }
	    },
		mounted(){
			
		}
	}
</script>
<style scoped>
	.home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #ECECEC;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>