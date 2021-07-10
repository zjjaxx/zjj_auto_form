import * as monaco from "monaco-editor";
import { defineComponent, onMounted, PropType, ref } from "vue";
import monacoEditorStyle from "./monacoEditor.module.less";
export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup() {
    const containerElement = ref(null);
    onMounted(() => {
      monaco.editor.create(containerElement.value as unknown as HTMLElement, {
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
          "\n"
        ),
        language: "javascript",
      });
    });
    return () => {
      return (
        <div ref={containerElement} class={monacoEditorStyle.container}></div>
      );
    };
  },
});
