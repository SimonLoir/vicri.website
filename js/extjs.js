/*Ext JS v1 by Simon Loir*/
var ExtJsPlugIn = {
	document : {}
};
function $(element){
	var re;
	/*
	Getting the element
	*/
	if (typeof(element) === "string") {
		re = document.querySelector(element);
	}else if(element == undefined || element == document){
		var e = {
			ready: function(toDo){
				document.addEventListener("DOMContentLoaded", toDo);
			}
		}
		var keys = 	Object.keys(ExtJsPlugIn.document);
  	
  		for (var i = 0; i < keys.length; i++) {
  			e[keys[i]] = ExtJsPlugIn.document[keys[i]];
  		}
		return e;
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
		node: re,
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
				return this
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
		addChild: function (child) {
		    this.dom.parentElement.appendChild(child);
		},
		css: function (prop, value) {
			this.dom.style[prop] = value;
		},
		clear: function (){
			this.html('');
		},
		child: function(element_type){
			var elem  = document.createElement(element_type);
			// Dans cette version, this.node = this.dom => this.dom va être supprimé dans la v2
			this.node.appendChild(elem);
			return $(elem);
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
	,DELETE : function (url, func, error) {
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
  		xhttp.setRequestHeader("x-http-method-override", "DELETE");

  		xhttp.send(); 
	},
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
	}, 
	PUT : function (url, data ,func, error) {
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
  		xhttp.setRequestHeader("x-http-method-override", "PUT");
  		xhttp.send(d); 
	}
}
	
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

var cookies = {
	set : function(cname, cvalue, exdays) {
    	var d = new Date();
    	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    	var expires = "expires=" + d.toGMTString();
    	document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	get : function(cname) {
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
}


ExtJsPlugIn.document.ExtViewVersion = "Alpha - 0.1";
ExtJsPlugIn.document.ExtViewBuild = 4;
var ExtView_Watcher = {}
var ExtView_Watcher_Input = {}
var v = { 
    set : function (prop, value) {
        v[prop] = value;
        if (ExtView_Watcher[prop] != undefined){
        	var evw = ExtView_Watcher[prop];
            for (var i = 0; i < evw.length; i++) {
                $(evw[i]).EVReload();
            }
        }
        if (ExtView_Watcher_Input[prop] != undefined){
        	var evw = ExtView_Watcher_Input[prop];
            for (var i = 0; i < evw.length; i++) {
                evw[i].value = value;
            }
        }
       
    }
};

ExtJsPlugIn.document.watch = function () {
    let inputs = document.querySelectorAll('[ext-var]');//ext-var
    
    for (i = 0; i < inputs.length; i++) {
        var that = inputs[i];
        
        that.addEventListener("keyup", function (){
            v.set(that.getAttribute('ext-var'), that.value)
        }); 
        
        if  (that.hasAttribute('ext-val')){
            var varname = that.getAttribute('ext-val')
            if (ExtView_Watcher_Input[varname] == undefined){
                ExtView_Watcher_Input[varname] = [];
            }
            ExtView_Watcher_Input[varname].push(that);
        }
    } 
    
    
    
    
    let existing = document.querySelectorAll('[ext-html]');
    
    for (i = 0; i < existing.length; i++) {
        $(existing[i]).html(existing[i].getAttribute('ext-html'));
        existing[i].setAttribute('extjs', "");
    }
    
	let e = document.querySelectorAll("[extjs]");
	for (i = 0; i < e.length; i++) { 
        var el = e[i];
        var html = el.innerHTML;
        
        el.setAttribute('ext-html', html);
        el.removeAttribute("extjs");
        
        var res = html.replace(/{{(.[^\}|\{]+)}}/gi, function myFunction(x){
            /*
                On regarde si c'est une variable ou autre chose
            */
            if  (el.hasAttribute('extjs-noindex')){
                
            }else{
                var varname = x.replace("{{", "").replace("}}", "").replace("v.", "");
                
                if (ExtView_Watcher[varname] == undefined){
                    ExtView_Watcher[varname] = [];
                }
                ExtView_Watcher[varname].push(el);
            }
             var x__view_result = eval(x);
            if  (x__view_result == undefined){
                return "";
            }else{
                return x__view_result;
            }
        });
        
        $(el).html(res);
    }
}

ExtJsPlugIn.EVReload = function (){
    var el = this.node;
    var html = el.getAttribute('ext-html');
                
    var res = html.replace(/{{(.[^\}|\{]+)}}/gi, function myFunction(x){
         return eval(x);
    });
    
    $(el).html(res);
}


$().ready(function (){
   	if  (document.body.hasAttribute('ext-app')){
        $().watch();
    }
})




