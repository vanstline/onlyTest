<template>
  <div class="login">
      <router-link class="back" :to="{ path: '/'}" tag="button">返回</router-link>
  </div>
</template>

<script>
  // import
  export default {
  }
</script>

<style lang="less">
  .login {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    background: rgb(77, 100, 255);
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 1.6rem;
      height: .8rem;
      background: red;
      line-height: .8rem;
      font-size: 18px;
      text-indent: .4rem;
    }
  }
</style>
