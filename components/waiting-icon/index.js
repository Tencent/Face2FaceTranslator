/*
Tencent is pleased to support the open source community by making Face-2-Face Translator available.

Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

Component({

  properties: {

  },

  data: {
    waiting_animation: {},
    waiting_animation_1: {},
  },

  ready: function () {
    console.log("ready waitting")
      this.waiting_animation = wx.createAnimation({
          duration: 600
      })
      this.waiting_animation_1 = wx.createAnimation({
          duration: 400
      })

      this.setWaitInterval()

  },

  // 组件生命周期函数，在组件实例被从页面节点树移除时执行
  detached: function() {
    this.clearAnimation()
  },

  methods: {

    clearAnimation: function() {
      this.endWaitAnimation()
    },

    /**
     * 清除动画
     */
    endWaitAnimation: function() {
        clearInterval(this.data.waiting_interval)

        this.setData({ waiting_animation : {}})
        this.setData({ waiting_animation_1: {} })
    },
    startWaitAnimation: function () {

      this.waiting_animation.opacity(0).scale(1.2, 1.2).step()
      this.waiting_animation.opacity(1).scale(1, 1).step()
      this.setData({ waiting_animation: this.waiting_animation.export() })

      this.waiting_animation_1.opacity(0).scale(1.2, 1.2).step()
      this.waiting_animation_1.opacity(1).scale(1, 1).step()
      this.setData({ waiting_animation_1: this.waiting_animation_1.export() })

    },

    /**
     * 设置动画
     */
    setWaitInterval: function() {
       this.endWaitAnimation()

       this.data.waiting_interval = setInterval( ()=>{
        this.startWaitAnimation()
       },600 )

    },


  }
});