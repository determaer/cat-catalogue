<template>
  <div class="block-container">
    <some-block v-for="i in 5"/>
  </div>
  
  <feedback-block class="feedback"/>
</template>

<style scoped lang="scss">
  .block-container{
    display: flex;
    flex-direction: column;
    gap: 10px;

    * {
      margin: auto;    
    }
  }

  .feedback{
    position: fixed;
    top: calc(50% - 133px);
    right: 0;
  }
</style>