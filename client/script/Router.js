import eventManager from "./eventHelper.js"
import renderer from "./Renderer.js"
import routes from "./Routes.js"

class Router {
    constructor() {
        eventManager.createNewEvent("URLOnChange");
        eventManager.attachEventListener(document,"URLOnChange",()=>{
            this.loadPage()
        });

        eventManager.dispatchCustomEvent("URLOnChange");
    }

    loadPage(){
        let path = window.location.pathname;
        let lable = `RenderingPageCompleted${path}`
        eventManager.createNewEvent(lable, path);
        let filePaths = routes.getRoutes(path);
        if(filePaths.script)
            renderer.loadScript(filePaths.script);
        renderer.displayHTML(filePaths.navigationComponent, filePaths.mainComponent);
    }
    
}

var router = new Router();
export default router;