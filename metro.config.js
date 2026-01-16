const {
  mergeConfig,
  getDefaultConfig,
} = require('@react-native/metro-config');
const {withUniwindConfig} = require('@niibase/uniwind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// Apply uniwind modifications before exporting
const uniwindConfig = withUniwindConfig(config, {
  // relative path to your global.css file
  cssEntryFile: './src/styles.css',
  // optional: path to typings
  dtsFile: './types/uniwind.d.ts',
});

module.exports = mergeConfig(config, uniwindConfig);
