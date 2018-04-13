# OmniTrade API JS Client

**omnitrade-client** is an open-source node JS that integrates the **[OmniTrade](https://omnitrade.io/)** API.

You can read the API documentation by visiting **<https://omnitrade.io/documents/api_v2>**

## Installation

Download the client and place it inside your application.

## Usage

Require it by using

```javascript
const OmniTradeApi = require("path/to/omnitrade-client-js/index.js");
```
You can use both the public or private API.

### Public
------
Instance your public client by using:

```javascript
const public_api = OmniTradeApi({});
```
Make requests to the API using the following methods, as the exaple follows:

```javascript
public_api.get_orders({market: 'btcbrl'}).then(function(data){
  foo.bar(data);
});
```

#### .get_markets()

Makes a GET request to '/api/v2/markets'.

#### .get_tickers(market)

`@params market {String} - the desired market (optional)`

Makes a GET request to '/api/v2/tickers'. You can also get the tickers for a desired market by passing it as an argument.

#### .get_order_book(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information.

Makes a GET request to '/api/v2/order_book'.

#### .get_trades(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information.

Makes a GET request to '/api/v2/trades'.

#### .get_k(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information.

Makes a GET request to '/api/v2/k'.

#### .get_k_with_pending_trades(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information.

Makes a GET request to '/api/v2/k_with_pending_trades'.

#### .get_depth(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information.

Makes a GET request to '/api/v2/depth'.

#### .get_timestamp()

Makes a GET request to '/api/v2/timestamp'.

#### .get_trezor()

Makes a GET request to '/api/v2/trezor/new_challenge'.

### Private
------

You can also use your private client to make requests to the public API, using the methods listed in the previous section.

Instance your private client by using:

```javascript
const private_api = OmniTradeApi({access_key: "your_access_key", secret: "your_secret_key"});
```
Make requests to the API using the following methods, as the example follows:

```javascript
private_api.get_me().then(function(data){
  foo.bar(data);
});
```
#### .get_me()

Makes a GET request to '/api/v2/members/me'.

#### .validate_password(password)

`@params password {String} - the password to be validated`

Makes a GET request to '/api/v2/users/validate_password'.

#### .get_deposits(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information. Access key, secret key and signature are not to be specified on this hash.

Makes a GET request to '/api/v2/deposits'.

#### .get_deposit(txid)

`@params txid {String} - the txid of the deposit`

Makes a GET request to '/api/v2/users/deposit'.

#### .get_deposit_address(currency)

`@params currency {String} - the currency that will be requested the address for.`

Makes a GET request to '/api/v2/users/deposit_address'.

#### .get_orders(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information. Access key, secret key and signature are not to be specified on this hash.

Makes a GET request to '/api/v2/orders'.

#### .place_order(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information. Access key, secret key and signature are not to be specified on this hash.

Makes a POST request to '/api/v2/orders'.

#### .place_orders(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information. Access key, secret key and signature are not to be specified on this hash.

Makes a POST request to '/api/v2/orders/multi'.

#### .cancel_all_orders(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information. Access key, secret key and signature are not to be specified on this hash.

Makes a POST request to '/api/v2/orders/clear'.

#### .get_order(id)

`@params id {String} - the id of the deposit`

Makes a GET request to '/api/v2/order'.

#### .cancel_order(id)

`@params id {String} - the id of the deposit`

Makes a POST request to '/api/v2/order/delete'.

#### .get_orderbook(market)

`@params market {String} - the desired market`

Makes a GET request to '/api/v2/orderbook'.

#### .get_my_trades(parameters)

`@params parameters {Hash} - a hash with the desired parameters` Consult the **[API Documentation](https://omnitrade.io/documents/api_v2)** for more information. Access key, secret key and signature are not to be specified on this hash.

Makes a GET request to '/api/v2/trades/my'.

## Licence

OmniTrade (C) All Rights Reserved.

`omnitrade-client` is released under Apache License 2.0.
