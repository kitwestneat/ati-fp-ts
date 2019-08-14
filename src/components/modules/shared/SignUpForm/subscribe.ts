// @flow

const NEWSLETTER_SUBMISSION_URL = 'https://pbh-network.com/subs.php?json=true';

export function subscribe(email: string, extraOpts: any) {
  return fetch(NEWSLETTER_SUBMISSION_URL, {
    method: 'POST',
    body: new URLSearchParams({ EMAIL: email, ...extraOpts })
  });
}
