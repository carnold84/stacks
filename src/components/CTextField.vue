<template>
  <div :class="['c_text_field']">
    <slot name="icon" />
    <div class="content">
      <label v-if="label" :for="id">
        {{ `${label}${isRequired ? '*' : ''}` }}
      </label>
      <textarea
        v-if="type === 'textarea'"
        v-model="value"
        class="field"
        :id="id"
        :placeholder="placeholder"
        @blur="onBlur"
        @focus="onFocus"
      />
      <input
        v-else
        v-model="value"
        class="field"
        :id="id"
        :placeholder="placeholder"
        :type="type"
        @blur="onBlur"
        @focus="onFocus"
      />
      <span v-if="error" class="error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CTextField',
    data() {
      return {
        error: null,
        touched: false,
      };
    },
    props: {
      id: {
        required: true,
        type: String,
      },
      isLarge: {
        default() {
          return false;
        },
        type: Boolean,
      },
      isRequired: {
        default() {
          return false;
        },
        type: Boolean,
      },
      label: String,
      modelValue: {
        default() {
          return '';
        },
        type: String,
      },
      placeholder: String,
      type: {
        default() {
          return 'text';
        },
        type: String,
      },
    },
    methods: {
      onBlur() {
        this.validate();

        this.$emit('blur');
      },
      onFocus() {
        if (!this.touched) {
          this.touched = true;
        }

        this.$emit('focus');
      },
      validate() {
        let isValid = true;

        if (this.touched) {
          if (this.isRequired && this.inputVal === '') {
            this.error = this.label
              ? `${this.label} is required`
              : 'Field is required';
            isValid = false;
          } else {
            this.error = null;
          }
        }

        this.isValid = isValid;
      },
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
    watch: {
      value() {
        // validate input when passed into to check if it's blank
        this.validate();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_text_field {
    display: flex;

    &:deep(svg) {
      fill: var(--c_textField_icon_fill);
      height: 20px;
      margin: 5px 10px 0 0;
      width: 20px;
    }

    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    label {
      color: var(--c_textField_label_color);
      font-size: 1.3rem;
      font-weight: 300;
      margin: 0 0 4px;
    }

    .field {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid var(--c_textField_field_borderColor);
      color: var(--c_textField_field_color);
      font-family: inherit;
      font-size: 1.4rem;
      margin: 0;
      padding: 7px 0;
    }

    &.is_large .field {
      font-size: 2rem;
    }

    textarea.field {
      flex-grow: 1;
      min-height: 90px;
    }

    .field:focus {
      border-bottom: 1px solid var(--c_textField_field_borderColor__focus);
      outline: none;
    }

    .error {
      color: var(--c_textField_error_color);
      font-size: 1.4rem;
      font-weight: 300;
      margin: 5px 0 0;
    }
  }
</style>
