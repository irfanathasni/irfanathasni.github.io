 /**
 * GOOGLE SHEET CONTACT FORM SUBMIT
 */
const scriptURL = "https://script.google.com/macros/s/AKfycbxhBC0xLN7eT6cBFYSpSi199DdNdReYDa8otyipwvj5X07i1A2gRZSewlpe5JXUZsuw/exec";
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");


if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // 🔹 Custom Validation
    // 🔹 Name Validation (Only letters and spaces)
const namePattern = /^[A-Za-z\s]+$/;

if (!namePattern.test(name)) {
  showMessage("Name should contain only letters", "red");
  return;
}

if (name.length < 3) {
  showMessage("Name must be at least 3 characters", "red");
  return;
}


    if (!validateEmail(email)) {
      showMessage("Enter a valid email address", "red");
      return;
    }

    if (subject.length < 3) {
      showMessage("Subject must be at least 3 characters", "red");
      return;
    }

    if (message.length < 10) {
      showMessage("Message must be at least 10 characters", "red");
      return;
    }

    // 🔹 If validation passed
    showMessage("Sending...", "orange");

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form)
    })
      .then(response => {
        showMessage("Message sent successfully!", "green");
        form.reset();
      })
      .catch(error => {
        showMessage("Something went wrong!", "red");
      });

  });
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showMessage(text, color) {
  messageBox.innerHTML = text;
  messageBox.style.color = color;
}