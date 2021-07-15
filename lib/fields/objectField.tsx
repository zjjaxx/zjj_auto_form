import { defineComponent, PropType, inject } from "vue";
import { Schema, SchemaItemKey, ObjectType } from "../types";
import { isEmptyObject } from "../utils";
export default defineComponent({
  name: "ObjectField",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: ObjectType) => void>,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const SchemaItem = inject(SchemaItemKey);
    const handleEvent = (key: string, v: number | string) => {
      console.log("modelValue------------", props.modelValue);
      const _modelValue = Object.assign({}, props.modelValue);
      _modelValue[key] = v;
      props.onChange(_modelValue);
    };
    return () => {
      const { modelValue, schema } = props;
      if ("properties" in schema && !isEmptyObject(schema.properties)) {
        //@ts-ignore
        return Object.keys(schema.properties!).map((key) => (
          //@ts-ignore
          <SchemaItem
            schema={schema.properties![key]}
            modelValue={modelValue[key]}
            onChange={(v: number | string) => handleEvent(key, v)}
          ></SchemaItem>
        ));
      }
      return;
    };
  },
});
