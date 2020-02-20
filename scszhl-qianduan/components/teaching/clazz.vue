
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
	            <el-tooltip class="item" effect="dark" content="刘家骏开发中..." placement="top">
                <el-button>请电联刘工</el-button>
                </el-tooltip>
	            <!--开发-->
 


	          </el-main>
	      </el-container>
	    </el-container>
  </div>
</template>
<script>

	export default {
		data(){
			return {
				
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