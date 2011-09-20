/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

// Register a templates definition set named "default".
CKEDITOR.addTemplates( 'default',
{
	// The name of sub folder which hold the shortcut preview images of the
	// templates.
	imagesPath : CKEDITOR.getUrl( CKEDITOR.plugins.getPath( 'templates' ) + 'templates/images/' ),

	// The templates definitions.
	templates :
		[
      {
        title: 'Náš tým - vlevo',
        image: 'template1.gif',
        description: 'Levá šablonka pro náš tým',
        html:  '<div class="team">' +
                  '<img src="/images/sandra.png">' +
                  '<div class="name">Jméno</div>' +
                  '<div class="position">Pozive</div>' +
                  '<p>Sandra je naší spolehlivou a výkonnou manažerkou. Úspěšně koučuje celý tým už déle než dva roky</p>' +
                  '<div style="clear: left;"></div>' +
                '</div>'
      },
      {
        title: 'Ukázka',
        image: 'template1.gif',
        description: 'Pro Filipsa',
        html:  '<div class="service subpage">' +
                 '<h2 class="title">' +
                   '<a href="/link">Název</a>' +
                 '</h2>' +
                 '<div class="thumb">' +
                   '<a href="/link"><img alt="" src="/images/nahledy/7.png" style="width: 278px; height: 115px;"></a>' +
                 '</div>' +
                 '<ul><li>1</li><li>2</li><li>3</li></ul>' +
               '</div>'
      },
      {
        title: 'Služba',
        image: 'template1.gif',
        description: 'Jedna vzorová služba na rozcestník',
        html: '<div class="service">' +
              '<h2 class="title">Výkonová reklama</h2>' +
               '<br />' +
               '<div class="icon"><img src="/images/junk_icon.png" /></div>' +
               '<p class="text">Webové stránky jsou dnes již nezbytnou součástí marketingového mixu každé společnosti. Firemní web představuje elektronickou obdobu kamenné prodejny či obecně vysoce efektivní marketingově-komunikační kanál.Tvorba www stránek je nejčastěji realizovaným typem webu z našeho portfolia služeb webdesignu. Spočívá v navržení, implementaci a dodání webu designovaného na základě analýzy potřeb a cílů vaší společnosti.</p>' +
               '<p class="more"><a href="">více informací</a></p>' +
               '</div>'
      }
		]
});
