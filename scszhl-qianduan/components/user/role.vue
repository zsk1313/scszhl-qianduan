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

	            <!--开发-->
<!-- 用户角色管理 -->
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
            	@keyup.enter.native="searchRole"
			    v-model="keywords">
			    <i slot="prefix" class="el-input__icon el-icon-search"></i>
			    </el-input>
			    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchRole">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px" @click="showAdvanceSearchView"
                     ><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
    	</div>
    	<div style="margin-left: 5px;margin-right: 20px;display: inline">
    		<el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddRoleView">
            添加角色
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
                <el-col :span="10">
                  角色名:
                  <el-select v-model="keywords" placeholder="请选择">
				    <el-option
				      v-for="item in allRole"
				      :key="item.id"
				      :label="item.name"
				      :value="item.name">
				    </el-option>
				  </el-select>
                </el-col>
                <el-col :span="14">
                  角色中文名:
                  <el-input
					placeholder="请输入角色中文名"
					v-model="role.description"
					clearable
					prepend="角色中文名:"
					style="width: 130px;">
				  </el-input>
                </el-col>
                <el-col :span="5" :offset="19">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchRole">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="this.roles"
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
              prop="name"
              align="left"
              fixed
              label="角色名"
              width="90">
            </el-table-column>
            <el-table-column
              prop="description"
              width="85"
              align="left"
              label="角色中文名">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditRoleView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>

				<el-popover
                    placement="top-start"
                    title="角色信息"
                    width="200"
                    trigger="hover">
                    <el-table :data="scope.row.menus" empty-text="暂无资源">
                      <el-table-column width="200" property="pattern" label="资源路径规则"></el-table-column>
                    </el-table>
                    <el-button slot="reference"  style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" >查看高级资料</el-button>
                  </el-popover>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini" @click="deleteRole(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="roles.length>0" :disabled="multipleSelection.length==0" @click='deleteManyRoles'>批量删除
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
    <el-form :model="addrole" :rules="rules" ref="addRoleForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="角色名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="addrole.name" style="width: 200px"
                            placeholder="请输入角色名">
                            	<template slot="prepend">ROLE_</template>
                            </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="中文名:" prop="description">
                  <el-input prefix-icon="el-icon-edit" v-model="addrole.description" style="width: 150px"
                            placeholder="请输入角色中文名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="资源:" prop="menuIds">
                  <el-select v-model="addrole.menuIds" style="width: 200px"  multiple placeholder="资源">
                    <el-option
                      v-for="item in allMenu"
                      :key="item.id"
                      :label="item.pattern"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="addRole('addRoleForm')">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>

<el-form :model="updaterole" :rules="rules" ref="updateRoleForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogUpdateVisible"
          width="77%">
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="角色名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="updaterole.name" style="width: 200px"
                            placeholder="请输入角色名">
                            	<template slot="prepend">ROLE_</template>
                            </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="中文名:" prop="description">
                  <el-input prefix-icon="el-icon-edit" v-model="updaterole.description" style="width: 150px"
                            placeholder="请输入角色中文名"></el-input>
                </el-form-item>
              </div>
            </el-col>

			<el-col :span="14">
              <div>
                <el-form-item label="资源:" prop="menuIds">
                <el-transfer v-model="choiceMenu" :data="this.generateMenu" :titles="menuTransferTitles"></el-transfer>

                </el-form-item>
              </div>
            </el-col>

          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="updateRole('updateRoleForm')">确 定</el-button>
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

	export default {
		data(){
			return {
				role:{
					name:'',
					description:''
				},
				roles:[],
				keywords:'',
				faangledoubleup: 'fa-angle-double-up',
        		faangledoubledown: 'fa-angle-double-down',
        		advanceSearchViewVisible: false,
        		multipleSelection: [],
        		tableLoading: false,
        		totalCount: -1,
       		    currentPage: 1,
       		    dialogTitle: '',
       		    dialogVisible: false,
       		    addrole:{
       		    	name:'',
       		    	description:'',
       		    	menuIds:[]
       		    },
       		    updaterole:{
       		    	name:'',
       		    	description:'',
       		    	menuIds:[]
       		    },
       		    rules: {
			        name: [{required: true, message: '必填:角色名', trigger: 'blur'},
		              {
		                pattern: /(^ROLE_\w+)/,
		                message: '角色名应应以"ROLE_"开头',
		                trigger: 'blur'
		              }
		              ],
			        description: [{required: true, message: '必填:角色中文名', trigger: 'blur'}]
			    },
			    users:[],
			    allRole:[],
			    allMenu:[],
			    dialogUpdateVisible:false,

			    generateMenu:[],
		        choiceMenu:[],
		        menuTransferTitles:['全部资源', '已有资源']
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
	        this.searchAllRole();
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	        console.log(this.multipleSelection);
	      },
	      currentChange(currentChange) {
	        this.currentPage = currentChange;
	        this.loadRoles();
	      },
	      //搜索角色
	      searchRole(){
	      	this.loadRoles();
	      },
	      //装载角色
	      loadRoles(){
	      	var _this=this;
	      	this.tableLoading=true;
	      	this.getRequest("/user/role",{
	      		name:this.keywords,
	      		description:this.role.description,
	      		pageIndex:this.currentPage,
	      		pageSize:2
	      	})
	      	.then(resp =>{
	      		this.tableLoading=false;
	      		if (resp && resp.status == 200) {
	      			var data=resp.data;
	      			_this.roles=data.roles;
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
	      deleteManyRoles() {
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
	      deleteRole(row) {
	        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
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
	        this.deleteRequest("/user/role/"+ids).then(resp => {
	          _this.tableLoading = false;
	          if (resp && resp.status == 200) {
	            var data = resp.data;

	            _this.loadRoles();
	          }
	        })
     	 },
	      addRole(formName) {
	        var _this = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            //添加
	              console.log("name:"+this.addrole.name)
	              this.tableLoading = true;
	              this.postRequest("/user/role/add", this.addrole).then(resp => {
	                _this.tableLoading = false;
	                if (resp && resp.status == 200) {
	                  var data = resp.data;

	                  _this.dialogVisible = false;
	                  _this.emptyAddRoleData();
	                  _this.loadRoles();
	                }
	              })
	          } else {
	            return false;
	          }
	        });
	      },
	      updateRole(formName){
	      	var _this = this;
	      	this.updaterole.menuIds=this.choiceMenu;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            if (this.updaterole.id) {
	              //更新
	              this.tableLoading = true;
	              this.putRequest("/user/role/update", this.updaterole).then(resp => {
	                _this.tableLoading = false;
	                if (resp && resp.status == 200) {
	                  var data = resp.data;
	                  _this.dialogUpdateVisible = false;
	                  _this.emptyUpdateRoleData();
	                  _this.loadRoles();
	                }
	              })
	            } else {
	              //无角色id
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
	        this.emptyAddRoleData();
	        this.emptyUpdateRoleData();
	      },
	      emptyAddRoleData() {
	        this.addrole = {
	          name: '',
	          description: '',
	          menuIds: ''
	        }
	      },
	      emptyUpdateRoleData() {
	        this.updaterole = {
	          name: '',
	          description: '',
	          menuIds: ''
	        }
	      },
	      emptyRoleData(){
	      	this.role={
	      		name: '',
	            description: ''
	      	}
	      },
	      showAddRoleView(){
	      	this.dialogTitle = "添加角色";
	        this.dialogVisible = true;
	      },
	      showEditRoleView(row){
	      	this.generateData();
	          var choiceData=[];
	          for (let i = 0; i < row.menus.length; i++) {
	            var curMenu=row.menus[i];
	            choiceData.push(curMenu.id);
	          }
	          this.choiceMenu=choiceData;
        	this.dialogTitle = "编辑角色";
        	this.updaterole=row;
        	this.dialogUpdateVisible = true;
	      },
	      cancelSearch() {
	        this.advanceSearchViewVisible = false;
	        this.emptyRoleData();
	        this.loadRoles();
	      },
	      searchAllMenu(){
	      	var _this=this;
	      	this.getRequest("/user/menu",{
	      		pageSize:100
	      	})
	      	.then(resp =>{
	      		if (resp && resp.status == 200) {
	      			var data=resp.data;
	      			_this.allMenu=data.menus;
	      		}
	      	})
	      },
	      generateData(){
	          var _this=this;
	          this.getRequest("/user/menu",{
	            pageSize:100
	          })
	          .then(resp =>{
	            if (resp && resp.status == 200) {
	              var data=resp.data.menus;
	              console.log(data[0].id)
	              const dataMenu = [];
	              for (let i = 0; i < data.length; i++) {
	                dataMenu.push({
	                  key: data[i].id,
	                  label:data[i].pattern
	                });
	              }
	              this.generateMenu=dataMenu;
	            }
	          })
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
	    },
		mounted(){
			this.searchAllMenu();
		}
	}
</script>
<style  scoped>
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