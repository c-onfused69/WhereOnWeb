// Send email using EmailJS (frontend-only solution)
function sendEmail(event) {
  event.preventDefault();

  const name = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const message = document.querySelector('textarea').value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Use EmailJS service to send email
  emailjs.send("service_34j1ncu", "template_sj2k2tu", {
    from_name: name,
    from_email: email,
    message: message,
    to_email: "nniloy888@gmail.com"
  })
  .then(() => {
    alert("Email sent successfully!");
    document.querySelector('form').reset();
  }, (error) => {
    alert("Failed to send email. Please try again later.");
    console.error("EmailJS error:", error);
  });
}
