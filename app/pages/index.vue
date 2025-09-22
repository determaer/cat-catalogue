<template>
  <div class="home">
    <h1 class="home__header">Домашняя страница</h1>
    <NuxtLink class="home__link" to="/cat">
      Ссылка на вторую страницу
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #F4F6F9;
    border-radius: 15px;
    height: 100vh;

    &__header{
      color:#464242;
    }

    &__link{
      color:#464242;
      font-size: 20px;
    }
  }
</style>