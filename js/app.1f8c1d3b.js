(function(e){function n(n){for(var r,o,s=n[0],c=n[1],u=n[2],l=0,f=[];l<s.length;l++)o=s[l],i[o]&&f.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(n);while(f.length)f.shift()();return a.push.apply(a,u||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,s=1;s<t.length;s++){var c=t[s];0!==i[c]&&(r=!1)}r&&(a.splice(n--,1),e=o(o.s=t[0]))}return e}var r={},i={app:0},a=[];function o(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/three-animated-instances/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=n,s=s.slice();for(var u=0;u<s.length;u++)n(s[u]);var d=c;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("64a9"),i=t.n(r);i.a},2986:function(e,n,t){"use strict";var r=t("7ed9"),i=t.n(r);i.a},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},a=[],o=(t("034f"),t("2877")),s={},c=Object(o["a"])(s,i,a,!1,null,null,null),u=c.exports,d=t("8c4f"),l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("canvas",{ref:"canvas"})])},f=[],h=t("d225"),m=t("b0b4"),p=t("308d"),v=t("6bb5"),w=t("4e2b"),b=t("5a89"),y=t("bd2e"),g=t.n(y),x=t("6397"),j=t("faa1");window.THREE=b;var _=function(e){function n(e){var t;return Object(h["a"])(this,n),t=Object(p["a"])(this,Object(v["a"])(n).call(this)),t.init(e),t}return Object(w["a"])(n,e),Object(m["a"])(n,[{key:"init",value:function(e){var n=this;this.camera=new b["PerspectiveCamera"](27,window.innerWidth/window.innerHeight,1,1e4),this.camera.position.set(14,14,14),this.scene=new b["Scene"];var t=new b["PointLight"](16777215,1,100);t.position.set(50,50,50),this.scene.add(t);t=new b["PointLight"](16777215,1,100);t.position.set(-50,50,-50),this.scene.add(t),this.renderer=new b["WebGLRenderer"]({antialias:!0,canvas:e}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.controls=new x(this.camera,e),window.addEventListener("resize",function(){return n.onWindowResize()},!1),window.scene=this.scene,window.instance=this,window.scene=this.scene,window.engine3d=this,this.update(Date.now())}},{key:"update",value:function(e){var n=this;requestAnimationFrame(function(){return n.update()}),this.renderer.render(this.scene,this.camera),this.controls.update(),this.emit("update")}},{key:"onWindowResize",value:function(){var e=window.innerWidth,n=window.innerHeight;this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n)}}]),n}(j),O=_,A=(t("a481"),t("63d9"),t("6c7b"),function(){function e(n){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;Object(h["a"])(this,e),this.numInstances=r,this.loadMesh(n),engine3d.on("update",function(){return t.onUpdate()})}return Object(m["a"])(e,[{key:"loadMesh",value:function(e){var n=this,t=new g.a;t.load(e,function(e){var t=e.scene;n.tracks=e.animations[0].tracks,t.traverse(function(e){e instanceof b["SkinnedMesh"]&&n.instanciate(e)}),scene.add(t),scene.position.set(4*Math.random(),0,4*Math.random()),n.mixer=new b["AnimationMixer"](t);var r=n.mixer.clipAction(e.animations[0]);r.play()})}},{key:"onUpdate",value:function(){this.mixer&&this.mixer.update(1/60)}},{key:"instanciate",value:function(e){var n=e.geometry instanceof b["BufferGeometry"]?(new b["InstancedBufferGeometry"]).copy(e.geometry):(new b["InstancedBufferGeometry"]).fromDirectGeometry(e.geometry);n.maxInstancedCount=this.numInstances;for(var t=new Float32Array(3*this.numInstances).fill(0).map(function(e,n){return n%3===2?0:10*Math.random()-5}),r=new Float32Array(3*this.numInstances).fill(0).map(function(e,n){return Math.random()+1}),i=new Float32Array(4*this.numInstances).fill(0),a=0;a<this.numInstances;a++){var o=(new b["Quaternion"]).setFromAxisAngle(new b["Vector3"](0,0,1),2*Math.PI*Math.random());o.toArray(i,4*a)}n.addAttribute("positions",new b["InstancedBufferAttribute"](t,3,!1)),n.addAttribute("scales",new b["InstancedBufferAttribute"](r,3,!1)),n.addAttribute("rotations",new b["InstancedBufferAttribute"](i,4,!1));var s=e.material.clone();b["ShaderChunk"].animated_instance_pars_vertex="\n      attribute vec3 positions;\n      attribute vec3 scales;\n      attribute vec4 rotations;\n\n      vec3 qtransform( vec4 q, vec3 v ){\n       return v + 2.0*cross(cross(v, q.xyz ) + q.w*v, q.xyz);\n      }\n\n    ",b["ShaderChunk"].begin_animated_instance="\n    transformed = qtransform(rotations, transformed * scales) + positions;\n    ",s.onBeforeCompile=function(e){e.uniforms.time={value:0},e.vertexShader=e.vertexShader.replace("#include <common>","\n          #include <common>\n          #include <animated_instance_pars_vertex>\n          ").replace("#include <project_vertex>","\n          #include <begin_animated_instance>\n          #include <project_vertex>\n        ")},e.material.dispose(),e.geometry.dispose(),e.material=s,e.geometry=n}}]),e}()),M=A;(function(){var e=document.createElement("script");e.onload=function(){var e=new Stats;document.body.appendChild(e.dom),requestAnimationFrame(function n(){e.update(),requestAnimationFrame(n)})},e.src="//mrdoob.github.io/stats.js/build/stats.min.js",document.head.appendChild(e)})();var k={name:"BadTV",mounted:function(){new O(this.$refs.canvas),new M("/three-animated-instances/CesiumMan.glb")}},S=k,I=(t("2986"),Object(o["a"])(S,l,f,!1,null,"27036bd3",null)),P=I.exports;r["a"].use(d["a"]);var q=new d["a"]({mode:"history",base:"/three-animated-instances/",routes:[{path:"/",name:"demo",component:P}]});r["a"].config.productionTip=!1,new r["a"]({router:q,render:function(e){return e(u)}}).$mount("#app")},"64a9":function(e,n,t){},"7ed9":function(e,n,t){}});
//# sourceMappingURL=app.1f8c1d3b.js.map