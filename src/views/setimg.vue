<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MDCRipple } from '@material/ripple';
import axios from 'axios';

const imgname = ref([{ name: '', src: '' }, { name: '', src: '' }])
const imgLoaded = ref(false)

async function loadimg() {
    let [rsp0, rsp1] = await Promise.all([
        axios.get('http://haojiezhe12345.top:8090/api/getPtInfo?diff=0'),
        axios.get('http://haojiezhe12345.top:8090/api/getPtInfo?diff=1')
    ]);
    console.log(rsp0, rsp1)
    imgname.value[0].name = rsp0.data.data.image
    imgname.value[0].src = 'http://haojiezhe12345.top:8090/api/' + rsp0.data.data.image
    imgname.value[1].name = rsp1.data.data.image
    imgname.value[1].src = 'http://haojiezhe12345.top:8090/api/' + rsp1.data.data.image
    imgLoaded.value = true
}

loadimg()

function previewImg(i) {
    var reader = new FileReader()
    reader.onload = (event) => {
        imgname.value[i].name = (<any>document.querySelector(`#imginput${i}`)).files[0].name;
        imgname.value[i].src = event.target.result.toString()
    }
    reader.readAsDataURL((<any>document.querySelector(`#imginput${i}`)).files[0])
}

async function uploadimg() {
    var imgup0, imgup1
    [imgup0, imgup1] = await Promise.all([
        axios.postForm('http://haojiezhe12345.top:8090/api/admin/upload?filecount=1', { files: (<any>document.querySelector('#imginput0')).files[0] }),
        axios.postForm('http://haojiezhe12345.top:8090/api/admin/upload?filecount=1', { files: (<any>document.querySelector('#imginput1')).files[0] }),
    ]);
    console.log(imgup0, imgup1)

    await Promise.all([
        axios.put('http://haojiezhe12345.top:8090/api/setPtInfo', {
            "diff": 0,
            "image": imgup0.data.data[0],
            "height": 1,
            "width": 1
        }),
        axios.put('http://haojiezhe12345.top:8090/api/setPtInfo', {
            "diff": 1,
            "image": imgup1.data.data[0],
            "height": 1,
            "width": 1
        }),
    ]);
    window.alert('修改成功')
}

onMounted(() => {
    document.querySelectorAll('.mdc-button').forEach(element => {
        MDCRipple.attachTo(element);
    });
})
</script>

<template>
    <div id="setimgContainer">
        <h3>首页配图</h3>
        <p>
            <span id="imgname0" v-if="imgLoaded">{{ imgname[0].name }}</span>
            <label>
                <input id="imginput0" type="file" @change="previewImg(0)">
                <a href="javascript:;" onclick="this.parentNode.click()">更换</a>
            </label>
        </p>
        <img id="img0" v-if="imgLoaded" :src="imgname[0].src">
        <br>
        <h3>简历投递页面配图</h3>
        <p>
            <span id="imgname1" v-if="imgLoaded">{{ imgname[1].name }}</span>
            <label>
                <input id="imginput1" type="file" @change="previewImg(1)">
                <a href="javascript:;" onclick="this.parentNode.click()">更换</a>
            </label>
        </p>
        <img id="img1" v-if="imgLoaded" :src="imgname[1].src">

        <div id="btnContainer">
            <button class="mdc-button mdc-button--outlined" @click="">
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">效果预览</span>
            </button>
            <button class="mdc-button mdc-button--raised" @click="uploadimg()">
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">修改</span>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@material/button/styles" as button-styles;

#setimgContainer {
    padding: 16px;
}

img {
    max-width: 60%;
    max-height: 30vh;
}

label {
    margin: 0 8px;
}

input {
    display: none;
}

#btnContainer {
    text-align: center;
    padding: 16px;
}

#btnContainer button {
    margin: 0 4px;
}
</style>