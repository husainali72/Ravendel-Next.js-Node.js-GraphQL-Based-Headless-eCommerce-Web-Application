const OneSignal = require("onesignal-node");
const APP_KEYS = require("./keys");
const User = require("../models/User");
const Customer = require("../models/Customer");

const notificationTemplate = {
  NEW_ORDER_PLACED_SELLER: {
    title: "🎉 New Order Alert!",
    message:
      "You’ve got a new order! Check your dashboard to see the details and get it ready to ship.",
    app_url: `${APP_KEYS.ONE_SIGNAL_DEEPLINK}seller://ViewOrder/{id}`,
  },

  ORDER_PLACED_CUSTOMER: {
    title: "🚀 Order Confirmed!",
    message:
      "We’re on it! Your items are being packed with care and will soon be on their way. Thanks for choosing Zemjet!",
    app_url: `${APP_KEYS.ONE_SIGNAL_DEEPLINK}://OrdersDetail/{id}`,
  },

  ORDER_FAILED_CUSTOMER: {
    title: "😰 Oops! Order Failed!",
    message:
      "Something went wrong, and your order didn’t go through. Please check all your details and try again. If you need assistance, contact our support team",
    app_url: `${APP_KEYS.ONE_SIGNAL_DEEPLINK}://OrdersDetail/{id}`,
  },
};

const sendPushNotificationTemplate = async (
  userId,
  template_name,
  Setting,
  orderId
) => {
  // console.log("sendPushNotificationTemplate: ", userId, template_name);
  // console.log("env deeplink name : ", APP_KEYS.ONE_SIGNAL_DEEPLINK);
  if ((!userId, !template_name, !Setting, !orderId)) {
    // console.log("User Id Not Found");
    return false;
  }
  // console.log("sendPushNotificationTemplate Settings: ", Setting);

  let APP_ID = Setting.notification.customer.app_id;
  let API_KEY = Setting.notification.customer.rest_api_key;

  // console.log("APP_ID: ", APP_ID, "API_KEY: ", API_KEY);

  if (!APP_ID || !API_KEY) {
    // console.log("APP_ID or API_KEY not found");
    return false;
  }

  let notification = notificationTemplate[template_name];

  if (!notification) {
    // console.log("Notification Template Not Found");
    return false;
  }

  let device_id;
  let userData;
  if (userId === "ADMIN") {
    userData = await User.findOne({
      role: "MANAGER",
      "device_info.device_id": { $exists: true, $ne: "" },
    });
    APP_ID = Setting.notification.customer.app_id;
    API_KEY = Setting.notification.customer.rest_api_key;
  } else {
    userData = await Customer.findOne({ _id: userId });
  }

  if (!userData) {
    // console.log("User Data Not Found");
    return false;
  }

  device_id = userData?.device_info?.device_id;

  // console.log("userData: ", device_id);

  if (!device_id || device_id === "") {
    // console.log("Device Id Not Found");
    return false;
  }
  notification.app_url = notification.app_url.replace("{id}", orderId);

  await sendPushNotification(device_id, notification, APP_ID, API_KEY);
};

const sendPushNotification = async (playerId, data, APP_ID, API_KEY) => {
  const notification = {
    contents: { en: data.message },
    include_player_ids: [playerId],
    headings: { en: data.title },
    app_url: data.app_url,
  };

  // console.log("push notification data : ", notification);
  if (!APP_ID || !API_KEY) {
    // console.log("APP_ID or API_KEY not found");
    return false;
  }

  const oneSignalClient = new OneSignal.Client(APP_ID, API_KEY);

  try {
    const response = await oneSignalClient.createNotification(notification);
    // console.log("Notification sent successfully:", response.body);
  } catch (e) {
    // if (e instanceof OneSignal.HTTPError) {
    //   console.error("HTTP error:", e.statusCode, e.body);
    // } else {
    // console.error("Error sending notification:", e);
    // }
    return false;
  }
};

// // Example usage
// const playerId = "da6833da-dcb4-4c92-9555-14b1f7ae1cfd";
// const notificationTitle = "Welcome to Our Service";
// const notificationMessage =
//   "Thank you for signing up! We hope you enjoy our service.";

// sendPushNotification(playerId, notificationTitle, notificationMessage);

module.exports = {
  sendPushNotificationTemplate,
  sendPushNotification,
  notificationTemplate,
};
