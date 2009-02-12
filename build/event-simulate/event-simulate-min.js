YUI.add("event-simulate",function(A){(function(){var H=A.Lang,G=A.Array,D=H.isFunction,C=H.isString,E=H.isBoolean,M=H.isObject,K=H.isNumber,J=A.config.doc,N=["click","dblclick","mouseover","mouseout","mousedown","mouseup","mousemove"],I=["keydown","keyup","keypress"];function F(S,W,R,P,Y,O,L,X,U,a,Z){if(!S){A.error("simulateKeyEvent(): Invalid target.");}if(C(W)){W=W.toLowerCase();switch(W){case"textevent":W="keypress";break;case"keyup":case"keydown":case"keypress":break;default:A.error("simulateKeyEvent(): Event type '"+W+"' not supported.");}}else{A.error("simulateKeyEvent(): Event type must be a string.");}if(!E(R)){R=true;}if(!E(P)){P=true;}if(!M(Y)){Y=window;}if(!E(O)){O=false;}if(!E(L)){L=false;}if(!E(X)){X=false;}if(!E(U)){U=false;}if(!K(a)){a=0;}if(!K(Z)){Z=0;}var V=null;if(D(J.createEvent)){try{V=J.createEvent("KeyEvents");V.initKeyEvent(W,R,P,Y,O,L,X,U,a,Z);}catch(T){try{V=J.createEvent("Events");}catch(Q){V=J.createEvent("UIEvents");}finally{V.initEvent(W,R,P);V.view=Y;V.altKey=L;V.ctrlKey=O;V.shiftKey=X;V.metaKey=U;V.keyCode=a;V.charCode=Z;}}S.dispatchEvent(V);}else{if(M(J.createEventObject)){V=J.createEventObject();V.bubbles=R;V.cancelable=P;V.view=Y;V.ctrlKey=O;V.altKey=L;V.shiftKey=X;V.metaKey=U;V.keyCode=(Z>0)?Z:a;S.fireEvent("on"+W,V);}else{A.error("simulateKeyEvent(): No event simulation framework present.");}}}function B(X,c,U,R,d,W,T,S,Q,O,P,L,b,Z,V,Y){if(!X){A.error("simulateMouseEvent(): Invalid target.");}if(C(c)){c=c.toLowerCase();if(G.indexOf(N,c)==-1){A.error("simulateMouseEvent(): Event type '"+c+"' not supported.");}}else{A.error("simulateMouseEvent(): Event type must be a string.");}if(!E(U)){U=true;}if(!E(R)){R=(c!="mousemove");}if(!M(d)){d=window;}if(!K(W)){W=1;}if(!K(T)){T=0;}if(!K(S)){S=0;}if(!K(Q)){Q=0;}if(!K(O)){O=0;}if(!E(P)){P=false;}if(!E(L)){L=false;}if(!E(b)){b=false;}if(!E(Z)){Z=false;}if(!K(V)){V=0;}var a=null;if(D(J.createEvent)){a=J.createEvent("MouseEvents");if(a.initMouseEvent){a.initMouseEvent(c,U,R,d,W,T,S,Q,O,P,L,b,Z,V,Y);}else{a=J.createEvent("UIEvents");a.initEvent(c,U,R);a.view=d;a.detail=W;a.screenX=T;a.screenY=S;a.clientX=Q;a.clientY=O;a.ctrlKey=P;a.altKey=L;a.metaKey=Z;a.shiftKey=b;a.button=V;a.relatedTarget=Y;}if(Y&&!a.relatedTarget){if(c=="mouseout"){a.toElement=Y;}else{if(c=="mouseover"){a.fromElement=Y;}}}X.dispatchEvent(a);}else{if(M(J.createEventObject)){a=J.createEventObject();a.bubbles=U;a.cancelable=R;a.view=d;a.detail=W;a.screenX=T;a.screenY=S;a.clientX=Q;a.clientY=O;a.ctrlKey=P;a.altKey=L;a.metaKey=Z;a.shiftKey=b;switch(V){case 0:a.button=1;break;case 1:a.button=4;break;case 2:break;default:a.button=0;}a.relatedTarget=Y;X.fireEvent("on"+c,a);}else{A.error("simulateMouseEvent(): No event simulation framework present.");}}}G.each(N,function(L){A.Event[L]=function(P,O){O=O||{};B(P,L,O.bubbles,O.cancelable,O.view,O.detail,O.screenX,O.screenY,O.clientX,O.clientY,O.ctrlKey,O.altKey,O.shiftKey,O.metaKey,O.button,O.relatedTarget);};});G.each(I,function(L){A.Event[L]=function(P,O){O=O||{};F(P,L,O.bubbles,O.cancelable,O.view,O.ctrlKey,O.altKey,O.shiftKey,O.metaKey,O.keyCode,O.charCode);};});A.Event.simulate=function(P,O,L){if(D(A.Event[O])){A.Event[O](P,L);}};})();},"@VERSION@");