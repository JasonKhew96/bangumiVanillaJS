import { AppContainer } from "./container.js";
import { AppHeader } from "./header.js";
import { AppHome } from "./home.js";
import { AppFooter } from "./footer.js";
import { HomeCards } from "./cards.js";
import { AnimadTable } from "./animad.js";
import { BilibiliSEATable } from "./bilibiliSEA.js";
import { BilibiliTable } from "./bilibili.js";

export class Navigator {
  constructor() {
    const app = document.getElementById("app");

    this._router = new Navigo("/");

    const header = AppHeader.generate().build("Bangumi", () => {
      this._router.navigate("/");
    });

    const homeCards = HomeCards.generate()
      .addCard("https://via.placeholder.com/512", "哔哩哔哩", () => {
        this._router.navigate("/bilibili");
      })
      .addCard("https://via.placeholder.com/512", "哔哩哔哩(东南亚)", () => {
        this._router.navigate("/bilibili_sea");
      })
      .addCard("https://via.placeholder.com/512", "巴哈姆特動畫瘋", () => {
        this._router.navigate("/animad");
      });
    const appHome = AppHome.generate();
    appHome.appendChild(homeCards);

    const footer = AppFooter.generate();
    footer.setText("Built with vanilla JS by @JasonKhew96");

    this._router.on("/", () => {
      document.title = "Bangumi | Home";
      app.innerHTML = "";
      app.appendChild(AppContainer.generate().build(header, appHome, footer));
    });

    this._router.on("/404", () => {
      document.title = "Bangumi | 404";
      app.innerHTML = "";
      app.appendChild(AppContainer.generate().build(header, appHome, footer));
    });

    this._router.on("/bilibili", () => {
      document.title = "Bangumi | 哔哩哔哩";
      app.innerHTML = "";
      const table = new BilibiliTable();
      app.appendChild(AppContainer.generate().build(header, table, footer));
    });

    this._router.on("/bilibili_sea", () => {
      document.title = "Bangumi | 哔哩哔哩(东南亚)";
      app.innerHTML = "";
      const table = new BilibiliSEATable();
      app.appendChild(AppContainer.generate().build(header, table, footer));
    });

    this._router.on("/animad", () => {
      document.title = "Bangumi | 巴哈姆特動畫瘋";
      app.innerHTML = "";
      const table = new AnimadTable();
      app.appendChild(AppContainer.generate().build(header, table, footer));
    });

    this._router.resolve();
  }

  static build() {
    return new Navigator();
  }
}
