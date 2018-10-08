$(document).ready(function()
{
	var theTextAreaId;
	var theWordageId;
	var wordageEditMode = false;
	var wordageReload = false;
/*
	window_info = ({ "width" : $(window).width(), "height" : $(window).height()});
	var width = $(document).width();
	var height = $(document).height();
	var windowSizeText = "width: " + str(width) + " height: " + str(height);
	$("#sizetext") = windowSizeText;
	$("#floats").hide();
	$("#dialog").hide();
*/
/*
	$.ajax({
		type:"POST",
		data:window_info,
		url:"index/setsize",
		success:function(data) {
			//alert(data);
		}
	});
*/
	closeForm = function()
	{
	    $("#hidden").hide();
	}
	clickLogin = function()
	{
		$.ajax({
			type:"POST",
			url:"auth/login",
			success: function(data) {
				$("#hidden").html(data);
			}
		});
		$("#hidden").show();
	}
	loadEditForm = function(id)
	{

		$("#wordage-view").hide();
		$("#topic-toolbar-edit").hide();
		$("#wordage-edit").show();
		$("#topic-toolbar-view").show();
		$("#topic-toolbar-save").show();		
		$wordageEditMode = true;
	}
	loadViewForm = function(id)
	{
			$("#topic-toolbar-save").show();		
			saveEditForm(id);
			//alert("load");
			var ed = tinyMCE.get('wordage-edit-textarea');
			//$ed.setProgressState(1); // Show progress
			var url = "/wordage/content/" + id;
			$.ajax({
			type:"POST",
			url:url,
			success: function(data) {
				ed.setContent(data.content);
				$("#wordage-view").innerHTML = data.content;
				}
			});			
			$wordageReload = false;
	}
	saveEditForm = function(id)
	{
		$("#topic-toolbar-save").show();		
		var ed = tinyMCE.get('wordage-edit-textarea');
		//$ed.setProgressState(1); // Show progress
		var content = ed.getContent();
		var url = "/wordage/change/" + id;
		$.ajax({
			type:"POST",
			url:url,
			data: 
			{
				thetext:content
			}, 
			success: function(data) {
				ed.setContent(data.content);
				$("#wordage-view").innerHTML = data.content;
			}
		});
	}
	clickLogout = function()
        {
                $.ajax({
			type:"POST",
			url:"auth/logout",
			success: function(data) {
			     $("#logout").html(data);
			     window.setTimeout(function() {window.location = "http://evtechnote.us/"}, 300)
			}
		});
	}
	wordageChangeFunc = function()
	{
		$.ajax({
			type:"POST",
			data: 
				{
				'id':theWordageId,
				'thetext': $("#wordage-edit-textarea").val()
			}, 
			url:"/wordage/change",
			success: function(data) {
				//alert(data);
			}
		});
	}
	clickPictureItem = function(pictureitemid)
        {
	   thePictureId = pictureitemid;
	   $.ajax({
		type:"POST",
		url:"/picture/edit?id=" + pictureitemid,
		success: function(data) {
			var objJSON = JSON.parse(data);
			var thePictureText = objJSON.view	
			$("#content-inner").show();
			$("#content-inner").html(thePictureText);
			darkr();
		}
	    });
	}
	clickDeleteWordage = function(wordagetextid)
	{
		var strconfirm = confirm("Are you sure you want to delete?");
		if (strconfirm == false)
		{
			return true;
		}
		theWordageId = wordagetextid;
		$.ajax({
			type:"POST",
			url:"/wordage/delete?id=" + wordagetextid,
			success: function(data) {
				window.location.href="/correspondant/index";
			}
		});
	}
	clickDeletePicture = function(picturetextid)
	{
		var strconfirm = confirm("Are you sure you want to delete?");
		if (strconfirm == false)
		{
			return true;
		}
		thePictureId = picturetextid;
		$.ajax({
			type:"POST",
			url:"/picture/delete?id=" + picturetextid,
			success: function(data) {
				window.location.href="/correspondant/index";
			}
		});
	}
	clickWordageItemText = function(wordagetextid)
	{
		theWordageId = wordagetextid;
		$.ajax({
			type:"POST",
			url:"/wordage/edit?id=" + wordagetextid,
			theWordageID:wordagetextid,
			success: function(data) {
				var objJSON = JSON.parse(data);
				var theId = "#wordage";
				var theWordageText = objJSON.view;
				theTextAreaId = theId
				$("#content-inner").show();
				$("#content-inner").html(theWordageText);
 				tinymce.init({
            				'selector': '#wordage-edit-textarea',
            				'plugins' : 'insertdatetime,link,image',
            				'theme' : 'modern',
            				'theme__layout_manager' : 'SimpleLayout',
            				'theme__buttons1' : 'backcolor, forecolor, |, bold, underline, strikethrough, |, numlist, bullist, charmap, |, undo, redo, |, anchor, link, tvlink, unlink',
            				'theme__buttons2' : '',
            				'theme__buttons3' : ''
        			});
			}
		});
	}
	closeWordageEdit = function(wordagetextid)
	{
		//alert("close Wordage Edit");
		var newContent = tinymce.activeEditor.getContent();
		//alert(newContent);
		theWordageId = wordagetextid;
		$.ajax({
			type:"POST",
			url:"/wordage/update?id=" + wordagetextid,
			data:newContent,
			theWordageID:wordagetextid,
			success: function(data) {
				//alert("update ran");
				window.location.href="/correspondant/index";
				//window.location.href="http://dev.newhollandpress.com/correspondant/index";
			}
		});
	}
	closeEditWordage = function()
        {
	    $("#dialog").show();
	    var dlg = $('#dialog').dialog({
           	modal: false,
            	draggable: false,
            	position: 'center',
            	zIndex: 99999,  // Above the overlay
            	width: 370,
            	title: 'Content Block Editor',
            	closeText: '',
            	open: function () {
               		$('body').css('overflow', 'hidden');
                	if ($.browser.msie) { $('html').css('overflow', 'hidden'); } $('<div>').attr('id', 'loader').appendTo('body').show();
            	},
            	close: function () { $('body').css('overflow', 'auto'); if ($.browser.msie) { $('html').css('overflow', 'auto'); } $('#loader').remove(); },
            	buttons: {
               		'Save': function () {
                    		tinyMCE.getInstanceById(theWordageText).remove();
                    		$('.EditLink').show();
                    		$(this).dialog('close');
                	},
                	'Cancel': function () {
                    		tinyMCE.getInstanceById(theWordageText).remove();
                    		$('.EditLink').show();
                    		$(this).dialog('close');
                	}
		}
            	}).parent();
        }
darkr = function()
{
          		var dkrm = new Darkroom('#target', {
            			minWidth: 100,
            			minHeight: 100,
            			maxWidth: 600,
            			maxHeight: 500,
            			ratio: 4/3,
            			backgroundColor: '#000',
            			// Plugins options
            			plugins: {
              			//save: false,
              				crop: {
                  				quickCropKey: 67, //key "c"
                  				//minHeight: 50,
                  				//minWidth: 50,
                  				//ratio: 4/3
                			}
              			},
            			// Post initialize script
            			initialize: function() {
              				var cropPlugin = this.plugins['crop'];
              				// cropPlugin.selectZone(170, 25, 300, 300);
              				cropPlugin.requireFocus();
              			}
          		});
	}
});
