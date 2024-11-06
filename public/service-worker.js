const STORAGE_KEY = 'treeSurveys'
const POWER_AUTOMATE_URL = 'https://prod-31.brazilsouth.logic.azure.com:443/workflows/4351ccfcbdff44f39f2aa09c3b2aa54c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hL45qx1L3SLKKXkvEjtaRq7y-IZwzIfyddSMbr_JyzQ'

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-surveys') {
    event.waitUntil(syncSurveys())
  }
})

async function syncSurveys() {
  const surveys = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  if (surveys.length === 0) return;

  try {
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(surveys),
    });

    if (response.ok) {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Surveys synced successfully');
    } else {
      throw new Error('Failed to sync surveys');
    }
  } catch (error) {
    console.error('Error syncing surveys:', error);
  }
}
