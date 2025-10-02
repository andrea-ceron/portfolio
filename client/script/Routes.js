class Routes{
    routesMap = new Map([
    ['/', { 
        mainComponent:'pages/homepage.html', 
        navigationComponent: 'components/navigation.html', 
        script: 'script/pageScripts/homeScript.js',
    },
    '404',{
        mainComponent:'pages/homepage.html'
    }
    ]
    ]);        
    getRoutes(path){
        let res = this.routesMap.get(path);
        if(res === undefined){
            console.log("nessun elemento");
            return;
        }
        return res;

    }

}
var routes = new Routes();
export default routes;
