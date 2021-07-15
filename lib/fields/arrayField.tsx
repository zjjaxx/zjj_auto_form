import { defineComponent, PropType } from "vue";
import { Schema } from "../types";
export default defineComponent({
  name: "ArrayField",
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return;
    };
  },
});
