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
<template>
    <div>
    	<el-container>
    		<!-- 设置第一个搜索框，数据应当为课程名称或者编号，这里没实现，只能设置成课程id
    		等待修改 -->
    		<el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
    		<div style="display: inline">
    		 <el-input
    		
    		 style="width: 300px;margin: 0px;padding: 0px;"   
    		 size="mini"
             placeholder="请输入内容"
             v-model="input4">
             <i slot="prefix" class="el-input__icon el-icon-search"></i>
             </el-input>
             <!-- 设置一个搜索按钮，点击即可搜索 -->
             <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" >搜索
             </el-button>
             <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                     ><i
              
              style="margin-right: 5px"></i>高级搜索
              </el-button>
            </div>
             <div style="margin-left: 5px;margin-right: 20px;display: inline">
    		    <el-button type="primary" size="mini" icon="el-icon-plus"
                     >
            添加考勤表
                </el-button>
             </div>
    	    </el-header>
    	</el-container>

    </div>
    <div>
    	<el-container>
            <el-table
             :data="tableData"
                 style="width: 100%">
                              <el-table-column
                              type="selection"
                              align="left"
                                width="30">
                             </el-table-column>
                  <el-table-column
                   prop="date"
                   align="left"
                   fixed
                   label="发布时间"
                   width="90">
                  </el-table-column>
                  <el-table-column
                    align="right">
                    <template slot="header" slot-scope="scope">
                    <el-input
                         v-model="keywords"
                         size="mini"
                         placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                         <el-button
                               size="mini"
                               >Edit</el-button>
                              <el-button
                              size="mini"
                              type="danger"
                              >Delete</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                   prop="total"
                   align="left"
                   fixed
                   label="应到人数"
                   width="90">
                  </el-table-column>
                  <el-table-column
                   prop="actual"
                   align="left"
                   fixed
                   label="实到人数"
                   width="90">
                  </el-table-column>
                  <el-table-column
                   prop="note"
                   align="left"
                   fixed
                   label="备注"
                   width="90">
                  </el-table-column>
                  <el-table-column
                   prop="courseid"
                   align="left"
                   fixed
                   label="课程id"
                   width="90">
                  </el-table-column>
              </el-table>





    	</el-container>
    	
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
				 input4: '',
				 keywords:'',
				 tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1517 弄'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1519 弄'
		        }, {
		          date: '2016-05-03',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1516 弄'
		        }],
		        totalCount: -1,
       		    currentPage: 1,
				
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
	      }
	    },
		mounted(){
			
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