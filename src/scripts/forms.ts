// Progressive enhancement for Netlify Forms: submit in place instead of
// navigating to Netlify's default success page.

const messages: Record<string, string> = {
  newsletter: 'Thanks – you are on the list.',
  contact: 'Message sent. We will get back to you as soon as we can.',
};

export const initAjaxForms = () => {
  document.querySelectorAll<HTMLFormElement>('form[data-ajax-form]:not([data-bound])').forEach((form) => {
    form.dataset.bound = '';
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const body = new URLSearchParams();
      data.forEach((value, key) => body.append(key, String(value)));

      button?.setAttribute('disabled', '');
      if (status) {
        status.textContent = 'Sending…';
        status.dataset.state = 'pending';
      }

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        if (status) {
          status.textContent = messages[form.name] ?? 'Thank you.';
          status.dataset.state = 'success';
        }
      } catch {
        if (status) {
          status.textContent = 'Something went wrong. Please try again.';
          status.dataset.state = 'error';
        }
      } finally {
        button?.removeAttribute('disabled');
      }
    });
  });
};
