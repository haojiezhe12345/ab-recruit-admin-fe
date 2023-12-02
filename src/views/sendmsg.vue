<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';

import { MDCRipple } from '@material/ripple';
import { MDCSelect } from '@material/select';
import { MDCTextField } from '@material/textfield';
import { MDCRadio } from '@material/radio';

import axios from 'axios';

var stuListObj = []
const stuListLoaded = ref(false)

var stuSelectEl
var msgTitleEl
var msgBodyEl
var msgLinkEl

axios.get('http://haojiezhe12345.top:8090/api/admin/student')
    .then((response) => {
        stuListObj = response.data.data
        console.log(stuListObj)
        stuListLoaded.value = true
        nextTick(() => {
            stuSelectEl = new MDCSelect(document.querySelector('.mdc-select'));
            document.querySelectorAll('.mdc-deprecated-list-item').forEach(element => {
                MDCRipple.attachTo(element);
            });
        })
    })

onMounted(() => {
    console.log(`sendmsg mounted`)

    msgTitleEl = new MDCTextField(document.querySelector('#msgTitle'));
    msgBodyEl = new MDCTextField(document.querySelector('#msgBody'));
    msgLinkEl = new MDCTextField(document.querySelector('#msgLink'));
    document.querySelectorAll('.mdc-text-field--filled').forEach(element => {
        MDCRipple.attachTo(element);
    });
    document.querySelectorAll('.mdc-radio').forEach(element => {
        MDCRadio.attachTo(element);
    });
    document.querySelectorAll('.mdc-button').forEach(element => {
        MDCRipple.attachTo(element);
    });
})

function sendMsg() {
    var obj = {
        userName: stuSelectEl.value,
        historyTitle: msgTitleEl.value,
        historyContext: msgBodyEl.value,
        url: msgLinkEl.value,
    }
    console.log(obj)
    axios.post('http://haojiezhe12345.top:8090/api/sendInfo', obj)
        .then(function (response) {
            console.log(response);
        })
}
</script>

<template>
    <div id="sendmsgContainer">
        <h3>目标用户</h3>
        <div class="mdc-select mdc-select--filled demo-width-class">
            <div class="mdc-select__anchor" role="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="demo-label demo-selected-text">
                <span class="mdc-select__ripple"></span>
                <span id="demo-label" class="mdc-floating-label">选择学生</span>
                <span class="mdc-select__selected-text-container">
                    <span id="demo-selected-text" class="mdc-select__selected-text"></span>
                </span>
                <span class="mdc-select__dropdown-icon">
                    <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
                        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10">
                        </polygon>
                        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15">
                        </polygon>
                    </svg>
                </span>
                <span class="mdc-line-ripple"></span>
            </div>

            <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
                <ul class="mdc-deprecated-list" role="listbox" aria-label="stuSelect">
                    <template v-if="stuListLoaded">
                        <li class="mdc-deprecated-list-item" aria-selected="false" :data-value="user.name" role="option" v-for="user in stuListObj">
                            <span class="mdc-deprecated-list-item__ripple"></span>
                            <span class="mdc-deprecated-list-item__text">{{ user.name }}</span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>

        <h3>标题</h3>
        <label id="msgTitle" class="mdc-text-field mdc-text-field--filled mdc-text-field--no-label">
            <span class="mdc-text-field__ripple"></span>
            <input class="mdc-text-field__input" type="text" aria-label="Label">
            <span class="mdc-line-ripple"></span>
        </label>

        <h3>内容</h3>
        <label id="msgBody" class="mdc-text-field mdc-text-field--filled mdc-text-field--textarea mdc-text-field--no-label">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-text-field__resizer">
                <textarea class="mdc-text-field__input" rows="8" aria-label="Label"></textarea>
            </span>
            <span class="mdc-line-ripple"></span>
        </label>

        <h3>显示选项</h3>
        <div class="mdc-form-field">
            <div class="mdc-radio">
                <input class="mdc-radio__native-control" type="radio" id="radio-1" name="radios" @input="
                    msgLinkEl.value = 'http://haojiezhe12345.top:8090/feedback.html';
                    msgLinkEl.disabled = true
                    ">
                <div class="mdc-radio__background">
                    <div class="mdc-radio__outer-circle"></div>
                    <div class="mdc-radio__inner-circle"></div>
                </div>
                <div class="mdc-radio__ripple"></div>
                <div class="mdc-radio__focus-ring"></div>
            </div>
            <label for="radio-1">接受/拒绝/异常反馈</label>

            <div class="mdc-radio">
                <input class="mdc-radio__native-control" type="radio" id="radio-2" name="radios" @input="
                    msgLinkEl.disabled = false
                    ">
                <div class="mdc-radio__background">
                    <div class="mdc-radio__outer-circle"></div>
                    <div class="mdc-radio__inner-circle"></div>
                </div>
                <div class="mdc-radio__ripple"></div>
                <div class="mdc-radio__focus-ring"></div>
            </div>
            <label for="radio-2">
                跳转链接
            </label>
        </div>
        <br>
        <label id="msgLink" class="mdc-text-field mdc-text-field--filled mdc-text-field--no-label">
            <span class="mdc-text-field__ripple"></span>
            <input class="mdc-text-field__input" type="text" aria-label="Label" value="http://haojiezhe12345.top:8090/feedback.html">
            <span class="mdc-line-ripple"></span>
        </label>
        <br>

        <button class="mdc-button mdc-button--raised" @click="sendMsg()">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">发送</span>
        </button>
    </div>
</template>

<style scoped lang="scss">
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu/mdc-menu";
@use "@material/select/styles" as select-styles;
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";
@use "@material/radio/styles" as radio-styles;
@use "@material/form-field";
@use "@material/button/styles" as button-styles;

@include textfield.core-styles;
@include form-field.core-styles;

#sendmsgContainer {
    padding: 16px;
}

.mdc-text-field {
    display: block;
}
</style>
