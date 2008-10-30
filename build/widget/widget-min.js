YUI.add("widget",function(E){var Q=E.Lang;function g(L){this._plugins={};this.after("init",function(Y,O){this._initPlugins(O);});this.after("destroy",this._destroyPlugins);}g.prototype={plug:function(Y){if(Y){if(Q.isArray(Y)){var O=Y.length;for(var L=0;L<O;L++){this.plug(Y[L]);}}else{if(Q.isFunction(Y)){this._plug(Y);}else{this._plug(Y.fn,Y.cfg);}}}return this;},unplug:function(L){if(L){this._unplug(L);}else{for(L in this._plugins){if(E.Object.owns(this._plugins,L)){this._unplug(L);}}}return this;},hasPlugin:function(L){return(this._plugins[L]&&this[L]);},_initPlugins:function(L){var Y=this._getClasses(),j;for(var O=0;O<Y.length;O++){j=Y[O];if(j.PLUGINS){this.plug(j.PLUGINS);}}if(L&&L.plugins){this.plug(L.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(Y,L){if(Y&&Y.NS){var O=Y.NS;L=L||{};L.owner=this;if(this.hasPlugin(O)){this[O].setAtts(L);}else{this[O]=new Y(L);this._plugins[O]=Y;}}},_unplug:function(L){if(L){if(this[L]){this[L].destroy();delete this[L];}if(this._plugins[L]){delete this._plugins[L];}}}};E.PluginHost=g;var Z="widget",M="content",a="visible",b="hidden",f="enabled",c="disabled",G="focus",C="blur",A="hasFocus",I="width",W="height",h="",X="-",e="boundingBox",T="contentBox",P="parentNode",D="tabIndex",H="locale",J="initValue",R="id",S="render",B="rendered",V="destroyed",K=E.Object,d=E.Node;var U={};function F(L){this._yuid=E.guid(Z);this._strings={};F.superclass.constructor.apply(this,arguments);}F.NAME=Z;F.UI_SRC="ui";F.ATTRS={rendered:{value:false,readOnly:true},boundingBox:{value:null,set:function(L){return this._setBoundingBox(L);},writeOnce:true},contentBox:{value:null,set:function(L){return this._setContentBox(L);},writeOnce:true},tabIndex:{value:0},hasFocus:{value:false},disabled:{value:false},visible:{value:true},height:{value:h},width:{value:h},moveStyles:{value:false},locale:{value:"en"},strings:{set:function(L){return this._setStrings(L,this.get(H));},get:function(){return this.getStrings(this.get(H));}}};F._CLASSNAME=E.config.classNamePrefix+F.NAME;F.getByNode=function(L){var O,Y=F._CLASSNAME;L=d.get(L);if(L){L=(L.hasClass(Y))?L:L.ancestor("."+Y);if(L){O=U[L.get(R)];}}return O||null;};var N=F.UI_SRC;E.extend(F,E.Base,{initializer:function(L){this._className=this.get("classNamePrefix")+this.constructor.NAME.toLowerCase();var Y=this.get(e).get(R);if(Y){U[Y]=this;}var O=this._parseHTML(this.get(T));if(O){E.aggregate(L,O,false);}E.PluginHost.call(this,L);},destructor:function(){var L=this.get(e);E.Event.purgeElement(L,true);var O=L.get(R);if(O&&O in U){delete U[O];}},render:function(L){if(this.get(V)){return ;}if(!this.get(B)){this.publish(S,{queuable:false,defaultFn:this._defRenderFn});this.fire(S,null,L);}return this;},_defRenderFn:function(O,L){this._renderUI(L);this._syncUI();this._bindUI();this.renderer();this._set(B,true);},renderer:function(){this.renderUI();this.syncUI();this.bindUI();},bindUI:function(){},renderUI:function(){},syncUI:function(){},hide:function(){return this.set(a,false);},show:function(){return this.set(a,true);},focus:function(){return this.set(A,true);},blur:function(){return this.set(A,false);},enable:function(){return this.set(f,true);},disable:function(){return this.set(c,false);},_parseHTML:function(O){var L=this.HTML_PARSER,Y,i;if(L&&O&&O.hasChildNodes()){K.each(L,function(l,j,n){i=null;if(Q.isFunction(l)){i=l.call(this,O);}else{if(Q.isArray(l)){var m=O.queryAll(l[0]);if(m.size()>0){i=m;}}else{i=O.query(l);}}if(i!==null&&i!==undefined){Y=Y||{};Y[j]=i;}});}return Y;},_moveStyles:function(j,l){var i=this.WRAP_STYLES,m=j.getStyle("position"),O=this.get(T),k=[0,0],Y,L;if(!this.get("height")){Y=O.get("offsetHeight");}if(!this.get("width")){L=O.get("offsetWidth");}if(m==="absolute"){k=j.getXY();l.setStyles({right:"auto",bottom:"auto"});j.setStyles({right:"auto",bottom:"auto"});}E.each(i,function(o,n){var p=j.getStyle(n);l.setStyle(n,p);if(o===false){j.setStyle(n,"");}else{j.setStyle(n,o);}});if(m==="absolute"){l.setXY(k);}if(Y){this.set("height",Y);}if(L){this.set("width",L);}},_renderBox:function(O){var Y=this.get(T),j=this.get(e),L=d.get("body");var i=(O)?d.get(O):L;if(i&&!i.contains(j)){if(i===L&&!O&&i.get("firstChild")){i.insertBefore(j,i.get("firstChild"));}else{i.appendChild(j);}}if(!j.contains(Y)){if(this.get("moveStyles")){this._moveStyles(Y,j);}if(L.contains(Y)){Y.get(P).replaceChild(j,Y);}j.appendChild(Y);}},_setBoundingBox:function(L){return this._setBox(L,this.BOUNDING_TEMPLATE);},_setContentBox:function(L){return this._setBox(L,this.CONTENT_TEMPLATE);},_setBox:function(Y,O){Y=d.get(Y);if(!Y){Y=d.create(O);}var L=E.stamp(Y);if(!Y.get(R)){Y.set(R,L);}return Y;},_renderUI:function(L){this.get(e).addClass(F._CLASSNAME);this.get(e).addClass(this._className);this.get(T).addClass(this._className+X+M);this._renderBox(L);},_bindUI:function(){this.after("visibleChange",this._onVisibleChange);this.after("disabledChange",this._onDisabledChange);this.after("heightChange",this._onHeightChange);this.after("widthChange",this._onWidthChange);this.after("hasFocusChange",this._onHasFocusChange);this._bindDOMListeners();},_bindDOMListeners:function(){this.get(e).on(G,E.bind(this._onFocus,this));this.get(e).on(C,E.bind(this._onBlur,this));},_syncUI:function(){this._uiSetVisible(this.get(a));this._uiSetDisabled(this.get(c));this._uiSetHeight(this.get(W));this._uiSetWidth(this.get(I));this._uiSetHasFocus(this.get(A));this._uiSetTabIndex(this.get(D));},_uiSetHeight:function(L){if(Q.isNumber(L)){L=L+this.DEF_UNIT;}this.get(e).setStyle(W,L);},_uiSetWidth:function(L){if(Q.isNumber(L)){L=L+this.DEF_UNIT;}this.get(e).setStyle(I,L);},_uiSetVisible:function(Y){var O=this.get(e),L=this.getClassName(b);if(Y===true){O.removeClass(L);}else{O.addClass(L);}},_uiSetDisabled:function(Y){var O=this.get(e),L=this.getClassName(c);if(Y===true){O.addClass(L);}else{O.removeClass(L);}},_uiSetHasFocus:function(i,Y){var O=this.get(e),L=this.getClassName(G);if(i===true){O.addClass(L);if(Y!==N){O.focus();}}else{O.removeClass(L);if(Y!==N){O.blur();}}},_uiSetTabIndex:function(L){this.get(e).set(D,L);
},_onVisibleChange:function(L){this._uiSetVisible(L.newVal);},_onDisabledChange:function(L){this._uiSetDisabled(L.newVal);},_onHeightChange:function(L){this._uiSetHeight(L.newVal);},_onWidthChange:function(L){this._uiSetWidth(L.newVal);},_onHasFocusChange:function(L){this._uiSetHasFocus(L.newVal,L.src);},_onFocus:function(){this.set(A,true,{src:N});},_onBlur:function(){this.set(A,false,{src:N});},toString:function(){return this.constructor.NAME+"["+this._yuid+"]";},DEF_UNIT:"px",CONTENT_TEMPLATE:"<div></div>",BOUNDING_TEMPLATE:"<div></div>",WRAP_STYLES:{height:"100%",width:"100%",zIndex:false,position:"static",top:"0",left:"0",bottom:"",right:"",padding:"",margin:""},HTML_PARSER:null,_setStrings:function(O,L){var Y=this._strings;L=L.toLowerCase();if(!Y[L]){Y[L]={};}E.aggregate(Y[L],O,true);return Y[L];},_getStrings:function(L){return this._strings[L.toLowerCase()];},getStrings:function(p){p=(p||this.get(H)).toLowerCase();var n=this.getDefaultLocale().toLowerCase(),O=this._getStrings(n),o=(O)?E.merge(O):{},m=p.split(X);if(p!==n||m.length>1){var L="";for(var j=0,Y=m.length;j<Y;++j){L+=m[j];var k=this._getStrings(L);if(k){E.aggregate(o,k,true);}L+=X;}}return o;},getString:function(Y,O){O=(O||this.get(H)).toLowerCase();var i=(this.getDefaultLocale()).toLowerCase(),j=this._getStrings(i)||{},k=j[Y],L=O.lastIndexOf(X);if(O!==i||L!=-1){do{j=this._getStrings(O);if(j&&Y in j){k=j[Y];break;}L=O.lastIndexOf(X);if(L!=-1){O=O.substring(0,L);}}while(L!=-1);}return k;},getDefaultLocale:function(){return this._conf.get(H,J);},_strings:null});F.PLUGINS=[];E.mix(F,E.PluginHost,false,null,1);E.augment(F,E.ClassNameManager);E.aggregate(F,E.ClassNameManager);E.Widget=F;},"@VERSION@",{requires:["base","node","classnamemanager"]});