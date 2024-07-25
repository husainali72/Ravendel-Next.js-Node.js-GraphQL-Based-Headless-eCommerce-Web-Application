const OneSignal = require("onesignal-node");
const APP_KEYS = require("./keys");
const User = require("../models/User");
const Customer = require("../models/Customer");


const notificationTemplate = {
  NEW_ORDER_PLACED_SELLER: {
    title: "🎉 New Order Alert!",
    message:
      "You’ve got a new order! Check your dashboard to see the details and get it ready to ship.",
  },

  ORDER_PLACED_CUSTOMER: {
    title: "🚀 Order Confirmed!",
    message:
      "We’re on it! Your items are being packed with care and will soon be on their way. Thanks for choosing Zemjet!",
  },

  ORDER_FAILED_CUSTOMER: {
    title: "😰 Oops! Order Failed!",
    message:
      "Something went wrong, and your order didn’t go through. Please check all your details and try again. If you need assistance, contact our support team",
  },
};

const sendPushNotificationTemplate = async (userId, template_name, Setting) => {
  // console.log("sendPushNotificationTemplate: ", userId, template_name);
  if (!userId) {
    // console.log("User Id Not Found");
    return false;
  }
  // console.log("sendPushNotificationTemplate Settings: ", Setting);

  let APP_ID = Setting.notification.one_signal.app_id;
  let API_KEY = Setting.notification.one_signal.rest_api_key;

  if (!APP_ID || !API_KEY) {
    // console.log("APP_ID or API_KEY not found");
    return false;
  }

  let device_ids = [];
  if (userId === "ADMIN") {
    let userData = await User.find({ role: "MANAGER" });

    if (userData.length == 0) {
      // console.log("No Admin Found");
      return false;
    }

    device_ids = userData.map((user) => user.device_info.device_id);

    device_ids = device_ids.filter((id) => id !== undefined && id !== null);


    if(device_ids.length == 0) {
      // console.log("No Admin Device Ids Found");
      return false;
    }

    // console.log("Admin Device Ids: ", device_ids);
  } else {
    let userData = await Customer.findOne({ _id: userId });

    if (!userData.device_info) {
      // console.log("User No Device Info Found");
      return false;
    }

    let deviceId = userData.device_info.device_id;
    if (!deviceId) {
      // console.log("User No Device Id Found");
      return false;
    }

    device_ids.push(deviceId);
  }

  let notification = notificationTemplate[template_name];

  if (!notification) {
    // console.log("Notification Template Not Found");
    return false;
  }

  await sendPushNotification(device_ids, notification, APP_ID, API_KEY);
};

const sendPushNotification = async (playerIds, data, APP_ID, API_KEY) => {
  const notification = {
    contents: { en: data.message },
    include_player_ids: playerIds,
    headings: { en: data.title },
  };

  if (!APP_ID || !API_KEY) {
    // console.log("APP_ID or API_KEY not found");
    return false;
  }

  const oneSignalClient = new OneSignal.Client(
    APP_ID,
    API_KEY
  );


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

