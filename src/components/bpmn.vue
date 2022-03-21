<template>
  <div ref="container" class="vue-bpmn-diagram-container">
    <div v-if="!created">
      <div class="message intro">
        <div class="note">
          Drop BPMN diagram from your desktop or
          <a @click="createNewDiagram" href>create a new diagram</a> to get
          started.
        </div>
      </div>

      <div v-if="error" class="message error">
        <div class="note">
          <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

          <div class="details">
            <span>Import Error Details</span>
            <pre></pre>
          </div>
        </div>
      </div>
    </div>
    <div v-show="created" class="canvas" ref="canvas"></div>
    <div v-show="created" class="properties-panel-parent">
      <slot/>
    </div>
    <!-- <div
      v-show="created"
      class="properties-panel-parent"
      ref="panelParent"
    ></div> -->
    <button @click="downloadXml">下载</button>
  </div>
</template>

<script lang="ts">
// import BpmnJS from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
import { debounce } from 'min-dash';
import BpmnModeler from "bpmn-js/lib/Modeler";
// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule,
// } from "bpmn-js-properties-panel";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import { removeClassName, addClassName, registerFileDrop } from "../utils";
import newDiagram from "../assets/newDiagram.bpmn?raw";
import { RemoveEle, SelectStack } from './type';

export default defineComponent({
  name: "vue-bpmn",
  props: {
    // url: {
    //   type: String,
    //   required: true,
    // },
    // options: {
    //   type: Object,
    // },
  },
  emits: ['selectChange', 'remove:shape', 'remove:connection', 'remove:root'],
  setup(props, { emit }) {
    const state = reactive({
      error: false,
      created: false,
    });
    let diagramXML = ref("");
    const container = ref<HTMLDivElement>();
    const canvas = ref<HTMLDivElement>();
    // const panelParent = ref<HTMLDivElement>();

    let bpmnViewer: any;
    let bpmnModeler: any;

    // function fetchDiagram(url: string) {
    //   fetch(url)
    //     .then(function (response) {
    //       return response.text();
    //     })
    //     .then(function (text) {
    //       diagramXML.value = text;
    //     })
    //     .catch(function (err) {
    //       emit("error", err);
    //     });
    // }

    function createNewDiagram(e: Event) {
      e.stopPropagation();
      e.preventDefault();
      openDiagram(newDiagram);
    }

    async function openDiagram(xml: string) {
      try {
        await bpmnModeler.importXML(xml);
        state.created = true;

        removeClassName(container.value!, "with-error");
        addClassName(container.value!, "with-diagram");
      } catch (err) {
        removeClassName(container.value!, "with-diagram");
        addClassName(container.value!, '"with-error');
        state.created = false;
        console.error(err);
      }
    }

    async function downloadXml() {
      var encodedData = encodeURIComponent(diagramXML.value);

      const a = document.createElement('a');
      a.href =  "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
      a.setAttribute('download', 'diagram.bpmn');
      a.click();
    }

    const exportArtifacts = debounce(async function () {
      try {
        const { xml } = await bpmnModeler.saveXML({ format: true });
        diagramXML.value = xml;
      } catch (err) {
        diagramXML.value = '';
      }
    }, 500);

    onMounted(() => {
      // const _options = Object.assign(
      //   {
      //     container: container.value,
      //   },
      //   props.options
      // );
      // bpmnViewer = new BpmnJS(_options);
      // bpmnViewer?.on("import.done", function (event: any) {
      //   var error = event.error;
      //   var warnings = event.warnings;
      //   if (error) {
      //     emit("error", error);

      //     emit;
      //   } else {
      //     emit("shown", warnings);
      //   }
      //   bpmnViewer.get("canvas").zoom("fit-viewport");
      // });

      bpmnModeler = new BpmnModeler({
        container: canvas.value,
        // propertiesPanel: {
        //   parent: panelParent.value,
        // },
        // additionalModules: [
        //   BpmnPropertiesPanelModule,
        //   BpmnPropertiesProviderModule,
        // ],
      });
      bpmnModeler.on("selection.changed", (selectStack: SelectStack) => {
        // filter useless event
        if (selectStack.newSelection.length !== 0)  {
          emit('selectChange', selectStack);
        }
      })

      bpmnModeler.on("shape.remove", (removeEle: RemoveEle) => {
        emit('remove:shape', removeEle);
      })

      bpmnModeler.on("root.remove", (removeEle: RemoveEle) => {
        emit('remove:root', removeEle);
      })

      bpmnModeler.on("connection.remove", (removeEle: RemoveEle) => {
        emit('remove:connection', removeEle);
      })

      bpmnModeler.on("commandStack.changed", exportArtifacts);

      removeClassName(container.value!, "with-diagram");

      registerFileDrop(container.value!, openDiagram);

      // if (props.url) {
      //   fetchDiagram(props.url);
      // }
    });

    // onUnmounted(() => {
    //   bpmnViewer.destory();
    // });

    // watch(
    //   () => props.url,
    //   (v) => {
    //     emit("loading");
    //     fetchDiagram(v);
    //   }
    // );

    // watch(diagramXML, (v) => {
    //   bpmnViewer.importXML(v);
    // });

    return {
      container,
      // panelParent,
      canvas,
      createNewDiagram,
      downloadXml,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less">
.vue-bpmn-diagram-container {
  height: 100vh;
  width: 100%;
  display: flex;
  .canvas {
    height: 100vh;
    width: 100vw;
    flex: 1;
  }
  .properties-panel-parent {
    min-width: 500px;
  }
}
</style>