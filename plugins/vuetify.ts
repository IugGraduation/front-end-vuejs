import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#0065FF",
            secondary: "#B3CBFF",
            tertiary: "#E5EFFF",
            blackPrimary: "#000000",
            blackSecondary: "#262626", // أقرب للرمادي الداكن
            blackTeriary: "#7A7A7A", // رمادي معتدل
            blackFourth: "#A6A6A6", // رمادي فاتح
            error: "#FF0505", // أحمر بدون شفافية
            info: "#7585FF",
            success: "#7EBA18",
            warning: "#FFD400",
            overlayPrimary: "#CCDFFF", // لون قريب بدون الشفافية
            overlayerror: "#FFA5A5",
            overlaysuccess: "#CCE7A5",
            background: "#F9F7FF",
            textColor: "#000000",
            white: "#FFFFFF",
          },
        },
        colors: {
          primary: "#0065FF",
          secondary: "#B3CBFF",
          tertiary: "#E5EFFF",
          blackPrimary: "#FFFFFF",
          blackSecondary: "#D9D9D9", // أقرب للرمادي الفاتح
          blackTeriary: "#B3B3B3", // رمادي معتدل
          blackFourth: "#808080", // رمادي متوسط
          error: "#FF0505", // نفس اللون في النظام الفاتح
          info: "#7585FF",
          success: "#7EBA18",
          warning: "#FFD400",
          overlayPrimary: "#99CCFF", // لون قريب بدون الشفافية
          overlayerror: "#FFA5A5",
          overlaysuccess: "#CCE7A5",
          background: "#000000",
          textColor: "#FFFFFF",
          white: "#000000",
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
