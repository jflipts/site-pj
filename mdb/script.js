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

// JQUERY Functions
$(document).ready(function () {
  // Book form open
  $("#book-form-btn").on('click', function (event) {
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    $('#book-form-body').show();
    $('#book-form-btn-submit').show();
    $('#bookFormStatus').text("");
  });

  // Book form submit
  $("#book-form-btn-submit").on('click', function (event) {
    if ($('#book-form')[0].checkValidity() === false) {
      return true;
    }
    event.preventDefault();
    $('#bookFormStatus').text("Sending...")

    var formData = {
      'formName': $('input[name=formName]').val(),
      'formEmail': $('input[name=formEmail]').val(),
      'formOrg': $('input[name=formOrg]').val(),
      'formPhone': $('input[name=formPhone]').val(),
      'formDescription': $('textarea[name=formDescription]').val(),
    };

    $.ajax({
      url: "mail-book.php",
      type: "POST",
      data: formData,
    }).done(function (response, textStatus, jqXHR) {
      if (response.code) {
        $('#book-form-body').hide();
        $('#book-form-btn-submit').hide();
      }
      $('#bookFormStatus').text(response.message);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      $('#bookFormStatus').text(textStatus);
    });
  });

  // Buy form open: Modal could have been hidden
  $(".buy-form-btn-open").on('click', function (event) {
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    $('#buyFormBody').show();
    $('#buy-form-btn-submit').show();
    $('#buyFormStatus').text("");
  });

  // Buy form submit
  $("#buy-form-btn-submit").on('click', function (event) {
    if ($('#buy-form')[0].checkValidity() === false) {
      return true;
    }
    event.preventDefault();
    $('#buyFormStatus').text("Sending...")

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
      $('#buyFormStatus').text(textStatus);
    });
  });
});