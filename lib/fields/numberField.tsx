import { defineComponent, PropType, computed, inject, ref, Ref } from "vue";
import { Schema } from "../types";
export default defineComponent({
  name: "NumberFiled",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: number) => void>,
      required: true,
    },
  },
  setup(props) {
    const handleEvent = (e: Event) => {
      props.onChange(parseInt((e.target as HTMLInputElement).value));
    };
    return () => {
      const { modelValue } = props;
      return <input type="number" value={modelValue} onInput={handleEvent} />;
    };
  },
});
