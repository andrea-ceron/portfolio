import renderer from "./Renderer.js";
import routes from "./Routes.js";

class Router {
  constructor() {
    console.log("Router inizializzato");

    this.loadPage();
    window.addEventListener("hashchange", () => {
        console.log("hash cambiato")
      router.loadPage();
    });

  }

    async loadPage() {
        const path = window.location.hash.slice(1) || "";
        
        const filePaths = routes.getRoutes(path);
        if (this.currentPath === filePaths.parentTag) {
            console.log("Stessa pagina, non ricarico");
            return;
        }
        this.currentPath = filePaths.parentTag;

        await renderer.displayHTML(filePaths.navigationComponent, filePaths.mainComponent, filePaths.styles || []);

        if (filePaths.script) {
            await renderer.loadScript(filePaths.script);
        }

        window.dispatchEvent(new CustomEvent("RenderingPageCompleted", { detail: { path } }));
    }
}

const router = new Router();

export default router;
