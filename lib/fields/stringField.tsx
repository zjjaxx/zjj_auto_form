import { defineComponent, PropType } from "vue";
import { Schema } from "../types";
export default defineComponent({
  name: "StringField",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      required: true,
    } as const,
  },
  setup(props) {
    const handleEvent = (e: Event) => {
      props.onChange((e.target as HTMLInputElement).value);
    };
    return () => {
      const { modelValue } = props;
      return <input type="text" value={modelValue} onInput={handleEvent} />;
    };
  },
});
