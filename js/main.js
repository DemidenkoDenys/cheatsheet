let app = {
	name: 'cheatsheet application'
};

$(() => {

	$.get({
		url: "data/react-16-0-0.txt", 
		cache: false
	}).then((data) => { 
		app.addBlock(data.split('*****'));
		app.materialInstance = M.Collapsible.init(document.querySelector('.collapsible'));
	});

});

app.addBlock = (data) => {

	let head = data[0],
		prepareString = (string) => string !== undefined ? string.replace(/{/gi, '<strong>').replace(/}/gi, "</strong>") : '';

		data = data.splice(1);

	$('#content').append(`
		<section>
	   		<h3>${ head }</h3>
	   		<ul class="collapsible popout">
	   			${ data.reduce((previous, current, index) => {
	   				if(index === 1){
	   					return (`<li>
						 	<div class="collapsible-header" data-index='${ index }'>
						 		${ prepareString(previous.split('***')[0]) }
						 	</div>
						 	
						 	<div class="collapsible-body ${ previous.split('***')[1] === undefined ? `hidden` : `` }" }>
						 		${ prepareString(previous.split('***')[1]) }
						 	</div>
						 	
						</li>`)
	   				} else {
						return previous + 
		   		 			`<li>
							 	<div class="collapsible-header" data-index='${ index }'>
							 		${ prepareString(current.split('***')[0]) }
							 	</div>

							 	<div class="collapsible-body ${ current.split('***')[1] === undefined ? `hidden` : `` }" >
							 		${ prepareString(current.split('***')[1]) }
							 	</div>

							</li>`;
						}
	   			})}
	   		</ul>
	    </section>`
	);
};

(function(){
	if (!String.prototype.repeat) {
		String.prototype.repeat = function(count) {
			'use strict';
			if (this == null) {
				throw new TypeError('can\'t convert ' + this + ' to object');
			}
			var str = '' + this;
			count = +count;
			if (count != count) {
				count = 0;
			}
			if (count < 0) {
				throw new RangeError('repeat count must be non-negative');
			}
			if (count == Infinity) {
				throw new RangeError('repeat count must be less than infinity');
			}
			count = Math.floor(count);
			if (str.length == 0 || count == 0) {
				return '';
			}
			// Обеспечение того, что count является 31-битным целым числом, позволяет нам значительно
			// соптимизировать главную часть функции. Впрочем, большинство современных (на август
			// 2014 года) браузеров не обрабатывают строки, длиннее 1 << 28 символов, так что:
			if (str.length * count >= 1 << 28) {
				throw new RangeError('repeat count must not overflow maximum string size');
			}
			var rpt = '';
			for (var i = 0; i < count; i++) {
				rpt += str;
			}
			return rpt;
		}
	}
})()
