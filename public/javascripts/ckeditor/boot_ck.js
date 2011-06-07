$(function()
{
	var config = {
	//	toolbar:
	//	[
	//		['bold', 'italic', '-', 'numberedlist', 'bulletedlist', '-', 'link', 'unlink'],
	//		['uicolor']
	//	],i
    filebrowserImageBrowseUrl: '/refinery/images/insert?modal=true'
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
    window.opener.CKEDITOR.tools.callFunction(2, url);
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


