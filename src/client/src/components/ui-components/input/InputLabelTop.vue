<template>
  <div style="margin-top: 1rem; margin-bottom: 1rem">
    <div id="ilt-label" class="all">
      <p class="label">
        <slot name="label"></slot>
      </p>
    </div>

    <div id="ilt-input" class="all">
      <slot name="input"></slot>
    </div>

    <div id="ilt-error" class="all">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style scoped>
.all {
  width: 100%;
}

#ilt-label > .label {
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ion-text-color);
}
</style>

<style>
#ilt-input > input,
#ilt-input > textarea,
#ilt-input > select {
  width: 100%;
  color: var(--ion-text-color);
  background-color: var(--ion-background-color-step-150);
  border: 1px solid var(--ion-background-color-step-250);
  border-radius: 10px;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

#ilt-input > textarea {
  height: auto;
  padding: 0.5rem;
}

#ilt-error > span[role="alert"] {
  color: red;
  text-transform: uppercase;
  font-size: 0.75rem;
}
</style>
