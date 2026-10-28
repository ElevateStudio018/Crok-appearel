// Progressive enhancement for Netlify Forms: submit in place instead of
// navigating to Netlify's default success page. Messages come from
// data-msg-* attributes on the form so they follow the page language.

export const initAjaxForms = () => {
  document.querySelectorAll<HTMLFormElement>('form[data-ajax-form]:not([data-bound])').forEach((form) => {
    form.dataset.bound = '';
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const { msgSending = '…', msgSuccess = '', msgError = '' } = form.dataset;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));

      button?.setAttribute('disabled', '');
      if (status) {
        status.textContent = msgSending;
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
          status.textContent = msgSuccess;
          status.dataset.state = 'success';
        }
      } catch {
        if (status) {
          status.textContent = msgError;
          status.dataset.state = 'error';
        }
      } finally {
        button?.removeAttribute('disabled');
      }
    });
  });
};
