/**
* Contact Form Validation - Updated for JSON API
* Compatible with modern PHP backend
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show loading state
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // Prepare form data
      let formData = new FormData(thisForm);

      // Submit form
      php_email_form_submit(thisForm, action, formData);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      
      if (data.success) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.querySelector('.sent-message').innerHTML = data.message || 'Your message has been sent successfully!';
        thisForm.reset(); 
      } else {
        throw new Error(data.message || 'An unknown error occurred'); 
      }
    })
    .catch((error) => {
      console.error('Contact form error:', error);
      displayError(thisForm, error.message || 'Network error occurred. Please try again.');
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    let errorElement = thisForm.querySelector('.error-message');
    if (errorElement) {
      errorElement.innerHTML = error;
      errorElement.classList.add('d-block');
    } else {
      alert('Error: ' + error);
    }
  }

})();
