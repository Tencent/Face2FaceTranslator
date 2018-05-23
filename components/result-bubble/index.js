/*
Tencent is pleased to support the open source community by making Face-2-Face Translator available.

Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { language } from '../../utils/conf.js'


Component({

  properties: {
    /*
    item 格式
    {
      create: '04/27 15:37',
      text: '一二三四五',
      translateText: '12345',
      voicePath: '',
      translateVoicePath: '',
      id: 0,
    },*/
    item: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal){

        // 翻译完成后，文字有改变触发重新翻译
        if(this.data.recordStatus == 2 && oldVal.text && oldVal.text != '' && newVal.text != oldVal.text) {
          this.triggerEvent('translate', {
            item: this.data.item,
            index: this.data.index,
          })
        }

        // 翻译内容改变触发播放
        if(newVal.autoPlay && newVal.translateVoicePath != oldVal.translateVoicePath){
          this.autoPlayTranslateVoice()
        } else if(newVal.translateVoicePath == "") {
          this.playAnimationEnd()
        }

      }
    },
    editShow: {
      type: Boolean,
      value: false,
    },
    index: {
      type: Number,
    },

    currentTranslateVoice: {
      type: String,
      observer: function(newVal, oldVal){
        if(newVal != '' && newVal != this.data.item.translateVoicePath) {
          this.playAnimationEnd()
        }
      },
    },

    recordStatus: {
      type: Number,
      value: 2, // 0：正在识别，1：正在翻译，2：翻译完成
    },
  },

  data: {

    tips_language: language[0], // 目前只有中文

    modalShow: false, // 展示悬浮框

    playType: 'wait', // 语音播放状态


    waiting_animation: {},
    waiting_animation_1: {},

    edit_icon_path: '../../image/edit.png'


  },

  ready: function () {
    if(this.data.item.autoPlay) {
      this.autoPlayTranslateVoice()
    }

  },

  // 组件生命周期函数，在组件实例被从页面节点树移除时执行
  detached: function() {
    // console.log("detach")

  },

  methods: {

    /**
     * 显示悬浮框
     */
    showModal: function() {
      this.setData({modalShow: true})
    },

    /**
     * 离开悬浮框
     */
    modalLeave: function() {
      this.setData({modalShow: false})
    },


    /**
     * 点击播放图标
     */
    playTranslateVoice: function() {

      let nowTime = parseInt(+ new Date() / 1000)
      let voiceExpiredTime = this.data.item.translateVoiceExpiredTime || 0

      if(this.data.playType == 'playing') {
        wx.stopBackgroundAudio()
        this.playAnimationEnd()
      } else if(nowTime < voiceExpiredTime) {
        this.autoPlayTranslateVoice()
      } else {
        this.setData({
          playType: 'loading',
        })
        this.triggerEvent('expired', {
          item: this.data.item,
          index: this.data.index,
        })
      }


    },

    /**
     * 播放背景音乐
     */
    autoPlayTranslateVoice: function (path,index) {
      let play_path = this.data.item.translateVoicePath

      if(!play_path) {
        console.warn("no translate voice path")
        return
      }


      wx.onBackgroundAudioStop(res => {
        console.log("play voice end",res)
        this.playAnimationEnd()
      })

      this.playAnimationStart()

      wx.playBackgroundAudio({
        dataUrl: play_path,
        title: '',
        success: (res) => {
          this.playAnimationStart()
        },
        fail: (res) => {
            // fail
            console.log("failed played", play_path);
            this.playAnimationEnd()
        },
        complete: function (res) {
            console.log("complete played");
        }
      })
    },

    /**
     * 开始播放
     */
    playAnimationStart: function() {
      this.setData({
        playType: 'playing',
      })

    },

    /**
     * 结束播放
     */
    playAnimationEnd: function() {
        this.setData({
          playType: 'wait',
        })
    },

  }
});