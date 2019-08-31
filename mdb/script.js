// Function that collapses the button of the bio collapser
function collapseJS() {
    var x = document.getElementById("collapseTopButton");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// Function to validate the booking form
function validateForm() {
  document.getElementById('formStatus').innerHTML = "Sending...";

  formData = {
    'formName'     : $('input[name=formName]').val(),
    'formEmail'    : $('input[name=formEmail]').val(),
    'formOrg'  : $('input[name=formOrg]').val(),
    'formPhone'  : $('input[name=formPhone]').val(),
    'formDescription'  : $('textarea[name=formDescription]').val()
    };
    

  $.ajax({
    url : "mail.php",
    type : "POST",
    data : formData,
    success : function(data, textStatus, jqXHR)
    {
      $('#formStatus').text(data.message);
      if (data.code) //If mail was sent successfully, reset the form.
      {
        $('#contact-form').closest('form').find("input[type=text], input[type=email], input[type=tel], textarea").val("");
        $('#contact-form').closest('form').find(':input').each(function(ix,el)
        {
          el.focus();
        });
        document.activeElement.blur();
      }
    },
    error: function (errorThrown, textStatus, jqXHR)
    {
      $('#formStatus').text(errorThrown);
    }
  });
}