﻿var ajax = new AJAX();

function AJAX() {};

AJAX.prototype.request = function(url, settings) {
	var method = (settings.method) ? settings.method : "GET";
	var xhr = new XMLHttpRequest();
	
	xhr.open(method, url);
	
	if (settings.headers) {
		for (var h in settings.headers) {
			if (settings.headers.hasOwnProperty(h)) {
				xhr.setRequestHeader(h, settings.headers[h]);
			}	
		}
	} 
	
	if (settings.timeout) {
		xhr.timeout = settings.timeout;
	}
	
	xhr.ontimeout = function (event) {
		if (settings.error) {
			settings.error({error: "timeout"});
		}			
	}

	xhr.onerror = function (event) {
		if (settings.error) {
			settings.error({error: event.target.status});
		}			
	}
	
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (settings.success) {
					settings.success(JSON.parse(xhr.responseText));
				}
			} else {
				if (settings.error) {
					if (xhr.response) {
						settings.error(JSON.parse(xhr.response));
					}
				}
			}
		}
	}
	
	if (settings.data) {
		xhr.send(JSON.stringify(settings.data));
	} else {
		xhr.send();
	} 
};
