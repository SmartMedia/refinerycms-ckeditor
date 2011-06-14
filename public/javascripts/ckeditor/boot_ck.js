$(function()
{
	var config = {
	//	toolbar:
	//	[
	//		['bold', 'italic', '-', 'numberedlist', 'bulletedlist', '-', 'link', 'unlink'],
	//		['uicolor']
	//	],i
    filebrowserImageBrowseUrl: '/refinery/images/insert?modal=true',
    filebrowserLinkBrowseUrl: '/refinery/pages_dialogs/link_to?wymeditor=true',
    extraPlugins: 'stylesheetparser',
    contentsCss: '/stylesheets/ckeditor/suneditor.css'
	};

	// Initialize the editor.
	// Callback function can be passed and executed after full instance creation.
	$('textarea.ckeditor').ckeditor(config);

});
// CK dialogs

var image_dialog = {
  initialised: false
  , image_url: ''
  , callback: null

  , init: function(callback){
    
    if (!this.initialised) {
      this.callback = callback;
      this.init_tabs();
      this.init_select();
      this.init_actions();
      this.initialised = true;
    }
    return this;
  }

  , init_tabs: function(){
    var radios = $('#dialog_menu_left input:radio');
    var selected = radios.parent().filter(".selected_radio").find('input:radio').first() || radios.first();

    radios.click(function(){
      link_dialog.switch_area($(this));
    });

    selected.attr('checked', 'true');
    link_dialog.switch_area(selected);
  }

  , switch_area: function(radio){
    $('#dialog_menu_left .selected_radio').removeClass('selected_radio');
    $(radio).parent().addClass('selected_radio');
    $('#dialog_main .dialog_area').hide();
    $('#' + radio.value + '_area').show();
  }

  , init_select: function(){
    $('#existing_image_area_content ul li img').click(function(){
        image_dialog.set_image(this);
    });
    //Select any currently selected, just uploaded...
    if ((selected_img = $('#existing_image_area_content ul li.selected img')).length > 0) {
      image_dialog.set_image(selected_img.first());
    }
  }

  , set_image: function(img){
    if ($(img).length > 0) {
      $('#existing_image_area_content ul li.selected').removeClass('selected');

      $(img).parent().addClass('selected');
      var imageId = $(img).attr('data-id');
      var geometry = $('#existing_image_size_area li.selected a').attr('data-geometry');
      var size = $('#existing_image_size_area li.selected a').attr('data-size');
      var resize = $("#wants_to_resize_image").is(':checked');

      this.image_url = image_url = resize ? $(img).attr('data-' + size) : $(img).attr('data-original');

      if (parent) {
        if ((wym_src = parent.document.getElementById('wym_src')) != null) {
          wym_src.value = image_url;
        }
        if ((wym_title = parent.document.getElementById('wym_title')) != null) {
          wym_title.value = $(img).attr('title');
        }
        if ((wym_alt = parent.document.getElementById('wym_alt')) != null) {
          wym_alt.value = $(img).attr('alt');
        }
        if ((wym_size = parent.document.getElementById('wym_size')) != null
            && typeof(geometry) != 'undefined') {
          wym_size.value = geometry.replace(/[<>=]/g, '');
        }
      }
    }
  }

  , submit_image_choice: function(e) {
    e.preventDefault();
    img_selected = $('#existing_image_area_content ul li.selected img').get(0);
    url = this.image_url; 
    window.opener.CKEDITOR.tools.callFunction(editor_func, url);
    window.close();
    if($.isFunction(this.callback))
    {
      this.callback(img_selected);
    }
    close_dialog(e);

  }

  , init_actions: function(){
    var _this = this;
    // get submit buttons not inside a wymeditor iframe
    $('#existing_image_area .form-actions-dialog #submit_button')
      .click($.proxy(_this.submit_image_choice, _this));

    // get cancel buttons not inside a wymeditor iframe
    $('.form-actions-dialog #cancel_button')
      .not('.wym_iframe_body .form-actions-dialog #cancel_button')
      .click($.proxy(close_dialog, _this));

    $('#existing_image_size_area ul li a').click(function(e) {
      $('#existing_image_size_area ul li').removeClass('selected');
      $(this).parent().addClass('selected');
      $('#existing_image_size_area #wants_to_resize_image').attr('checked', 'checked');
      image_dialog.set_image($('#existing_image_area_content ul li.selected img'));
      e.preventDefault();
    });

    $('#existing_image_size_area #wants_to_resize_image').change(function(){
      if($(this).is(":checked")) {
        $('#existing_image_size_area ul li:first a').click();
      } else {
        $('#existing_image_size_area ul li').removeClass('selected');
        image_dialog.set_image($('#existing_image_area_content ul li.selected img'));
      }
    });

    image_area = $('#existing_image_area').not('#wym_iframe_body #existing_image_area');
    image_area.find('.form-actions input#submit_button').click($.proxy(function(e) {
      e.preventDefault();
      $(this.document.getElementById('wym_dialog_submit')).click();
    }, parent));
    image_area.find('.form-actions a.close_dialog').click(close_dialog);
  }
};

