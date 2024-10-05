<template>
  <div style="margin-top: 1rem; margin-bottom: 1rem">
    <!-- INPUT and LEFT and/or RIGHT area -->
    <div id="ilh-row">
      <!-- LEFT side -->
      <div id="ilh-left">
        <slot name="left"></slot>
      </div>
      <div id="ilh-input" class="all">
        <slot name="input"></slot>
      </div>
      <!-- RIGHT side -->
      <div id="ilh-right">
        <slot name="right"></slot>
      </div>
    </div>

    <!-- ERROR at the bottom of input -->
    <div id="ilh-error" class="all">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style>
#ilh-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
  background-color: var(--ion-background-color-step-250);
  /* TODO: razmisli ali dejansko rabim to, saj potem polja postanejo kinda majhna */
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  border-radius: 1000px;
  height: 2.5rem;
}

#ilh-left {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 20%;
  margin-left: 12px;
}

#ilh-input {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60%;
  width: 100%;
  height: 100%;
}

#ilh-input > input,
#ilh-input > textarea,
#ilh-input > select {
  background-color: var(--ion-background-color-step-250);
  width: 100%;
  height: 100%;
  border: 0;
  padding: 4px 4px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 1rem;
}

#ilh-right {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 20%;
  margin-right: 12px;
}

#ilh-error {
  color: red;
  text-transform: uppercase;
  font-size: 0.75rem;
}
</style>
