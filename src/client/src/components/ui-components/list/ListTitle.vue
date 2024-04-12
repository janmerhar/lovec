<template>
  <div class="main">
    <div class="start">
      <slot></slot>
    </div>

    <div class="end">
      <slot name="end"></slot>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  color: var(--ion-text-color);
}

.start {
  text-align: left;
}

.middle {
  text-align: center;
}

.end {
  text-align: right;
}
</style>
