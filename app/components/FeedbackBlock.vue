<script setup lang="ts">
import ArrowBackIcon from './ArrowBackIcon.vue'

const img = useState<string[]>('img', () => [])
const showExpandPanel = useState<boolean>('showExpand',() => false) 

onMounted(async () => {
  const urlCreator = window.URL || window.webkitURL
  for (let i = 0; i < 3; i++){
    const data = await $fetch('https://cataas.com/cat', {
      method: 'GET'
    })
    if (data instanceof Blob){
      const imageUrl = urlCreator.createObjectURL(data)
      img.value.push(imageUrl)
    }
  }
})

onUnmounted(() => {
  if (img.value.length > 0){
    for (let i = 0; i < img.value.length; i++)
      if (typeof(img.value[i]) == 'string')
        URL.revokeObjectURL(img.value[i]!)
  }
})

const handleSetShowExpand = () => {
    showExpandPanel.value = !showExpandPanel.value
}

</script>

<template>
  <Transition name="slide-fade">
    <div 
      v-if="img.length == 3"
      class="feedback" 
      @mouseenter="handleSetShowExpand"
      @mouseleave="handleSetShowExpand"
    >
      <Transition>
        <div 
          v-if="!showExpandPanel"
          class="feedback__short"
        >
          <img 
            v-for="(image, index) in img" 
            class="feedback__img"
            :style="{'top' : (-20 * index) + 'px'}"
            :src="image"
          />
          <ArrowBackIcon class="feedback__expand-icon"/>
        </div>
        <div 
          v-else-if="showExpandPanel"
          class="feedback__expand"
        >
          <p>Консультация эксперта</p>
          <div class="feedback__img-container">
            <img 
              v-for="(image, index) in img" 
              class="feedback__img"
              :style="{'left' : (-15 * index) + 'px'}"
              :src="image"
            />
          </div>
          <button>
            Получить консультацию
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
  .feedback{
    max-width: 280px;
    max-height: 266px;
    display: grid;
    justify-items: end;

    &__short{
      position: absolute;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      width: 68px;
      padding: 24px 2px 16px 2px;
      background-color: #F4F6F9;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &__img{
      width: 64px;
      height: 64px;
      border-radius: 16px;
      border: 3px solid #F4F6F9;
      position: relative;
      object-fit: cover;
    }

    &__expand-icon{
      fill: #A6A8A9;
      margin: auto;
    }

    &__expand{
      position: absolute;
      background-color: #F4F6F9;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
      
      *{
        margin: auto;
        text-align: center;
      }

      p{
        font-size: 23px;
        font-weight: 600;
        line-height: 100%;
        word-break: break-word;
        color: #333333;
      }

      button{
        padding: 15px 27px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 20px 0px rgba(115, 115, 115, 0.1);
        border: 0;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
      }
    }

    &__img-container{
      position: relative;
      left: 20px;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  } 

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>