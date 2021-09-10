<template>
  <div class="c_multiselect">
    <multiselect
      v-model="value"
      :hideSelected="true"
      :options="options"
      label="label"
      :multiple="isMulti"
      :placeholder="placeholder"
      track-by="id"
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
    emits: ['update:modelValue'],
    props: {
      isMulti: {
        default: false,
        type: Boolean,
      },
      modelValue: {
        default() {
          return null;
        },
        type: [Array, Object],
      },
      options: {
        required: true,
        type: Array,
      },
      placeholder: String,
    },
    computed: {
      value: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        },
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

    &:deep(.multiselect__tag) {
      background: var(--primary);
    }

    &:deep(.multiselect__tag-icon) {
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

    &:deep(.multiselect__option--highlight) {
      background: var(--primary);
    }

    &:deep(.multiselect__option--highlight::after) {
      background: var(--primary);
    }
  }
</style>
