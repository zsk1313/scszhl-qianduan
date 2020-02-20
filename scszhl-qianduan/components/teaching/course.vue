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
				<el-container>
					<el-header class="head1">
						<div style=" display: inline">
						
							
								<el-button style="position: relative;left: -250px; margin-right:20px" type="primary" round icon="el-icon-search" @click="searchCourse">搜索全部课程</el-button>
							
							
								<el-button style="position: relative;left: 300px; margin-right:20px" type="success" round icon="el-icon-search" @click="searchCourse" >高级搜索</el-button>
						</div>	
						<div style="position: relative; left: 300px; margin-left: 5px;margin-right: 20px;display: inline">	
								<el-button style="margin-right:20px" icon="el-icon-search" type="success" round  @click="dialogVisible = true" >添加课程</el-button>
						</div>	
						
					
					</el-header>
					<el-main >
					  <el-table
						:data="this.courses"
						style="width: 100%"
						v-loading="tableLoading"
						:row-class-name="tableRowClassName">
						<el-table-column
						prop="name"
						label="课程名"
						width="180">
					    </el-table-column>
					    <el-table-column
					    prop="score"
					    label="学分"
					    width="180">
				        </el-table-column>
				        <el-table-column
				        prop="code"
				        label="课程代码">
			            </el-table-column>
			              <el-table-column
				        prop="week"
				        label="week">
			            </el-table-column>
			              <el-table-column
				        prop="classroom"
				        label="上课地点">
			            </el-table-column>
			             <el-table-column
				        prop="dateorder"
				        label="上课天数">
			            </el-table-column>
			            <el-table-column
				        prop="startTime"
				        label="课程开始日期">
			            </el-table-column>
			             <el-table-column
				        prop="endTime"
				        label="课程结束日期">
			            </el-table-column>
		              </el-table>
		              <div style="display: flex;justify-content: space-between;margin: 2px">
		              	<el-button type="danger" round  >批量删除
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

	                </el-main>
	            <el-dialog
	                title="提示"
	                :visible.sync="dialogVisible"
	                width="90%"
	                :before-close="handleClose">
	                <el-form :model="courseForm" :rules="rules" label-width="100px" class="demo-ruleForm">
	                	<el-form-item label="课程名" prop="name">
	                		<el-input v-model="courseForm.name" style="width:250px;"></el-input>
	                	</el-form-item>
	                	<el-form-item label="课程编号"  prop="code">
	                		<el-input v-model="courseForm.code" style="width:250px;"></el-input>
	                	</el-form-item>
	                	<el-form-item label="教室id"  prop="teacherID">
	                		<el-input v-model="courseForm.teacherID" style="width:250px;"></el-input>
	                	</el-form-item>
	                	<el-form-item label="上课地点" prop="classroom">
	                		<el-input v-model="courseForm.classroom" style="width:250px;"></el-input>
	                	</el-form-item>
	                	<el-form-item label="上课时间" prop="week">
	                		<el-select v-model="courseForm.week" style="width:250px;" placeholder="请选择上课时间">
	                			<el-option label="周一" value="1"></el-option>
	                			<el-option label="周二" value="2"></el-option>
	                			<el-option label="周三" value="3"></el-option>
	                			<el-option label="周四" value="4"></el-option>
	                			<el-option label="周五" value="5"></el-option>
	                			<el-option label="周六" value="6"></el-option>
	                			<el-option label="周日" value="7"></el-option>
	                		</el-select>
	                	</el-form-item>
                        <el-form-item label="上课节数" prop="dateorder">
	                		<el-select v-model="courseForm.dateorder" style="width:250px;" placeholder="请选择上课节数">
	                			<el-option label="第一大节" value="1"></el-option>
	                			<el-option label="第二大节" value="2"></el-option>
	                			<el-option label="第三大节" value="3"></el-option>
	                			<el-option label="第四大节" value="4"></el-option>
	                			<el-option label="第五大节" value="5"></el-option>
	                		</el-select>
	                	</el-form-item>
	                	<el-form-item label="学分" prop="score">
	                		<el-select v-model="courseForm.score" style="width:250px;" placeholder="请选择学分">
	                			<el-option label="1.0" value="1.0"></el-option>
	                			<el-option label="1.5" value="1.5"></el-option>
	                			<el-option label="2.0" value="2.0"></el-option>
	                			<el-option label="2.5" value="2.5"></el-option>
	                			<el-option label="3.0" value="3.0"></el-option>
	                			<el-option label="3.5" value="3.5"></el-option>
	                			<el-option label="4.0" value="4.0"></el-option>
	                		</el-select>
	                	</el-form-item>
	                	<el-form-item label="开课时间"style="position: absolute;left: 400px; top: 85px" required>
	                		<el-col style="position: absolute;left: 0px; top: 0px">
	                			<el-form-item prop="startTime">
	                				<el-date-picker type="date" placeholder="选择日期" v-model="courseForm.startTime" style="width: 250px;"></el-date-picker>
	                			</el-form-item>
	                		</el-col>
	                		<el-col class="line"  style="position: absolute;left: 270px; top:0px">-</el-col>
	                		<el-col >
	                			<el-form-item style="position: absolute;left: 300px; top:0px" prop="date2" >
	                				<el-time-picker placeholder="选择时间"style="width: 250px;"></el-time-picker>
	                			</el-form-item>
	                		</el-col>
	                	</el-form-item>
	                	<el-form-item label="结课时间"style="position: absolute;left: 400px; top: 130px" required>
	                		<el-col style="position: absolute;left: 0px; top: 0px">
	                			<el-form-item prop="endTime">
	                				<el-date-picker type="date" placeholder="选择日期" v-model="courseForm.endTime" style="width: 250px;"></el-date-picker>
	                			</el-form-item>
	                		</el-col>
	                		<el-col class="line"  style="position: absolute;left: 270px; top:0px">-</el-col>
	                		<el-col >
	                			<el-form-item style="position: absolute;left: 300px; top:0px"  >
	                				<el-time-picker placeholder="选择时间" style="width: 250px;"></el-time-picker>
	                			</el-form-item>
	                		</el-col>
	                	</el-form-item>
	                	

	                	<el-form-item>
	                		<el-button type="success" @click="addCourse">添加</el-button>
	                		<el-button type="primary" @click="resetForm('courseForm')">重置</el-button>
	                	</el-form-item>
	                </el-form>
	                <div slot="footer" class="dialog-footer">
	                	<el-button @click="dialogVisible = false" style="position: absolute;left: 320px;top: 523px;">取 消</el-button>
	                </div>
	            </el-dialog>
                </el-container>
                


