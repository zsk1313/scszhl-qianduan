<!-- 设备管理 -->
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
            <span
              class="el-dropdown-link home_userinfo"
              style="display: flex;align-items: center"
            >{{this.username}}</span>
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
                  <el-menu-item
                    width="180px"
                    style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                    v-for="child in item.childMenu"
                    :index="child.path"
                    :key="child.path"
                  >{{child.name}}</el-menu-item>
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
          <br />
          <!--开发-->
          <!-- 搜索框 + 按钮 -->
          <el-input v-model="input" placeholder="请输入内容" style="width:30%"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="success" @click="insertForm = true">
            <i class="el-icon-connection el-icon--left"></i>添加传感器设备
          </el-button>
          <br />
          <br />
          <!-- 设备列表 -->
          <template>
            <el-container style="height: 700px; border: 1px solid #eee">
              <el-aside width="220px">
                <el-menu :default-openeds="['1', '2', '3']">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-setting"></i>钟海楼
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="1-1" @click="selectSensorNode(1)">钟海楼04002</el-menu-item>
                      <el-menu-item index="1-2" @click="selectSensorNode(2)">钟海楼04017</el-menu-item>
                      <el-menu-item index="1-3" @click="selectSensorNode(3)">钟海楼02019</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-setting"></i>主楼
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="2-1" @click="selectSensorNode(4)">704</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-setting"></i>二教
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="3-1" @click="selectSensorNode(5)">b2-503</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-aside>

              <el-container>
                <el-main>
                  <el-table :data="sensorData">
                    <el-table-column prop="code" label="编号" width="150">
                      <template scope="scope">
                        <span>{{scope.row.code}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" label="id" v-if="show"></el-table-column>
                    <el-table-column prop="time" label="时间"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="fundescription" label="功能描述" width="140"></el-table-column>
                    <el-table-column prop="address" label="位置"></el-table-column>
                    <el-table-column prop="flag" label="标记"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>                    
                    <el-table-column prop label width="150">
                      <template scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          circle
                          @click="handleEdit(scope.row,scope.$index)"
                        ></el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="deleteSensor($index, scope.row.id)"
                        ></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-container>
          </template>

          <!-- 修改弹出框 -->
          <template>
            <el-dialog title="修改传感器信息" :visible.sync="updateForm">
              <el-form :model="updateSensor">
                <el-form-item label="设备id" :disabled="true" v-if="show">
                  <el-input v-model="updateSensor.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备编号" :disabled="true">
                  <el-input v-model="updateSensor.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="updateSensor.time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="设备类型">
                  <el-input v-model="updateSensor.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备描述">
                  <el-input v-model="updateSensor.fundescription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备标记">
                  <el-input v-model="updateSensor.flag" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备地点">
                  <el-input v-model="updateSensor.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备状态">
                  <el-select v-model="updateSensor.status" placeholder="请选择">
                    <el-option label="启用" value="enable"></el-option>
                    <el-option label="禁用" value="disable"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateForm = false">取 消</el-button>
                <el-button type="success" @click="editDone($event)">提 交</el-button>
              </div>
            </el-dialog>
          </template>

          <!-- 插入弹出框 -->
          <template>
            <el-dialog title="添加传感器" :visible.sync="insertForm">
              <el-form :model="insertSensor">
                <el-form-item label="设备编号" :disabled="true">
                  <el-input v-model="insertSensor.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="insertSensor.time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="设备类型">
                  <el-input v-model="insertSensor.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备描述">
                  <el-input v-model="insertSensor.fundescription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备标记">
                  <el-input v-model="insertSensor.flag" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备地点">
                  <el-input v-model="insertSensor.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备状态">
                  <el-select v-model="insertSensor.status" placeholder="请选择">
                    <el-option label="启用" value="enable"></el-option>
                    <el-option label="禁用" value="disable"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设备客户端">
                  <el-select
                    v-model="insertSensor.clientId"
                    placeholder="请选择"
                    @focus="selectClient"
                  >
                    <el-option v-for="i in clientData" :label="i.name" :value="i.id" v-bind:key="i"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="insertForm = false">取 消</el-button>
                <el-button type="success" @click="insertDone()">提 交</el-button>
              </div>
            </el-dialog>
          </template>

          <!--开发end-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      client: {
        id: "",
        name: ""
      },
      sensorNodeVo: {
        id: "",
        code: "",
        time: "",
        type: "",
        status: "",
        fundescription: "",
        address: "",
        flag: "",
        clientId: ""
      },
      updateSensor: {
        id: "",
        code: "",
        time: "",
        type: "",
        status: "",
        fundescription: "",
        address: "",
        flag: "",
        clientId: ""
      },
      insertSensor: {
        code: "",
        time: "",
        type: "",
        status: "",
        fundescription: "",
        address: "",
        flag: "",
        clientId: ""
      },
      controllerNodeVo: {
        code: "",
        time: "",
        type: "",
        status: "",
        value: "",
        address: "",
        flag: "",
        clientId: ""
      },
      sensorData: [],
      controllerData: [],
      clientData: [],
      updateForm: false,
      insertForm: false,
      updateFormormLabelWidth: "100px"
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    menu() {
      return this.$store.state.menu;
    }
  },
  methods: {
    handleCommand(cmd) {
      var _this = this;
      if (cmd == "logout") {
        this.$confirm("注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.getRequest("/logout");
            _this.$store.commit("logout");
            _this.$router.replace({ path: "/login" });
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "取消"
            });
          });
      }
    },

    //日期
    formatDate(value) {
      var date = new Date(value);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },

    //查询客户端列表
    selectClient() {
      this.getRequest("/device/selectClient", {}).then(resp => {
        if (resp && resp.status == 200) {
          var data = resp.data;
          this.clientData = data;
          //console.log(this.ClientData);
        }
      });
    },

    //查询客户端对应传感器
    selectSensorNode(i) {
      this.getRequest("/device/listSensor", {
        id: i
      }).then(resp => {
        if (resp && resp.status == 200) {
          var data = resp.data;
          this.sensorData = data;
          console.log(data);
        }
      });
    },

    //修改弹出框逻辑
    handleEdit(row, _index) {
      //记录索引
      this.sensorDataIndex = _index;
      //记录数据
      this.updateSensor = row;
      //显示弹窗
      this.updateForm = true;
    },
    //提交弹出框逻辑
    editDone(event) {
      event.preventDefault();
      //修改传感器信息
      // this.putRequest("/device/updateSensor", {
      //   formData:JSON.stringify(this.updateSensor)
      // }).then(resp => {
      //   console.log(resp.data);
      // });
      this.putRequest("/device/updateSensor", this.updateSensor).then(resp => {
        console.log(resp.data);
      });

      //let _index = this.sensorDataIndex;
      //根据索引，赋值到list制定的数
      //this.sensorData[_index] = this.updateSensor;
      //关闭弹窗
      this.updateForm = false;
    },

    //插入传感器信息
    insertDone() {
      this.postRequest("/device/insertSensor", this.insertSensor).then(resp => {
        console.log(resp.data);
      });
      this.insertForm = false;
    },

    //删除传感器
    deleteSensor(index, i) {
      // this.deleteRequest("/device/deleteSensor", {
      //   id: i
      // }).then(resp => {
      //   console.log(resp.data);
      // });
      
      this.$confirm("此操作将永久删除该传感器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.deleteRequest("/device/deleteSensor", {
            id: i
          }).then(resp => {
            console.log(resp.data);
            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
            this.sensorData.splice(index, 1);
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
     }
  },
  mounted() {}
};
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
  background-color: #ececec;
}

.home-main {
  background-color: #fff;
  color: #000;
  text-align: center;
  margin: 0px;
  padding: 0px;
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
.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>