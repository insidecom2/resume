/**
* PHP Email Form Validation - v3.5
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      // let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      var recaptcha = grecaptcha.getResponse();
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );
      console.log('>>>>>',recaptcha);
      if ( recaptcha ) {
        if (recaptcha.length !== 0) {
          console.log('captcha')
          // php_email_form_submit(thisForm, action, formData);
          // grecaptcha.ready(function() {
          //   try {
          //     grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
          //     .then(token => {
          //       formData.set('recaptcha-response', token);
          //       console.log('captcha')
          //       //php_email_form_submit(thisForm, action, formData);
          //     })
          //   } catch(error) {
          //     displayError(thisForm, error)
          //   }
          // });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        console.log('no captcha')
        //php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

    fetch(action, {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then(response => {
      return response.json();
    })
      .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.status) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: '); 
      }
    })
      .catch((error) => {
        displayError(thisForm, 'Form submission failed');
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
