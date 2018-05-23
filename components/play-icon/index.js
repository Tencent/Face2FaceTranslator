/*
Tencent is pleased to support the open source community by making Face-2-Face Translator available.

Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const loadingIcon = '../../image/loading.gif'

Component({

  properties: {
    playType: {
      type: String,
      value: 'wait',
      observer: function(newVal, oldVal){
        if(oldVal == 'loading' && newVal == 'playing') {

          let loadingTransitionTime = 1240;
          let nowTime = + new Date()
          let loadingStartTime = this.data.loadingStartTime
          let loadingTime = nowTime - loadingStartTime
          let loadingCount = parseInt(loadingTime / loadingTransitionTime); // 完整播放次数
          let timeLeft = loadingTransitionTime - loadingTime % loadingTransitionTime; // 剩余播放时间

          if(loadingCount > 0 && timeLeft > 1000) {
            this.setData({
              realPlayType: newVal,
              loadingImg: '',
            })
          } else {
            setTimeout( ()=>{
              this.setData({
                realPlayType: newVal,
              })
            }, timeLeft)
          }
        } else if (newVal == 'loading'){
          this.setData({
            loadingStartTime: + new Date(),
            realPlayType: newVal,
          })
        } else {
          this.setData({
            realPlayType: newVal,
          })
        }
      },
    }
  },

  data: {
    realPlayType: 'wait', // 真正wxml中使用的type变量
    loadingStartTime: 0,
  },

  ready: function () {

  },

  // 组件生命周期函数，在组件实例被从页面节点树移除时执行
  detached: function() {

  },

  methods: {



  }
});