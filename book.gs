/** @OnlyCurrentDoc */

function getBook() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var ASSOCIATE_TAG = "your tag"
  var ACCESS_KEY_ID = "your key id";
  var SECRET_KEY = "your secret";
  var ENDPOINT = "webservices.amazon.co.jp";
  var REQUEST_URI = "/onca/xml";
  var itemId = "9784103512110"; // ISBN
  var date = new Date();
  var params = {
    "AWSAccessKeyId": ACCESS_KEY_ID,
    "AssociateTag": ASSOCIATE_TAG,
    "Condition": "New",
    "IdType": "ISBN",
    "ItemId": itemId,
    "Operation": "ItemLookup",
    "ResponseGroup": "ItemAttributes,Offers",
    "SearchIndex": "Books",
    "Service": "AWSECommerceService",
    "Timestamp": date.toISOString()
  };
  var arr = [];
  for (var key in params) {
    arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
  }
  var canonicalQueryString = arr.join("&");
  var stringToSign = "GET\n"+ ENDPOINT +"\n" + REQUEST_URI + "\n" + canonicalQueryString;
  var signature = Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, stringToSign, SECRET_KEY));
  var requestUrl = "http://" + ENDPOINT + REQUEST_URI + "?" + canonicalQueryString + "&Signature=" + encodeURI(signature);

  var response = UrlFetchApp.fetch(requestUrl);
  Browser.msgBox(response);
}