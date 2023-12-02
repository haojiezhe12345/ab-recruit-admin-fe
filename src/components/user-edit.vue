<script setup lang="ts">
var props = defineProps(['id'])
defineEmits(['close'])

import { onMounted, ref, nextTick } from 'vue';

import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

import axios from 'axios';

var userInfoText = {
    "name": "姓名",
    "gender": '性别',
    "studentId": "学号",
    "grade": "年级",
    "major": "专业",
    "classNumber": '班级',
    "phoneNumber": "手机号",
    "wxNumber": "微信号",
    "firstIntro": "介绍1",
    "secondIntro": "介绍2",
    "thirdIntro": "介绍3",
    "awards": "获奖情况",
    "remark": "备注",
    /*
    "image": "",
    "attachments": [
            {
                "attachment": "",
                "fileName": "",
                "id": 0,
                "stuId": 0
            }
        ],
    "status": 0,
    */
}
var userInfoEls = {}
var userInfoObj = { data: [] }
const userInfoLoaded = ref(false)

axios.get('http://haojiezhe12345.top:8090/api/admin/student/list', {
    params: {
        id: props.id
    }
}).then((response) => {
    userInfoObj = response.data
    console.log(userInfoObj);
    userInfoLoaded.value = true
    nextTick(() => {
        for (let key in userInfoText) {
            userInfoEls[key] = new MDCTextField(document.querySelector('#userEdit-' + key));
        }
        document.querySelectorAll('.mdc-text-field--filled').forEach(element => {
            MDCRipple.attachTo(element);
        });

        console.log(`user-edit with id ${props.id} fully loaded`)
    })
})

onMounted(() => {
    console.log(`user-edit mounted with id ${props.id}`)

    document.querySelectorAll('.mdc-button').forEach(element => {
        MDCRipple.attachTo(element);
    });
})
</script>

<template>
    <div id="userEditContainer">
        <template v-if="userInfoLoaded">
            <template v-for="(value, key) in userInfoText">
                <label class="mdc-text-field mdc-text-field--filled" :id="'userEdit-' + key">
                    <span class="mdc-text-field__ripple"></span>
                    <span class="mdc-floating-label" id="my-label-id">{{ value }}</span>
                    <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" :value="'userInfoObj.data[key]'">
                    <span class="mdc-line-ripple"></span>
                </label>
            </template>
        </template>
    </div>

    <div id="bottomBtnContainer">
        <button class="mdc-button mdc-button--outlined" @click="$emit('close')">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">取消</span>
        </button>
        <button class="mdc-button mdc-button--raised">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">保存</span>
        </button>
    </div>
</template>

<style scoped lang="scss">
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";
@use "@material/button/styles";

@include textfield.core-styles;

.mdc-text-field {
    display: block;
    margin-bottom: 8px;
}

#userEditContainer {
    flex-grow: 1;
    overflow: auto;
    padding: 16px;
}

#bottomBtnContainer {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 16px;
}
</style>
