//路由数据
const routers = [
    {
        path: '/login',
        name:'Login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/index',
        name:'首页',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/user',
        name:'基本资料',
        meta: {
            title: '基本资料'
        },
        component: (resolve) => require(['./components/user/user.vue'], resolve)
    },
    {
        path: '/role',
        name:'角色管理',
        meta: {
            title: '角色管理'
        },
        component: (resolve) => require(['./components/user/role.vue'], resolve)
    },
    {
        path: '/menu',
        name:'资源管理',
        meta: {
            title: '资源管理'
        },
        component: (resolve) => require(['./components/user/menu.vue'], resolve)
    },
    {
        path: '/sensorlist',
        name:'传感器列表',
        meta: {
            title: '传感器列表'
        },
        component: (resolve) => require(['./components/device/sensor.vue'], resolve)
    },
    {
        path: '/controllerlist',
        name:'控制器列表',
        meta: {
            title: '控制器列表'
        },
        component: (resolve) => require     (['./components/device/controller.vue'], resolve)
    },
    {
        path: '/device',
        name:'设备监控',
        meta: {
            title: '设备监控'
        },
        component: (resolve) => require        (['./components/device/monitorDevice.vue'], resolve)
    },
    {
        path: '/attendance',
        name:'课程考勤记录',
        meta: {
            title: '课程考勤记录'
        },
        component: (resolve) => require(['./components/attendance/attendance.vue'], resolve)
    },
    {
        path: '/course',
        name:'课程管理',
        meta: {
            title: '课程管理'
        },
        component: (resolve) => require(['./components/teaching/course.vue'], resolve)
    },
       {
        path: '/clazz',
        name:'班级管理',
        meta: {
            title: '班级管理'
        },
        component: (resolve) => require(['./components/teaching/clazz.vue'], resolve)
    },
    {
        path: '/video',
        name:'直播管理',
        meta: {
            title: '直播管理'
        },
        component: (resolve) => require(['./views/VideoPlayer.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
];
export default routers;