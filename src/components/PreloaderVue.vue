<template>
  <div class="preloader">
    <img src="../assets/img/logo.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'PreloaderVue'
}
</script>

<style scoped>
  .preloader {
    min-width: 100vw;
    min-height: 100vh;
    background: rgb(224,234,243);
    background: -moz-radial-gradient(circle, rgba(224,234,243,1) 0%, rgba(191,214,222,1) 50%, rgba(150,178,190,1) 100%);
    background: -webkit-radial-gradient(circle, rgba(224,234,243,1) 0%, rgba(191,214,222,1) 50%, rgba(150,178,190,1) 100%);
    background: radial-gradient(circle, rgba(224,234,243,1) 0%, rgba(191,214,222,1) 50%, rgba(150,178,190,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e0eaf3",endColorstr="#96b2be",GradientType=1);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .preloader img {
    max-width: 100%;
    width: 50%;
  }
</style>
