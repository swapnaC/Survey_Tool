
(function($, window, document){
	$(function(){  //Dom Ready

		$('#RadioSelect, #CheckboxSelect').click(function(){
			var myOption;
			myOption = $(this).text();
			addWidget(myOption);
		});

		$('#composer').on('click', '.deleteWidget', function(){
			$(this).closest('.widget').remove();
		});

		$('#Preview').on('click', function(){
			
			var preview_window = $('#PreviewMode');
			var survey_title = $('#s-title').val();
			if(survey_title.length > 0) {
				preview_window.html('<h3>'+survey_title+'</h3>');
				render_survey();
				preview_window.slideToggle(300);
			}
			else {
				alert('Survey Title cannot be empty');
			}
		});

	});  //End DOM Ready

	function addWidget(buttonSelection) {
		var insertWidget1 = "<div class='widget'>"+buttonSelection;
		var insertWidget2 = "<span class='deleteWidget'>x</span>";
		var insertWidget3 = "<input class='question' type='text' placeholder='Enter your survey question here' />";
		var insertWidget4 = "<input class='options' type='text' placeholder='Enter options here' /></div>";
		var insertWidget = insertWidget1+insertWidget2+insertWidget3+insertWidget4;
		$('#composer').append(insertWidget);
	}

	function render_survey(){
		var questions = $('.widget').children('.question');
		for(var i = 0; i < questions.length; i++) {

			var question;
			var options;
			var selection;
			var preview_mode;
			var append_options;
			var question_str;

			questions[i].setAttribute('id', 'ques'+i);  //Setting ID for All Questions
			question = $('#ques'+i);					// Caching each question
			question_str = question.val();

			if(question_str.length > 0) {
				options = question.next('.options').val();
				options = options.split(',');

				selection = question.parent().text();
				selection = selection.substring(0,selection.length-1);  // Getting the selection Raio or checkbox

				preview_mode = $('#PreviewMode') 
				preview_mode.append("<p>"+question_str+"</p>");

				if(selection === 'Radio') {
					for (var j = 0; j < options.length; j++) {
						append_options = "<input type='radio' name='rdgroup"+i+"' value='"+options[j]+ "'>" +options[j] + "<br>";
						preview_mode.append(append_options);

					};
				} 
				else if(selection === 'Checkbox') {
					for (var j = 0; j < options.length; j++) {
						append_options = "<input type='checkbox' name='cbgroup"+i+"' value='"+options[j] +"'>" +options[j] + "<br>";
						preview_mode.append(append_options);
					};
				}
			}
		} // end traversing questions

		
	} //End of Render survey

}(window.jQuery, window, document)); 
