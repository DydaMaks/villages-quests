const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Додайте ці налаштування для стабільності
config.resolver.assetExts.push('db');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'sql'];

module.exports = config;