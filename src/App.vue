<script setup lang="ts">
import { onMounted } from 'vue';

import { MDCRipple } from '@material/ripple';
import { MDCList } from "@material/list";

onMounted(() => {
    console.log('App mounted')

    const list = MDCList.attachTo(document.querySelector<HTMLElement>('.mdc-deprecated-list'));
    list.wrapFocus = true;
    document.querySelectorAll('.mdc-deprecated-list-item').forEach(element => {
        MDCRipple.attachTo(element);
    });
    document.querySelectorAll('.mdc-icon-button').forEach(element => {
        const iconButtonRipple = new MDCRipple(element);
        iconButtonRipple.unbounded = true;
    });
})
</script>

<template>
    <aside class="mdc-drawer">
        <div class="mdc-drawer__header">
            <h3 class="mdc-drawer__title">Achobeta</h3>
            <h6 class="mdc-drawer__subtitle">招 新 系 统</h6>
        </div>
        <div class="mdc-drawer__content">
            <nav class="mdc-deprecated-list">
                <a class="mdc-deprecated-list-item mdc-deprecated-list-item--activated" href="#/" aria-current="page">
                    <span class="mdc-deprecated-list-item__ripple"></span>
                    <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">group</i>
                    <span class="mdc-deprecated-list-item__text">用户列表</span>
                </a>
                <a class="mdc-deprecated-list-item" href="#/sendmsg">
                    <span class="mdc-deprecated-list-item__ripple"></span>
                    <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">send</i>
                    <span class="mdc-deprecated-list-item__text">消息推送</span>
                </a>
                <a class="mdc-deprecated-list-item" href="#/setimg">
                    <span class="mdc-deprecated-list-item__ripple"></span>
                    <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">image</i>
                    <span class="mdc-deprecated-list-item__text">用户端配置</span>
                </a>
            </nav>
        </div>
    </aside>
    <div id="page-container">
        <header class="mdc-top-app-bar">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <span class="mdc-top-app-bar__title">Achobeta招新系统</span>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <span>Admin</span>
                    <button class="mdc-icon-button">
                        <div class="mdc-icon-button__ripple"></div>
                        <span class="mdc-icon-button__focus-ring"></span>
                        <i class="material-icons">logout</i>
                    </button>
                </section>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<style lang="scss">
@use "@material/drawer";
@use "@material/list";
@use "@material/ripple";
//@use "@material/icon-button";
@use "@material/icon-button/styles";
@use "@material/top-app-bar/mdc-top-app-bar";

@include drawer.core-styles;
@include drawer.dismissible-core-styles;
@include drawer.modal-core-styles;
@include list.deprecated-core-styles;
//@include icon-button.core-styles;

.mdc-drawer__header {
    text-align: center;
}

#page-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.mdc-drawer {
    box-shadow: -4px 0 10px 0px rgba(0, 0, 0, 0.5);
}

.mdc-top-app-bar {
    position: relative;
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.5);;
}

main {
    flex-grow: 1;
    position: relative;
    overflow: auto;
}
</style>
