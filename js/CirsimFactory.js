import Cirsim from 'cirsim';

export const CirsimFactory = function() {
}

CirsimFactory.create = function(site) {

	site.start( () => {
		const elements = document.querySelectorAll('div.cl-cirsim');
		for(let i=0; i<elements.length; i++) {
			let element = elements[i];
			const json = JSON.parse(element.textContent);
			element.innerHTML = '';
			const cirsim = new Cirsim(element, json);
			cirsim.startNow();
			element.style.display = 'block';
		}
	});
}