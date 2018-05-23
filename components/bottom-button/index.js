/*
Tencent is pleased to support the open source community by making Face-2-Face Translator available.

Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { language } from '../../utils/conf.js'

let buttons = []

// 按钮配置
language.forEach(item=>{
  buttons.push({
    buttonText: item.lang_name,
    lang: item.lang_content,
    lto: item.lang_to[0],
    msg: item.hold_talk,
    buttonType: 'normal',
  })
})

// 按钮对应图片
let buttonBackground = {
  zh_CN: {
    normal: '../../image/button_zh.png',
    press: '../../image/button_zh_press.png',
    disabled: '../../image/button_zh_disabled.png',
  },
  en_US: {
    normal: '../../image/button_en.png',
    press: '../../image/button_en_press.png',
    disabled: '../../image/button_en_disabled.png',
  }
}

Component({
  properties: {
    buttonDisabled: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal){
        let buttonType = newVal ? 'disabled' : 'normal'
        this.changeButtonType(buttonType)

      }
    },
  },

  data: {
    buttons: buttons,
    buttonBackground: buttonBackground,
    currentButtonType: 'normal',

  },

  ready: function () {
    // console.log(this.data.buttonEvent,)
  },

  methods: {

    /**
     * 按下按钮开始录音
     */
    streamRecord(e) {
      if(this.data.buttonDisabled) {
        return
      }
      // 先清空背景音
      wx.stopBackgroundAudio()

      let currentButtonConf = e.currentTarget.dataset.conf

      this.changeButtonType('press', currentButtonConf.lang)

      this.triggerEvent('recordstart', {
        buttonItem: currentButtonConf
      })

    },

    /**
     * 松开按钮结束录音
     */
    endStreamRecord(e) {
      let currentButtonConf = e.currentTarget.dataset.conf
      console.log("currentButtonConf", currentButtonConf)

      this.triggerEvent('recordend', {
        buttonItem: currentButtonConf
      })
    },

    /**
     * 修改按钮样式
     */
    changeButtonType(buttonType, buttonLang) {

      let tmpButtons = this.data.buttons.slice(0)

      tmpButtons.forEach(button => {
        if(!buttonLang || buttonLang == button.lang) {
          button.buttonType = buttonType
        }
      })

      this.setData({
        buttons: tmpButtons
      })
    },
  }
});