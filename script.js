const redirectURL = 'YOUR_REDIRECT_URL';

const isVideoaskMessage = (message) =>
  message.origin === 'https://www.videoask.com' &&
  message.data &&
  message.data.type &&
  message.data.type.startsWith('videoask_');

window.addEventListener('message', (message) => {
  if (!isVideoaskMessage(message)) {
    return;
  }

  const { type } = message.data;
  if (type === 'videoask_contact_updated') {
    const { email } = message.data;
    window.dispatchEvent(
      new CustomEvent('hyros_email', {
        detail: {
          email: email,
        },
      })
    );
  } else if (type === 'videoask_submitted') {
    location.assign(redirectURL);
  }
});
