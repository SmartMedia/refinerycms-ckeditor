$(function()
{
	var config = {
		toolbar:
		[
			['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
			['UIColor']
		]
	};

	// Initialize the editor.
	// Callback function can be passed and executed after full instance creation.
	$('textarea.ckeditor').ckeditor(config);
});
