const request = require('request-promise');

exports.handler = async event => {
  const getAppToken = () => {
    const options = {
      url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&grant_type=client_credentials`,
      method: 'POST',
      json: true,
    };

    return request(options);
  };

  // The single webhook we're subscribing to in this tutorial
  const webhook = {
    channel: '32168215',
    type: 'follows',
    topic: 'https://api.twitch.tv/helix/users/follows?first=1&to_id=32168215'
  };

  // Twitch request to return current subscriptions associated with our app token
  let appToken = null;
  const checkSubscriptions = res => {
    appToken = 'Bearer ' + res.access_token;

    const options = {
      url: 'https://api.twitch.tv/helix/webhooks/subscriptions',
      headers: {
        Authorization: appToken,
        'Client-Id': process.env.client_id
      },
      json: true
    };

    return request(options);
  };

  const createSubscription = res => {
    // Check if subscription both exists and has at least 2 hours remaining on the lease
    const sub = res.data.find(item => item.topic === webhook.topic);
    if (sub && (new Date(sub.expires_at) - new Date()) / 3600000 > 2) return;

    const options = {
      url: 'https://api.twitch.tv/helix/webhooks/hub',
      method: 'POST',
      headers: {
        Authorization: appToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'hub.callback': `${process.env.domain}?channel=${webhook.channel}&type=${webhook.type}`,
        'hub.mode': 'subscribe',
        'hub.topic': webhook.topic,
        'hub.lease_seconds': 86400,
        'hub.secret': process.env.webhook_secret
      })
    };

    return request(options);
  };

  return getAppToken()
    .then(checkSubscriptions)
    .then(createSubscription)
    .then(res => ({ statusCode: 200 }))
    .catch(err => {
      console.warn(err);
      return { statusCode: 500 };
    });
};
