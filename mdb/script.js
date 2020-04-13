// Collapse the hamburger menu on mobile on click
$('.navbar-nav>li>a').on('click', function () {
  $('.navbar-collapse').collapse('hide');
});

// Function that collapses the button of the bio
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
    'formName': $('input[name=formName]').val(),
    'formEmail': $('input[name=formEmail]').val(),
    'formOrg': $('input[name=formOrg]').val(),
    'formPhone': $('input[name=formPhone]').val(),
    'formDescription': $('textarea[name=formDescription]').val()
  };


  $.ajax({
    url: "mail.php",
    type: "POST",
    data: formData,
    success: function (data, textStatus, jqXHR) {
      $('#formStatus').text(data.message);
      if (data.code) //If mail was sent successfully, reset the form.
      {
        $('#contact-form').closest('form').find("input[type=text], textarea").val("");
        $('#contact-form').closest('form').find("input[type=email], textarea").val("");
        $('#contact-form').closest('form').find("input[type=tel], textarea").val("");
        $('#contact-form').closest('form').find(':input').each(function (ix, el) {
          el.focus();
        });
        document.activeElement.blur();
      }
    },
    error: function (errorThrown, textStatus, jqXHR) {
      $('#formStatus').text(errorThrown);
    }
  });
}

$(document).ready(function () {

  // Modal could have been hidden
  $(".buy-form-btn-open").on('click', function (event) {
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    $('#buyFormBody').show();
    $('#buy-form-btn-submit').show();
    $('#buyFormStatus').text("");
  });

  $("#buy-form-btn-submit").on('click', function (event) {
    var form = $('#buy-form') 
    if($('#buy-form')[0].checkValidity() === false) {
      return true;
    }
    event.preventDefault();
    document.getElementById('buyFormStatus').innerHTML = "Sending...";

    var cdData = [];
    $.each($("input[name='buy_cd']"), function () {
      var amount = $(this).val();
      var label = $("label[for='" + $(this).attr('id') + "']").text();
      if (amount > 0) {
        var cd = {
          name: label,
          amount: amount,
        }
        cdData.push(cd)
      }
    });

    if (cdData.length < 1) {
      $('#buyFormStatus').text("Error: Order at least one item");
      return
    }

    var formData = {
      'formName': $('input[name=buy_name]').val(),
      'formEmail': $('input[name=buy_email]').val(),
      'formPhone': $('input[name=buy_phone]').val(),
      'formAddress': $('input[name=buy_address]').val(),
      'formCD': cdData,
    };

    $.ajax({
      url: "mail-buy.php",
      type: "POST",
      data: formData,
    }).done(function (response, textStatus, jqXHR) {
      if (response.code) {
        $('#buyFormBody').hide();
        $('#buy-form-btn-submit').hide();
      }
      $('#buyFormStatus').text(response.message);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      var errr = errorThrown
      $('#buyFormStatus').text(textStatus);
    });
  });
});