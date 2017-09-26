document.addEventListener('DOMContentLoaded', function() {
  new Vue({
    el: '#exercise',
    data: {
      vfx: {
        highlight: true,
        shrink   : false
      },
      inputClass:'',
      userClass: '',
      isVisible: false,
      inputClass2: '',
      finish: false
    },
    methods: {
      startEffect: function(){
        var local = this;
        setInterval(function() {
          local.vfx.highlight = !local.vfx.highlight;
          local.vfx.shrink = !local.vfx.shrink;
        }, 1000);
      },

      startProgress: function() {
        var local = this;
        setInterval(function() {
          local.finish = !local.finish;
        }, 2000);
      }
    }
  });
});
