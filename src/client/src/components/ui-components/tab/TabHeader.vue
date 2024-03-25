<template>
  <h3 class="ion-text-center">
    <slot></slot>
  </h3>
</template>

<style scoped>
h3 {
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
  margin: 0;
  padding: 5px;
  background-color: var(--ion-color-primary);
  color: var(--ion-color-light);
}
</style>
