<template>
  <c-header-bar>
    <template v-slot:content-left>
      <c-logo style="margin: 0 10px 0 0" />
      <c-typography component="h1" style="margin: 0" variant="h5">
        Stacks
      </c-typography>
    </template>
    <template v-slot:content-right>
      <c-link
        component="router-link"
        :is-inverted="true"
        style="margin: 0 10px 0 0"
        to="/"
      >
        Books
      </c-link>
      <c-link
        component="router-link"
        :is-inverted="true"
        style="margin: 0 10px 0 0"
        to="/"
      >
        Authors
      </c-link>
      <c-link
        component="router-link"
        :is-inverted="true"
        style="margin: 0 10px 0 0"
        to="/"
      >
        Series
      </c-link>
    </template>
  </c-header-bar>
  <router-view />
</template>

<script>
  import CHeaderBar from './components/CHeaderBar.vue';
  import CLink from './components/CLink.vue';
  import CLogo from './components/CLogo.vue';
  import CTypography from './components/CTypography.vue';

  export default {
    components: { CHeaderBar, CLogo, CTypography, CLink },
  };
</script>

<style lang="scss">
  :root {
    --base_font_size: 10px;
    --primary: #1e70ce;
    --secondary: #e98400;

    --font-family-primary: 'Roboto Condensed', Helvetica, Arial, sans-serif;
    --font-color-primary: rgba(0, 0, 0, 0.8);
    --font-color-secondary: rgba(0, 0, 0, 0.5);

    --logo-fill: #ffffff;

    --button-bg-color: #ffffff;
    --button-bg-color__HOVER: var(--button-bg-color);
    --button-border-color: #eeeeee;
    --button-border-color__HOVER: var(--button-border-color);
    --button-primary-bg-color: var(--primary);
    --button-primary-border-color: var(--primary);
    --button-primary-bg-color__HOVER: var(--primary);
    --button-primary-border-color__HOVER: var(--primary);
    --loading-icon-color: var(--primary);
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    font-size: var(--base_font_size);
    font-family: 'Roboto Condensed', sans-serif;
  }

  body {
    margin: 0;
  }
</style>
