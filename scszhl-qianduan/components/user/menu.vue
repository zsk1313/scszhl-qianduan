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
<!-- 角色资源管理 -->
<template>
  <div>
    <el-container>
    	<el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
    		<div style="display: inline">
    			<el-input
			    placeholder="通过资源规则搜索资源记得回车哦"
			    style="width: 300px;margin: 0px;padding: 0px;"
            	size="mini"
            	:disabled="advanceSearchViewVisible"
            	@keyup.enter.native="searchMenu"
			    v-model="keywords">
			    <i slot="prefix" class="el-input__icon el-icon-search"></i>
			    </el-input>
			    <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchMenu">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px" @click="showAdvanceSearchView"
                     ><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
    	</div>
    	<div style="margin-left: 5px;margin-right: 20px;display: inline">
    		<el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddMenuView">
            添加资源
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
                  资源规则:
                  <el-select v-model="keywords" placeholder="请选择">
				    <el-option
				      v-for="item in allMenu"
				      :key="item.id"
				      :label="item.pattern"
				      :value="item.pattern">
				    </el-option>
				  </el-select>
                </el-col>
                <el-col :span="5" :offset="19">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchMenu">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="this.menus"
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
              prop="pattern"
              align="left"
              fixed
              label="资源规则"
              width="90">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditMenuView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary"
                           size="mini">查看高级资料
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini" @click="deleteMenu(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="menus.length>0" :disabled="multipleSelection.length==0" @click='deleteManyMenus'>批量删除
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
    <el-form :model="addmenu" :rules="rules" ref="addMenuForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="10">
              <div>
                <el-form-item label="资源规则:" prop="pattern">
                  <el-input prefix-icon="el-icon-edit" v-model="addmenu.pattern" size="mini" style="width: 150px"
                            placeholder="请输入资源规则"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="角色:" prop="roleIds">
                  <el-select v-model="addmenu.roleIds" style="width: 200px" size="mini" multiple placeholder="角色">
                    <el-option
                      v-for="item in roles"
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
    <el-button size="mini" type="primary" @click="addMenu('addMenuForm')">确 定</el-button>
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
				cmenu:{
					pattern:''
				},
				menus:[],
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
       		    addmenu:{
       		    	pattern:"",
       		    	roleIds:[]
       		    },
       		    rules: {
			        pattern: [{required: true, message: '必填:资源规则', trigger: 'blur'},
			        {
		            pattern: /(^\/\w*\/\*{2}$)/,
		            message: '资源格式不正确',
		            trigger: 'blur'
		          }]
			    },
			    roles:[],
			    updateMenu:{},
			    allMenu:[]
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
	        this.loadMenus();
	      },
	      //搜索资源规则
	      searchMenu(){
	      	this.loadMenus();
	      },
	      //装载资源规则
	      loadMenus(){
	      	var _this=this;
	      	this.tableLoading=true;
	      	this.getRequest("/user/menu",{
	      		pattern:this.keywords,
	      		pageIndex:this.currentPage,
	      		pageSize:2
	      	})
	      	.then(resp =>{
	      		this.tableLoading=false;
	      		if (resp && resp.status == 200) {
	      			var data=resp.data;
	      			_this.menus=data.menus;
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
	      deleteManyMenus() {
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
	      deleteMenu(row) {
	        this.$confirm('此操作将永久删除[' + row.pattern + '], 是否继续?', '提示', {
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
	        this.deleteRequest("/user/menu/"+ids).then(resp => {
	          _this.tableLoading = false;
	          if (resp && resp.status == 200) {
	            var data = resp.data;

	            _this.loadMenus();
	          }
	        })
     	 },
	      addMenu(formName) {
	        var _this = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            if (this.addmenu.id) {
	              //更新
	              this.tableLoading = true;
	              this.putRequest("/user/menu/update", this.addmenu).then(resp => {
	                _this.tableLoading = false;
	                if (resp && resp.status == 200) {
	                  var data = resp.data;
	                  _this.dialogVisible = false;
	                  _this.emptyAddMenuData();
	                  _this.loadMenus();
	                }
	              })
	            } else {
	              //添加
	              this.tableLoading = true;
	              this.postRequest("/user/menu/add", this.addmenu).then(resp => {
	                _this.tableLoading = false;
	                if (resp && resp.status == 200) {
	                  var data = resp.data;

	                  _this.dialogVisible = false;
	                  _this.emptyAddMenuData();
	                  _this.loadMenus();
	                }
	              })
	            }
	          } else {
	            return false;
	          }
	        });
	      },
	      cancelEidt() {
	        this.dialogVisible = false;
	        this.emptyAddMenuData();
	      },
	      emptyAddMenuData() {
	        this.addmenu = {
	          pattern: '',
	          roleIds: ''
	        }
	      },
	      emptyMenuData(){
	      	this.cmenu={
	      		pattern:''
	      	}
	      },
	      showAddMenuView(){
	      	this.dialogTitle = "添加资源";
	        this.dialogVisible = true;
	      },
	      showEditMenuView(row){
	      	console.log(row);
        	this.dialogTitle = "编辑资源";

        	this.addmenu=row;

        	this.dialogVisible = true;
        	console.log(this.addmenu);
	      },
	      cancelSearch() {
	        this.advanceSearchViewVisible = false;
	        this.emptyMenuData();
	        this.loadMenus();
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
	      }
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