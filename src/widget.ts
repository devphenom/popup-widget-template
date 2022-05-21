interface IConfig {
  readonly email: string;
}

interface IWidget {
  config: IConfig | null;
  iframe: Window | null;
  init: (config: IConfig) => void;
  setupListeners: () => void;
  createIframe: () => void;
  handleMessage: (event: MessageEvent) => void;
}

const Widget: IWidget = {
  iframe: null,
  config: null,
  init: function (config: IConfig) {
    this.config = config;
    console.log(config);
    this.createIframe();
  },
  createIframe: function () {
    this.iframe = window.open("https://62883b7a725d1e294eae5899--loquacious-torte-e9c695.netlify.app/", "null", "top:0");
    this.setupListeners();
  },
  setupListeners: function () {
    window.addEventListener("message", this.handleMessage.bind(this));
  },
  handleMessage: function (e) {
    console.log("data", e);
    e.preventDefault();
    if (!e.data || typeof e.data !== "string") return;
    let data = JSON.parse(e.data);
    switch (data.action) {
      case "init": {
        if (this.iframe) {
          this.iframe.postMessage(JSON.stringify(this.config), "*");
        }
        break;
      }
      default:
        break;
    }
  },
};

export default Widget;
