class Routes{
    routesMap = new Map([
        [
            '',{ 
                mainComponent:'pages/homepage.html', 
                navigationComponent: 'components/navigation.html', 
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: ['../css/home.css', '../css/nav.css'] 
            }
        ],[
            'introduction',{ 
                mainComponent:'pages/homepage.html', 
                navigationComponent: 'components/navigation.html', 
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: ['../css/home.css', '../css/nav.css', '../css/contacts.css'] 
            }
        ],[
            'about',{
                mainComponent:'pages/homepage.html', 
                navigationComponent: 'components/navigation.html', 
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: ['../css/home.css', '../css/nav.css', '../css/contacts.css'] 
            }
        ],[
            'projects',{
               mainComponent:'pages/projectPage.html',
               navigationComponent: 'components/navigation.html',
                styles: ['../css/projectPage.css', '../css/nav.css'] 
            }
        ]
    ]);        
    getRoutes(path){
        let res = this.routesMap.get(path);
        console.log(path, res)
        if (res === undefined) {
        console.log("nessun elemento");
        return this.routesMap.get('');
        }
        return res;

    }

}
var routes = new Routes();
export default routes;
