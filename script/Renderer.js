
class Renderer{
    normalizePath(path) {
        return new URL(path, window.location.href).href;
    }

    async loadStyle(path) {
        return new Promise((resolve, reject) => {
            const normalizedPath = this.normalizePath(path);
            if (document.querySelector(`link[href="${normalizedPath}"][data-dynamic-css]`)) {
                resolve();
                return;
            }
            const link = document.createElement("link");
            link.rel = "stylesheet"; 
            link.href = normalizedPath;
            link.setAttribute('data-dynamic-css', 'true');
            link.dataset.routeStyle = normalizedPath;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Errore nel caricamento CSS: ${path}`));
            document.head.appendChild(link);
        });
    }

    unloadUnusedStyles(stylePaths = []) {
        const activeStyles = new Set(stylePaths.map((path) => this.normalizePath(path)));

        document.querySelectorAll('link[data-dynamic-css]').forEach((link) => {
            if (!activeStyles.has(link.href)) {
                link.remove();
            }
        });
    }

    async displayHTML(HTMLPathNavigation = "", HTMLPathMain, stylePaths = []) {
        const mainDiv = document.querySelector('#app');
        const navDiv = document.querySelector('#navbar');
                
        mainDiv.classList.remove('visible');
        navDiv.classList.remove('visible');

        this.unloadUnusedStyles(stylePaths);
        
        const promises = [];
        
        promises.push(this.fetchPages(HTMLPathMain));

        let htmlNavPromise = null;
        if (HTMLPathNavigation) {
            htmlNavPromise = this.fetchPages(HTMLPathNavigation);
            promises.push(htmlNavPromise);
        }

        for (const path of stylePaths) {
            promises.push(this.loadStyle(path));
        }

        const results = await Promise.all(promises);
        
        const htmlMain = results[0]; 
        let htmlNav = HTMLPathNavigation ? results[1] : null;

        mainDiv.innerHTML = htmlMain;

        if (HTMLPathNavigation) {
            navDiv.innerHTML = htmlNav;
        } else {
            navDiv.innerHTML = '';
        }
        requestAnimationFrame(() => {
            mainDiv.classList.add('visible');
            navDiv.classList.add('visible');
        });
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
