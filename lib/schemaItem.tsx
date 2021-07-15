import { defineComponent, PropType } from "vue";
import { SchemaType, Schema, ObjectType } from "./types";
import StringField from "./fields/stringField";
import NumberField from "./fields/numberField";
import ObjectField from "./fields/objectField";
export default defineComponent({
  name: "SchemaItem",
  props: {
    modelValue: {
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: unknown) => void>,
      required: true,
    },
  },
  components: {
    StringField,
    NumberField,
    ObjectField,
  },
  setup(props) {
    return () => {
      const {
        schema: { type: schemaType },
        schema,
        onChange,
        modelValue,
      } = props;
      let inputComponent;
      switch (schemaType) {
        case SchemaType.STRING:
          inputComponent = (
            <StringField
              onChange={onChange}
              schema={schema}
              modelValue={modelValue as string}
            ></StringField>
          );
          break;
        case SchemaType.NUMBER:
          inputComponent = (
            <NumberField
              onChange={onChange}
              schema={schema}
              modelValue={modelValue as number}
            ></NumberField>
          );
          break;
        case SchemaType.OBJECT:
          inputComponent = (
            <ObjectField
              onChange={onChange}
              schema={schema}
              modelValue={modelValue as ObjectType}
            ></ObjectField>
          );
          break;
        default:
          console.log("schemaType error");
          break;
      }
      return <div>{inputComponent}</div>;
    };
  },
});
