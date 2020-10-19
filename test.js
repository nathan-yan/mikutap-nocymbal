'use strict';

$(function() {
  (new MainManager).init();
});
/**
 * @return {undefined}
 */
var MainManager = function() {
  /**
   * @return {undefined}
   */
  function resizeInput() {
    width = aidn.window.width();
    height = aidn.window.height();
    if (canvas) {
      canvas.resize(width, height);
      if (me) {
        me.resize();
      }
    }
  }
  /**
   * @param {number} i
   * @param {number} a
   * @return {undefined}
   */
  function e(i, a) {
    a = list.length + x.length;
    if (1 == s2) {
      i = i + x.length;
    }
    /** @type {string} */
    var meterPos = Math.round(i / a * 100) + "%";
    if (a <= 0) {
      /** @type {string} */
      meterPos = "0%";
    }
    $("#scene_loading hr").css("width", meterPos);
  }
  /**
   * @return {undefined}
   */
  function app() {
    if (1 == ++s2) {
      list.init(app, e);
    } else {
      if (2 == s2) {
        f();
      }
    }
  }
  /**
   * @return {undefined}
   */
  function f() {
    /** @type {number} */
    b = 1;
    $("#scene_loading hr").css("display", "none");
    $("#scene_loading hr").css("width", 0);
    $("#scene_loading").stop().fadeOut(200, "linear");
    if (p) {
      $("#scene_loading").stop().css("display", "none");
      $("#bt_back").stop().css("display", "none");
      if (B) {
        $("#bt_fs").stop().css("display", "none");
      }
      $("#scene_main .set").stop().css("display", "none");
    } else {
      $("#scene_main").stop().fadeIn(200, "linear");
    }
    noteOnAt = aidn.___waContext.currentTime;
    me.start();
    x.start();
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function create(event) {
    if (U = !U) {
      $("#bt_feedback a").text("FEEDBACK: ON");
      aidn.util.setCookie("fb", "on", 2592e3);
    } else {
      $("#bt_feedback a").text("FEEDBACK: OFF");
      aidn.util.setCookie("fb", "off", 2592e3);
    }
    if (event) {
      event.preventDefault();
    }
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function register(event) {
    if (T = !T) {
      $("#bt_backtrack a").text("BACKTRACK: ON");
      aidn.util.setCookie("bt", "on", 2592e3);
    } else {
      $("#bt_backtrack a").text("BACKTRACK: OFF");
      aidn.util.setCookie("bt", "off", 2592e3);
    }
    if (event) {
      event.preventDefault();
    }
  }
  /**
   * @return {undefined}
   */
  function update() {
    x.update();
    if (1 == b && --D < 0) {
      buildCursor();
    }
    (function() {
      if (!p) {
        return;
      }
      if (1 != b) {
        return;
      }
      /** @type {number} */
      var delta = 1e3 * (aidn.___waContext.currentTime - noteOnAt);
      if (y * factor < delta) {
        /** @type {number} */
        var zero = Math.floor(delta / factor) + 1;
        tmax = tmax + (zero - y);
        /** @type {number} */
        var visWidth = (y = zero) * factor - delta;
        if (0 <= visWidth) {
          /** @type {number} */
          var big = Math.random();
          /** @type {number} */
          var i = 1;
          if (192 <= tmax) {
            /** @type {number} */
            tmax = 0;
          } else {
            if (128 <= tmax) {
              if (big < .7) {
                /** @type {number} */
                i = 2;
              }
              if (big < .5) {
                /** @type {number} */
                i = 3;
              }
            } else {
              if (64 <= tmax) {
                if (big < .35) {
                  /** @type {number} */
                  i = 2;
                }
                if (big < .2) {
                  /** @type {number} */
                  i = 3;
                }
                if (big < .02) {
                  /** @type {number} */
                  i = 0;
                }
              } else {
                if (32 <= tmax) {
                  if (big < .35) {
                    /** @type {number} */
                    i = 2;
                  }
                  if (big < .24) {
                    /** @type {number} */
                    i = 0;
                  }
                } else {
                  if (0 <= tmax && big < .4) {
                    /** @type {number} */
                    i = 0;
                  }
                }
              }
            }
          }
          /** @type {number} */
          var nextCreation = 0;
          for (; nextCreation < i; nextCreation++) {
            id = data[foreignKey];
            if (32 <= ++foreignKey) {
              /** @type {number} */
              foreignKey = 0;
              aidn.util.shuffleArray(data);
            }
            me.changeId(id, 0, true);
          }
        }
      }
    })();
    canvas.render(container);
    window.requestAnimFrame(update);
  }
  /**
   * @return {undefined}
   */
  function buildCursor() {
    if (!(p || isVirtual)) {
      /** @type {boolean} */
      isVirtual = true;
      $("#bt_back").stop().fadeIn(200, "linear");
      if (B) {
        $("#bt_fs").stop().fadeIn(200, "linear");
      }
      $("#scene_main .set").stop().fadeIn(200, "linear");
    }
  }
  aidn.util.useDummyDiv();
  /**
   * @return {undefined}
   */
  this.init = function() {
    !function() {
      aidn.window.addDummyDiv();
      try {
        aidn.adv.show();
      } catch (n) {
      }
      /** @type {number} */
      var res = 1;
      if (2 <= window.devicePixelRatio) {
        /** @type {number} */
        res = 2;
      }
      /** @type {boolean} */
      (canvas = PIXI.autoDetectRenderer(width, height, {
        backgroundColor : 16756655,
        antialias : false,
        resolution : res
      })).autoResize = true;
      document.getElementById("view").appendChild(canvas.view);
      container = new PIXI.Container;
      me.init();
      resizeInput();
      $("#scene_top").fadeIn(300);
      update();
    }();
  };
  /** @type {number} */
  var y = 0;
  /** @type {number} */
  var factor = 6e4 / 280;
  /** @type {number} */
  var id = Math.floor(32 * Math.random());
  /** @type {number} */
  var tmax = 0;
  /** @type {!Array} */
  var data = [];
  /** @type {number} */
  var foreignKey = 0;
  /** @type {number} */
  var courseId = 0;
  for (; courseId < 32; courseId++) {
    /** @type {number} */
    data[courseId] = courseId;
  }
  /** @type {boolean} */
  var p = false;
  if (1 == aidn.util.getQuery().auto) {
    /** @type {boolean} */
    p = true;
  }
  aidn.util.needExpandArea(true);
  var B = aidn.util.enabledFullscreen();
  if (B) {
    $("#bt_fs").css("display", "block");
    $("#bt_fs").click(function(n) {
      aidn.util.fullscreen();
    });
  }
  $("#bt_start a").click(function(event) {
    $("#scene_top").stop().fadeOut(200, "linear");
    $("#scene_loading").stop().fadeIn(200, "linear");
    if (2 == s2) {
      f();
    } else {
      (new aidn.WebAudio).load("");
      x.init(app, e);
    }
    try {
      aidn.adv.hide();
    } catch (n) {
    }
    event.preventDefault();
  });
  $("#bt_about a").click(function(event) {
    $("#about").stop().fadeIn(200, "linear");
    $("#about_cover").stop().fadeIn(200, "linear");
    event.preventDefault();
  });
  $("#bt_close,#about_cover").click(function() {
    $("#about").stop().fadeOut(200, "linear");
    $("#about_cover").stop().fadeOut(200, "linear");
  });
  $("#bt_back").click(function() {
    switch(b) {
      case 1:
        /** @type {number} */
        b = 0;
        try {
          aidn.adv.show();
        } catch (n) {
        }
        me.end();
        x.end();
        $("#scene_top").stop().fadeIn(100, "linear");
        $("#scene_loading").stop().fadeOut(100, "linear");
        $("#scene_main").stop().fadeOut(100, "linear");
        buildCursor();
        break;
      default:
        /** @type {string} */
        location.href = "../contents/";
    }
  });
  $("#bt_feedback a").click(create);
  $("#bt_backtrack a").click(register);
  var width;
  var height;
  var arraynames = aidn.util.checkJapanese();
  var currentRoot = aidn.util.checkMobile();
  /** @type {string} */
  var artistTrack = "https://aidn.jp/mikutap/";
  /** @type {string} */
  var out = "Mikutap";
  /** @type {string} */
  out = out + (arraynames ? ",\u86fb\u665e\u6d79\u7e5d\u6e98\u305110\u873b\uff68\u87f7\uff74" : ",Miku10th");
  $("#bt_tw").click(function(n) {
    /** @type {string} */
    var orig_doc_title = document.title;
    aidn.social.shareTw(artistTrack, true, orig_doc_title, "daniwell_aidn", out);
  });
  $("#bt_fb").click(function(n) {
    aidn.social.shareFb(artistTrack, true);
  });
  $("#bt_gp").click(function(n) {
    aidn.social.shareGp(artistTrack, true);
  });
  var noteOnAt;
  var canvas;
  var container;
  /** @type {number} */
  var s2 = 0;
  /** @type {number} */
  var b = 0;
  var x = new function() {
    /**
     * @return {undefined}
     */
    function cont() {
      if (end) {
        end();
      }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {undefined}
     */
    function onerror(a, b) {
      if (f) {
        f(a, b);
      }
    }
    var stage;
    /**
     * @param {!Function} fn
     * @param {!Function} o
     * @return {undefined}
     */
    this.init = function(fn, o) {
      /** @type {!Function} */
      f = o;
      (function(defaultValue) {
        /** @type {!Function} */
        end = defaultValue;
        /** @type {!Array} */
        var sequenceSeed = [];
        /** @type {number} */
        var i = 0;
        for (; i < length; i++) {
          /** @type {!Array} */
          sequenceSeed[i] = [i + ".mp3"];
        }
        (stage = new WebAudioManager).load("data/track/track.json", sequenceSeed, cont, onerror);
      })(fn);
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      !function() {
        if (l) {
          /** @type {number} */
          var y = 1e3 * (aidn.___waContext.currentTime - noteOnAt);
          if (start * factor < y) {
            /** @type {number} */
            var z = (start = Math.floor(y / factor) + 1) * factor - y;
            if (0 <= z) {
              if (!T) {
                return;
              }
              /** @type {number} */
              var id = (start - 1) % add;
              /** @type {number} */
              var i = options.length;
              /** @type {number} */
              var dep = 0;
              for (; dep < i; dep++) {
                var x = options[dep][id];
                if (0 <= x) {
                  stage.play(x, z / 1E3, args[x]);
                }
              }
            }
          }
        }
      }();
    };
    /**
     * @return {undefined}
     */
    this.start = function() {
      /** @type {boolean} */
      l = true;
      /** @type {number} */
      start = 0;
    };
    /**
     * @return {undefined}
     */
    this.end = function() {
      /** @type {boolean} */
      l = false;
      /** @type {number} */
      start = 0;
    };
    /** @type {boolean} */
    var l = false;
    /** @type {number} */
    var length = 11;
    /** @type {number} */
    this.length = length;
    /** @type {!Array} */
    var args = [];
    /** @type {number} */
    var i = 0;
    for (; i < length; i++) {
      /** @type {number} */
      args[i] = 1.2;
    }
    args[1] *= .6;
    /** @type {!Array} */
    var options = [[0, 1, 2, 1], []];
    /** @type {string} */
    var s = "";
    /** @type {string} */
    s = s + "3443443443443434";
    /** @type {string} */
    s = s + "5665665665665656";
    /** @type {string} */
    s = s + "7887887887887878";
    /** @type {number} */
    var patchLen = (s = s + "9119119119119191").length;
    /** @type {number} */
    i = 0;
    for (; i < patchLen; i++) {
      /** @type {number} */
      var h = parseInt(s.charAt(i));
      if (1 == h) {
        /** @type {number} */
        h = 10;
      }
      /** @type {number} */
      options[1][i] = h;
      if (4 <= i) {
        options[0][i] = options[0][i % 4];
      }
    }
    var end;
    var f;
    var add = options[0].length;
    /** @type {number} */
    var start = 0;
    /** @type {number} */
    var factor = 6E4 / 280;
  };
  var list = new function() {
    /**
     * @return {undefined}
     */
    function cont() {
      if (end) {
        end();
      }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {undefined}
     */
    function orig(a, b) {
      if (imgItAuto) {
        imgItAuto(a, b);
      }
    }
    var o;
    /** @type {number} */
    var curr_val = -1;
    /** @type {number} */
    var unit = -1;
    /**
     * @param {!Function} a
     * @param {!Function} b
     * @return {undefined}
     */
    this.init = function(a, b) {
      /** @type {!Function} */
      imgItAuto = b;
      (function(dst) {
        /** @type {!Function} */
        end = dst;
        /** @type {!Array} */
        var sequenceSeed = [];
        /** @type {number} */
        var i = 0;
        for (; i < length; i++) {
          /** @type {!Array} */
          sequenceSeed[i] = [i + ".mp3"];
        }
        (o = new WebAudioManager).load("data/main/main.json", sequenceSeed, cont, orig);
      })(a);
    };
    /**
     * @param {number} i
     * @param {!Function} data
     * @return {undefined}
     */
    this.play = function(i, data) {
      /** @type {number} */
      var idx = 1E3 * (aidn.___waContext.currentTime + conf_shortcuts_icon[i] - noteOnAt);
      /** @type {number} */
      var new_curr_val = Math.floor(idx / numCircles);
      if (new_curr_val == curr_val && 0 <= unit) {
        o.stop(unit);
      }
      /** @type {number} */
      curr_val = new_curr_val;
      /** @type {number} */
      unit = i;
      /** @type {number} */
      var threshDelta = numCircles - idx % numCircles;
      o.play(i, threshDelta / 1E3, xy[i]);
    };
    /** @type {number} */
    var length = 32;
    /** @type {number} */
    this.length = length;
    /** @type {!Array} */
    var xy = [];
    /** @type {!Array} */
    var conf_shortcuts_icon = [];
    /** @type {number} */
    var i = 0;
    for (; i < length; i++) {
      /** @type {number} */
      xy[i] = 1;
      /** @type {number} */
      conf_shortcuts_icon[i] = .05;
    }
    /** @type {number} */
    conf_shortcuts_icon[6] = .08;
    /** @type {number} */
    conf_shortcuts_icon[20] = .1;
    /** @type {number} */
    conf_shortcuts_icon[23] = .1;
    /** @type {number} */
    xy[1] = 1.3;
    /** @type {number} */
    xy[2] = 1.6;
    /** @type {number} */
    xy[3] = 1.35;
    /** @type {number} */
    xy[5] = 1.7;
    /** @type {number} */
    xy[9] = .8;
    /** @type {number} */
    xy[17] = .8;
    /** @type {number} */
    xy[22] = .9;
    /** @type {number} */
    xy[25] = .7;
    /** @type {number} */
    xy[29] = 1.2;
    /** @type {number} */
    i = 0;
    for (; i < length; i++) {
      xy[i] *= 1.2;
    }
    var end;
    var imgItAuto;
    /** @type {number} */
    var numCircles = 6E4 / 280;
  };
  var me = new function() {
    /**
     * @param {?} a
     * @param {?} d
     * @return {?}
     */
    function m(a, d) {
      /** @type {number} */
      var nbElts = data.length;
      /** @type {number} */
      var i = 0;
      for (; i < nbElts; i++) {
        var t = data[i];
        if (t.hitcheck(a, d)) {
          return prev != t.id && t.play(), t.id;
        }
      }
      return false;
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    function handleEscKeydown(event) {
      callback(65 <= event.keyCode ? event.keyCode - 55 : 48 <= event.keyCode ? event.keyCode - 48 : event.keyCode);
    }
    /**
     * @param {?} n
     * @return {undefined}
     */
    function debouncedUpdateResize(n) {
      callback(-1);
    }
    /**
     * @param {!KeyboardEvent} e
     * @return {undefined}
     */
    function move(e) {
      /** @type {boolean} */
      y = true;
      var point = aidn.event.getPos(e);
      var node = m(point.x, point.y);
      if (callback(node), e.originalEvent && e.originalEvent.touches) {
        var patchLen = e.originalEvent.touches.length;
        /** @type {number} */
        var i = 1;
        for (; i < patchLen; i++) {
          var point = e.originalEvent.touches[i];
          callback(node = m(point.pageX, point.pageY), 1);
        }
      }
    }
    /**
     * @param {!Event} e
     * @return {undefined}
     */
    function end(e) {
      if (y) {
        var point = aidn.event.getPos(e);
        callback(m(point.x, point.y), 0, true);
      }
      e.preventDefault();
    }
    /**
     * @param {?} s
     * @return {undefined}
     */
    function h(s) {
      if (y) {
        callback(-1);
        /** @type {boolean} */
        y = false;
      }
    }
    /**
     * @param {number} n
     * @param {number} elem
     * @param {!Function} type
     * @return {undefined}
     */
    function callback(n, elem, type) {
      var i;
      var row;
      if (prev != n) {
        if (1 != elem) {
          /** @type {number} */
          prev = n;
        }
        if (!(prev < 0)) {
          list.play(n % list.length, type);
          /** @type {number} */
          D = 90;
          if (isVirtual) {
            /** @type {boolean} */
            isVirtual = false;
            $("#bt_back").stop().fadeOut(200, "linear");
            if (B) {
              $("#bt_fs").stop().fadeOut(200, "linear");
            }
            $("#scene_main .set").stop().fadeOut(200, "linear");
          }
          if (--t <= 0) {
            /** @type {number} */
            row = (i = Math.floor(h1Words.length * Math.random())) + titleWords.length;
            (nodeToOutlets[row].length ? nodeToOutlets[row].pop() : new h1Words[i](canvas, row)).play();
            /** @type {number} */
            t = 12 * Math.random() + 6;
          }
          /** @type {number} */
          i = n % titleWords.length;
          (0 < nodeToOutlets[i].length ? nodeToOutlets[i].pop() : new titleWords[i](canvas, i)).play();
        }
      }
    }
    /**
     * @return {?}
     */
    function parseInt() {
      /** @type {number} */
      var n = Math.random();
      return n < .03 ? 4473924 : n < .18 ? 16777215 : format[toString()];
    }
    /**
     * @return {?}
     */
    function toString() {
      /** @type {number} */
      var n = 0;
      for (; n < 10; n++) {
        /** @type {number} */
        var a = Math.floor(length * Math.random());
        if (2 < Math.abs(x - a)) {
          break;
        }
      }
      return a;
    }
    /**
     * @param {string} component
     * @param {!Object} stage
     * @return {undefined}
     */
    var init = function(component, stage) {
      /** @type {string} */
      this.id = component;
      /**
       * @param {number} x
       * @param {number} y
       * @return {undefined}
       */
      this.setPosition = function(x, y) {
        graphics.position.x = start = x;
        graphics.position.y = b = y;
      };
      /**
       * @param {number} value
       * @param {number} type
       * @return {undefined}
       */
      this.setSize = function(value, type) {
        /** @type {number} */
        width = value;
        /** @type {number} */
        t = type;
        graphics.clear();
        graphics.beginFill(16777215);
        /** @type {number} */
        graphics.alpha = 0;
        graphics.drawRect(0, 0, width, t);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        if (U) {
          TweenLite.fromTo(graphics, .5, {
            alpha : .7
          }, {
            alpha : 0,
            ease : Power0.easeNon
          });
        }
      };
      /**
       * @param {?} i
       * @param {?} a
       * @return {?}
       */
      this.hitcheck = function(i, a) {
        return start <= i && i < start + width && b <= a && a < b + t;
      };
      /** @type {number} */
      var start = 0;
      /** @type {number} */
      var b = 0;
      /** @type {number} */
      var width = 0;
      /** @type {number} */
      var t = 0;
      var graphics = new PIXI.Graphics;
      /** @type {boolean} */
      graphics.interactive = true;
      stage.addChild(graphics);
    };
    /**
     * @param {!Object} aFormValues
     * @return {undefined}
     */
    var FloatingPanel = function(aFormValues) {
      /**
       * @return {undefined}
       */
      function init() {
        o.clear();
        o.beginFill(16777215);
        o.drawRect(0, 0, width, height);
      }
      /**
       * @return {undefined}
       */
      function removeErrorStatus() {
        blurFBO.resize();
      }
      /**
       * @return {undefined}
       */
      this.resize = function() {
        o.clear();
        o.beginFill(fill);
        o.drawRect(0, 0, width, height);
      };
      /**
       * @return {undefined}
       */
      this.flash = function() {
        p.setChildIndex(o, p.children.length - 1);
        /** @type {number} */
        var value = 0;
        for (; value < 3; value = value + 2) {
          TweenLite.delayedCall(.07 * value, init);
          TweenLite.delayedCall(.07 * (value + 1), removeErrorStatus);
        }
      };
      /**
       * @param {number} color
       * @param {number} index
       * @return {undefined}
       */
      this.setColor = function(color, index) {
        /** @type {number} */
        fill = color;
        index = 0 <= index ? index : 0;
        p.setChildIndex(o, index);
        blurFBO.resize();
      };
      var blurFBO = this;
      /** @type {number} */
      var fill = 16777215;
      var o = new PIXI.Graphics;
      /** @type {!Object} */
      var p = aFormValues;
      p.addChild(o);
    };
    /**
     * @param {?} data
     * @param {!Object} options
     * @return {undefined}
     */
    var Animation = function(data, options) {
      /**
       * @return {undefined}
       */
      function draw() {
        var a;
        var x;
        var height;
        /** @type {number} */
        var h = 1.3 * r;
        if (g.clear(), g.beginFill(0), g.moveTo(0, 0), 0 == o) {
          /** @type {number} */
          var i = 0;
          for (; i < target.rotation; i = i + 30) {
            /** @type {number} */
            a = (value * i + fraction) * Math.PI / 180;
            /** @type {number} */
            x = Math.cos(a) * h;
            /** @type {number} */
            height = Math.sin(a) * h;
            g.lineTo(x, height);
          }
        } else {
          /** @type {number} */
          i = 360;
          for (; target.rotation < i; i = i - 30) {
            /** @type {number} */
            a = (value * i + fraction) * Math.PI / 180;
            /** @type {number} */
            x = Math.cos(a) * h;
            /** @type {number} */
            height = Math.sin(a) * h;
            g.lineTo(x, height);
          }
        }
        /** @type {number} */
        a = (value * target.rotation + fraction) * Math.PI / 180;
        /** @type {number} */
        x = Math.cos(a) * h;
        /** @type {number} */
        height = Math.sin(a) * h;
        g.lineTo(x, height);
        g.lineTo(0, 0);
        g.endFill();
      }
      /**
       * @return {undefined}
       */
      function animate() {
        /** @type {number} */
        o = 1;
        TweenLite.fromTo(target, .9, {
          rotation : 0
        }, {
          rotation : 360,
          ease : Power1.easeOut,
          onUpdate : draw,
          onComplete : clear
        });
      }
      /**
       * @return {undefined}
       */
      function clear() {
        if (done) {
          done();
        }
      }
      /**
       * @param {number} x
       * @param {!Function} data
       * @return {undefined}
       */
      this.play = function(x, data) {
        /** @type {number} */
        o = 0;
        /** @type {number} */
        r = x;
        /** @type {!Function} */
        done = data;
        /** @type {number} */
        fraction = 360 * Math.random();
        /** @type {number} */
        value = 1;
        if (Math.random() < .5) {
          /** @type {number} */
          value = -1;
        }
        g.clear();
        g.beginFill(0);
        g.moveTo(0, 0);
        g.lineTo(1, 1);
        g.endFill();
        TweenLite.fromTo(target, .6, {
          rotation : 0
        }, {
          rotation : 360,
          ease : Power1.easeOut,
          onUpdate : draw,
          onComplete : animate
        });
      };
      var o;
      var done;
      var fraction;
      var value;
      var r;
      var textureData = data;
      var target = {
        rotation : 0
      };
      var g = new PIXI.Graphics;
      textureData.addChild(g);
      options.mask = g;
    };
    /**
     * @param {!Object} viewContainer
     * @return {undefined}
     */
    var constructor = function(viewContainer) {
      /**
       * @return {undefined}
       */
      function draw() {
        me.clear();
        if (0 == ongoingMessage) {
          me.lineStyle(style, color);
        } else {
          me.beginFill(color);
        }
        /** @type {number} */
        var i = 0;
        for (; i < channelCount; i++) {
          var a = self["p" + i].x;
          var miny = self["p" + i].y;
          if (0 == i) {
            me.moveTo(a, miny);
          } else {
            me.lineTo(a, miny);
          }
        }
        a = self.p0.x;
        miny = self.p0.y;
        me.lineTo(a, miny);
      }
      /**
       * @return {undefined}
       */
      function animate() {
        /** @type {boolean} */
        me.visible = false;
        if (log) {
          log();
        }
      }
      /**
       * @param {number} message
       * @param {!Function} data
       * @return {undefined}
       */
      this.play = function(message, data) {
        /** @type {number} */
        ongoingMessage = message;
        /** @type {!Function} */
        log = data;
        (function() {
          container.setChildIndex(me, container.children.length - 1);
          /** @type {boolean} */
          me.visible = true;
          /** @type {number} */
          me.x = width / 2;
          /** @type {number} */
          me.y = height / 2;
          color = parseInt();
          var wt;
          /** @type {number} */
          var a = Math.min(width, height) * (.32 * Math.random() + .16);
          /** @type {number} */
          var val = Math.floor(5 * Math.random()) + 3;
          /** @type {number} */
          channelCount = val;
          /** @type {number} */
          style = 5 * Math.random() + 3;
          me.clear();
          /** @type {number} */
          me.rotation = 30 * Math.floor(6 * Math.random());
          self = {};
          /** @type {number} */
          wt = 0 == ongoingMessage ? 3 : 2.5;
          /** @type {number} */
          var size = 360 / channelCount;
          /** @type {number} */
          var i = 0;
          for (; i < channelCount; i++) {
            /** @type {number} */
            var nt = i * size * Math.PI / 180;
            /** @type {number} */
            var r = a * Math.cos(nt);
            /** @type {number} */
            var b = a * Math.sin(nt);
            /** @type {number} */
            var row = r + a * (Math.random() - .5) * wt;
            /** @type {number} */
            var v = b + a * (Math.random() - .5) * wt;
            self["p" + i] = {
              x : r,
              y : b
            };
            TweenLite.to(self["p" + i], .6, {
              x : row,
              y : v
            });
          }
          /** @type {number} */
          self.progress = 0;
          TweenLite.to(self, .8, {
            progress : 1,
            onUpdate : draw,
            onComplete : animate
          });
        })();
      };
      var log;
      var ongoingMessage;
      var color;
      var style;
      var channelCount;
      /** @type {!Object} */
      var container = viewContainer;
      var me = new PIXI.Graphics;
      container.addChild(me);
      var self = {};
    };
    /**
     * @param {!Object} data
     * @param {string} id
     * @return {undefined}
     */
    var createButton = function(data, id) {
      /**
       * @return {undefined}
       */
      function callback() {
        /** @type {boolean} */
        c.visible = false;
        if (0 <= node.id) {
          nodeToOutlets[node.id].push(node);
        }
        if (e) {
          e();
        }
      }
      /**
       * @param {?} game
       * @return {undefined}
       */
      var Play = function(game) {
        /**
         * @return {undefined}
         */
        function _createBodyPrimitive() {
          ctx.clear();
          ctx.lineStyle(width, style);
          ctx.moveTo(scale.x, scale.y);
          if (0 == u) {
            ctx.lineTo(r.x, r.y);
          } else {
            ctx.lineTo(item.x, item.y);
          }
        }
        /**
         * @return {undefined}
         */
        function animate() {
          if (0 == u) {
            /** @type {number} */
            u = 1;
            scale = {
              x : r.x,
              y : r.y
            };
            TweenLite.to(scale, duration, {
              x : item.x,
              y : item.y,
              ease : Power1.easeOut,
              onUpdate : _createBodyPrimitive,
              onComplete : animate
            });
          } else {
            ctx.clear();
            /** @type {boolean} */
            ctx.visible = false;
          }
        }
        /**
         * @param {number} x
         * @param {!Function} data
         * @param {number} source
         * @param {number} obj
         * @return {?}
         */
        this.play = function(x, data, source, obj) {
          return ctx.visible = true, u = 0, r = x, item = data, width = source, style = obj, time = .2 * Math.random() + .2, duration = .2 * Math.random() + .2, scale = {
            x : r.x,
            y : r.y
          }, TweenLite.to(scale, time, {
            x : item.x,
            y : item.y,
            ease : Power1.easeOut,
            onUpdate : _createBodyPrimitive,
            onComplete : animate
          }), time + duration;
        };
        var r;
        var item;
        var scale;
        var width;
        var style;
        var time;
        var duration;
        var u;
        var appid = game;
        var ctx = new PIXI.Graphics;
        appid.addChild(ctx);
      };
      /**
       * @param {number} a
       * @return {undefined}
       */
      this.play = function(a) {
        /** @type {number} */
        e = a;
        (function() {
          p.setChildIndex(c, p.children.length - 1);
          /** @type {boolean} */
          c.visible = true;
          /** @type {number} */
          c.x = width / 2;
          /** @type {number} */
          c.y = height / 2;
          /** @type {number} */
          c.rotation = .5 * Math.PI * Math.floor(4 * Math.random());
          var end;
          /** @type {number} */
          var e = Math.floor(7 * Math.random() + 2);
          /** @type {number} */
          var s = .8 * Math.min(width, height);
          /** @type {number} */
          var hLen = (node.size = s) / e * (.4 * Math.random() + .7);
          /** @type {number} */
          var index = s / e * (.4 * Math.random() + .1);
          var duration = parseInt();
          /** @type {number} */
          var target = 0;
          /** @type {number} */
          var l = 0;
          for (; l <= e; l++) {
            /** @type {number} */
            var destPos = (l - .5 * e) * hLen;
            var d = {
              x : -s / 2,
              y : destPos
            };
            var data = {
              x : s / 2,
              y : destPos
            };
            var value = (end = lg[l] ? lg[l] : new Play(c)).play(d, data, index, duration);
            if (target < value) {
              target = value;
            }
            lg[l] = end;
          }
          TweenLite.delayedCall(target, callback);
        })();
      };
      var node = this;
      /** @type {!Object} */
      var p = data;
      /** @type {string} */
      this.id = id;
      var e;
      var c = new PIXI.Container;
      /** @type {!Array} */
      var lg = [];
      /** @type {number} */
      this.size = 0;
      this.container = c;
      p.addChild(c);
    };
    /**
     * @return {undefined}
     */
    this.resize = function() {
      if (w) {
        /** @type {number} */
        var id = 0;
        /** @type {number} */
        var size = squareSize;
        /** @type {number} */
        var zoom = prefSize;
        if (height < width) {
          /** @type {number} */
          size = prefSize;
          /** @type {number} */
          zoom = squareSize;
        }
        /** @type {number} */
        var x = width / size;
        /** @type {number} */
        var y = height / zoom;
        /** @type {number} */
        var z = 0;
        for (; z < zoom; z++) {
          /** @type {number} */
          var i = 0;
          for (; i < size; i++) {
            var context;
            if (data[id]) {
              context = data[id];
            } else {
              context = new init(id, element);
              data[id] = context;
            }
            context.setPosition(x * i, y * z);
            context.setSize(x, y);
            id++;
          }
        }
        input.resize();
      }
    };
    /**
     * @return {undefined}
     */
    this.init = function() {
      /** @type {boolean} */
      w = true;
      canvas = new PIXI.Container;
      container.addChild(canvas);
      element = new PIXI.Container;
      container.addChild(element);
      (input = new FloatingPanel(canvas)).setColor(8965324, 0);
    };
    /**
     * @return {undefined}
     */
    this.start = function() {
      if (!currentRoot) {
        $("#view").on("mousedown", move);
        $(window).on("mousemove", end);
        $(window).on("mouseup", h);
        $(window).on("keydown", handleEscKeydown);
        $(window).on("keyup", debouncedUpdateResize);
      }
      if (currentRoot || window.TouchEvent) {
        $("#view").on("touchstart", move);
        $(window).on("touchmove", end);
        $(window).on("touchend", h);
      }
      $("#view").css("cursor", "pointer");
    };
    /**
     * @return {undefined}
     */
    this.end = function() {
      if (!currentRoot) {
        $("#view").off("mousedown", move);
        $(window).off("mousemove", end);
        $(window).off("mouseup", h);
        $(window).off("keydown", handleEscKeydown);
        $(window).off("keyup", debouncedUpdateResize);
      }
      if (currentRoot || window.TouchEvent) {
        $("#view").off("touchstart", move);
        $(window).off("touchmove", end);
        $(window).off("touchend", h);
      }
      $("#view").css("cursor", "auto");
    };
    /**
     * @param {undefined} n
     * @param {number} e
     * @param {!Function} id
     * @return {undefined}
     */
    this.changeId = function(n, e, id) {
      callback(n, e, id);
    };
    var element;
    /** @type {number} */
    var prev = -1;
    /** @type {number} */
    var squareSize = 4;
    /** @type {number} */
    var prefSize = 8;
    /** @type {boolean} */
    var y = false;
    /** @type {boolean} */
    var w = false;
    /** @type {!Array} */
    var data = [];
    /** @type {!Array} */
    var titleWords = [function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function callback() {
        /** @type {boolean} */
        child.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} bruce
       * @return {undefined}
       */
      var Play = function(bruce) {
        /**
         * @return {undefined}
         */
        function fun() {
          /** @type {boolean} */
          self.visible = false;
        }
        /**
         * @param {number} num
         * @param {string} data
         * @param {number} color
         * @return {?}
         */
        this.play = function(num, data, color) {
          /** @type {boolean} */
          self.visible = true;
          self.clear();
          /** @type {number} */
          var x = width * Math.random();
          /** @type {number} */
          var top = height * Math.random();
          /** @type {number} */
          var radius = Math.min(width, height) * (.03 * Math.random() + .02);
          self.lineStyle(3 * Math.random() + 3, color);
          self.drawCircle(0, 0, radius);
          /** @type {number} */
          self.x = num;
          /** @type {string} */
          self.y = data;
          /** @type {number} */
          self.scale.x = 0;
          /** @type {number} */
          self.scale.y = 0;
          /** @type {number} */
          self.rotation = Math.random() * Math.PI;
          /** @type {number} */
          var duration = .2 * Math.random() + .4;
          return TweenLite.to(self, duration, {
            x : x,
            y : top,
            rotation : Math.random() * Math.PI,
            ease : Power3.easeOut,
            onComplete : fun
          }), TweenLite.to(self.scale, duration, {
            x : 1,
            y : 1,
            ease : Back.easeOut.config(1.7)
          }), duration;
        };
        var a = bruce;
        var self = new PIXI.Graphics;
        a.addChild(self);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          container.setChildIndex(child, container.children.length - 1);
          /** @type {boolean} */
          child.visible = true;
          /** @type {number} */
          var rown = 5 * Math.random() + 7;
          /** @type {number} */
          var target = 0;
          /** @type {number} */
          var e = width / 2;
          /** @type {number} */
          var type = height / 2;
          var index = parseInt();
          /** @type {number} */
          var j = 0;
          for (; j < rown; j++) {
            var tmp0;
            tmp0 = tmp1[j] ? tmp1[j] : new Play(child);
            var value = (tmp1[j] = tmp0).play(e, type, index);
            if (target < value) {
              target = value;
            }
          }
          TweenLite.delayedCall(target, callback);
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {number} */
      this.id = pluginid;
      /** @type {!Array} */
      var tmp1 = [];
      var child = new PIXI.Container;
      container.addChild(child);
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function callback() {
        /** @type {boolean} */
        child.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} bruce
       * @return {undefined}
       */
      var Play = function(bruce) {
        /**
         * @return {undefined}
         */
        function fun() {
          /** @type {boolean} */
          self.visible = false;
        }
        /**
         * @param {number} num
         * @param {number} data
         * @param {number} color
         * @return {?}
         */
        this.play = function(num, data, color) {
          /** @type {boolean} */
          self.visible = true;
          self.clear();
          /** @type {number} */
          var x = width * Math.random();
          /** @type {number} */
          var top = height * Math.random();
          /** @type {number} */
          var size = Math.min(width, height) * (.04 * Math.random() + .02);
          self.beginFill(color);
          self.drawRect(-size / 2, -size / 2, size, size);
          /** @type {number} */
          self.x = num;
          /** @type {number} */
          self.y = data;
          /** @type {number} */
          self.scale.x = 0;
          /** @type {number} */
          self.scale.y = 0;
          /** @type {number} */
          self.rotation = Math.random() * Math.PI;
          /** @type {number} */
          var duration = .2 * Math.random() + .4;
          return TweenLite.to(self, duration, {
            x : x,
            y : top,
            rotation : Math.random() * Math.PI,
            ease : Power3.easeOut,
            onComplete : fun
          }), TweenLite.to(self.scale, duration, {
            x : 1,
            y : 1,
            ease : Back.easeOut.config(1.7)
          }), duration;
        };
        var a = bruce;
        var self = new PIXI.Graphics;
        a.addChild(self);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          container.setChildIndex(child, container.children.length - 1);
          /** @type {boolean} */
          child.visible = true;
          /** @type {number} */
          var rown = 5 * Math.random() + 7;
          /** @type {number} */
          var target = 0;
          /** @type {number} */
          var e = width / 2;
          /** @type {number} */
          var type = height / 2;
          var index = parseInt();
          /** @type {number} */
          var j = 0;
          for (; j < rown; j++) {
            var tmp0;
            tmp0 = tmp1[j] ? tmp1[j] : new Play(child);
            var value = (tmp1[j] = tmp0).play(e, type, index);
            if (target < value) {
              target = value;
            }
          }
          TweenLite.delayedCall(target, callback);
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {string} */
      this.id = pluginid;
      /** @type {!Array} */
      var tmp1 = [];
      var child = new PIXI.Container;
      container.addChild(child);
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function itemsToMenu() {
        /** @type {boolean} */
        node.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} layerArg
       * @return {undefined}
       */
      var Play = function(layerArg) {
        /**
         * @return {undefined}
         */
        function init() {
          self.beginFill(color);
          self.drawCircle(0, 0, r);
          /** @type {number} */
          self.scale.x = 0;
          /** @type {number} */
          self.scale.y = 0;
          TweenLite.to(self.scale, .7, {
            x : 1,
            y : 1,
            ease : Elastic.easeOut.config(1, .3),
            onComplete : updatePos
          });
        }
        /**
         * @return {undefined}
         */
        function updatePos() {
          TweenLite.to(self.scale, .4, {
            x : 0,
            y : 0,
            ease : Power2.easeOut,
            onComplete : play,
            delay : .1
          });
        }
        /**
         * @return {undefined}
         */
        function play() {
          /** @type {boolean} */
          self.visible = false;
          if (val) {
            val();
          }
        }
        /**
         * @param {number} start
         * @param {!Function} value
         * @param {number} key
         * @param {number} x
         * @param {number} obj
         * @param {!Function} arr
         * @return {undefined}
         */
        this.play = function(start, value, key, x, obj, arr) {
          /** @type {boolean} */
          self.visible = true;
          self.clear();
          /** @type {number} */
          self.x = x;
          /** @type {number} */
          self.y = obj;
          /** @type {!Function} */
          color = value;
          /** @type {number} */
          r = key;
          /** @type {!Function} */
          val = arr;
          TweenLite.delayedCall(start, init);
        };
        var color;
        var r;
        var val;
        var layer = layerArg;
        var self = new PIXI.Graphics;
        layer.addChild(self);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          container.setChildIndex(node, container.children.length - 1);
          /** @type {boolean} */
          node.visible = true;
          /** @type {number} */
          node.x = width / 2;
          /** @type {number} */
          node.y = height / 2;
          /** @type {number} */
          node.rotation = Math.random() * Math.PI * 2;
          /** @type {number} */
          var n = 10;
          var type = parseInt();
          /** @type {number} */
          var inBy = Math.min(width, height) / 64 * (.6 * Math.random() + .7);
          /** @type {number} */
          var index = 2;
          /** @type {number} */
          var j = 0;
          for (; j < 40; j++) {
            var self;
            /** @type {number} */
            var k = 25 * j * Math.PI / 180;
            /** @type {number} */
            var offset = n * Math.cos(k);
            /** @type {number} */
            var w = n * Math.sin(k);
            /** @type {number} */
            n = n + inBy;
            /** @type {number} */
            index = index + .22;
            self = tmp1[j] ? tmp1[j] : new Play(node);
            tmp1[j] = self;
            /** @type {null} */
            var scale = null;
            if (39 == j) {
              /** @type {function(): undefined} */
              scale = itemsToMenu;
            }
            self.play(.03 * j, type, index, offset, w, scale);
          }
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {string} */
      this.id = pluginid;
      /** @type {!Array} */
      var tmp1 = [];
      var node = new PIXI.Container;
      container.addChild(node);
    }, function(ASTnode, pluginid) {
      /**
       * @return {undefined}
       */
      function fn() {
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        instance.play(0, fn);
      };
      var fromNode = this;
      var node = ASTnode;
      /** @type {number} */
      this.id = pluginid;
      var instance = new constructor(node);
    }, function(ASTnode, pluginid) {
      /**
       * @return {undefined}
       */
      function fn() {
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        instance.play(1, fn);
      };
      var fromNode = this;
      var node = ASTnode;
      /** @type {string} */
      this.id = pluginid;
      var instance = new constructor(node);
    }, function(undefined, pluginid) {
      /**
       * @return {undefined}
       */
      function callback() {
        /** @type {boolean} */
        c.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          stage.setChildIndex(c, stage.children.length - 1);
          /** @type {boolean} */
          c.visible = true;
          /** @type {number} */
          c.x = width / 2;
          /** @type {number} */
          c.y = height / 2;
          var fill = parseInt();
          /** @type {number} */
          var r = Math.min(width, height) * (.28 * Math.random() + .2);
          /** @type {number} */
          var resolution = Math.floor(5 * Math.random()) + 3;
          obj.clear();
          obj.lineStyle(7 * Math.random() + 4, fill, 1);
          /** @type {number} */
          obj.rotation = 30 * Math.floor(6 * Math.random());
          /** @type {number} */
          var size = 360 / resolution;
          /** @type {number} */
          var i = 0;
          for (; i <= resolution; i++) {
            /** @type {number} */
            var offTh = i * size * Math.PI / 180;
            /** @type {number} */
            var x = r * Math.cos(offTh);
            /** @type {number} */
            var y = r * Math.sin(offTh);
            if (0 == i) {
              obj.moveTo(x, y);
            } else {
              obj.lineTo(x, y);
            }
          }
          /** @type {number} */
          var crossCenter = .8 * Math.random() + .4;
          /** @type {number} */
          var padPx = .8 * Math.random() + .4;
          TweenLite.fromTo(obj.scale, .9, {
            x : crossCenter,
            y : crossCenter
          }, {
            x : padPx,
            y : padPx,
            ease : Bounce.easeOut
          });
          s.play(r, callback);
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var stage = undefined;
      /** @type {string} */
      this.id = pluginid;
      var c = new PIXI.Container;
      var obj = new PIXI.Graphics;
      stage.addChild(c);
      c.addChild(obj);
      var s = new Animation(c, obj);
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function itemsToMenu() {
        /** @type {boolean} */
        child.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} value
       * @return {undefined}
       */
      var line = function(value) {
        /**
         * @return {undefined}
         */
        function draw() {
          /** @type {number} */
          var dimension = Math.min(width, height);
          /** @type {number} */
          var size = dimension * (.08 * Math.random() + .05);
          self.lineStyle(4 * Math.random() + 4, parseInt());
          self.drawRect(-size / 2, -size / 2, size, size);
          self.x = newx + dimension / 2 * (Math.random() - .5);
          self.y = y + dimension / 2 * (Math.random() - .5);
          /** @type {number} */
          self.scale.x = 0;
          /** @type {number} */
          self.scale.y = 0;
          /** @type {number} */
          self.rotation = Math.random() * Math.PI;
          TweenLite.to(self, .5, {
            x : newx,
            y : y,
            rotation : 0,
            ease : Back.easeOut.config(1.7),
            onComplete : init
          });
          TweenLite.to(self.scale, .5, {
            x : 1,
            y : 1,
            ease : Back.easeOut.config(1.7)
          });
        }
        /**
         * @return {undefined}
         */
        function init() {
          /** @type {number} */
          var maxWH = Math.min(width, height);
          var audioOffsetX = newx + maxWH / 2 * (Math.random() - .5);
          var endY = y + maxWH / 2 * (Math.random() - .5);
          TweenLite.to(self, .5, {
            x : audioOffsetX,
            y : endY,
            rotation : -Math.random() * Math.PI,
            ease : Back.easeIn.config(1.7),
            onComplete : fun,
            delay : .2
          });
          TweenLite.to(self.scale, .5, {
            x : 0,
            y : 0,
            ease : Back.easeIn.config(1.7),
            delay : .2
          });
        }
        /**
         * @return {undefined}
         */
        function fun() {
          /** @type {boolean} */
          self.visible = false;
        }
        /**
         * @param {number} start
         * @param {!Function} data
         * @return {undefined}
         */
        this.play = function(start, data) {
          /** @type {boolean} */
          self.visible = true;
          self.clear();
          /** @type {number} */
          newx = width * Math.random();
          /** @type {number} */
          y = height * Math.random();
          TweenLite.delayedCall(start, draw);
        };
        var newx;
        var y;
        var f = value;
        var self = new PIXI.Graphics;
        f.addChild(self);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          container.setChildIndex(child, container.children.length - 1);
          /** @type {boolean} */
          child.visible = true;
          /** @type {number} */
          var multi = Math.floor(5 * Math.random() + 5);
          /** @type {number} */
          var j = 0;
          for (; j < multi; j++) {
            var c;
            c = tmp1[j] ? tmp1[j] : new line(child);
            tmp1[j] = c;
            /** @type {null} */
            var type = null;
            if (j == multi - 1) {
              /** @type {function(): undefined} */
              type = itemsToMenu;
            }
            c.play(.06 * j, type);
          }
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {string} */
      this.id = pluginid;
      var child = new PIXI.Container;
      container.addChild(child);
      /** @type {!Array} */
      var tmp1 = [];
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function itemsToMenu() {
        /** @type {boolean} */
        child.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} layerArg
       * @return {undefined}
       */
      var Play = function(layerArg) {
        /**
         * @return {undefined}
         */
        function init() {
          /** @type {number} */
          var radius = Math.min(width, height) * (.05 * Math.random() + .014);
          self.beginFill(parseInt());
          self.drawCircle(0, 0, radius);
          self.x = newx;
          self.y = x;
          /** @type {number} */
          self.scale.x = 0;
          /** @type {number} */
          self.scale.y = 0;
          TweenLite.to(self.scale, .5, {
            x : 1,
            y : 1,
            ease : Elastic.easeOut.config(1, .3),
            onComplete : send
          });
        }
        /**
         * @return {undefined}
         */
        function send() {
          TweenLite.to(self.scale, .5, {
            x : 0,
            y : 0,
            ease : Back.easeIn.config(1.7),
            onComplete : fun,
            delay : .2
          });
        }
        /**
         * @return {undefined}
         */
        function fun() {
          /** @type {boolean} */
          self.visible = false;
        }
        /**
         * @param {number} start
         * @param {!Function} data
         * @return {undefined}
         */
        this.play = function(start, data) {
          /** @type {boolean} */
          self.visible = true;
          self.clear();
          /** @type {number} */
          newx = width * Math.random();
          /** @type {number} */
          x = height * Math.random();
          TweenLite.delayedCall(start, init);
        };
        var newx;
        var x;
        var layer = layerArg;
        var self = new PIXI.Graphics;
        layer.addChild(self);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          container.setChildIndex(child, container.children.length - 1);
          /** @type {boolean} */
          child.visible = true;
          /** @type {number} */
          var multi = Math.floor(5 * Math.random() + 5);
          /** @type {number} */
          var j = 0;
          for (; j < multi; j++) {
            var c;
            c = tmp1[j] ? tmp1[j] : new Play(child);
            tmp1[j] = c;
            /** @type {null} */
            var type = null;
            if (j == multi - 1) {
              /** @type {function(): undefined} */
              type = itemsToMenu;
            }
            c.play(.06 * j, type);
          }
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {string} */
      this.id = pluginid;
      var child = new PIXI.Container;
      container.addChild(child);
      /** @type {!Array} */
      var tmp1 = [];
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function time() {
        /** @type {boolean} */
        child.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          /** @type {boolean} */
          child.visible = true;
          container.setChildIndex(child, container.children.length - 1);
          self.container.mask = canvas;
          self.play(time);
          /** @type {number} */
          var spotRadius = self.size / 2;
          /** @type {number} */
          canvas.x = width / 2;
          /** @type {number} */
          canvas.y = height / 2;
          canvas.clear();
          canvas.beginFill(0);
          canvas.drawCircle(0, 0, spotRadius);
          /** @type {number} */
          var rotationDiff = 45 * Math.PI / 180 * Math.floor(2 * Math.random());
          /** @type {number} */
          var triggeredDegree = rotationDiff + 45 * Math.PI / 180 * Math.floor(4 * Math.random() - 2);
          /** @type {number} */
          var crossCenter = .3 * Math.random() + 1;
          /** @type {number} */
          var padPx = .3 * -Math.random() + 1;
          TweenLite.fromTo(self.container, .6, {
            rotation : rotationDiff
          }, {
            rotation : triggeredDegree,
            ease : Power2.easeOut
          });
          TweenLite.fromTo(self.container.scale, .6, {
            x : crossCenter,
            y : crossCenter
          }, {
            x : padPx,
            y : padPx,
            ease : Back.easeOut.config(1.7)
          });
          TweenLite.fromTo(canvas.scale, .6, {
            x : crossCenter,
            y : crossCenter
          }, {
            x : padPx,
            y : padPx,
            ease : Back.easeOut.config(1.7)
          });
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {number} */
      this.id = pluginid;
      var child = new PIXI.Container;
      container.addChild(child);
      var canvas = new PIXI.Graphics;
      child.addChild(canvas);
      var self = new createButton(child, -1);
    }, function(undefined, pluginid) {
      /**
       * @return {undefined}
       */
      function fun() {
        /** @type {boolean} */
        obj.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          stage.setChildIndex(obj, stage.children.length - 1);
          obj.clear();
          /** @type {boolean} */
          obj.visible = true;
          obj.lineStyle(5 * Math.random() + 3, parseInt(), 1);
          /** @type {number} */
          obj.x = width / 2;
          /** @type {number} */
          obj.y = height / 2;
          /** @type {number} */
          var val = .6 * Math.min(width, height);
          /** @type {number} */
          var resolution = Math.floor(5 * Math.random()) + 3;
          /** @type {number} */
          var size = 360 / resolution;
          /** @type {number} */
          var crossCenter = .5 * Math.max(width, height) / val * (1.6 + .6 / resolution);
          /** @type {number} */
          var i = 0;
          for (; i <= resolution; i++) {
            /** @type {number} */
            var parentRot = i * size * Math.PI / 180;
            /** @type {number} */
            var w = val * Math.cos(parentRot);
            /** @type {number} */
            var c = val * Math.sin(parentRot);
            if (0 == i) {
              obj.moveTo(w, c);
            } else {
              obj.lineTo(w, c);
            }
          }
          /** @type {number} */
          var duration = .3 * Math.random() + .6;
          TweenLite.fromTo(obj.scale, duration, {
            x : 0,
            y : 0
          }, {
            x : crossCenter,
            y : crossCenter,
            onComplete : fun,
            ease : Power2.easeOut
          });
          TweenLite.fromTo(obj, duration, {
            rotation : Math.random() * Math.PI
          }, {
            rotation : Math.random() * Math.PI,
            ease : Power1.easeOut
          });
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var stage = undefined;
      /** @type {string} */
      this.id = pluginid;
      var obj = new PIXI.Graphics;
      stage.addChild(obj);
    }, function(undefined, pluginid) {
      /**
       * @return {undefined}
       */
      function fn() {
        /** @type {boolean} */
        c.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          stage.setChildIndex(c, stage.children.length - 1);
          /** @type {boolean} */
          c.visible = true;
          /** @type {number} */
          c.x = width / 2;
          /** @type {number} */
          c.y = height / 2;
          var fill = parseInt();
          /** @type {number} */
          var r = Math.min(width, height) * (.25 * Math.random() + .1);
          g.clear();
          g.beginFill(fill);
          g.drawCircle(0, 0, r);
          a.play(r, fn);
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var stage = undefined;
      /** @type {string} */
      this.id = pluginid;
      var c = new PIXI.Container;
      var g = new PIXI.Graphics;
      stage.addChild(c);
      c.addChild(g);
      var a = new Animation(c, g);
    }, function(angelem, pluginid) {
      /**
       * @return {undefined}
       */
      function itemsToMenu() {
        /** @type {boolean} */
        self.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} headB
       * @return {undefined}
       */
      var YmProcessor = function(headB) {
        /**
         * @return {undefined}
         */
        function init() {
          TweenLite.to(obj.scale, .4, {
            x : 0,
            y : 0,
            ease : Back.easeIn.config(2),
            onComplete : play,
            delay : .7
          });
          TweenLite.to(obj, .4, {
            rotation : Math.random() * Math.PI * 2,
            ease : Back.easeIn.config(2),
            delay : .7
          });
        }
        /**
         * @return {undefined}
         */
        function play() {
          /** @type {boolean} */
          obj.visibloe = false;
          if (_chooseNumber) {
            _chooseNumber();
          }
        }
        /**
         * @param {number} a
         * @param {number} b
         * @param {number} n
         * @param {?} color
         * @return {undefined}
         */
        this.init = function(a, b, n, color) {
          /** @type {number} */
          _state = 0;
          /** @type {number} */
          B = n;
          fill = color;
          /** @type {number} */
          obj.x = a;
          /** @type {number} */
          obj.y = b;
        };
        /**
         * @param {number} d
         * @param {!Function} data
         * @return {undefined}
         */
        this.play = function(d, data) {
          /** @type {!Function} */
          _chooseNumber = data;
          obj.clear();
          /** @type {boolean} */
          obj.visibloe = true;
          obj.beginFill(fill);
          obj.drawRect(.5 * -B, .5 * -B, B, B);
          TweenLite.fromTo(obj.scale, .3, {
            x : 0,
            y : 0
          }, {
            x : 1,
            y : 1,
            ease : Back.easeOut.config(1.7),
            onComplete : init,
            delay : d
          });
          TweenLite.fromTo(obj, .7, {
            rotation : Math.random() * Math.PI * 2
          }, {
            rotation : 0,
            ease : Elastic.easeOut.config(1, .3),
            delay : d
          });
          /** @type {number} */
          var rotationDiff = Math.random() * Math.PI;
          TweenLite.fromTo(self, 1, {
            rotation : 0
          }, {
            rotation : rotationDiff,
            ease : Bounce.easeOut,
            delay : d
          });
        };
        var _chooseNumber;
        var B;
        var fill;
        var cacheB = headB;
        var obj = new PIXI.Graphics;
        cacheB.addChild(obj);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          parent.setChildIndex(self, parent.children.length - 1);
          /** @type {boolean} */
          self.visible = true;
          /** @type {number} */
          self.x = width / 2;
          /** @type {number} */
          self.y = height / 2;
          /** @type {number} */
          var size = Math.floor(8 * Math.random() + 6);
          /** @type {number} */
          var a = Math.min(width, height) * (.25 * Math.random() + .25);
          /** @type {number} */
          var i = 360 / size;
          /** @type {number} */
          var r = a * (.15 * Math.random() + .05);
          var w = parseInt();
          /** @type {number} */
          var fraction = Math.PI / 2 * Math.floor(4 * Math.random());
          /** @type {number} */
          var spacing = 1;
          if (Math.random() < .5) {
            /** @type {number} */
            spacing = -1;
          }
          /** @type {number} */
          var j = 0;
          for (; j < size; j++) {
            var c;
            /** @type {number} */
            var nt = (spacing * i * j + fraction) * Math.PI / 180;
            /** @type {number} */
            var temp = a * Math.cos(nt);
            /** @type {number} */
            var b = a * Math.sin(nt);
            c = tmp1[j] ? tmp1[j] : new YmProcessor(self);
            tmp1[j] = c;
            /** @type {null} */
            var type = null;
            if (j == size - 1) {
              /** @type {function(): undefined} */
              type = itemsToMenu;
            }
            c.init(temp, b, r, w);
            c.play(.05 * j, type);
          }
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var parent = angelem;
      /** @type {string} */
      this.id = pluginid;
      var self = new PIXI.Container;
      /** @type {!Array} */
      var tmp1 = [];
      parent.addChild(self);
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function tip() {
        /** @type {boolean} */
        c.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @param {?} bruce
       * @return {undefined}
       */
      var YmProcessor = function(bruce) {
        /**
         * @return {undefined}
         */
        function animate() {
          /** @type {number} */
          var offset = .5 * width;
          /** @type {number} */
          var audioOffsetX = obj.x + Math.random() * offset - offset / 2;
          /** @type {number} */
          var languageOffsetY = obj.y + Math.random() * offset - offset / 2;
          TweenLite.to(obj.scale, .3, {
            x : 0,
            y : 0,
            ease : Power1.easeOut,
            onComplete : play,
            delay : .5
          });
          TweenLite.to(obj, .3, {
            x : audioOffsetX,
            y : languageOffsetY,
            ease : Power2.easeOut,
            delay : .5
          });
        }
        /**
         * @return {undefined}
         */
        function play() {
          /** @type {boolean} */
          obj.visibloe = false;
          if (_chooseNumber) {
            _chooseNumber();
          }
        }
        /**
         * @param {number} name
         * @param {number} a
         * @param {number} v
         * @param {?} _
         * @return {undefined}
         */
        this.init = function(name, a, v, _) {
          /** @type {number} */
          _state = 0;
          /** @type {number} */
          validationVM = v;
          fill = _;
          /** @type {number} */
          obj.x = name;
          /** @type {number} */
          obj.y = a;
        };
        /**
         * @param {number} d
         * @param {!Function} data
         * @return {undefined}
         */
        this.play = function(d, data) {
          /** @type {!Function} */
          _chooseNumber = data;
          obj.clear();
          /** @type {boolean} */
          obj.visibloe = true;
          obj.beginFill(fill);
          obj.drawCircle(0, 0, .5 * validationVM);
          TweenLite.fromTo(obj.scale, .3, {
            x : 0,
            y : 0
          }, {
            x : 1,
            y : 1,
            ease : Back.easeOut.config(1.7),
            onComplete : animate,
            delay : d
          });
        };
        var _chooseNumber;
        var validationVM;
        var fill;
        var a = bruce;
        var obj = new PIXI.Graphics;
        a.addChild(obj);
      };
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          container.setChildIndex(c, container.children.length - 1);
          /** @type {boolean} */
          c.visible = true;
          /** @type {number} */
          c.x = width / 2;
          /** @type {number} */
          c.y = height / 2;
          /** @type {number} */
          var len = Math.floor(8 * Math.random() + 6);
          /** @type {number} */
          var a = Math.min(width, height) * (.2 * Math.random() + .25);
          /** @type {number} */
          var t = 360 / len;
          /** @type {number} */
          var x = a * (.2 * Math.random() + .05);
          var w = parseInt();
          /** @type {number} */
          var fraction = Math.PI / 2 * Math.floor(4 * Math.random());
          /** @type {number} */
          var flightTime = 1;
          if (Math.random() < .5) {
            /** @type {number} */
            flightTime = -1;
          }
          /** @type {number} */
          var l = 0;
          for (; l < len; l++) {
            var node;
            /** @type {number} */
            var nt = (flightTime * t * l + fraction) * Math.PI / 180;
            /** @type {number} */
            var temp = a * Math.cos(nt);
            /** @type {number} */
            var b = a * Math.sin(nt);
            node = lg[l] ? lg[l] : new YmProcessor(c);
            lg[l] = node;
            /** @type {null} */
            var entry = null;
            if (l == len - 1) {
              /** @type {function(): undefined} */
              entry = tip;
            }
            node.init(temp, b, x, w);
            node.play(.05 * l, entry);
          }
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {string} */
      this.id = pluginid;
      var c = new PIXI.Container;
      /** @type {!Array} */
      var lg = [];
      container.addChild(c);
    }, function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function fun() {
        /** @type {boolean} */
        parent.visible = false;
        nodeToOutlets[fromNode.id].push(fromNode);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          /** @type {boolean} */
          parent.visible = true;
          container.setChildIndex(parent, container.children.length - 1);
          /** @type {number} */
          parent.x = .2 * width + .6 * width * Math.random();
          /** @type {number} */
          parent.y = .2 * height + .6 * height * Math.random();
          var rotationDiff;
          /** @type {number} */
          var pixelSize = Math.min(width, height) * (.7 + .2 * Math.random());
          /** @type {number} */
          var r = pixelSize / 10 * (.5 + .8 * Math.random());
          var fill = parseInt();
          g.clear();
          g.beginFill(fill);
          g.drawRect(0, -r / 2, pixelSize, r);
          graphics.clear();
          graphics.beginFill(fill);
          graphics.drawRect(-r / 2, 0, r, pixelSize);
          /** @type {number} */
          g.y = 0;
          /** @type {number} */
          g.x = -pixelSize / 2;
          /** @type {number} */
          graphics.x = 0;
          /** @type {number} */
          graphics.y = -pixelSize / 2;
          /** @type {number} */
          parent.rotation = 45 * Math.PI / 180;
          /** @type {number} */
          g.scale.x = 0;
          /** @type {number} */
          graphics.scale.y = 0;
          /** @type {number} */
          rotationDiff = Math.random() < .5 ? -135 * Math.PI / 180 : 215 * Math.PI / 180;
          (new TimelineLite).to(g.scale, .4, {
            x : 1,
            ease : Power2.easeOut
          }).to(graphics.scale, .4, {
            y : 1,
            ease : Power2.easeOut
          }, .1).to(parent, .6, {
            rotation : rotationDiff,
            ease : Back.easeOut.config(1.7)
          }, 0).to(g.scale, .3, {
            x : 0,
            ease : Power2.easeOut
          }).to(graphics.scale, .3, {
            y : 0,
            ease : Power2.easeOut,
            onComplete : fun
          }, .6);
        }();
      };
      var fromNode = this;
      /** @type {!Object} */
      var container = p;
      /** @type {string} */
      this.id = pluginid;
      var parent = new PIXI.Container;
      var g = new PIXI.Graphics;
      var graphics = new PIXI.Graphics;
      container.addChild(parent);
      parent.addChild(g);
      parent.addChild(graphics);
    }, function(context, pluginid) {
      /**
       * @return {undefined}
       */
      function animate() {
        if (total < ++k) {
          switch(stride) {
            case 0:
              /** @type {number} */
              stride = 1;
              var n = nodes[0];
              p.x = n.x;
              p.y = n.y;
              /** @type {number} */
              k = 0;
              animate();
              break;
            case 1:
              /** @type {number} */
              stride = 2;
          }
        } else {
          TweenLite.to(p, .1, {
            x : nodes[k].x,
            y : nodes[k].y,
            onComplete : animate,
            onUpdate : _createBodyPrimitive,
            ease : Power1.easeOut
          });
        }
      }
      /**
       * @return {undefined}
       */
      function _createBodyPrimitive() {
        switch(self.clear(), self.lineStyle(lineWidth, color, 1), stride) {
          case 0:
            self.moveTo(nodes[0].x, nodes[0].y);
            /** @type {number} */
            var j = 1;
            for (; j < k; j++) {
              self.lineTo(nodes[j].x, nodes[j].y);
            }
            self.lineTo(p.x, p.y);
            break;
          case 1:
            self.moveTo(p.x, p.y);
            j = k;
            for (; j <= total; j++) {
              self.lineTo(nodes[j].x, nodes[j].y);
            }
        }
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          self.clear();
          /** @type {boolean} */
          self.visible = true;
          if (Math.random() < .5) {
            /** @type {number} */
            self.x = 0;
            /** @type {number} */
            self.y = 0;
            /** @type {number} */
            self.rotation = 0;
          } else {
            self.x = width;
            self.y = height;
            /** @type {number} */
            self.rotation = Math.PI;
          }
          /** @type {number} */
          k = stride = 0;
          /** @type {number} */
          total = Math.floor(3 * Math.random()) + 3;
          /** @type {number} */
          lineWidth = 20 * Math.random() + 2;
          color = parseInt();
          var bSize;
          /** @type {boolean} */
          var first = Math.random() < .5;
          /** @type {number} */
          bSize = first ? width / total : height / total;
          /** @type {number} */
          var i = 0;
          for (; i <= total; i++) {
            var end;
            if (first) {
              end = {
                x : i * bSize,
                y : height * Math.random()
              };
              if (0 == i) {
                end.x -= 10;
              }
              if (i == total) {
                end.x += 10;
              }
            } else {
              end = {
                y : i * bSize,
                x : width * Math.random()
              };
              if (0 == i) {
                end.y -= 10;
              }
              if (i == total) {
                end.y += 10;
              }
            }
            nodes[i] = end;
          }
          var n = nodes[0];
          p.x = n.x;
          p.y = n.y;
          animate();
        }();
      };
      var cur = context;
      /** @type {string} */
      this.id = pluginid;
      var total;
      var stride;
      var lineWidth;
      var color;
      /** @type {!Array} */
      var nodes = [];
      /** @type {number} */
      var k = 0;
      var p = {
        x : 0,
        y : 0
      };
      var self = new PIXI.Graphics;
      cur.addChild(self);
    }, createButton];
    /** @type {!Array} */
    var h1Words = [function(p, pluginid) {
      /**
       * @return {undefined}
       */
      function init() {
        g.clear();
        g.beginFill(color);
        g.moveTo(self.pos.b1.x, self.pos.b1.y);
        g.lineTo(self.pos.b0.x, self.pos.b0.y);
        /** @type {number} */
        var offset = 0;
        for (; self.pos["p" + offset]; offset++) {
          var p2 = self.pos["p" + offset];
          g.lineTo(p2.x, p2.y);
        }
        g.endFill();
      }
      /**
       * @return {undefined}
       */
      function callback() {
        if (_turnType == turnType) {
          input.setColor(color, index - 1);
        }
        /** @type {boolean} */
        g.visible = false;
        nodeToOutlets[self.id].push(self);
      }
      /**
       * @return {undefined}
       */
      this.play = function() {
        !function() {
          /** @type {number} */
          _turnType = turnType;
          var j = toString();
          color = indices[j];
          $("#about").css("background-color", "#" + color.toString(16));
          if (Math.random() < .3) {
            input.flash(index);
          }
          x = j;
          g.clear();
          /** @type {boolean} */
          g.visible = true;
          /** @type {number} */
          index = container.children.length - 1 - Math.floor(2 * Math.random());
          container.setChildIndex(g, index);
          /** @type {boolean} */
          var v = Math.random() < .5;
          /** @type {number} */
          var b = Math.floor(4 * Math.random()) + 1;
          self.pos = {};
          /** @type {number} */
          var y = 0;
          if (v) {
            /** @type {number} */
            y = height / b;
            self.pos.b0 = {
              x : 0,
              y : 0
            };
            self.pos.b1 = {
              x : 0,
              y : height
            };
          } else {
            /** @type {number} */
            y = width / b;
            self.pos.b0 = {
              x : 0,
              y : 0
            };
            self.pos.b1 = {
              x : width,
              y : 0
            };
          }
          if (Math.random() < .5) {
            /** @type {number} */
            g.rotation = 0;
            /** @type {number} */
            g.x = 0;
            /** @type {number} */
            g.y = 0;
          } else {
            /** @type {number} */
            g.rotation = Math.PI;
            g.x = width;
            g.y = height;
          }
          /** @type {number} */
          var a = duration = 0;
          for (; a <= b; a++) {
            var layout = {
              x : 0,
              y : 0
            };
            /** @type {number} */
            var yOffset = 0;
            if (0 != a && a != b) {
              /** @type {number} */
              yOffset = y / 4 * Math.random() - y / 8;
            }
            if (v) {
              /** @type {number} */
              layout.y = y * a + yOffset;
            } else {
              /** @type {number} */
              layout.x = y * a + yOffset;
            }
            self.pos["p" + a] = layout;
            var pt;
            /** @type {number} */
            var TIME = .4 * Math.random() + .3;
            /** @type {number} */
            duration = 2;
            /** @type {({x: ?}|{y: ?})} */
            pt = v ? {
              x : width
            } : {
              y : height
            };
            TweenLite.to(self.pos["p" + a], TIME, pt);
          }
          /** @type {number} */
          self.progress = 0;
          TweenLite.to(self, duration, {
            progress : 1,
            ease : Power0.easeNone,
            onUpdate : init,
            onComplete : callback
          });
        }();
      };
      var color;
      var duration;
      var self = this;
      /** @type {!Object} */
      var container = p;
      /** @type {number} */
      this.id = pluginid;
      /** @type {number} */
      this.progress = 0;
      this.pos = {};
      /** @type {number} */
      var index = 0;
      var g = new PIXI.Graphics;
      container.addChild(g);
      /** @type {number} */
      var turnType = Math.floor(aidn.util.getTime());
    }];
    aidn.util.shuffleArray(titleWords);
    var canvas;
    /** @type {number} */
    var t = 16 * Math.random();
    /** @type {!Array} */
    var nodeToOutlets = [];
    /** @type {number} */
    var nodeId = 0;
    for (; nodeId < titleWords.length + h1Words.length; nodeId++) {
      /** @type {!Array} */
      nodeToOutlets[nodeId] = [];
    }
    var input;
    /** @type {!Array} */
    var indices = [13430510, 8965324, 9099756, 961181, 1089457, 34969, 13934238, 16110792, 15488645, 16531063, 5853015, 3222317];
    /** @type {!Array} */
    var format = [13430510, 8965324, 9099756, 961181, 1089457, 34969, 13934238, 16110792, 15488645, 16531063, 5853015, 3222317];
    /** @type {number} */
    var length = indices.length;
    /** @type {number} */
    var x = 0;
    /** @type {number} */
    var _turnType = 0;
  };
  /** @type {boolean} */
  var isVirtual = false;
  /** @type {number} */
  var D = 0;
  /** @type {boolean} */
  var U = "off" == aidn.util.getCookie("fb");
  /** @type {boolean} */
  var T = "off" == aidn.util.getCookie("bt");
  create();
  register();
  if (aidn.util.webaudio) {
    $("#ng").css("display", "none");
    $(".ok").css("display", "block");
    if (currentRoot) {
      $("#scene_main .attention").html("TOUCH &amp; SWIPE!");
    }
    if (!arraynames) {
      $("#scene_top .attention").text("* Raise the volume and enjoy!");
    }
  } else {
    $("#ng").css("display", "block");
    $(".ok").css("display", "none");
    if (!arraynames) {
      $("#ng .atten").html("Sorry,<br>your device or browser doesn't support this site.");
    }
  }
  /** @type {boolean} */
  PIXI.utils._saidHello = true;
  aidn.window.resize(resizeInput);
};
/**
 * @return {undefined}
 */
var WebAudioManager = function() {
  /**
   * @return {undefined}
   */
  function next() {
    if (i++, t.now = i, s && s(i, m), m <= i) {
      if (currentPage) {
        currentPage();
      }
    } else {
      var a = new aidn.WebAudio;
      a.load(args[keys[i]], next);
      instances[i] = a;
    }
  }
  /**
   * @param {string} jsonUrl
   * @param {(!Function|string)} args
   * @param {!Function} n
   * @param {!Function} r
   * @return {undefined}
   */
  this.load = function(jsonUrl, args, n, r) {
    /** @type {!Function} */
    currentPage = n;
    /** @type {!Function} */
    s = r;
    m = (keys = args).length;
    t.length = m;
    $.getJSON(jsonUrl, function(value) {
      args = value;
      next();
    });
  };
  /**
   * @param {number} t
   * @param {!Function} data
   * @param {number} end
   * @return {undefined}
   */
  this.play = function(t, data, end) {
    if (!(0 <= end)) {
      /** @type {number} */
      end = 1;
    }
    if (t < m) {
      instances[t].play(0, false, null, 0, end, data);
    }
  };
  /**
   * @param {number} n
   * @return {undefined}
   */
  this.stop = function(n) {
    if (n < m) {
      instances[n].stop();
    }
  };
  var m;
  var keys;
  var currentPage;
  var s;
  var args;
  var t = this;
  /** @type {number} */
  var i = -1;
  /** @type {!Array} */
  var instances = [];
  /** @type {number} */
  this.length = 0;
  /** @type {number} */
  this.now = 0;
};
