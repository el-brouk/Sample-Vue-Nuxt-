<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <header class="header">
    <div class="base-container">
      <div class="header__inner">
        {{ t('header.title') }}
        <ul class="base-header__lang">
          <li>
            <SwitchLocalePathLink class="base-header__lang-link" locale="ru"
              >Рус</SwitchLocalePathLink
            >
          </li>
          <li>
            <SwitchLocalePathLink class="base-header__lang-link" locale="en"
              >Eng</SwitchLocalePathLink
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;

.header {
  padding: 16px 0 20px;
  background-color: $dark-blue;
  color: $white;

  @include tablet {
    padding: 16px 0;
  }
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
