class randomWikiWidget extends Widget {
	
	constructor(id, app) {
		super(id, randomWikiModel, randomWikiView, randomWikiController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 3;
		this.sizeY = 3;
		this.radius = 30;
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
		this.header.innerHTML = "Random article";
		
		this.bouton = HH.create('button');
		Events.on(this.bouton, "click", event => this.mvc.controller.load(event))
		Events.on(this.bouton, "click", event => this.mvc.controller.somm())
		Events.on(this.bouton, "click", event => this.sommaire())
		
		
		
		this.link = HH.create("div");
		this.wiki = HH.create("a");
		
		SS.style(this.stage, {"overflow-x": "hidden","overflow-y": "scroll"})
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		
		this.title= HH.create("h1");
		this.tiitle = HH.create("a");
		this.title.appendChild(this.tiitle)
		SS.style(this.title, {"textDecoration": "none", "font": "small-caps bold 11px/1 sans-serif", "text-align": "center"});
		this.stage.appendChild(this.title);
		
		this.link.appendChild(this.wiki);
		this.stage.appendChild(this.link);
		this.bouton.innerHTML= "Générer un article aléatoire";
		this.stage.appendChild(this.bouton);
		this.titles = HH.create('h1')
		this.titles.innerHTML = "SOMMAIRE"
		this.stage.appendChild(this.titles);
		this.testo = HH.create("div")
		this.stage.appendChild(this.testo);
		
	}
	
	sommaire(x){
		
		
		
		
		
		console.log(x)
		
		
		
		this.list = HH.create('li');
		this.list.innerHTML = x
		
		this.testo.appendChild(this.list);
		HH.attr(this.list,{"href": "https://fr.wikipedia.org/wiki/", "target": "_blank"});
		
		
		
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

