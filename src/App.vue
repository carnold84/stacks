<template>
  <c-message-screen
    v-if="isLoading"
    style="height: 100%; position: absolute; width: 100%"
  >
    Loading...
  </c-message-screen>
  <l-app v-else>
    <template v-slot:side-bar>
      <c-side-bar>
        <template v-slot:content-start>
          <div class="app_logo">
            <c-logo style="margin: 0 15px 0 0" />
            <c-typography component="h1" style="margin: 0" variant="h5">
              Stacks
            </c-typography>
          </div>
        </template>
        <template v-slot:content-center>
          <c-list-item to="/">
            <template v-slot:content-start>
              <svg
                class="app_menu_icon"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"
                />
              </svg>
            </template>
            <c-typography>Books</c-typography>
          </c-list-item>
          <c-list-item to="/authors">
            <template v-slot:content-start>
              <svg
                class="app_menu_icon"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"
                />
              </svg>
            </template>
            <c-typography>Authors</c-typography>
          </c-list-item>
          <c-list-item to="/series">
            <template v-slot:content-start>
              <svg
                class="app_menu_icon"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
                />
              </svg>
            </template>
            <c-typography>Series</c-typography>
          </c-list-item>
        </template>
      </c-side-bar>
    </template>
    <router-view />
  </l-app>
  <modal-manager />
  <panel-manager />
</template>

<script>
  import CLogo from '@/components/CLogo.vue';
  import CTypography from '@/components/CTypography.vue';
  import ModalManager from './managers/ModalManager.vue';
  import LApp from './layouts/LApp.vue';
  import CMessageScreen from './components/CMessageScreen.vue';
  import CSideBar from './components/CSideBar.vue';
  import CListItem from './components/CListItem.vue';
  import PanelManager from './managers/PanelManager.vue';

  export default {
    components: {
      CLogo,
      CTypography,
      ModalManager,
      LApp,
      CMessageScreen,
      CSideBar,
      CListItem,
      PanelManager,
    },
    data() {
      return {
        isLoading: false,
      };
    },
    async mounted() {
      this.isLoading = true;

      await this.$store.dispatch('loadData');

      this.isLoading = false;
    },
  };
</script>

<style lang="scss">
  :root {
    --base_font_size: 10px;
    --primary: rgba(30, 112, 206, 1);
    --primary10: rgba(30, 112, 206, 0.1);
    --primary20: rgba(30, 112, 206, 0.2);
    --primary30: rgba(30, 112, 206, 0.3);
    --primary40: rgba(30, 112, 206, 0.4);
    --primary50: rgba(30, 112, 206, 0.5);
    --primary60: rgba(30, 112, 206, 0.6);
    --primary70: rgba(30, 112, 206, 0.7);
    --primary80: rgba(30, 112, 206, 0.8);
    --primary90: rgba(30, 112, 206, 0.9);
    --secondary: #e98400;

    --font-family-primary: 'Roboto Condensed', Helvetica, Arial, sans-serif;
    --font-color-primary: rgba(0, 0, 0, 0.8);
    --font-color-secondary: rgba(0, 0, 0, 0.5);

    --c_textField_icon_fill: var(--font-color-primary);
    --c_textField_label_color: var(--font-color-primary);
    --c_textField_field_bgColor: #ffffff;
    --c_textField_field_borderColor: #eeeeee;
    --c_textField_field_borderColor__focus: var(--primary);
    --c_textField_field_color: var(--font-color-secondary);
    --c_textField_error_color: #a70008;

    --logo-fill: var(--primary);

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
    font-family: var(--font-family-primary);
  }

  body {
    margin: 0;
  }

  .app_logo {
    align-items: center;
    color: var(--primary);
    fill: var(--primary);
    display: flex;
  }

  .app_menu_icon {
    margin: 0 10px 0 0;
  }
</style>
