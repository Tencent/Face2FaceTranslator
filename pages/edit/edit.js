/*
Tencent is pleased to support the open source community by making Face-2-Face Translator available.

Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const initBottomHeight = 0

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit_text_max: 200,
    remain_length: 200,
    edit_text: "",
    is_focus: false,
    tips: "",
    index: -1,
    bottomHeight:  initBottomHeight
  },
  /**
   * 获得最大文本长度
   */
  getEditTextMax: function () {
    return this.data.edit_text_max
  },
  /**
   * 更新剩余长度
   */
  updateRemainLength: function (now_content) {
    this.data.remain_length = this.getEditTextMax() - now_content.length
    this.data.tips = "还可以输入" + this.data.remain_length + "字..."
    this.setData({ tips: this.data.tips })
  },
  /**
   * 设置初始内容
   */
  setEditText: function (text) {
    this.data.edit_text = text
    this.setData({ edit_text: this.data.edit_text })
    //更新剩余长度显示
    this.updateRemainLength(text)
    this.setData({ is_focus: true })
  },
  /**
   * bindinput
   */
  editInput: function (event) {
    console.log(event)
    if (event.detail.value.length > this.getEditTextMax()) {

    } else {
      this.data.edit_text = event.detail.value
      this.updateRemainLength(this.data.edit_text)
    }
  },
  /**
   * bindconfirm
   */
  editConfirm: function (event) {
    if (this.data.edit_text.length > 0 && this.data.edit_text != this.data.oldText) {
      // 得到页面栈
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];  //上一个页面
      let dialogList = prevPage.data.dialogList.slice(0)
      let editItem = dialogList[dialogList.length - 1]
      editItem.text = this.data.edit_text

      prevPage.setData({
        dialogList: dialogList,
        recordStatus: 2,
      })
      wx.navigateBack()
    } else {
      //文本输入为空时提示
    }
  },

  /**
   * 点击文本输入框修改底下按钮行高，让提示和按钮始终在键盘上方   *
   */
  editFocus: function(e) {
    let {value, height} = e.detail
    console.log(value, height)

    if(!isNaN(height)) {
      this.setData({
        bottomHeight: height + initBottomHeight
      })
    }
  },

  /**
   * 输入框失焦
   */
  editBlur: function() {
    this.setData({
      bottomHeight: initBottomHeight
    })
  },

  /**
   * 清空内容
   */
  deleteContent: function () {
    this.setEditText("")
    this.setData({
      is_focus: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setEditText(options.content)
    let index = parseInt(options.index)
    this.setData({
        index: index,
        oldText:options.content,
    })
  },

})