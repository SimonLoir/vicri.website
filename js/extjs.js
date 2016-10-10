/*Ext JS v1 by Simon Loir*/
var ExtJsPlugIn = {};
function $(element){
	var re;
	/*
	Getting the element
	*/
	if (typeof(element) === "string") {
		re = document.querySelector(element);
	}else if(typeof(element) === "object"){
		re = element;
	}else if(element.type == "ExtJsObject"){
		return element;
	}else{
		console.log('Fatal error : impossible to find this element');
		/*/Fatal Error/*/
		return false;
	}

	var e = {
		type : "ExtJsObject",
		dom:re,
		height: function(value){
			if (value !== undefined) {
				this.dom.style.height = value;
			}else{
				return this.dom.offsetHeight;
			}
			
		},
		width: function(value){
			if (value !== undefined) {
				this.dom.style.width = value;
			}else{
				return this.dom.offsetWidth;
			}
			
		},
		click: function(toDo, element){
			if (element === undefined) {
				if (toDo !== undefined) {
					this.dom.addEventListener("click", toDo);
				}else{
					this.dom.click();
				}
			}else if (toDo !== undefined){
				var x = this.dom;
				this.dom.addEventListener("click", function(event){
				if (x.querySelector(element) == event.target) {
					xe = x.querySelector(element);
					xe.toDo = toDo;
					xe.toDo();
				}
				});
			}else{
				var x = this.dom;
				xe = x.querySelector(element);
				xe.click();
			}
		},
		hover: function(toDo, element){
			if (element === undefined) {
				if (toDo !== undefined) {
					this.dom.addEventListener("mouseover", toDo);
				}else{
					this.dom.hover();
				}
			}else if (toDo !== undefined){
				var x = this.dom;
				this.dom.addEventListener("mouseover", function(event){
				if (x.querySelector(element) == event.target) {
					xe = x.querySelector(element);
					xe.toDo = toDo;
					xe.toDo();
				}
				});
			}else{
				console.log('over cant be create')
			}
		}, 
		leave: function(toDo, element){
			if (element === undefined) {
				if (toDo !== undefined) {
					this.dom.addEventListener("mouseleave", toDo);
				}else{
					this.dom.leave();
				}
			}else if (toDo !== undefined){
				var x = this.dom;
				this.dom.addEventListener("mouseleave", function(event){
				if (x.querySelector(element) == event.target) {
					xe = x.querySelector(element);
					xe.toDo = toDo;
					xe.toDo();
				}
				});
			}else{
				console.log('leave cant be create')
			}
		},
		html: function(string){
			if (typeof(string) === "string" || typeof(string) === "number") {
				this.dom.innerHTML = string;
			}else{
				return this.dom.innerHTML;
			}
		},
		addClass: function(classx){
			this.dom.classList.add(classx);
		},
		removeClass: function(classx){
			this.dom.classList.remove(classx);
		},
		remove: function () {
			this.dom.parentElement.removeChild(this.dom);
		},
		child: function (child) {
		    this.dom.parentElement.appendChild(child);
		},
		css: function (prop, value) {
			this.dom.style[prop] = value;
		},
		clear: function (){
			this.html('');
		}
	};

	var keys = 	Object.keys(ExtJsPlugIn);
  	
  	for (var i = 0; i < keys.length; i++) {
  		e[keys[i]] = ExtJsPlugIn[keys[i]];
  	}
  	
	return e;}
var AR = {

	/*
	* Get Request 
	*/
	GET : function (url, func, error) {
		var xhttp = new XMLHttpRequest();
  		xhttp.onreadystatechange = function() {
    		if (xhttp.readyState == 4 && xhttp.status == 200) {
    			func(xhttp.responseText);
    		} else if (xhttp.readyState == 4) {

    		    if (error != undefined) {
    		        try {
    		            error();
    		        } catch (e) {

    		        }
    		    }

    		}
    	}
  		xhttp.open("GET", url, true);
  		xhttp.send(); 
	}
	,
	/*
	* Post Request data = object {user:"simon", data: "other"} #only strings (and numbers)
	*/
	POST : function (url, data ,func, error) {
		var xhttp = new XMLHttpRequest();
  		xhttp.onreadystatechange = function() {
  		    if (xhttp.readyState == 4 && xhttp.status == 200) {
  		        func(xhttp.responseText);
  		    } else if (xhttp.readyState == 4) {
  		    
  		        if (error != undefined) {
  		            try {
  		                error();
  		            } catch (e) {

  		            }
  		        }
  		    
            }
    	}
  		xhttp.open("POST", url, true);
  		var keys = 	Object.keys(data);
  		var d = "";
  		for (var i = 0; i < keys.length; i++) {
  			 if (i !== 0 ) {
  			 	d = d + "&";
  			 }
  			 d = d + keys[i] + "=" + data[keys[i]];
  		}
  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  		xhttp.send(d); 
	}}
var ExtJs = {
	version: "1.0",
	ok:function () {
		if (document.querySelector('body') == document.body) {
			return true;
		}else{
			alert("Votre navigateur n'est pas supporté")
			return false;
		}
	},
	doc:function () {
		alert('Documentation : simonloir.esy.es/ExtJs')
	}
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var load = {
    element: null,
    mask:null,
    active: false,
    build: function (string) {
        if (this.active == false) {
            var loader = document.createElement('div');
            loader.classList.add('loader');
            this.element = loader;
            var e = document.createElement('span');
            e.classList.add('e');
            e.classList.add('e1');
            var e2 = document.createElement('span');
            e2.classList.add('e');
            e2.classList.add('e2');
            var e3 = document.createElement('span');
            e3.classList.add('e');
            e3.classList.add('e3');
            var br = document.createElement('br');
            var text = document.createElement('span');
            text.innerHTML = string;
            var hide = document.createElement('div');
            hide.style.position = "fixed";
            hide.style.zIndex = 99;
            hide.style.background = "#fafafa";
            hide.style.top = 0;
            hide.style.bottom = 0;
            hide.style.left = 0;
            hide.style.right = 0;

            this.mask = hide;

            loader.appendChild(e);
            loader.appendChild(e2);
            loader.appendChild(e3);
            loader.appendChild(br);
            loader.appendChild(text);
            document.body.appendChild(hide);

            document.body.appendChild(loader);
            this.active = true;
        }
    },
    destroy: function () {
        try {
            this.active = false;
            this.element.parentElement.removeChild(this.element);
            this.element = null;
            this.mask.parentElement.removeChild(this.mask);
            this.mask = null;
        } catch (e) {

        }
        
    }
}


