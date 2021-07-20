const { PubSub } = require("@google-cloud/pubsub");
const entries = require("./entries.json");

const PROJECT_NAME = `ordering`;
const TOPIC_NAME = `glucose-events`;
const SUBSCRIPTION_NAME = `glucose-events-sub`;

const MAX_MESSAGES = 10;
const MAX_WAIT_TIME = 10;

const pubsubSetup = async () => {
  // create topic, subscription
};

const pubsubCleanup = async (pubsub) => {
  await pubsub.subscription(SUBSCRIPTION_NAME).delete();
  await pubsub.topic(TOPIC_NAME).delete();
};

(async () => {
  const pubsub = new PubSub({ projectId: PROJECT_NAME });

  try {
    await pubsubCleanup(pubsub);
  } catch (e) {
    console.log("nothing to clean up");
  }

  const [topic] = await pubsub.createTopic(TOPIC_NAME);
  //   const batchPublisher = pubsub.topic(TOPIC_NAME, {
  //     batching: {
  //       maxMessages: MAX_MESSAGES,
  //       maxMilliseconds: MAX_WAIT_TIME * 1000,
  //     },
  //   });

  const [subscription] = await pubsub
    .topic(TOPIC_NAME)
    .createSubscription(SUBSCRIPTION_NAME, { enableMessageOrdering: true });

  subscription.on("message", (message) => {
    console.log("Received message:", message.data.toString());
  });

  entries.forEach((entry) => {
    const message = {
      data: entry,
      orderingKey: entry.mills,
    };
    const payload = Buffer.from(JSON.stringify(message));
    // (async () => {
    //   const messageId = await batchPublisher.publish(payload);
    //   console.log(`Message ${messageId} published.`);
    // })();
    topic.publish(payload);
  });
})();
