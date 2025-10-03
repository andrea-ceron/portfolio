import eventManager from "./eventHelper.js"

class Renderer{
    async displayHTML(HTMLPathNavigation= "", HTMLPathMain ){
        let mainDiv = document.querySelector('#app');
        let navDiv  = document.querySelector('#navbar');

        let htmlMain = await this.fetchPages(HTMLPathMain);
        
        mainDiv.innerHTML = htmlMain;
        if(HTMLPathNavigation){
            let htmlNav = await this.fetchPages(HTMLPathNavigation);
            navDiv.innerHTML = htmlNav;
        }
        eventManager.dispatchCustomEvent(`RenderingPageCompleted/`);
    }

    async loadScript(path) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${path}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.type = "module";  
            script.src = path;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Errore nel caricamento: ${path}`));
            document.body.appendChild(script);
        });
    }

    async fetchPages(path){
        console.log(path)
        try{
        let res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const html = await res.text(); 
        return html;
        }catch(err){
            console.log(err);
        }
    }

}

var renderer = new Renderer();
export default renderer;