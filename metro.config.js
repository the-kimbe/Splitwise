const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro")

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};
const merged = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = withNativeWind(merged, { input: './global.css' });
