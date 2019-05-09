<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
javascript: (function() {
  var script = document.createElement("script");
  script.onload = function() {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
  document.head.appendChild(script);
})();
import Engine3d from "../js/engine-3d";

import Instance from "../js/instance";

export default {
  name: "BadTV",

  mounted() {
    const engine3d = new Engine3d(this.$refs.canvas);
    const instance = new Instance("/CesiumMan.glb");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
