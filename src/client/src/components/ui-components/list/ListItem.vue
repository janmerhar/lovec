<template>
  <div class="main">
    <div class="start">
      <slot name="title"></slot>
    </div>
    <!--  -->
    <div class="middle">
      <slot name="middle"></slot>
    </div>
    <!--  -->
    <div class="end">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: var(--ion-color-step-150);
  color: var(--ion-text-color);
  align-items: center;
}

.main:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.main:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.start {
  text-align: left;
}

.middle {
  text-align: center;
}

.end {
  text-align: right;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
