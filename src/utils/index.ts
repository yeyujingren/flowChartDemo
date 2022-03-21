/**
 * 删除固定className
 */
export function removeClassName(target: HTMLElement, rmClassName: string): void {
  const curClassName = target.className;
  target.setAttribute('class', curClassName.replace(rmClassName, ''));
}

export function addClassName(target: HTMLElement, addClassName: string): void {
  const curClassName = target.className!;
  target.setAttribute('class', curClassName.concat(` ${addClassName}`));
}

export function registerFileDrop(container: HTMLDivElement, callback: (xml: any) => {}) {

  function handleFileSelect(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer!.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {

      var xml = e.target!.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer!.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  const firstChild: HTMLDivElement = container.firstElementChild as HTMLDivElement;

  firstChild.addEventListener('dragover', handleDragOver, false);
  firstChild.addEventListener('drop', handleFileSelect, false);
}