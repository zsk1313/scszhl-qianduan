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

          <!-- 开发 -->
          <br />
          <!-- 搜索框 + 按钮 -->
          <el-input v-model="input" placeholder="请输入内容" style="width:30%"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="success" @click="monitorDialog = true">
            <i class="el-icon-set-up el-icon--left"></i>监控
          </el-button>
          <br />
          <br />

          <!-- 面板 -->
          <template>
            <el-container style="height: 700px; border: 1px solid #eee">
              <el-aside width="220px">
                <el-menu :default-openeds="['1', '2', '3']">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-setting"></i>钟海楼
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="1-1" @click="selectController(1)">钟海楼04002</el-menu-item>
                      <el-menu-item index="1-2" @click="selectController(2)">钟海楼04017</el-menu-item>
                      <el-menu-item index="1-3" @click="selectController(3)">钟海楼02019</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-setting"></i>主楼
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="2-1" @click="selectController(4)">704</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-setting"></i>二教
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="3-1" @click="selectController(5)">b2-503</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-aside>

              <el-container>
                <el-main>
                  <el-collapse v-model="monitorBoard" @change="handleChange">
                    <el-collapse-item name="1">
                      <template slot="title">
                        温湿度
                        <i class="el-icon--right el-icon-odometer"></i>
                      </template>
                      <div>
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <div class="grid-content">
                              
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content"></div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                      <template slot="title">
                        光照强度
                        <i class="el-icon--right el-icon-sunny"></i>
                      </template>
                      <div>
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <div class="grid-content">
                              <el-progress
                                :stroke-width="16"
                                :percentage="100"
                                :show-text="false"
                                color="#00EE76"
                              ></el-progress>
                              <span>强度：</span>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content"></div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                      <template slot="title">
                        烟雾浓度
                        <i class="el-icon--right el-icon-magic-stick"></i>
                      </template>
                      <div>
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <div class="grid-content">
                              <el-progress
                                :stroke-width="16"
                                :percentage="2"
                                :show-text="false"
                                color="#FF3030"
                              ></el-progress>
                              <span>浓度：</span>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content"></div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">
                      <template slot="title">
                        PM2.5浓度
                        <i class="el-icon--right el-icon-view"></i>
                      </template>
                      <div>
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <div class="grid-content">
                              <el-progress
                                :stroke-width="16"
                                :percentage="20"
                                :show-text="false"
                                color="#FF3030"
                              ></el-progress>
                              <span>浓度：</span>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content"></div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-main>
              </el-container>
            </el-container>
          </template>

          <!-- 监控弹出窗口 -->
          <template>
            <el-dialog
              title="提示"
              :visible.sync="monitorDialog"
              width="30%"
              :before-close="handleClose"
            >
              <template>
                <div class="block">
                  <el-slider v-model="ktValue" show-input :min="18" :max="30"></el-slider>
                </div>
              </template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="monitorDialog = false">取 消</el-button>
                <el-button type="primary" @click="monitorDialog = false">确 定</el-button>
              </span>
            </el-dialog>
          </template>

          <!-- 开发end -->
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
      controllerNodeVo: {
        id: "",
        code: "",
        time: "",
        type: "",
        status: "",
        value: "",
        address: "",
        flag: "",
        clientId: ""
      },
      monitorBoard: ["1"],
      monitorDialog: false,
      ktValue: ""
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

.el-collapse-item__header {
  font-size: 18px large !important;
}

.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  font-size: 16px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>