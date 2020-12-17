$(document).ready(function () {
	$('.js-example-search-header').click(function () {
		$('.js-main-search-header').val($(this).text())
	});

	$('.js-example-search').click(function () {
		$('.js-main-search').val($(this).text())
	});

	$("#at_home_button").click(function () {
		$('html,body').animate({
			scrollTop: $(".at-home-form").offset().top - 150
		}, 'slow');
	});


});

function is_touch_device() {
	try
	{
		document.createEvent("TouchEvent");
		return true;
	} catch (e)
	{
		return false;
	}
}

function  yandexReachGoal(goal, params)
{
	if (params)
	{

	} else
	{
		params = {};
	}

	yaCounter45567162.reachGoal(goal, params, function goalCallback() {
		console.log('запрос ' + goal + ' в Метрику успешно отправлен', params);
	});
	if ((goal == 'zakaz_na') || (goal == 'franchise_na') || (goal == 'partnery_na') || (goal == 'na_domu_na'))
	{
		ga("gtag_UA_57139754_1.send", "event", "forms", "submit", goal)
	}
}
;


function showRestriction()
{
	$("#restrictions").click();
	$('html,body').animate({
		scrollTop: $("#restrictions").offset().top - 100
	});
}

function synonymInputs(container)
{
	container = $(container);

	var inputsBlock = container.find('.inputs-block');
	inputsBlock.find('.form-line input').change(removeEmptyLine)


	var lastInputLine = container.find('.new-input').last();

	lastInputLine.find("input").change(function (e) {
		if (e.target.value.length > 0)
		{
			var addInputLine = lastInputLine.clone();
			inputsBlock.append(addInputLine);
			addInputLine.find('input').change(removeEmptyLine);
			$(e.target).val('');
		}
	});

	// on change input not last
	function removeEmptyLine(event) {
		if (event.target.value.length <= 0)
		{
			$(event.target).parent().remove()
		}
	}
}


function showCovidForm(formCode, service)
{

	var sendData = {
		service: service,
		form_code: formCode,
		is_myajax_post: "Y",
		is_ajax_post: "Y"
	};

	var $formWindow = $("#service_form");
	var $formWindowContainer = $formWindow.find(".popup-content");
	$formWindowContainer.html("");
	$formWindow.addClass("active");
	$formWindowContainer.addClass('loading-spinner-small');
	//$(".js-addres-list").addClass("loading-spinner-small");
	$.ajax({
		url: "/ajax/covid_form.php",
		data: sendData,
		success: function (data)
		{
			$formWindowContainer.removeClass('loading-spinner-small');
			$formWindowContainer.html(data);
			Recaptchafree.reset();
//			$("#show_form_button").click();
			///$(".js-addres-list").removeClass("loading-spinner-small");
		}
	});
}

function showCovidMap(service, serviceName, timeProperty)
{

	if (typeof timeProp == "undefined")
	{
		timeProp = "";
	}
	
	var sendData = {
		service: service,
		serviceName: serviceName,
		timeProperty: timeProperty,
		is_myajax_post: "Y",
		is_ajax_post: "Y"
	};

	var $formWindow = $("#covid-modale-window");
	var $formWindowContainer = $formWindow.find(".popup-content");
	$formWindowContainer.html("");
	$formWindow.addClass("active");
	$formWindowContainer.addClass('loading-spinner-small');
	//$(".js-addres-list").addClass("loading-spinner-small");
	$.ajax({
		url: "/ajax/covid_map.php",
		data: sendData,
		success: function (data)
		{
			$formWindowContainer.removeClass('loading-spinner-small');
			$formWindowContainer.html(data);
			Recaptchafree.reset();
//			$("#show_form_button").click();
			///$(".js-addres-list").removeClass("loading-spinner-small");
		}
	});
}