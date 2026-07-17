class Routes{
    homeStyles = ['../css/home.css', '../css/nav.css', '../css/projectPage.css', '../css/projects.css', '../css/contacts.css'];

    routesMap = new Map([
        [
            '',{
                mainComponent:'pages/homepage.html',
                navigationComponent: 'components/navigation.html',
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: this.homeStyles
            }
        ],[
            'introduction',{
                mainComponent:'pages/homepage.html',
                navigationComponent: 'components/navigation.html',
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: this.homeStyles
            }
        ],[
            'about',{
                mainComponent:'pages/homepage.html',
                navigationComponent: 'components/navigation.html',
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: this.homeStyles
            }
        ],[
            'githubProjects',{
                mainComponent:'pages/homepage.html',
                navigationComponent: 'components/navigation.html',
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: this.homeStyles
            }
        ],[
            'contact',{
                mainComponent:'pages/homepage.html',
                navigationComponent: 'components/navigation.html',
                script: 'script/pageScripts/homeScript.js',
                parentTag: 'home',
                styles: this.homeStyles
            }
        ],[
            'article-1',{
               mainComponent:'pages/article1.html',
               navigationComponent: 'components/navigationArticle.html',
                styles: ['../css/blogArticle.css', '../css/nav.css'] 
            }
        ],[
            'article-2',{
               mainComponent:'pages/article2.html',
               navigationComponent: 'components/navigationArticle.html',
                styles: ['../css/blogArticle.css', '../css/nav.css'] 
            }
        ]
       ,[
            'ERPArticle',{
               mainComponent:'pages/ERPArticle.html',
               navigationComponent: 'components/navigationArticle.html',
                styles: ['../css/blogArticle.css', '../css/nav.css'] 
            }
        ]
    ]);        
    getRoutes(path){
        let res = this.routesMap.get(path);
        console.log(path, res)
        if (res === undefined) {
            window.location.hash = "";
        console.log("nessun elemento");
        return this.routesMap.get('');
        }
        return res;

    }

}
var routes = new Routes();
export default routes;
