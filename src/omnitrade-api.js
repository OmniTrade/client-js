const util = require("util");
const request = require("request");
const crypto = require("crypto");

module.exports = function(opts) {

  var impl = {
    // settings
    base_url : opts.url || "https://omnitrade.io",
    base_path: opts.base_path || "/api/v2",
    access_key: opts.access_key,
    secret: opts.secret,

    // internal methods
    signature: signature,
    payload: payload,
    params_string: params_string,
    url: url,

    get_private: get_private,
    exec_req: exec_req,
    exec_private: exec_private,

    // dependencies
    request: opts.request || request,
    crypto: opts.crypto || crypto
  };


  var api = {
    get: get,

    get_markets: get_markets,

    get_tickers: get_tickers,

    get_me: get_me,

    validate_password: validate_password,

    get_deposits: get_deposits,
    get_deposit: get_deposit,
    get_deposit_address: get_deposit_address,

    get_order: get_order,
    get_orders: get_orders,

    place_order: place_order,
    place_orders: place_orders,

    cancel_order: cancel_order,
    cancel_all_orders: cancel_all_orders,

    get_depth: get_depth,

    get_order_book: get_order_book,

    get_orderbook: get_orderbook,

    get_trades: get_trades,

    get_my_trades: get_my_trades,

    get_k: get_k,

    get_k_with_pending_trades: get_k_with_pending_trades,

    get_timestamp: get_timestamp,

    get_trezor: get_trezor,

    v4t: impl
  };

  function get_markets() {
    return api.get("markets", {})
  }

  function get_tickers(market) {
    path = market == null ? "" : "/" + market
    return api.get("tickers" + path, {})
  }
 
  function get_me() {
    return impl.get_private("members/me")
  }

  function validate_password(password){
    return impl.get_private("users/validate_password", {password: password})
  }

  function get_deposits(params) {
    return impl.get_private("deposits", params)
  }

  function get_deposit(txid) {
    return impl.get_private("deposit", {txid: txid})
  }

  function get_deposit_address(currency) {
    return impl.get_private("deposit_address", {currency: currency})
  }

  function get_orders(params) {
    return impl.get_private("orders", params)
  }

  function place_order(params) {
    return impl.exec_private("POST", "orders", params)
  }

  function place_orders(params) {
    return impl.exec_private("POST", "orders/multi", params)
  }

  function cancel_all_orders(params) {
    return impl.exec_private("POST", "orders/clear", params)
  }

  function get_order(id) {
    return impl.get_private("order", {id: id})
  }

  function cancel_order(id) {
    return impl.exec_private("POST", "order/delete", {id: id})
  }

  function get_order_book(params) {
    return api.get("order_book", params)
  }

  function get_depth(params) {
    return api.get("depth", params)
  }

  function get_orderbook(market) {
    return impl.get_private("orderbook", {market: market})
  }

  function get_trades(params) {
    return api.get("trades", params)
  }

  function get_my_trades(params) {
    return impl.get_private("trades/my", params)
  }

  function get_k(params) {
    return api.get("k", params)
  } 

  function get_k_with_pending_trades(params) {
    return api.get("k_with_pending_trades", params)
  }

  function get_timestamp() {
    return api.get("timestamp", {})
  }

  function get_trezor() {
    return api.get("trezor/new_challenge", {})
  }

  function get(path, params, query_params_str) {
    return impl.exec_req("GET", path, params, query_params_str)
  }

  function exec_req(method, path, params, query_params_str) {
    var p = new Promise(function(resolve, reject) {
      var req_url = impl.url(path, params, query_params_str);
      //console.log("u=" + req_url);
      impl.request({uri: req_url, method: method}, function(error, response, body) {
        // console.log("exec_req() error=" + error);
        // console.log("exec_req() response=" + JSON.stringify(response));
        // console.log("exec_req() body=" + body);
        if (error) reject(error);
        else resolve(body)
      });

    });

    return p.then(function(data){
      console.log(data);
      return JSON.parse(data)
    })
  }

  // POST /orders
  // {"id":11,"side":"sell","ord_type":"limit","price":"0.1","avg_price":"0.0","state":"wait","market":"btcusd",
  // "created_at":"2018-03-14T14:33:09Z","volume":"0.1","remaining_volume":"0.1","executed_volume":"0.0",
  // "trades_count":0}"}
  function post(path, params, query_params_str) {
    return impl.exec_req("POST", path, params, query_params_str)
  }


  function get_private(path, query_params, tonce) {
    return impl.exec_private("GET", path, query_params, tonce)
  }

  function exec_private(method, path, query_params, tonce) {
    //console.log("exec_private() called!")
    var params = query_params || {};

    params["tonce"] = tonce || Date.now();
    params["access_key"] = impl.access_key;

    var payload_ = impl.payload(method, path, params);
    var signature_ = impl.signature(payload_, impl.secret);
    var qp_str = impl.params_string(params) + util.format("signature=%s", signature_);

    return impl.exec_req(method, path, params, qp_str)
  }


  function post_private(path, query_params, tonce) {
    return impl.exec_private("POST", path, query_params, tonce)
  }

  function params_string(params) {
    var str = "";
    var sorted_keys = Object.keys(params);
    sorted_keys.sort();
    for(var key of sorted_keys) {
      str += util.format("%s=%s&", key, params[key])
    }
    return str
  }

  function url(path, params, query_params_str) {
    var params_str = query_params_str; // passed qp string has prio over hash
    if (params_str == null)
      params_str = impl.params_string(params);
    return util.format("%s%s/%s?%s", impl.base_url, impl.base_path, path, params_str)
  }

  function payload(method, path, params) {
    var temp_str = impl.params_string(params);
    var params_str = temp_str.substring(0, temp_str.length - 1);
    return util.format("%s|%s/%s|%s", method, impl.base_path, path, params_str)
  }


  function signature(payload, secret) {
    return impl.crypto.createHmac('sha256', secret).update(payload).digest("hex");
  }

  return api
};
