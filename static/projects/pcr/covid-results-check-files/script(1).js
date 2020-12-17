var askaron_dnkomsale_basketadd = {
	"basket_items": {},
	"ajax_path": "",
};

askaron_dnkomsale_basketadd.init = function ()
{
	this.draw_items_all();
};

askaron_dnkomsale_basketadd.draw_items_all = function ()
{

	var curBasket = this;
	this.reload_basket();
	$(".catalog-button").each(function ()
	{
		var productid = parseInt($(this).data("productid"));
		var cito = $(this).data("cito");

		if (productid > 0)
		{
			var count = 0;
			//check if this item in basket 
			$.each(curBasket.basket_items, function (index, item)
			{
				if (productid == item["PRODUCT_ID"] && cito == item["CITO"])
				{
					count = item["QUANTITY"];
					return false;
				}
			});
			curBasket.draw_item(this, count);
		}
	});
};


askaron_dnkomsale_basketadd.draw_item = function (item, count)
{
	var curBasket = this;
	var productid = $(item).data("productid");
	var cito = $(item).data("cito");
	item = $(item);
	//if($("#product_view_gri").length<=0 )
	{
		$(item).empty();
		$(item).unbind("click");

		var delsample = $("#askrondnkomsale_buttonsamples").find("#delsample")
		var addsample = $("#askrondnkomsale_buttonsamples").find("#addsample");
		if (item.hasClass("js-button2"))
		{
			delsample = $("#askrondnkomsale_buttonsamples").find("#delsample2")
			addsample = $("#askrondnkomsale_buttonsamples").find("#addsample2");
		}
		if (item.hasClass("js-button3"))
		{
			delsample = $("#askrondnkomsale_buttonsamples").find("#delsample3")
			addsample = $("#askrondnkomsale_buttonsamples").find("#addsample3");
		}
		//console.log(addsample, delsample);
		//======SET BUTTON============
		if (count > 0)
		{
			//	$(item).attr("action", "del");
			$(item).html(delsample.html());
			//$("#myquantity" + productid).val(count);
		} else
		{
			$(item).html(addsample.html());

			//=====ACTION add to basket=======
			{
				$(item).attr("action", "add");
				$(item).click(function ()
				{

					/*var addCount = parseInt($("#myquantity" + productid).val());
					 if (addCount <= 0 || addCount === undefined || isNaN(addCount))
					 {
					 addCount = 1;
					 }*/
					var addCount = 1;
					curBasket.update_item(productid, cito, addCount, false);
				});
			}
			//$("#myquantity" + productid).val("");
		}


	}
	//$(item).html( html );
};


//add to basket and get new Quantity
askaron_dnkomsale_basketadd.update_item = function (id, cito, count, fromBasket, mycallback)
{
	var curBasket = this;
	var path = this.ajax_path;

	var sendData = {
		ACTION: "ADD_TO_BASKET",
		ID: id,
		CITO: cito,
		COUNT: count,
	};

	var productid = id;
	var found = false;
	$.each(curBasket.basket_items, function (index, item)
	{

		if (productid == item["PRODUCT_ID"] && cito == item["CITO"])
		{
			//count=item["QUANTITY"];
			//curBasket.basket_items[index]["QUANTITY"]++;
			curBasket.basket_items[index]["QUANTITY"] = 1;
			found = true;
		}
	});

	if (!found)
	{
		var newItem = {
			ID: curBasket.makeID(),
			"PRODUCT_ID": productid,
			"QUANTITY": 1,
			"CITO": cito,

		};
		curBasket.basket_items.push(newItem);
	}




	this.save_basket();
	this.draw_items_all();
	askaron_dnkomsale_basket_line.reinit();
	//console.log(sendData);
	//add product to basket and get new count array


	/*$.ajax({
	 url: path,
	 data: sendData,
	 async: true,
	 success: function(data) 
	 {
	 console.log(data);
	 var arr= JSON.parse(data);
	 askaron_dnkomsale_basketadd["basket_items"]=arr["BASKET_ITEMS"];
	 askaron_dnkomsale_basketadd.draw_items_all();
	 
	 if (mycallback && typeof(mycallback) === "function")
	 {
	 mycallback(id);					//mycallback();
	 }
	 //if (!fromBasket)
	 {//basket function
	 if (typeof(askaron_dnkomsale_basketadd.redraw_basket) === "function") { 
	 askaron_dnkomsale_basketadd.redraw_basket(false, true);
	 }
	 else
	 {
	 //parent.redraw_basket(false, true);
	 }
	 
	 }
	 }
	 });*/
};

askaron_dnkomsale_basketadd.save_basket = function ()
{
	this.save_items(this.basket_items);
};

askaron_dnkomsale_basketadd.save_items = function (basketItems)
{
	var serialObj = JSON.stringify(basketItems);
	localStorage.setItem("askaron_dnkombasket", serialObj);
	this.reload_basket();
};

askaron_dnkomsale_basketadd.reload_basket = function ()
{
	this.basket_items = JSON.parse(localStorage.getItem("askaron_dnkombasket"));
	if (!this.basket_items)
	{
		this.basket_items = [];
	}

	return this.basket_items;
};




//get quantity from basket and update buttons (reinit in fact)
askaron_dnkomsale_basketadd.update_items = function ()
{
	var curBasket = this;
	this.reload_basket();
	curBasket.draw_items_all();
	/*
	 var path = this.ajax_path;
	 $.ajax({
	 url: path,
	 async: false,
	 success: function(data) 
	 {
	 var arr= JSON.parse(data);
	 curBasket.basket_items=arr;
	 curBasket.draw_items_all();
	 }
	 });
	 */
};


askaron_dnkomsale_basketadd.getItems = function ()
{
	var items = this.basketItems;
};

askaron_dnkomsale_basketadd.makeID = function () {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

askaron_dnkomsale_basketadd.copyOrder = function (ORDER_ID, TOKEN)
{
	var curBasket = this;
	var sendData = {
		"ORDER_ID": ORDER_ID,
		"TOKEN": TOKEN
	};

	$.ajax({
		url: "/ajax/order_copy.php",
		data: sendData,
		async: true,
		success: function (data)
		{
			try
			{
				var idList = JSON.parse(data);
				console.log(idList);
				$.each(idList, function (index, ID) {
					curBasket.update_item(ID, "0", 1, false);
				});
				location.href = "/personal/cart/";
			} catch (err)
			{
				console.log(err, data);
			}
		}
	});
}
