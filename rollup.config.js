import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/background.js',
    output: {
      format: 'es',
      file: 'dist/background.js'
    },
    plugins: getPlugins(copy({
      targets: [
        { src: 'src/style.css', dest: 'dist' }
      ]
    }))
  },
  {
    input: 'src/content-scripts/hboGo.js',
    output: {
      format: 'es',
      file: 'dist/hboGo.js'
    },
    plugins: getPlugins()
  },
  {
    input: 'src/content-scripts/netflix.js',
    output: {
      format: 'es',
      file: 'dist/netflix.js'
    },
    plugins: getPlugins()
  }
];

function getPlugins(...additional) {
  return [
    ...additional,
    resolve(),
    commonjs()
  ];
}