class randomWikiWidget extends Widget {
	
	constructor(id, app) {
		super(id, randomWikiModel, randomWikiView, randomWikiController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 2;
		this.sizeY = 1,5;
		this.radius = 20;
	}
	
	async ready() {
		
		super.ready();
		//this.mvc.controller.load();
		
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
		
		this.link = HH.create("div");
		this.wiki = HH.create("a");
		this.butt = HH.create("button")
		//Events.on(this.butt, "click", event => this.mvc.controller.random(event))
		SS.style(this.stage, {"overflow-x": "hidden","overflow-y": "scroll"})
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		
		this.title= HH.create("p");
		SS.style(this.title, {"textDecoration": "none", "font": "small-caps bold 11px/1 sans-serif", "text-align": "center"});
		this.stage.appendChild(this.title);
		this.link.appendChild(this.wiki);
		this.stage.appendChild(this.link);
		this.stage.appendChild(this.bouton);

		
		
	}
	
	update(title, link, arr) {
		this.title.innerHTML = arr;
		this.wiki.innerHTML = title;
		HH.attr(this.wiki, {"href": "https://fr.wikipedia.org/wiki/" + arr, "target": "_blank"});
	}
	
}

class randomWikiController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	
	async load() {
		let result = await this.mvc.main.dom("https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('/html/body/div[3]/div[3]/div[4]/div/p[1]').firstResult; // find interesting things
		var titre = new xph().doc(dom).ctx(dom).craft('//*[@id="firstHeading"]').firstResult;
		this.mvc.view.update(article.textContent, article.getAttribute("href"), titre.textContent);
		
		
	}
	
}
