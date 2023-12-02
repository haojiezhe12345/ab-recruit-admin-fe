<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';

import { MDCRipple } from '@material/ripple';
import { MDCDataTable } from '@material/data-table';
import { MDCSelect } from '@material/select';

import axios from 'axios';

import userEdit from '../components/user-edit.vue'

document.querySelector('.mdc-top-app-bar__title').innerHTML = '用户列表'

var tableCols = {
    name: '姓名',
    grade: '年级',
    major: '专业',
    gender: '性别',
    phone: '手机号码',
    status: '当前状态',
}
const userListLoaded = ref(false)
var userListObj = { data: [] }

const showUserEditor = ref(false)
var userEditId = 0

axios.get('http://haojiezhe12345.top:8090/api/admin/student')
    .then((response) => {
        userListObj = response.data
        console.log(userListObj);
        userListLoaded.value = true
        nextTick(() => {
            document.querySelector('.mdc-data-table__content').querySelectorAll('.mdc-icon-button').forEach(element => {
                const iconButtonRipple = new MDCRipple(element);
                iconButtonRipple.unbounded = true;
            });
        })
    })

onMounted(() => {
    console.log('users mounted')

    const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('MDCSelect:change', () => {
        console.log(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    });
    document.querySelectorAll('.mdc-select__option').forEach(element => {
        MDCRipple.attachTo(element);
    });
    document.querySelectorAll('.mdc-icon-button').forEach(element => {
        const iconButtonRipple = new MDCRipple(element);
        iconButtonRipple.unbounded = true;
    });
})

function editUser(id) {
    showUserEditor.value = true
    userEditId = id
}
</script>

<template>
    <div id="tableContainer">
        <div class="mdc-data-table">
            <div class="mdc-data-table__table-container">
                <table class="mdc-data-table__table">
                    <thead>
                        <tr class="mdc-data-table__header-row">
                            <th class="mdc-data-table__header-cell" role="columnheader" v-for="(value, key) in tableCols">{{ value }}</th>
                            <th class="mdc-data-table__header-cell" role="columnheader">操作</th>
                        </tr>
                    </thead>
                    <tbody class="mdc-data-table__content">
                        <template v-if="userListLoaded" v-for="user in userListObj.data">
                            <tr class="mdc-data-table__row">
                                <td class="mdc-data-table__cell" v-for="(value, key) in tableCols">{{ user[key] }}</td>
                                <td class="mdc-data-table__cell">
                                    <button class="mdc-icon-button" @click="editUser(user.id)">
                                        <div class="mdc-icon-button__ripple"></div>
                                        <span class="mdc-icon-button__focus-ring"></span>
                                        <i class="material-icons">edit</i>
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div class="mdc-data-table__pagination">
                <div class="mdc-data-table__pagination-trailing">
                    <div class="mdc-data-table__pagination-rows-per-page">
                        <div class="mdc-data-table__pagination-rows-per-page-label">
                            Rows per page
                        </div>

                        <div class="mdc-select mdc-select--outlined mdc-select--no-label mdc-data-table__pagination-rows-per-page-select mdc-data-table__pagination-rows-per-page-select--outlined">
                            <div class="mdc-select__anchor" role="button" aria-haspopup="listbox" aria-labelledby="demo-pagination-select" tabindex="0">
                                <span class="mdc-select__selected-text-container">
                                    <span id="demo-pagination-select" class="mdc-select__selected-text">10</span>
                                </span>
                                <span class="mdc-select__dropdown-icon">
                                    <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
                                        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10">
                                        </polygon>
                                        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15">
                                        </polygon>
                                    </svg>
                                </span>
                                <span class="mdc-notched-outline mdc-notched-outline--notched">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                            </div>

                            <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" role="listbox">
                                <ul class="mdc-list">
                                    <li class="mdc-select__option mdc-select__one-line-option mdc-list-item mdc-list-item--selected mdc-list-item--with-one-line" aria-selected="true" role="option" data-value="10">
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__content">
                                            <span class="mdc-list-item__primary-text">10</span>
                                        </span>
                                    </li>
                                    <li class="mdc-select__option mdc-select__one-line-option mdc-list-item mdc-list-item--with-one-line" role="option" data-value="25">
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__content">
                                            <span class="mdc-list-item__primary-text">25</span>
                                        </span>
                                    </li>
                                    <li class="mdc-select__option mdc-select__one-line-option mdc-list-item mdc-list-item--with-one-line" role="option" data-value="100">
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__content">
                                            <span class="mdc-list-item__primary-text">100</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="mdc-data-table__pagination-navigation">
                        <div class="mdc-data-table__pagination-total">
                            1‑10 of 100
                        </div>
                        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-first-page="true" disabled>
                            <div class="mdc-icon-button__ripple"></div>
                            <div class="mdc-button__icon">first_page</div>
                        </button>
                        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-prev-page="true" disabled>
                            <div class="mdc-icon-button__ripple"></div>
                            <div class="mdc-button__icon">chevron_left</div>
                        </button>
                        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-next-page="true">
                            <div class="mdc-icon-button__ripple"></div>
                            <div class="mdc-button__icon">chevron_right</div>
                        </button>
                        <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-last-page="true">
                            <div class="mdc-icon-button__ripple"></div>
                            <div class="mdc-button__icon">last_page</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Transition name="rightDrawer" :duration="200">
        <div id="userEditorContainer" v-if="showUserEditor">
            <div @click="showUserEditor = false"></div>
            <div>
                <userEdit :id="userEditId" @close="showUserEditor = false"></userEdit>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
//@use "@material/checkbox"; // Required only for data table with row selection.
@use "@material/icon-button"; // Required only for data table with column sorting.
@use "@material/data-table/data-table";
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu/mdc-menu";
@use "@material/select/styles";

//@include checkbox.core-styles;
//@include icon-button.core-styles;
@include data-table.core-styles;
@include data-table.theme-baseline;


#tableContainer {
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    overflow: auto;
}

.mdc-data-table {
    width: 100%;
}

#userEditorContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    overflow: hidden;
}

#userEditorContainer>div:first-child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 5;
}

.rightDrawer-enter-active>div:first-child {
    animation: darken20 0.2s forwards;
}

.rightDrawer-leave-active>div:first-child {
    animation: darken20 0.2s forwards reverse;
}

#userEditorContainer>div:last-child {
    position: relative;
    display: flex;
    flex-direction: column;
    //max-width: 40%;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
    overflow: auto;
    z-index: 10;
}

.rightDrawer-enter-active>div:last-child {
    animation: slideFromRight 0.2s forwards;
}

.rightDrawer-leave-active>div:last-child {
    animation: slideFromRight 0.2s forwards reverse;
}

@keyframes darken20 {
    from {
        background-color: rgba(0, 0, 0, 0);
    }

    to {
        background-color: rgba(0, 0, 0, 0.2);
    }
}

@keyframes slideFromRight {
    from {
        transform: translateX(100%);
        box-shadow: none;
    }

    to {
        transform: translateX(0%);
    }
}
</style>
