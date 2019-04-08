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
		this.radius = 15;
	}
	
	async ready() {
		
		super.ready();
		SocketIO.initialize();
		trace(this);
		SocketIO.on("msg", this.mvc.controller.onMessage.bind(this));
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
		this.link = HH.create("a");
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		
		this.title= HH.create("p");
		SS.style(this.title, {"fontSize": "15px", "textDecoration": "none"});
		this.stage.appendChild(this.title);
		this.stage.appendChild(this.link);
		
		
		
		
		
		this.try.footer.innerHTML = "test socket";
		SS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});
		Events.on(this.try.footer, "click", event => this.mvc.controller.socketClick());
		this.try.stage.appendChild(this.try.footer);
	}
	
	update(title, link, arr) {
		this.title.innerHTML = arr;
		this.link.innerHTML = title;
		HH.attr(this.link, {"href": "https://fr.wikipedia.org/wiki/" + arr});
	}
	
}

class randomWikiController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	onMessage(data) {
		trace("received socket msg", data);
	}
	
	socketClick(event) {
		trace("test socket");
		SocketIO.send("msg", {test: "message"});
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
