askaron_form = function ()
{
	this.stopSend = false
};
askaron_form.prototype.init = function (container, opts)
{
	var self = this;
	self.container = $(container);
	if (typeof opts != undefined)
	{
		this.opts = opts;
	}
	self.reinit();
};
askaron_form.prototype.reinit = function ()
{
	var self = this;
	self.container.find("form").submit(function (e)
	{
		console.log(111111);
		e.preventDefault();
		self.formOnsubmit(e);
		return false;
	});

	doThings.tools.maskedInput.start();
};
askaron_form.prototype.update_form = function (order)
{
	$("#askaron_feedback_form").submit();//.submit() have problems with bitrix ajax
};

askaron_form.prototype.formOnsubmit = function (e)
{
	var self = this;
	var $form = $(e.target);
	var ajaxPath = $form.attr("action");
	;
	var $container = this.container;
	console.log(self.stopSend);
	if (self.stopSend)
	{
		e.preventDefault();
		return false;
	} else
	{

		$form.closest('.default-form').addClass('loading-spinner-small');

		self.stopSend = true;
		var sendData = $form.serializeArray().reduce(function (obj, item) {
			obj[item.name] = item.value;
			return obj;
		}, {});
		sendData["is_myajax_post"] = "Y";
		sendData["is_ajax_post"] = "Y";

		//console.log("sendData!!", sendData);
		$.ajax({
			url: ajaxPath,
			data: sendData,
			method: "POST",
			success: function (data)
			{
				$form.closest('.default-form').removeClass('loading-spinner-small');
				$container.replaceWith(data);
				self.stopSend = false;
				self.init();

				doThings.tools.datePicker.start();
				Recaptchafree.reset();
			}
		});
		//eedback-form-continer
	}
};

//==========better version====
askaron_form2 = function ()
{
	this.stopSend = false
};
askaron_form2.prototype.init = function (containerClass)
{
	var self = this;
	self.containerClass = containerClass;
	self.opts = {};
	if (typeof opts != "undefined")
	{
		self.opts = opts;
	}
	self.reinit();
};
askaron_form2.prototype.reinit = function ()
{
	var self = this;
	self.container = $(self.containerClass);
	self.container.find("form").submit(function (e)
	{
		e.preventDefault();
		self.formOnsubmit(e);
		return false;
	});

	//doThings.tools.maskedInput.start();
};
askaron_form2.prototype.update_form = function (order)
{
	$("#askaron_feedback_form").submit();//.submit() have problems with bitrix ajax
};

askaron_form2.prototype.formOnsubmit = function (e)
{
	var self = this;
	var $form = $(e.target);
	var ajaxPath = $form.attr("action");
	//var $container = $form.closest(".askaron-feedback-form-continer");
	var $container = this.container;
	console.log(self.stopSend);
	if (self.stopSend)
	{
		e.preventDefault();
		return false;
	} else
	{

		$form.closest('.default-form').addClass('loading-spinner-small');
		//$form.closest('.regular-form').addClass('loading-spinner-small');

		self.stopSend = true;
		var sendData = new FormData($form[0]);
		sendData.set('is_myajax_post', "Y");
		sendData.set('is_ajax_post', "Y");

		if (typeof self.opts.beforeLoad == 'function')
		{
			self.opts.beforeLoad(self);
		}
		//console.log("sendDataBasket:", sendData);
		$.ajax({
			url: ajaxPath,
			data: sendData,
			method: "POST",
			processData: false, //allow to send files
			contentType: false, //allow to send files
			success: function (data)
			{
				console.log(self.containerClass);
				$form.closest('.default-form').removeClass('loading-spinner-small');
				$container.replaceWith($('<div>' + data + '</div>').find(self.containerClass));
				//$container.replaceWith(data);
				self.stopSend = false;
				self.reinit();
				if (typeof Recaptchafree != "undefined")
				{
					Recaptchafree.reset();
				}

				if (typeof self.opts.afterLoad == 'function')
				{
					self.opts.afterLoad(self);
				}
			}
		});
	}
};
