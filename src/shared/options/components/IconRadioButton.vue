<template>
    <div class="TUICIconRadioButton">
        <input type="radio" :id="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :name="id.replace(/\./g, '-_-')" :value="valueName" :checked="getPref(id) == valueName" @change="changePref(id, valueName)" />
        <div>
            <label class="TUIC_setting_IconRadioButton" :for="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :title="translate(name)">
                <component v-if="props.icon" :is="props.icon" />
                <img v-else-if="props.iconSrc" :src="props.iconSrc" />
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";
import { getPref, setPref, savePref } from "@content/settings";
import { Component } from "vue";
import { cleanModifiedElements } from "@content/applyCSS";

const props = defineProps<{
    id: string;
    valueName: string;
    name: string;
    icon?: Component;
    iconSrc?: string;
}>();

const changePref = (path, valueName) => {
    setPref(path, valueName);
    savePref();
    cleanModifiedElements();
};
</script>
