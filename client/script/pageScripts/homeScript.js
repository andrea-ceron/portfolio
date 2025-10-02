import eventManager from "../eventHelper.js"

class HomeScript{
    pageSections = ['introduction', 'about', 'contact']; 
    constructor(){
        eventManager.attachEventListener(window,"hashchange",()=>{
            let hash = window.location.hash;
            this.alterCSSNavbarOnClick(hash);
        });

        let {top, height} = this.findSectionHeight('#introduction');
        console.log(top, height)
        eventManager.attachEventListener(window,"scroll",()=>{
            this.alterCSSNavbarOnScroll(window.scrollY, top, height);
        });
    } 

    findSectionHeight(sectionId){
        const section = document.querySelector('#introduction');
        const sectionTop = section.offsetTop;  
        const sectionHeight = section.offsetHeight; 
        console.log(sectionTop,sectionHeight)
        return {sectionTop,sectionHeight}
    }

    alterCSSNavbarOnClick(hashFromURL){
        let hashUrl = `${hashFromURL}Nav`
        for(let linkId of this.pageSections){
            console.log(`#${linkId}Nav`, hashUrl)
            let navLink = document.querySelector(`#${linkId}Nav`);
            if (!navLink) continue;
            if(`#${linkId}Nav` === hashUrl){
                navLink.className = "active";
            }
            else{
                navLink.className = "unactive";

            }
        }
    }

    alterCSSNavbarOnScroll(scrollY, top, height){

        const normalizedScroll = scrollY - top;
        const percentage = (normalizedScroll / height) * 100;
        console.log(`percentage ${percentage} normalizedScroll ${normalizedScroll} top ${top} height ${height}`)

    }
}

var homeScript = new HomeScript();
export default homeScript;