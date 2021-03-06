class randomWikiWidget extends Widget {
	
	constructor(id, app) {
		super(id, randomWikiModel, randomWikiView, randomWikiController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 2;
		this.sizeY = 1;
		this.radius = 25;
	}
	
	async ready() {
		
		super.ready();
		this.mvc.controller.load();
	}
	
	
}

class randomWikiModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class randomWikiView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		SS.style(this.stage, {"background-color": "#f6f6f6"});
		this.header.innerHTML = "Random article";
		
		this.bouton = HH.create('button');
		Events.on(this.footer, "click", event => this.mvc.controller.load(event))
		Events.on(this.footer, "click", event => this.mvc.controller.somm())
		Events.on(this.footer, "click", event => this.sommaire())
		
		
		this.ligne1 = HH.create("hr")
		this.link = HH.create("div");
		this.wiki = HH.create("a");
		
		SS.style(this.stage, {"overflow-x": "hidden","overflow-y": "scroll"})
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		
		this.title= HH.create("h1");
		this.tiitle = HH.create("a");
		this.title.appendChild(this.tiitle)
		this.title.appendChild(this.ligne1)
		SS.style(this.tiitle,{"text-decoration": "none", "color" : "black"});
		SS.style(this.title,{"text-decoration": "none", "font": "Linux Libertine", "font-size": "1.8em"});
		this.stage.appendChild(this.title);
		SS.style(this.footer, {"userSelect": "none", "cursor": "pointer","position" : "relative"});
		this.link.appendChild(this.wiki);
		this.stage.appendChild(this.link);
		this.bouton.innerHTML= "Article au hasard";
		//this.stage.appendChild(this.bouton);
		this.titles = HH.create('h1')
		this.titles.innerHTML = "Sommaire"
		SS.style(this.titles,{"text-decoration": "none", "text-align": "center", "font-size": "0.875em"});
		this.stage.appendChild(this.titles);
		this.testo = HH.create("div")
		this.stage.appendChild(this.testo);
		this.footer.innerHTML = "Article au hasard"
		this.stage.appendChild(this.footer)
		
	}
	
	sommaire(x){
		
		
		
		if (typeof x === 'undefined') {
 		console.log(x)
     }
		else{
		console.log(x)
		
		
		
		this.list = HH.create('li');
		this.list.innerHTML = x
		
		this.testo.appendChild(this.list);
		HH.attr(this.list,{"href": "https://fr.wikipedia.org/wiki/", "target": "_blank"});
		
		}
		
	}
	update(title, link, arr, somm) {
		
		this.testo.innerHTML = ""
		this.test = arr + "#Biographie"
		
		this.tiitle.innerHTML = arr;
		this.wiki.innerHTML = title;
		HH.attr(this.wiki, {"href": "https://fr.wikipedia.org/wiki/" + arr, "target": "_blank"});
		HH.attr(this.tiitle, {"href": "https://fr.wikipedia.org/wiki/" + arr, "target": "_blank"});
		
		
	}
	
}

class randomWikiController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	somm(x){
		
		
		for(var i = 0; i<x.length; i++){
			
			var u = x[i].childNodes
			for(var l = 0;l<u.length;l++){
				
				
				
				this.mvc.view.sommaire(u[l].textContent);
			}
	
}
}
	
	async load() {
		let result = await this.mvc.main.dom("https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('/html/body/div[3]/div[3]/div[4]/div/p[1]').firstResult; // find interesting things
		let titre = new xph().doc(dom).ctx(dom).craft('//*[@id="firstHeading"]').firstResult;
		let table = await new xph().doc(dom).ctx(dom).craft('//*[@id="toc"]/ul').firstResult;
		this.mvc.view.update(article.textContent, article.getAttribute("href"), titre.textContent);
		this.somm(table.childNodes)
	}
	
}
