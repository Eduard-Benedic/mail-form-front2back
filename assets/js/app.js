//DEAFULT QTIP CONFIG
$.fn.qtip.defaults = $.extend(true, {}, $.fn.qtip.defaults, {
  zindex: 100,
  position: {
    viewport: false,
    my: "bottom center",
    at: "top center",
    effect: false,
    adjust: {
      x: -5,
      y: 15,
      method: "shift none"
    }
  },
  show: {
    ready: true,
    event: false
  },
  style: {
    classes: "qtip-bootstrap qtip-shadow qtip-rounded",
    tip: {
      mimic: "center",
      offset: 10
    }
  },
  api: {
    onHide: function () {
      element.qtip("destroy");
    }
  }
});

/* VALIDATION DEFAULT CONFIG */
jQuery.validator.setDefaults({
  errorElement: "div",
  errorPlacement: function (error, element) {
    var elem = $(element);
    var id = elem.attr("id");
    if (!error.is(":empty")) {
      showError(element, error);
    } else {
      elem.qtip("hide");
    }
  },
  success: $.noop
});

showError = function (element, error) {
  var settings = null;
  if (element.filter(":not(.valid)")) {
    element
      .qtip({
        id: element.attr("id"),
        overwrite: false,
        content: error,
        hide: false
      })
      .qtip("option", "content.text", error)
      .qtip("show");
  }
};

const submitData = function () {
  $.ajax({
    url: "mail.php",
    dataType: "json",
    data: {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
      member: $("#member").val(),
      privacy: $("#privacy").val()
    },
    method: "post",
    success: function (json) {
      if (json.retrieved) {
        $(".contact-form").prepend(`
      	    <div class="confirmation">
      	       <div class="confirmation__wrapper">
      	         <div class="confirmation__content">
      	           <p>Thanks for contacting us. Will be in touch shortly</p>
      	         </div>
      	       </div>
                 </div>`);
        setTimeout(function () {
          $(".confirmation").fadeOut();
        }, 2000);
      }
    },
    error: function () {}
  });
};

$(document).ready(function () {
  $("#contact-form").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {
        required: true,
        email: true
      },
      phoneNumber: "required",
      member: "required",
      privacy: "required"
    },
    messages: {
      firstName: "This field is required",
      lastName: "This field is required",
      phoneNumber: "This field is required",
      email: {
        required: "This field is required"
        // email: "Email address is in the right format?"
      },
      privacy: "Please confirm our privacy",
      member: "Please specify your status"
    },
    submitHandler(form) {
      submitData();
      return false;
    }
  });
});

AOS.init();