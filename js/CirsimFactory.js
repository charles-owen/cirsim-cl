import {Cirsim} from 'cirsim';

export const CirsimFactory = function() {
}

CirsimFactory.create = function(site) {

	function install() {
		const elements = document.querySelectorAll('div.cirsim-install');
		for(let i=0; i<elements.length; i++) {
			let element = elements[i];
			const json = JSON.parse(element.textContent);
			element.innerHTML = '';
			const cirsim = new Cirsim(element, json);
			cirsim.startNow();
			element.style.display = 'block';
			element.classList.remove('cirsim-install');
		}
	}

	site.start( () => {
		install();
	});

	site.messageListener((msg, data) => {
		switch(msg) {
			case 'cl-quiz-after-installed':
				install();
				break;

			case 'cl-grades-grader-installed':
				install();
				break;

		}
	});
}