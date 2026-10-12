import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
  getWorker: function (moduleId, label) {
    if (label === 'json') {
      return new Worker(new URL('monaco-editor/language/json/json.worker', import.meta.url));
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new Worker(new URL('monaco-editor/language/css/css.worker', import.meta.url));
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new Worker(new URL('monaco-editor/language/html/html.worker', import.meta.url));
    }
    if (label === 'typescript' || label === 'javascript') {
      return new Worker(new URL('monaco-editor/language/typescript/ts.worker', import.meta.url));
    }
    return new Worker(new URL('monaco-editor/editor/editor.worker', import.meta.url));
  },
};

monaco.editor.create(document.getElementById('container'), {
  value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
});
