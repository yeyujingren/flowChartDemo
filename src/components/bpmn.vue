<template>
  <div ref="container" class="vue-bpmn-diagram-container">
    <div v-if="!created">
      <div class="message intro">
        <div class="note">
          <a @click="createNewDiagram" href>点击创建一个新的流程图</a>
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
    <!-- <button v-show="created" @click="downloadXml">下载</button> -->
  </div>
</template>

<script lang="ts">
import { debounce } from 'min-dash';
import BpmnModeler from "bpmn-js/lib/Modeler";
// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule,
// } from "bpmn-js-properties-panel";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { removeClassName, addClassName, registerFileDrop } from "../utils";
import { customTranslateModule } from '../utils/translate';
import newDiagram from "../assets/newDiagram.bpmn?raw";

import { RemoveEle, SelectStack } from './type';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: "vue-bpmn",
  props: {},
  emits: ['selectChange', 'remove:shape', 'remove:connection', 'remove:root'],
  setup(props, { emit }) {
    const state = reactive({
      created: false,
    });
    let diagramXML = ref("");
    const container = ref<HTMLDivElement>();
    const canvas = ref<HTMLDivElement>();
    let bpmnModeler: any;

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

        ElMessage.error('加载模板数据异常，请刷新重试');
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
      bpmnModeler = new BpmnModeler({
        container: canvas.value,
        // propertiesPanel: {
        //   parent: panelParent.value,
        // },
        additionalModules: [
          // BpmnPropertiesPanelModule,
          // BpmnPropertiesProviderModule,
          customTranslateModule
        ],
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
    });

    return {
      container,
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
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  .canvas {
    height: 100%;
    flex: 1;
  }
  .properties-panel-parent {
    box-sizing: border-box;
    max-width: 500px;
    height: 100%;
    overflow-x: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  }
}
</style>