const modalElement = document.getElementById("contactModal");
function handleFormSubmit(event) {
  const contactSpinnre = document.getElementById("contact-spinner");
  contactSpinnre.classList.remove("d-none");
  const API_URL = "https://getform.io/f/anlexnqa";
  event.preventDefault();

  let isAgree = document.getElementById("isAgree").checked;

  let form = document.getElementById("cantact-us-form");

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");

  if (form.checkValidity()) {
    const formData = new FormData(event.target);
    formData.append("isAgree", isAgree);
    const data = Object.fromEntries(formData);

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok && response.status === 200) {
          contactSpinnre.classList.add("d-none");
          modalClose();
          showToast(
            "Thank you for your submission! We will get back to you shortly.",
            true
          );
          form.reset();

          return response;
        } else {
          throw new Error("Something went wrong"); //
        }
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        contactSpinnre.classList.add("d-none");
        modalClose();
        showToast("An error occurred. Please try again later.", false);
        console.error("Error:", error);
      });
  }
}

function showToast(message, status) {
  if (status) {
    const toastElement = document.getElementById("successToast");
    const toastBody = toastElement.querySelector(".toast-body");
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }

  if (!status) {
    const toastElement = document.getElementById("errorToast");
    const toastBody = toastElement.querySelector(".toast-body");
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
}

function modalClose() {
  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  } else {
    const newModalInstance = new bootstrap.Modal(modalElement);
    newModalInstance.hide();
  }

  // Remove the backdrop manually if it's still there
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.parentNode.removeChild(backdrop);
  }
}