var link_dialog = {
  initialised: false
  , init: function(){

    if (!this.initialised) {
      this.init_tabs();
      this.init_resources_submit();
      this.init_close();
      this.page_tab();
      this.web_tab();
      this.email_tab();
      this.initialised = true;
    }
  },

  init_tabs: function(){
    var radios = $('#dialog_menu_left input:radio');
    var selected = radios.parent().filter(".selected_radio").find('input:radio').first() || radios.first();

    radios.click(function(){
      link_dialog.switch_area($(this));
    });

    selected.attr('checked', 'true');
    link_dialog.switch_area(selected);
  },

  init_resources_submit: function(){
    $('#submit_button').click(function(e){
      e.preventDefault();
      if((resource_selected = $('ul li.linked a')).length > 0) {
        resourceUrl = resource_selected.attr('href');
        relevant_href = resourceUrl;

        // Add any alternate resource stores that need a absolute URL in the regex below
        // if(resourceUrl.hostname.match(/s3.amazonaws.com/)) {
        //   relevant_href = resourceUrl.protocol + '//' + resourceUrl.host + relevant_href;
        // }

        if (typeof(resource_picker.callback) == "function") {
          resource_picker.callback({
            id: resource_selected.attr('id').replace("resource_", "")
            , href: relevant_href
            , html: resource_selected.html()
          });
        }
        window.opener.CKEDITOR.tools.callFunction(editor_func, relevant_href);
        window.close();
      }
    });
    
    $('.form-actions-dialog #cancel_button').trigger('click');
  },

  init_close: function(){
    $('.form-actions-dialog #cancel_button').not('.wym_iframe_body .form-actions-dialog #cancel_button').click(close_dialog);

    if (parent
        && parent.document.location.href != document.location.href
        && parent.document.getElementById('wym_dialog_submit') != null) {
      $('#dialog_container .form-actions input#submit_button').click(function(e) {
        e.preventDefault();
        $(parent.document.getElementById('wym_dialog_submit')).click();
      });
      $('#dialog_container .form-actions a.close_dialog').click(close_dialog);
    }
  },

  switch_area: function(area){
    $('#dialog_menu_left .selected_radio').removeClass('selected_radio');
    $(area).parent().addClass('selected_radio');
    $('#dialog_main .dialog_area').hide();
    $('#' + $(area).val() + '_area').show();
  },

  //Same for resources tab
  page_tab: function(){
    $('.link_list li').click(function(e){
      e.preventDefault();

      $('.link_list li.linked').removeClass('linked');
      $(this).addClass('linked');

      var link = $(this).children('a.page_link').get(0);
      var port = (window.location.port.length > 0 ? (":" + window.location.port) : "");
      var url = link.href.replace(window.location.protocol + "//" + window.location.hostname + port, "");

      link_dialog.update_parent(url, link.rel.replace(/\ ?<em>.+?<\/em>/, ''));
    });
  },

  web_tab: function(){
    link_tester.validate_url_textbox("#web_address_text",  function() {
      link_dialog.update_parent( $('#web_address_text').val(),
                                 $('#web_address_text').val(),
                                 ($('#web_address_target_blank').get(0).checked ? "_blank" : "")
                               );
    });

    $('#web_address_target_blank').click(function(){
      parent.document.getElementById('wym_target').value = this.checked ? "_blank" : "";
    });
  },

  email_tab: function() {
    $('#email_address_text, #email_default_subject_text, #email_default_body_text').change(function(e){
      var default_subject = $('#email_default_subject_text').val(),
          default_body = $('#email_default_body_text').val(),
          mailto = "mailto:" + $('#email_address_text').val(),
          modifier = "?",
          icon = '';

      $('#email_address_test_loader').show();
      $('#email_address_test_result').hide();
      $('#email_address_test_result').removeClass('success_icon').removeClass('failure_icon');


      link_tester.email(mailto, function (success) {
        if (success) {
          icon = 'success_icon';
        }else{
          icon = 'failure_icon';
        }
        $('#email_address_test_result').addClass(icon).show();
        $('#email_address_test_loader').hide();
      });

      if(default_subject.length > 0){
        mailto += modifier + "subject=" + default_subject;
        modifier = "&";
      }

      if(default_body.length > 0){
        mailto += modifier + "body=" + default_body;
        modifier = "&";
      }

      link_dialog.update_parent(mailto, mailto.replace('mailto:', ''));
    });
  },

  update_parent: function(url, title, target) {
    if (parent != null) {
      if ((wym_href = parent.document.getElementById('wym_href')) != null) {
        wym_href.value = url;
      }
      if ((wym_title = parent.document.getElementById('wym_title')) != null) {
        wym_title.value = title;
      }
      if ((wym_target = parent.document.getElementById('wym_target')) != null) {
        wym_target.value = target || "";
      }
    }
  }
};

var resource_picker = {
  initialised: false
  , callback: null

  , init: function(callback) {
    
    if (!this.initialised) {
      this.callback = callback;
      this.initialised = true;
    }
  }
};

