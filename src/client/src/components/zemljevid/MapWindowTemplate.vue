<template>
  <div style="position: relative">
    <slot></slot>
    <div
      style="
        top: 50%;
        left: 50%;
        border-radius: 100000000000rem;
        position: absolute;
        z-index: 69;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
      "
    >
      <font-awesome-icon
        style="color: var(--ion-color-tertiary)"
        :icon="['fas', 'plus']"
      />
    </div>
  </div>
</template>
