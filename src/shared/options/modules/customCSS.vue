<template>
    <form>
        <textarea id="css_textarea" class="TUIC_setting_customcss_input" v-model="customCSS" ref="CustomCSSBox"></textarea>
    </form>
    <button id="save" class="TUIC_setting_customcss_button TUIC_setting_text TUIC_setting_button TUIC_setting_button_width" @click="changeCustomCSS()">
        {{ translate("customCSS-save") }}
    </button>
</template>

<script setup lang="ts">
import { applyCustomCss } from "@content/applyCSS";
import { translate } from "@content/i18n";

const CustomCSSBox = defineModel<HTMLTextAreaElement>();

function changeCustomCSS() {
    localStorage.setItem("TUIC_CSS", CustomCSSBox.value.value);
    applyCustomCss();
}

const customCSS = localStorage.getItem("TUIC_CSS");
</script>

<style scoped>
textarea#css_textarea {
    width: calc(100% - 10px);
    height: 300px;
    margin-bottom: 20px;
    resize: vertical;
    border-radius: 6px;
}
</style>
