<template>
  <div>
    <div v-bind:class="{'spinner-standalone' : true, 'spinner-related' : true}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle fill="none" stroke-opacity="1" stroke="#FF156D" stroke-width=".5" cx="100" cy="100" r="0">
          <animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1"
                   repeatCount="indefinite"></animate>
          <animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1"
                   keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
          <animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1"
                   keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
        </circle>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;

.spinner-standalone {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  pointer-events: none;
  -moz-user-focus: ignore;
  -webkit-touch-callout: none;
  -ms-touch-action: none;
  z-index: 1;
  opacity: 1;
  background: rgba(235, 239, 245, 0.5);

  span {
    position: absolute;
    left: 50%;
    top: 18vw;
    margin: -14px 0 0 -14px;

    display: block;
    width: 28px;
    height: 28px;
    border: 3px solid #0871CC;
    animation: spinner-loader 1.6s infinite ease;
    pointer-events: none; // don't block UI interactions

    &:before {
      content: "";
      vertical-align: top;
      display: inline-block;
      width: 100%;
      background: #0871CC;
      animation: spinner-loader-inner 1.6s infinite ease-in;
    }
  }

  svg {
    display: block;
    position: absolute;
    top: 20%;
    left: 50%;
    width: 80px;
    height: 60px;
    transform: translate(-50%, -50%);
  }

  &.spinner-related {
    top: unset;

    span {
      top: 10px;
    }
  }
}

.svg-first {
  animation: spinner-fade 1.6s infinite ease;
}

.svg-second {
  animation: spinner-fade-out 1.6s infinite ease;
}

@keyframes spinner-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spinner-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

@-webkit-keyframes spinner-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

@keyframes spinner-fade {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes spinner-fade-out {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
