export const config = {
  toolbar: [
    { name: 'document', items: [ 'Source', 'Format', 'Styles', 'FontSize' ] },// Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline'] },			// Defines toolbar group without name.
    { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Blockquote', 'PageBreak', '-', ]},
    // { name: 'paragraph', groups: [ 'List', 'Indent', 'Blocks', 'Align', 'Bidi' ], items: [, , '-', 'CreateDiv', '-',  '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
    '/',																					// Line break - next group will be placed in new line.
    { name: 'tools', items: [ 'NumberedList', 'BulletedList', 'Outdent', 'Indent', '-', 'ShowBlocks', 'Maximize' ] },
  ],
  allowedContent: true
}