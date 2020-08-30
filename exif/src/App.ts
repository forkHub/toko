declare var loadImage: Function;

class App {

	constructor() {
		let file: HTMLInputElement = document.getElementById('file-input') as HTMLInputElement;

		file.onchange = () => {
			this.loadImage3(file);
		}
	}

	async loadImage3(file: HTMLInputElement): Promise<void> {
		await this.loadImage2(file, 200, 200);
		await this.loadImage2(file, 100, 100);
	}

	async loadImage2(file: HTMLInputElement, panjang: number, lebar: number): Promise<void> {
		let img: any = await loadImage(
			file.files[0],
			{
				maxWidth: panjang,
				maxHeight: lebar,
				canvas: true,
				orientation: true,
				imageSmoothingQuality: 'high'
			}
		);

		console.log('finish');
		console.log(img);
		document.body.appendChild(img.image)
	}

}

window.onload = () => {
	new App();
}