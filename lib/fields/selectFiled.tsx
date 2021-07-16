import { computed, defineComponent, PropType } from "vue";
import { Schema } from "../types";
export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: unknown[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(newValue: unknown[]) {
        props.onChange(newValue);
      },
    });

    return () => {
      const {
        schema: { items },
      } = props;
      let options = null;
      const _enum = (items as Schema).enum;
      if (_enum && Array.isArray(_enum)) {
        options = _enum.map((item) => <option value={item}>{item}</option>);
      }
      return (
        <select multiple v-model={value.value} name="" id="">
          {options}
        </select>
      );
    };
  },
});
