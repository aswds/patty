module.exports = {
  expo: {
    name: "PattyGo",
    slug: "patty",
    version: "1.0.0",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#151515",
    },
    orientation: "portrait",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["assets/images/*"],
    ios: {
      supportsTablet: true,
      requireFullScreen: true,
    },
    android: {
      permissions: ["CAMERA_ROLL"],
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#151515",
      },
      config: {
        googleMaps: {
          apiKey: "AIzaSyBl63EZI_vTX_QBsX1wSLNdMuDzc2Xnuss",
        },
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,

      package: "com.bendzeit.patty",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-build-properties", "react-native-compressor"],
    extra: {
      eas: {
        projectId: "899377b6-ecce-4d80-9ce3-be58024244b8",
      },
      firebaseConfig: {
        apiKey: "AIzaSyD8PXs45tVtd_dfEYD_iRwc6fJjQhDr-Po",
        authDomain: "patty-9be57.firebaseapp.com",
        projectId: "patty-9be57",
        storageBucket: "patty-9be57.appspot.com",
        messagingSenderId: "1018637611472",
        appId: "1:1018637611472:web:02d3b2910d373efa8609d5",
      },
      herePlatformApiKey: "t5B5wwA5DV5PQIEflTT-w8zczmupP7qx3FDhKopVkOM",
    },
  },
};
