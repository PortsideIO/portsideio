function initializeSite() {
  'use strict';
  !(function() {
    function t() {
      var t = $('.hero'),
        i = t.height(),
        e = ($(window).height() - i) / 2;
      t.css({'margin-top': e + 'px'});
    }
    $(document).ready(t), $(window).resize(t);
  })(),
    $('#scene').parallax();
}
!(function(a, u, m, y) {
  'use strict';
  var o = 'parallax',
    n = {
      relativeInput: !1,
      clipRelativeInput: !1,
      calibrationThreshold: 100,
      calibrationDelay: 500,
      supportDelay: 500,
      calibrateX: !1,
      calibrateY: !0,
      invertX: !0,
      invertY: !0,
      limitX: !1,
      limitY: !1,
      scalarX: 10,
      scalarY: 10,
      frictionX: 0.1,
      frictionY: 0.1,
      originX: 0.5,
      originY: 0.5,
    };
  function r(t, i) {
    (this.element = t),
      (this.$context = a(t).data('api', this)),
      (this.$layers = this.$context.find('.layer'));
    var e = {
      calibrateX: this.$context.data('calibrate-x') || null,
      calibrateY: this.$context.data('calibrate-y') || null,
      invertX: this.$context.data('invert-x') || null,
      invertY: this.$context.data('invert-y') || null,
      limitX: parseFloat(this.$context.data('limit-x')) || null,
      limitY: parseFloat(this.$context.data('limit-y')) || null,
      scalarX: parseFloat(this.$context.data('scalar-x')) || null,
      scalarY: parseFloat(this.$context.data('scalar-y')) || null,
      frictionX: parseFloat(this.$context.data('friction-x')) || null,
      frictionY: parseFloat(this.$context.data('friction-y')) || null,
      originX: parseFloat(this.$context.data('origin-x')) || null,
      originY: parseFloat(this.$context.data('origin-y')) || null,
    };
    for (var s in e) null === e[s] && delete e[s];
    a.extend(this, n, i, e),
      (this.calibrationTimer = null),
      (this.calibrationFlag = !0),
      (this.enabled = !1),
      (this.depths = []),
      (this.raf = null),
      (this.bounds = null),
      (this.ex = 0),
      (this.ey = 0),
      (this.ew = 0),
      (this.eh = 0),
      (this.ecx = 0),
      (this.ecy = 0),
      (this.erx = 0),
      (this.ery = 0),
      (this.cx = 0),
      (this.cy = 0),
      (this.ix = 0),
      (this.iy = 0),
      (this.mx = 0),
      (this.my = 0),
      (this.vx = 0),
      (this.vy = 0),
      (this.onMouseMove = this.onMouseMove.bind(this)),
      (this.onDeviceOrientation = this.onDeviceOrientation.bind(this)),
      (this.onOrientationTimer = this.onOrientationTimer.bind(this)),
      (this.onCalibrationTimer = this.onCalibrationTimer.bind(this)),
      (this.onAnimationFrame = this.onAnimationFrame.bind(this)),
      (this.onWindowResize = this.onWindowResize.bind(this)),
      this.initialise();
  }
  (r.prototype.transformSupport = function(t) {
    for (
      var i = m.createElement('div'),
        e = !1,
        s = null,
        o = !1,
        n = null,
        a = null,
        r = 0,
        h = this.vendors.length;
      r < h;
      r++
    )
      if (
        (null !== this.vendors[r]
          ? ((n = this.vendors[r][0] + 'transform'),
            (a = this.vendors[r][1] + 'Transform'))
          : (a = n = 'transform'),
        i.style[a] !== y)
      ) {
        e = !0;
        break;
      }
    switch (t) {
      case '2D':
        o = e;
        break;
      case '3D':
        if (e) {
          var l = m.body || m.createElement('body'),
            c = m.documentElement,
            p = c.style.overflow;
          m.body ||
            ((c.style.overflow = 'hidden'),
            c.appendChild(l),
            (l.style.overflow = 'hidden'),
            (l.style.background = '')),
            l.appendChild(i),
            (i.style[a] = 'translate3d(1px,1px,1px)'),
            (o =
              (s = u.getComputedStyle(i).getPropertyValue(n)) !== y &&
              0 < s.length &&
              'none' !== s),
            (c.style.overflow = p),
            l.removeChild(i);
        }
    }
    return o;
  }),
    (r.prototype.ww = null),
    (r.prototype.wh = null),
    (r.prototype.wcx = null),
    (r.prototype.wcy = null),
    (r.prototype.wrx = null),
    (r.prototype.wry = null),
    (r.prototype.portrait = null),
    (r.prototype.desktop = !navigator.userAgent.match(
      /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
    )),
    (r.prototype.vendors = [
      null,
      ['-webkit-', 'webkit'],
      ['-moz-', 'Moz'],
      ['-o-', 'O'],
      ['-ms-', 'ms'],
    ]),
    (r.prototype.motionSupport = !!u.DeviceMotionEvent),
    (r.prototype.orientationSupport = !!u.DeviceOrientationEvent),
    (r.prototype.orientationStatus = 0),
    (r.prototype.transform2DSupport = r.prototype.transformSupport('2D')),
    (r.prototype.transform3DSupport = r.prototype.transformSupport('3D')),
    (r.prototype.propertyCache = {}),
    (r.prototype.initialise = function() {
      'static' === this.$context.css('position') &&
        this.$context.css({position: 'relative'}),
        this.accelerate(this.$context),
        this.updateLayers(),
        this.updateDimensions(),
        this.enable(),
        this.queueCalibration(this.calibrationDelay);
    }),
    (r.prototype.updateLayers = function() {
      (this.$layers = this.$context.find('.layer')),
        (this.depths = []),
        this.$layers.css({
          position: 'absolute',
          display: 'block',
          left: 0,
          top: 0,
        }),
        this.$layers.first().css({position: 'relative'}),
        this.accelerate(this.$layers),
        this.$layers.each(
          a.proxy(function(t, i) {
            this.depths.push(a(i).data('depth') || 0);
          }, this)
        );
    }),
    (r.prototype.updateDimensions = function() {
      (this.ww = u.innerWidth),
        (this.wh = u.innerHeight),
        (this.wcx = this.ww * this.originX),
        (this.wcy = this.wh * this.originY),
        (this.wrx = Math.max(this.wcx, this.ww - this.wcx)),
        (this.wry = Math.max(this.wcy, this.wh - this.wcy));
    }),
    (r.prototype.updateBounds = function() {
      (this.bounds = this.element.getBoundingClientRect()),
        (this.ex = this.bounds.left),
        (this.ey = this.bounds.top),
        (this.ew = this.bounds.width),
        (this.eh = this.bounds.height),
        (this.ecx = this.ew * this.originX),
        (this.ecy = this.eh * this.originY),
        (this.erx = Math.max(this.ecx, this.ew - this.ecx)),
        (this.ery = Math.max(this.ecy, this.eh - this.ecy));
    }),
    (r.prototype.queueCalibration = function(t) {
      clearTimeout(this.calibrationTimer),
        (this.calibrationTimer = setTimeout(this.onCalibrationTimer, t));
    }),
    (r.prototype.enable = function() {
      this.enabled ||
        ((this.enabled = !0),
        this.orientationSupport
          ? ((this.portrait = null),
            u.addEventListener('deviceorientation', this.onDeviceOrientation),
            setTimeout(this.onOrientationTimer, this.supportDelay))
          : ((this.cx = 0),
            (this.cy = 0),
            (this.portrait = !1),
            u.addEventListener('mousemove', this.onMouseMove)),
        u.addEventListener('resize', this.onWindowResize),
        (this.raf = requestAnimationFrame(this.onAnimationFrame)));
    }),
    (r.prototype.disable = function() {
      this.enabled &&
        ((this.enabled = !1),
        this.orientationSupport
          ? u.removeEventListener('deviceorientation', this.onDeviceOrientation)
          : u.removeEventListener('mousemove', this.onMouseMove),
        u.removeEventListener('resize', this.onWindowResize),
        cancelAnimationFrame(this.raf));
    }),
    (r.prototype.calibrate = function(t, i) {
      (this.calibrateX = t === y ? this.calibrateX : t),
        (this.calibrateY = i === y ? this.calibrateY : i);
    }),
    (r.prototype.invert = function(t, i) {
      (this.invertX = t === y ? this.invertX : t),
        (this.invertY = i === y ? this.invertY : i);
    }),
    (r.prototype.friction = function(t, i) {
      (this.frictionX = t === y ? this.frictionX : t),
        (this.frictionY = i === y ? this.frictionY : i);
    }),
    (r.prototype.scalar = function(t, i) {
      (this.scalarX = t === y ? this.scalarX : t),
        (this.scalarY = i === y ? this.scalarY : i);
    }),
    (r.prototype.limit = function(t, i) {
      (this.limitX = t === y ? this.limitX : t),
        (this.limitY = i === y ? this.limitY : i);
    }),
    (r.prototype.origin = function(t, i) {
      (this.originX = t === y ? this.originX : t),
        (this.originY = i === y ? this.originY : i);
    }),
    (r.prototype.clamp = function(t, i, e) {
      return (t = Math.max(t, i)), (t = Math.min(t, e));
    }),
    (r.prototype.css = function(t, i, e) {
      var s = this.propertyCache[i];
      if (!s)
        for (var o = 0, n = this.vendors.length; o < n; o++)
          if (
            ((s =
              null !== this.vendors[o]
                ? a.camelCase(this.vendors[o][1] + '-' + i)
                : i),
            t.style[s] !== y)
          ) {
            this.propertyCache[i] = s;
            break;
          }
      t.style[s] = e;
    }),
    (r.prototype.accelerate = function(t) {
      for (var i = 0, e = t.length; i < e; i++) {
        var s = t[i];
        this.css(s, 'transform', 'translate3d(0,0,0)'),
          this.css(s, 'transform-style', 'preserve-3d'),
          this.css(s, 'backface-visibility', 'hidden');
      }
    }),
    (r.prototype.setPosition = function(t, i, e) {
      (i += 'px'),
        (e += 'px'),
        this.transform3DSupport
          ? this.css(t, 'transform', 'translate3d(' + i + ',' + e + ',0)')
          : this.transform2DSupport
          ? this.css(t, 'transform', 'translate(' + i + ',' + e + ')')
          : ((t.style.left = i), (t.style.top = e));
    }),
    (r.prototype.onOrientationTimer = function(t) {
      this.orientationSupport &&
        0 === this.orientationStatus &&
        (this.disable(), (this.orientationSupport = !1), this.enable());
    }),
    (r.prototype.onCalibrationTimer = function(t) {
      this.calibrationFlag = !0;
    }),
    (r.prototype.onWindowResize = function(t) {
      this.updateDimensions();
    }),
    (r.prototype.onAnimationFrame = function() {
      this.updateBounds();
      var t = this.ix - this.cx,
        i = this.iy - this.cy;
      (Math.abs(t) > this.calibrationThreshold ||
        Math.abs(i) > this.calibrationThreshold) &&
        this.queueCalibration(0),
        this.portrait
          ? ((this.mx = this.calibrateX ? i : this.iy),
            (this.my = this.calibrateY ? t : this.ix))
          : ((this.mx = this.calibrateX ? t : this.ix),
            (this.my = this.calibrateY ? i : this.iy)),
        (this.mx *= this.ew * (this.scalarX / 100)),
        (this.my *= this.eh * (this.scalarY / 100)),
        isNaN(parseFloat(this.limitX)) ||
          (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)),
        isNaN(parseFloat(this.limitY)) ||
          (this.my = this.clamp(this.my, -this.limitY, this.limitY)),
        (this.vx += (this.mx - this.vx) * this.frictionX),
        (this.vy += (this.my - this.vy) * this.frictionY);
      for (var e = 0, s = this.$layers.length; e < s; e++) {
        var o = this.depths[e],
          n = this.$layers[e],
          a = this.vx * o * (this.invertX ? -1 : 1),
          r = this.vy * o * (this.invertY ? -1 : 1);
        this.setPosition(n, a, r);
      }
      this.raf = requestAnimationFrame(this.onAnimationFrame);
    }),
    (r.prototype.onDeviceOrientation = function(t) {
      if (!this.desktop && null !== t.beta && null !== t.gamma) {
        this.orientationStatus = 1;
        var i = (t.beta || 0) / 30,
          e = (t.gamma || 0) / 30,
          s = u.innerHeight > u.innerWidth;
        this.portrait !== s &&
          ((this.portrait = s), (this.calibrationFlag = !0)),
          this.calibrationFlag &&
            ((this.calibrationFlag = !1), (this.cx = i), (this.cy = e)),
          (this.ix = i),
          (this.iy = e);
      }
    }),
    (r.prototype.onMouseMove = function(t) {
      var i = t.clientX,
        e = t.clientY;
      !this.orientationSupport && this.relativeInput
        ? (this.clipRelativeInput &&
            ((i = Math.max(i, this.ex)),
            (i = Math.min(i, this.ex + this.ew)),
            (e = Math.max(e, this.ey)),
            (e = Math.min(e, this.ey + this.eh))),
          (this.ix = (i - this.ex - this.ecx) / this.erx),
          (this.iy = (e - this.ey - this.ecy) / this.ery))
        : ((this.ix = (i - this.wcx) / this.wrx),
          (this.iy = (e - this.wcy) / this.wry));
    });
  var h = {
    enable: r.prototype.enable,
    disable: r.prototype.disable,
    updateLayers: r.prototype.updateLayers,
    calibrate: r.prototype.calibrate,
    friction: r.prototype.friction,
    invert: r.prototype.invert,
    scalar: r.prototype.scalar,
    limit: r.prototype.limit,
    origin: r.prototype.origin,
  };
  a.fn[o] = function(e) {
    var s = arguments;
    return this.each(function() {
      var t = a(this),
        i = t.data(o);
      i || ((i = new r(this, e)), t.data(o, i)),
        h[e] && i[e].apply(i, Array.prototype.slice.call(s, 1));
    });
  };
})(window.jQuery || window.Zepto, window, document),
  (function() {
    for (
      var n = 0, t = ['ms', 'moz', 'webkit', 'o'], i = 0;
      i < t.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[t[i] + 'RequestAnimationFrame']),
        (window.cancelAnimationFrame =
          window[t[i] + 'CancelAnimationFrame'] ||
          window[t[i] + 'CancelRequestAnimationFrame']);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function(t, i) {
        var e = new Date().getTime(),
          s = Math.max(0, 16 - (e - n)),
          o = window.setTimeout(function() {
            t(e + s);
          }, s);
        return (n = e + s), o;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function(t) {
          clearTimeout(t);
        });
  })(),
  $(window).load(function() {
    initializeSite(),
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 0);
  });
