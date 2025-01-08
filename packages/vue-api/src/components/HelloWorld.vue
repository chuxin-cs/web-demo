<template>
  <div v-draggable="{ isVertical: true, firstMinValue: 100, secondMinValue: 100 }" class="resize-line-pane">
    <div class="pane pane-1st">
      <slot name="first"></slot>
    </div>
    <div class="resize-line">
      <!-- 分割线内容 -->
    </div>
    <div class="pane pane-2nd">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script>
import draggable from "../directives/splitPanel"

export default {
  directive:{
    draggable
  },
}
</script>