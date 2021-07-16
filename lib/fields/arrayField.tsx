import { defineComponent, inject, PropType } from "vue";
import { Schema, SchemaItemKey } from "../types";
import { isEmptyObject } from "../utils";
import SelectFiled from "./selectFiled";
export default defineComponent({
  name: "ArrayField",
  components: {
    SelectFiled,
  },
  /**
   * test:{
   *    type:array,
   *    items:{
   *        type:string
   *    }
   * }
   * test:{
   *  type:array,
   *  items:[{
   *    type:string
   * },{
   *  type:number
   * }]
   * }
   * test:{
   *  type:array,
   *  items:{
   *  type:string,
   *  enum:['1','2']
   * }
   * }
   */
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: unknown[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const SchemaItem = inject(SchemaItemKey);
    const handleArrayChange = (value: unknown, index: number) => {
      const _modelValue = props.modelValue ? props.modelValue : [];
      if (Array.isArray(_modelValue)) {
        const copyModelValue = [..._modelValue];
        copyModelValue[index] = value;
        props.onChange(copyModelValue);
      }
    };
    const handleSelectChange = (v: unknown[]) => {
      props.onChange(v);
    };
    return () => {
      const {
        schema,
        schema: { items },
        modelValue,
      } = props;
      //@ts-ignore
      if (items && !isEmptyObject(items) && !("enum" in items!)) {
        return (
          modelValue &&
          Array.isArray(modelValue) &&
          modelValue.map((item, index) => (
            //@ts-ignore
            <SchemaItem
              modelValue={item}
              key={index}
              schema={items}
              onChange={(v: any) => handleArrayChange(v, index)}
            ></SchemaItem>
          ))
        );
      } else if (items && Array.isArray(items)) {
        modelValue &&
          Array.isArray(modelValue) &&
          modelValue.map((item, index) => (
            //@ts-ignore
            <SchemaItem
              modelValue={item}
              key={index}
              schema={items[index % 2]}
              onChange={(v: any) => handleArrayChange(v, index)}
            ></SchemaItem>
          ));
      } else if (items && !isEmptyObject(items) && "enum" in items!) {
        return (
          <SelectFiled
            onChange={handleSelectChange}
            modelValue={modelValue}
            schema={schema}
          ></SelectFiled>
        );
      }
      return;
    };
  },
});
