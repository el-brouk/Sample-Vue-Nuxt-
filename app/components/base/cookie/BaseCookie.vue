<template>
  <div class="base-container">
    <div class="cookie" v-if="!hide">
      <div class="cookie__inner">
        <div class="cookie__inner-text">
          Этот сайт использует файлы cookie для хранения данных.<br>
          Продолжая использовать сайт, вы&nbsp;даете согласие на&nbsp;работу с&nbsp;этими файлами
        </div>
        <base-button :green="true" @click="accept">Принять и&nbsp;закрыть</base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "~/components/base/button/BaseButton.vue";

let runtimeConfig = useRuntimeConfig()
let hide = ref<boolean>(false)

function accept() {
  let date = new Date();
  date.setFullYear((new Date()).getFullYear() + 5);
  let cookie = useCookie<string>('cookies', {expires: date, domain: runtimeConfig.public.domainName})
  cookie.value = "1"
  hide.value = true
}

let cookie = useCookie<string>('cookies')
if (cookie.value) {
  hide.value = true
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/helpers/_variables" as *;
@use "@/assets/scss/helpers/_mixins" as *;

.cookie {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  padding: 20px;
  background: rgba(205, 200, 189, 0.8);

  @include phone {
    border-radius: 20px 20px 0 0;
  }
}

.cookie__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cookie__inner-text {
  margin-bottom: 20px;
  font-family: $main-font-family;
  font-size: 20px;
  font-weight: 350;
  line-height: 29.2px;
  text-align: center;

  @include phone {
    font-size: 16px;
    line-height: 23.36px;
  }
}
</style>
