import { defineComponent, PropType, provide } from "vue";
import { Schema, SchemaItemKey } from "./types";
import SchemaItem from "./schemaItem";
import { retrieveSchema } from "./utils";
// import SchemaFormStyle from "./schemaForm.less";
export default defineComponent({
  name: "SchemaForm",
  components: {
    SchemaItem,
  },
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    modelValue: {
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    provide(SchemaItemKey, SchemaItem);
    return () => {
      const { schema, modelValue } = props;
      return (
        <SchemaItem
          schema={schema}
          modelValue={modelValue}
          onChange={(v) => emit("update:modelValue", v)}
        ></SchemaItem>
      );
    };
  },
});