<!--end-->
</el-main>
</el-container>
</el-container>
</div>
</template>
<script>

	export default {
		data(){
			return {
				course:{
					name:'',
					score:'',
					code:'',
					week:'',
					classroom:'',
					dateorder:'',
					startTime:'',
					endTime:''
				},
				courses:[],
				totalCount: -1,
				multipleSelection: [],
				currentPage: 1,
				tableLoading: false,
				dialogVisible: false,
				courseForm: {
					name: '',
					score: '',
					code: '',
					week:'',
					teacherID:"",
					dateorder:'',
					classroom:'',
					startTime: '',
					endTime: ''
				},
				rules: {
					name: [
					{ required: true, message: '请输入课程名称', trigger: 'blur' },
					{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
					],
					classroom: [
					{ required: true, message: '请输入上课地点', trigger: 'blur' },
					{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
					],
					score: [
					{ required: true, message: '请选择课程学分', trigger: 'change' }
					],
					week: [
					{ required: true, message: '请选择上课时间', trigger: 'change' }
					],
					dateorder: [
					{ required: true, message: '请选择上课节数', trigger: 'change' }
					],
					code:[
					{ required: true, message: '请输入课程编号', trigger: 'blur' },
					{ min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
					],
					teacherID:[
					{ required: true, message: '请输入教师id', trigger: 'blur' },
					{ min: 1, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
					],
					startTime: [
					{ type: 'date', required: true, message: '请选择课程开始日期', trigger: 'change' }
					],
					endTime: [
					{ type: 'date', required: true, message: '请选择课程结束时间', trigger: 'change' }
					]
				},
				formLabelWidth: '120px'
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
			 currentChange(currentChange) {
	        this.currentPage = currentChange;
	        this.searchCourse();
	      },
	      handleClose(done) {
	      	this.$confirm('确认关闭？')
	      	.then(_ => {
	      		done();
	      	})
	      	.catch(_ => {});
	      },
			tableRowClassName({row, rowIndex}) {
              if (rowIndex === 1) {
              return 'warning-row';
              } else if (rowIndex === 3) {
               return 'success-row';
              }
              return '';
            },
            addCourse(){
	        	this.postRequest("/course/addCourse", this.courseForm)
	        		.then(resp => {

	        		})
	        	
           },
			searchCourse(){
				var _this=this;
				this.getRequest("/course/course",{
	      		name:this.course.name,
	      		score:this.course.score,
	      		code:this.course.code,
	      		week:this.course.week,
	      		classroom:this.course.classroom,
	      		dateorder:this.course.dateorder,
	      		startTime:this.course.startTime,
	      		endTime:this.course.endTime,
	      		pageIndex:this.currentPage,
	      		pageSize:4
		      	})
		      	.then(resp =>{
		      		this.tableLoading=false;
		      		if (resp && resp.status == 200) {
		      			var data=resp.data;

		      			_this.courses=data.courses;
		      			//console.log(_this.courses)
		      			_this.totalCount=data.count;
		      		}
		      	})
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

.main1{
	background-color: #E9EEF3;
	color: #333;
	text-align: center;
	line-height: 600px;
}
.head1{
	background-color: ;
	color: #333;
	text-align: center;
	line-height: 60px;
	margin-top:20px;
}
.el-table .warning-row {
	background: oldlace;
}

.el-table .success-row {
	background: #f0f9eb;
}

</style>