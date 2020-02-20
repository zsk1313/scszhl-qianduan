<template>
	<index>
		<template v-slot:maincontent>
		<div>
    	<!-- 使用组件 -->
      <video-player  class="video-player vjs-custom-skin"
           ref="videoPlayer"
           :playsinline="true"
           :options="playerOptions"
      ></video-player>
    </div></template>
	</index>
</template>

<script>
// 导入组件
import {videoPlayer} from 'vue-video-player'
import 'videojs-flash'
import index from '../views/index.vue'

export default {
	name: 'VideoPlayer',
	components: {
		videoPlayer,
		index
	},
	data () {
		return {
			fileAreaHeight: 500,
			fileAreaWidth:100,
			fileType: 'rtmp/flv',//'mp4', // 资源的类型
			fileUrl: 'rtmp://127.0.0.1/live/home'//'../views/orange.mp4'	// 资源的路径地址
		}
	},
	computed: {
	    playerOptions () {		// 使用计算属性
	      const playerOptionsObj = {
	        techOrder: ['flash'],	// 使用flash播放，可以播放flv格式的文件
	        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
	        autoplay: false, // 如果true,浏览器准备好时开始回放。
	        muted: false, // 默认情况下将会消除任何音频。
	        loop: false, // 导致视频一结束就重新开始。
	        // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
	        language: 'zh-CN',
	        // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
	        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
	        sources: [{
	          type: this.fileType,//'video/' + this.fileType,	// 资源格式写法：'video/mp4'，否则控制台会出现notSupportedMessage设置的错误
	          src: this.fileUrl // url地址
	        }],
	        poster: '', // 你的封面地址
	        // width: document.documentElement.clientWidth,
	        height: this.fileAreaHeight,	// 设置高度，fluid需要设置成flase
	        width:this.fileAreaWith,
	        notSupportedMessage: '此视频暂无法播放...', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
	        controlBar: {
	          timeDivider: true,
	          durationDisplay: true,
	          remainingTimeDisplay: false,
	          fullscreenToggle: true  //全屏按钮
	        }
	      }
	      return playerOptionsObj
	    }
	  }
}
</script>
<style scoped>
.video-js .vjs-big-play-button{ /*对播放按钮的样式进行设置*/ }
</style>