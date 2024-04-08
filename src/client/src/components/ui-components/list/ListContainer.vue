<template>
  <div class="title">
    <slot name="title"></slot>
  </div>

  <div class="list">
    <slot></slot>
  </div>
</template>

<style scoped>
.list {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title {
  margin: 1rem;
  font-size: 1rem;
  font-weight: bold;
}
</style>
