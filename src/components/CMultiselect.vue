<template>
  <div class="c_multiselect">
    <multiselect
      :model-value="inputVal"
      :options="options"
      label="label"
      :multiple="isMulti"
      track-by="id"
      @update:model-value="inputVal = $event"
    />
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'CMultiselect',
    components: {
      Multiselect,
    },
    data() {
      return {
        inputVal: this.value,
      };
    },
    props: {
      isMulti: {
        default: false,
        type: Boolean,
      },
      options: {
        required: true,
        type: Array,
      },
      placeholder: String,
      value: {
        default() {
          return null;
        },
        type: [Array, Object],
      },
    },
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
  .c_multiselect {
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;

    .multiselect__tag {
      background: var(--primary);
    }
    .multiselect__tag-icon {
      &:focus {
        background: var(--primary);
      }
      &:hover {
        background: var(--primary__HOVER);
      }
      &:after {
        color: #ffffff;
      }
    }
    .multiselect__option--highlight {
      background: var(--primary);
    }
    .multiselect__option--highlight::after {
      background: var(--primary);
    }
  }
</style>

<style lang="scss">
  .multiselect__tag {
    background: var(--primary);
  }

  .multiselect__tag-icon {
    &:focus {
      background: var(--primary);
    }
    &:hover {
      background: var(--primary__HOVER);
    }
    &:after {
      color: #ffffff;
    }
  }

  .multiselect__option--highlight {
    background: var(--primary);
  }

  .multiselect__option--highlight::after {
    background: var(--primary);
  }
</style>
