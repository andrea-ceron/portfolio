import renderer from "./Renderer.js";
import routes from "./Routes.js";

class Router {
  constructor() {
    console.log("Router inizializzato");

    this.loadPage();
    window.addEventListener("hashchange", () => {
        console.log("hash cambiato")
      this.loadPage();
    });

  }

    scrollInstantly(top = 0) {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;

        root.style.scrollBehavior = "auto";
        window.scrollTo({ top, left: 0, behavior: "auto" });
        root.style.scrollBehavior = previousScrollBehavior;
    }

    scrollToRouteTarget(path, filePaths) {
        if (filePaths.parentTag) {
            const targetId = path || "introduction";
            const target = document.getElementById(targetId);

            if (target) {
                if (path) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                    this.scrollInstantly(target.offsetTop);
                }
            } else {
                this.scrollInstantly();
            }
            return;
        }

        this.scrollInstantly();
    }

    async loadPage() {
        const path = window.location.hash.slice(1) || "";

        const filePaths = routes.getRoutes(path);
        const routeKey = filePaths.parentTag || path || "";
        if (this.currentPath === routeKey) {
            console.log("Stessa pagina, non ricarico");
            this.scrollToRouteTarget(path, filePaths);
            window.dispatchEvent(new CustomEvent("RenderingPageCompleted", { detail: { path } }));
            return;
        }
        this.currentPath = routeKey;

        await renderer.displayHTML(filePaths.navigationComponent, filePaths.mainComponent, filePaths.styles || []);

        if (filePaths.script) {
            await renderer.loadScript(filePaths.script);
        }
        this.scrollToRouteTarget(path, filePaths);
        window.dispatchEvent(new CustomEvent("RenderingPageCompleted", { detail: { path } }));
    }
}

const router = new Router();

export default router;
