import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";

const elysiaOption = {
  port: Bun.env.PORT || 3000,
  tls: {
    key: Bun.file("resource/cert/privkey.pem"),
    cert: Bun.file("resource/cert/fullchain.pem"),
  },
};
const elysiaStaticPlugin = staticPlugin({
  assets: "resource/public",
});

const elysiaSwaggerPlugin = swagger({
  documentation: {
    info: {
      title: "WiSoft.io API Docs.",
      version: "1.0.0",
      contact: {
        name: "Yeeun Lim",
        url: "https://api.wisoft.io",
        email: "dev@wisoft.io",
      },
    },
    tags: [
      {
        name: "Greet",
        description: "Greet API",
      },
      {
        name: "Todo",
        description: "Todo API",
      },
    ],
  },
  path: "/docs",
});

export const ElysiaConfig = {
  elysiaOption,
  elysiaStaticPlugin,
  elysiaSwaggerPlugin,
};
