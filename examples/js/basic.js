(function demoTwoPageDocument() {
	var body = document.getElementsByTagName("BODY")[0];
	var vm = new ViewManager(body);
	var test = ["top-left", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-right"];

	for (var i = test.length; i--;) {
		var el = document.createElement("DIV");
		el.innerHTML = test[i];
		vm.add(el, test[i]);
		setTimeout((function (pos) {
			vm.empty(pos);
		}).bind(null, test[i]), 2000);
	}
})();