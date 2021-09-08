<template>
  <header class="c_header_bar">
    <div class="content_left">
      <slot name="content-left"></slot>
    </div>
    <div class="content_right">
      <slot name="content-right"></slot>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'HeaderBar',
  };
</script>

<style lang="scss" scoped>
  .c_header_bar {
    width: 100%;
    height: 50px;
    font-size: 1em;
    color: #ffffff;
    margin: 0;
    padding: 0 40px;
    background-color: var(--primary);
    border-bottom: var(--primary) solid 1px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 1px 2px;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    display: flex;

    .content_left,
    .content_right {
      align-items: center;
      display: flex;

      h1,
      h2 {
        font-size: 1em;
        font-weight: normal;
        margin: 0;
      }

      a {
        color: #ffffff;
        border-bottom: #ffffff dotted 1px;
      }

      a:hover {
        color: #e98400;
        border-bottom: var(--secondary) dotted 1px;
      }
    }

    .content_left {
      a {
        margin: 1px 5px 0 0;
      }
    }

    .content_right {
      a {
        margin: 1px 0 0 10px;
      }
    }
  }
</style>
