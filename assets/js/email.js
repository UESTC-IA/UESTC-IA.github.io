(function () {
  const recipient = "astrab@yeah.net";

  function setFieldState(field, isInvalid) {
    field.setAttribute("aria-invalid", String(isInvalid));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("email-form");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    if (!form || !subject || !message) return;

    subject.addEventListener("input", () => {
      if (subject.value.trim()) setFieldState(subject, false);
    });

    message.addEventListener("input", () => {
      if (message.value.trim()) setFieldState(message, false);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const cleanSubject = subject.value.trim();
      const cleanMessage = message.value.trim();
      const subjectInvalid = !cleanSubject;
      const messageInvalid = !cleanMessage;

      setFieldState(subject, subjectInvalid);
      setFieldState(message, messageInvalid);

      if (subjectInvalid || messageInvalid) {
        (subjectInvalid ? subject : message).focus();
        return;
      }

      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(cleanMessage)}`;
      window.location.href = mailto;
    });
  });
})();
