
class App {
	private items: Item[] = [];

	constructor() {
		let nodes: NodeListOf<Element> = document.querySelectorAll('item');
		let tinggi: number = 0;

		nodes.forEach((node: Element) => {
			let item: Item = new Item();
			item.init(node as HTMLElement);
			this.items.push(item);

			if (item.elHtml.clientHeight > tinggi) {
				tinggi = item.elHtml.clientHeight;
			};
		});

		this.items.forEach((item: Item) => {
			item.elHtml.style.height = tinggi + 'px';
		})

		window.onresize = () => {
			this.resize();
		}
		this.resize();
	}

	hitungTinggi(): number {
		return 0;
	}

	resize(): void {
		let tinggi: number = 0;

		this.items.forEach((item: Item) => {
			item.elHtml.style.height = 'initial';
		})

		for (let i: number = 0; i < 10000; i++) { }

		this.items.forEach((item: Item) => {
			if (item.elHtml.clientHeight > tinggi) {
				tinggi = item.elHtml.clientHeight;
			};
		});

		this.items.forEach((item: Item) => {
			item.elHtml.style.height = tinggi + 'px';
		})

		setTimeout(() => {

		}, 100);
	}

	static getEl(query: string): HTMLElement {
		let el: HTMLElement;

		el = document.body.querySelector(query);

		if (el) {
			return el
		} else {
			console.log(document.body);
			console.log(query);
			throw new Error('query not found ');
		}
	}

}

class Item extends BaseComponent {
	private _ukuranKecil: number = 0;

	constructor() {
		super();
	}

	init(el: HTMLElement): void {

		this._elHtml = el;

		this._elHtml.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('item on click');
			this._ukuranKecil = this._elHtml.clientHeight;
			this._elHtml.style.height = '100%';
			this._elHtml.classList.add('fokus');
			document.body.style.overflowY = 'hidden';
			this.gbrBesar.onload = () => {
				this.gbrBesar.style.maxHeight = 'initial';
			}
			this.gbrBesar.src = this.gbrBesar.getAttribute('gbr');
		}

		this.gbrKecil.onload = () => {
			this.gbrKecil.style.maxHeight = 'initial';
		}
		this.gbrKecil.src = this.gbrKecil.getAttribute('gbr');

		this.tutupTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this._elHtml.classList.remove('fokus');
			document.body.style.overflowY = 'auto';
			this._elHtml.style.height = this.ukuranKecil + 'px';
		}

		// this.chatTbl.onclick = (e: MouseEvent) => {
		// 	e.stopPropagation();
		// 	window.top.location.href = ''; 
		// }
	}

	public get ukuranKecil(): number {
		return this._ukuranKecil;
	}
	public set ukuranKecil(value: number) {
		this._ukuranKecil = value;
	}


	get waP(): HTMLParagraphElement {
		return this.getEl('p.wa') as HTMLParagraphElement;
	}

	get chatTbl(): HTMLLinkElement {
		return this.getEl('a.chat') as HTMLLinkElement;
	}

	get tutupTbl(): HTMLButtonElement {
		return this.getEl('p.tutup button') as HTMLButtonElement;
	}

	get gbrKecil(): HTMLImageElement {
		return this.getEl('img.kecil') as HTMLImageElement;
	}

	get gbrBesar(): HTMLImageElement {
		return this.getEl('img.besar') as HTMLImageElement;
	}
}

window.onload = () => {
	new App();
}