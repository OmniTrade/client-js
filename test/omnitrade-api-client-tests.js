const expect = require("chai").expect;
const nock = require('nock');

describe("omnitrade-api client tests", function() {

  describe("public api", function() {

    const public_api = require("../index")({});

    describe("#get_markets", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/markets?')
        .reply(200, JSON.stringify(markets));
      });

      const markets = require('./fixtures/markets.json');

      it("gets the markets", async function(){
        const result = await public_api.get_markets();
        expect(result).to.eql(markets);
      });
    });

    describe("#get_tickers", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/tickers?')
        .reply(200, JSON.stringify(tickers));
      });

      const tickers = require('./fixtures/tickers.json');

      it("gets the tickers", async function(){
        const result = await public_api.get_tickers();
        expect(result).to.eql(tickers);
      });
    });

    describe("#get_order_book", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/order_book?market=btcbrl&')
        .reply(200, JSON.stringify(order_book));
      });

      const order_book = require('./fixtures/order_book.json');
      const market = 'btcbrl'

      it("gets the order book", async function(){
        const result = await public_api.get_order_book({market: market});
        expect(result).to.eql(order_book);
      });
    });

    describe("#get_trades", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/trades?market=btcbrl&')
        .reply(200, JSON.stringify(trades));
      });

      const trades = require('./fixtures/trades.json');
      const market = 'btcbrl'

      it("gets the trades of a given market", async function(){
        const result = await public_api.get_trades({market: market});
        expect(result).to.eql(trades);
      });
    });

    describe("#get_k", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/k?market=btcbrl&')
        .reply(200, JSON.stringify(k));
      });

      const k = require('./fixtures/k.json');
      const market = 'btcbrl'

      it("gets the k of a given market", async function(){
        const result = await public_api.get_k({market: market});
        expect(result).to.eql(k);
      });
    });

    describe("#get_k_with_pending_trades", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/k_with_pending_trades?market=btcbrl&')
        .reply(200, JSON.stringify(k_with_pending_trades));
      });

      const k_with_pending_trades = require('./fixtures/k_with_pending_trades.json');
      const market = 'btcbrl'

      it("gets the k with pending trades of a given market", async function(){
        const result = await public_api.get_k_with_pending_trades({market: market});
        expect(result).to.eql(k_with_pending_trades);
      });
    });

    describe("#get_depth", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/depth?market=btcbrl&')
        .reply(200, JSON.stringify(depth));
      });

      const depth = require('./fixtures/depth.json');
      const market = 'btcbrl'

      it("gets the depth of a given market", async function(){
        const result = await public_api.get_depth({market: market});
        expect(result).to.eql(depth);
      });
    });

    describe("#get_timestamp", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/timestamp?')
        .reply(200, JSON.stringify(timestamp));
      });

      const timestamp = require('./fixtures/timestamp.json');
      const market = 'btcbrl'

      it("gets a timestamp", async function(){
        const result = await public_api.get_timestamp();
        expect(result).to.eql(timestamp);
      });
    });

    describe("#get_trezor", function() {

      beforeEach(function() {
        const request = nock('https://omnitrade.io')
        .get('/api/v2/trezor/new_challenge?')
        .reply(200, JSON.stringify(trezor));
      });

      const trezor = require('./fixtures/trezor.json');

      it("gets a new challenge", async function(){
        const result = await public_api.get_trezor();
        expect(result).to.eql(trezor);
      });

      describe("when there is an error", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .get('/api/v2/markets?')
          .reply(401, JSON.stringify(error));
        });

        const error = require('./fixtures/error.json');

        it("returns the error", async function(){
          const result = await public_api.get_markets();
          expect(result).to.eql(error);
        });
      });
    });


    describe("private api", function() {
      const nock = require('nock');
      const access_key = 'a1d0c6e83f027327d8461063f4ac58a6';
      const secret = 'e48e13207341b6bffb7fb1622282247b';

      const private_api = require("../index")({access_key: access_key, secret: secret });

      describe("#get_me", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/members/me?";
          })
          .get('/v2/members/me?')
          .reply(200, JSON.stringify(me));
        });

        const me = require('./fixtures/me.json');

        it("gets the current user", async function(){
          const result = await private_api.get_me();
          expect(result).to.eql(me);
        });
      });

      describe("#validate_password", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/validate_password";
          })
          .get('/v2/validate_password')
          .reply(200, JSON.stringify(validate_password));
        });

        const validate_password = require('./fixtures/validate_password.json');

        it("validates a given password", async function(){
          const result = await private_api.validate_password('a_password');
          expect(result).to.eql(validate_password);
        });
      });

      describe("#get_deposits", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/deposits";
          })
          .get('/v2/deposits')
          .reply(200, JSON.stringify(deposits));
        });

        const deposits = require('./fixtures/deposits.json');

        it("gets the user deposits", async function(){
          const result = await private_api.get_deposits();
          expect(result).to.eql(deposits);
        });
      });

      describe("#get_deposit", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/users/deposit";
          })
          .get('/v2/users/deposit')
          .reply(200, JSON.stringify(deposit));
        });

        const deposit = require('./fixtures/deposit.json');

        it("gets info on a deposit of a given txid", async function(){
          const result = await private_api.get_deposit('1337');
          expect(result).to.eql(deposit);
        });
      });

      describe("#get_deposit_address", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/deposit_address";
          })
          .get('/v2/deposit_address')
          .reply(200, JSON.stringify(deposit_address));
        });

        const deposit_address = require('./fixtures/deposit_address.json');

        it("gets the user deposit address on a given currency", async function(){
          const result = await private_api.get_deposit_address('bitcoin');
          expect(result).to.eql(deposit_address);
        });
      });

      describe("#get_orders", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/orders";
          })
          .get('/v2/orders')
          .reply(200, JSON.stringify(orders));
        });

        const orders = require('./fixtures/orders.json');

        it("gets the user orders", async function(){
          const result = await private_api.get_orders();
          expect(result).to.eql(orders);
        });
      });

      describe("#place_order", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/orders";
          })
          .post('/v2/orders')
          .reply(200, JSON.stringify(order));
        });

        const order = require('./fixtures/order.json');
        const order_params = { market: 'btcbrl', side: 'buy', volume: '0.001' }

        it("places an order", async function(){
          const result = await private_api.place_order(order_params);
          expect(result).to.eql(order);
        });
      });

      describe("#place_orders", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/orders";
          })
          .post('/v2/orders')
          .reply(200, JSON.stringify(orders));
        });

        const orders = require('./fixtures/orders.json');
        const order_params = { market: 'btcbrl', side: 'buy', volume: '0.001' }

        it("places multiple orders", async function(){
          const result = await private_api.place_order([order_params, order_params]);
          expect(result).to.eql(orders);
        });
      });

      describe("#cancel_all_orders", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/orders/clear";
          })
          .post('/v2/orders/clear')
          .reply(200, JSON.stringify(orders));
        });

        const orders = require('./fixtures/orders.json');

        it("cancels every order", async function(){
          const result = await private_api.cancel_all_orders();
          expect(result).to.eql(orders);
        });
      });

      describe("#get_order", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/order";
          })
          .get('/v2/order')
          .reply(200, JSON.stringify(order));
        });

        const order = require('./fixtures/order.json');

        it("gets information on a given order", async function(){
          const result = await private_api.get_order('79734');
          expect(result).to.eql(order);
        });
      });

      describe("#cancel_order", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/order/delete";
          })
          .post('/v2/order/delete')
          .reply(200, JSON.stringify(order));
        });

        const order = require('./fixtures/order.json');

        it("cancels a given order", async function(){
          const result = await private_api.cancel_order('79734');
          expect(result).to.eql(order);
        });
      });

      describe("#get_orderbook", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/api/v2/orderbook";
          })
          .get('/api/v2/orderbook')
          .reply(200, JSON.stringify(orderbook));
        });

        const orderbook = require('./fixtures/order_book.json');
        const market = 'btcbrl'

        it("gets the orderbook of a given market", async function(){
          const result = await private_api.get_orderbook({market: market});
          expect(result).to.eql(orderbook);
        });
      });


      describe("#get_my_trades", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/api/v2/trades/my";
          })
          .get('/api/v2/trades/my')
          .reply(200, JSON.stringify(trades));
        });

        const trades = require('./fixtures/trades.json');
        const market = 'btcbrl'

        it("gets the users trades of a given market", async function(){
          const result = await private_api.get_my_trades({market: market});
          expect(result).to.eql(trades);
        });
      });

      describe("when there is an error", function() {

        beforeEach(function() {
          const request = nock('https://omnitrade.io')
          .filteringPath(function(path){
            return "/v2/members/me?";
          })
          .get('/v2/members/me?')
          .reply(401, JSON.stringify(error));
        });

        const error = require('./fixtures/error.json');

        it("returns the error", async function(){
          const result = await private_api.get_me();
          expect(result).to.eql(error);
        });
      });
    });
  });
});
