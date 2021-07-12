import * as monaco from "monaco-editor";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
  shallowRef,
} from "vue";
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
  setup(props) {
    const containerElement = ref(null);
    const editorRef = shallowRef();
    let _subscription: monaco.IDisposable | undefined;
    let __prevent_trigger_change_event = false;
    onMounted(() => {
      const editor = (editorRef.value = monaco.editor.create(
        containerElement.value as unknown as HTMLElement,
        {
          //Enable format on paste. Defaults to false.
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
          language: "json",
          value: props.code,
        }
      ));
      _subscription = editor.onDidChangeModelContent((event) => {
        console.log("--------->", __prevent_trigger_change_event);
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event);
        }
      });
    });
    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose();
    });
    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value;
        const model = editor.getModel();
        console.log("v is", v, "model value is", model.getValue());
        if (v !== model.getValue()) {
          console.log("v !== model.getValue()");
          editor.pushUndoStop();
          __prevent_trigger_change_event = true;
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ]
          );
          editor.pushUndoStop();
          __prevent_trigger_change_event = false;
        }
        // if (v !== editorRef.value.getValue()) {
        //   editorRef.value.setValue(v)
        // }
      }
    );
    return () => {
      return (
        <div class={monacoEditorStyle.container}>
          <div class={monacoEditorStyle.title}>
            <span>{props.title}</span>
          </div>
          <div class={monacoEditorStyle.code} ref={containerElement}></div>
        </div>
      );
    };
  },
});
