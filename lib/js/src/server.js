'use strict';

var Curry      = require("bs-platform/lib/js/curry.js");
var Js_exn     = require("bs-platform/lib/js/js_exn.js");
var Express    = require("bs-express/lib/js/src/express.js");
var Js_json    = require("bs-platform/lib/js/js_json.js");
var Process    = require("process");
var Caml_obj   = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

var app = Express.express(/* () */0);

function setProperty(req, property) {
  req[property] = true;
  return /* () */0;
}

function checkProperty(req, next, property, k) {
  var match = req[property];
  if (match !== undefined) {
    var match$1 = Js_json.decodeBoolean(match);
    if (match$1 && Caml_obj.caml_equal(match$1[0], true)) {
      return Curry._1(k, /* () */0);
    } else {
      return Curry._1(next, Express.Next[/* route */1]);
    }
  } else {
    return Curry._1(next, Express.Next[/* route */1]);
  }
}

function checkProperties(req, next, properties, k) {
  var aux = function (properties) {
    if (properties) {
      var tl = properties[1];
      return checkProperty(req, next, properties[0], (function () {
                    return aux(tl);
                  }));
    } else {
      return Curry._1(k, /* () */0);
    }
  };
  return aux(properties);
}

function makeSuccessJson() {
  var json = { };
  json["success"] = true;
  return json;
}

app.use("/", (function (req, _, next) {
        setProperty(req, "middleware0");
        return Curry._1(next, Express.Next[/* middleware */0]);
      }));

app.get("/", (function (_, res, _$1) {
        return res.json(makeSuccessJson(/* () */0));
      }));

function onListen(port, e) {
  var exit = 0;
  var val;
  try {
    val = e;
    exit = 1;
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Js_exn.$$Error) {
      console.log(exn[1]);
      Process.exit(1);
      return /* () */0;
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    console.log("Listening at http://127.0.0.1:" + Pervasives.string_of_int(port));
    return /* () */0;
  }
  
}

Express.App[/* listen */0](app, /* None */0, /* Some */[(function (param) {
          return onListen(3000, param);
        })], /* () */0);

exports.app             = app;
exports.setProperty     = setProperty;
exports.checkProperty   = checkProperty;
exports.checkProperties = checkProperties;
exports.makeSuccessJson = makeSuccessJson;
exports.onListen        = onListen;
/* app Not a pure module */
