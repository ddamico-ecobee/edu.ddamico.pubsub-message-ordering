const { PubSub } = require("@google-cloud/pubsub");
const entries = require("./entries.json");

const PROJECT_ID = `ordering`;
const TOPIC_ID = `glucose-events`;
const SUBSCRIPTION_ID = `glucose-events-sub`;

const pubsubSetup = () => {
  // create topic, subscription
};

(async () => {
  const pubsub = new PubSub({ PROJECT_ID });

  const [topic] = await pubsub.createTopic(TOPIC_ID);
  console.log(`Topic ${topic.name} created.`);
})();
