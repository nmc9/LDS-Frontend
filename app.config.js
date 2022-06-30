export default {
  name: 'LetsDoStuff',
  version: '1.0.2',
  extra: {
    enableComments: process.env.LetsDoStuff_DEVICE_MODE,
    xxx: process.env.LETSDOSTUFF_DEVICE_MODE,
    API_URL: process.env.API_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    REACT_APP_DEVICE_MODE: process.env.REACT_APP_DEVICE_MODE,
    EXPO_DEVICE_MODE: process.env.EXPO_DEVICE_MODE,
  },
};
