export const environment = {
  production: false,
  supabaseUrl: 'https://oeugdozkltfstbdhffoq.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldWdkb3prbHRmc3RiZGhmZm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjI1OTgsImV4cCI6MjA3NTgzODU5OH0.oyiTLDs5VdX7nna5WEtJnyeSrWQIcozOB26kMemeQdg',
  n8nOrderWebhookUrl: 'http://localhost:5678/webhook/order',
  n8nITNPublicUrl: 'https://unlaved-arnita-unaging.ngrok-free.dev/webhook/payfast-itn',
  payfast: {
    sandbox: true,
    merchant_id: '10042714',
    merchant_key: 'bhkju6yfc8us7',
    // passphrase: 'bhkju6yfc8us7',
    passphrase: '',
    return_url: 'http://localhost:4200/thank-you',
    cancel_url: 'http://localhost:4200/cancelled',
    notify_url: 'https://unlaved-arnita-unaging.ngrok-free.dev/webhook/payfast-itn'
  }
};
