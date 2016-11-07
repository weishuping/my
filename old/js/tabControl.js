 /**
	*±êÇ©¿Ø¼þ
    *¹¦ÄÜ£º°´Enter»òTab»òÊ§È¥½¹µãÈ·¶¨±êÇ©ÊäÈëÍê±Ï£¬Ë«»÷ÎÄ×Ö¿ÉÒÔ±à¼­¸Ã±êÇ©£¬µ¥»÷²æ²æ£¨¡Á£©±íÊ¾É¾³ý¸Ã±êÇ©
    *tabControl:function
    *²ÎÊýËµÃ÷£º
    *initTabCount:int Ò»¿ªÊ¼³õÊ¼»¯±êÇ©ÊäÈë¿òµÄÊýÁ¿£»
    *maxTabCount:int ÈÝÆ÷¿É½ÓÊÜ×î´óµÄ±êÇ©ÊýÁ¿£»
    *tabMaxLen:int Ã¿¸ö±êÇ©ÔÊÐí½ÓÊÜ×î´óµÄ×Ö·û³¤¶È£»
    *tabW:int ±êÇ©ÊäÈë¿òµÄ¿í¶È£»
    *tabH:int ±êÇ©ÊäÈë¿òµÄ¸ß¶È£»
    *tipTOffset:int ÌáÊ¾ÐÅÏ¢Óë±êÇ©ÊäÈë¿òµÄtopÆ«ÒÆÁ¿£»
    *tipLOffset:int ÌáÊ¾ÐÅÏ¢Óë±êÇ©ÊäÈë¿òµÄleftÆ«ÒÆÁ¿£»
    *tags:string ³õÊ¼»¯µÄ±êÇ©ÄÚÈÝ£¬ÒÔ¶ººÅÎª¼ä¸ô£»
 **/
$.fn.extend({
	tabControl: function(options, tags) {
		var defOpt = {
			initTabCount: 1,
			maxTabCount: 10,
			tabMaxLen: 10,
			tabW: 150,
			tabH: 15,
			tipTOffset: 5,
			tipLOffset: 0
		};
		var opts = $.extend(defOpt, options);
		var _tags = [];
		if (tags) {
			tags = tags.replace(/[^A-Za-z0-9_,\u4E00-\u9FA5]+/gi, "").replace(/^,+|,+$/gi, "");//½«·ÇÖÐÓ¢ÎÄ¡¢Êý×Ö¡¢ÏÂ»®Ë¿¡¢¶ººÅµÄÆäËû×Ö·û¶¼È¥µô£¬ÇÒ²»ÄÜÒÔ¶ººÅ¿ªÍ·Óë½áÊø
			_tags = tags.split(',');
		}
		_tags = _tags.length > opts.maxTabCount ? _tags.slice(0, opts.maxTabCount - 1) : _tags;
		opts.initTabCount = opts.maxTabCount <= _tags.length ? _tags.length: _tags.length + (opts.maxTabCount - _tags.length > opts.initTabCount ? opts.initTabCount: opts.maxTabCount - _tags.length);
		var checkReg = /[^A-Za-z0-9_\u4E00-\u9FA5]+/gi;//Æ¥Åä·Ç·¨×Ö·û
		var initTab = function(obj, index) {//³õÊ¼»¯±êÇ©ÊäÈë
			var textHtml = "<input class='tabinput' name='tabinput' style='width:" + opts.tabW + "px;height:" + opts.tabH + "px;' type='text'/>";
			obj.append(textHtml);
			if (_tags[index]) {
				var __inputobj = $("input[type='text'][name='tabinput']", obj).eq(index);
				__inputobj.val(_tags[index].substr(0, opts.tabMaxLen)).css("display", "none");
				compTab(obj, __inputobj, _tags[index].substr(0, opts.tabMaxLen));
			}
			//支持中文
			// 增加键盘输入事件，支持全角下的（，）逗号和（ ）空格
            // 注意顺序必须在插件绑定前绑定自定义事件
            this.tagInput.on('keydown blur', function(){
                var val = that.tagInput.val();
                val = val.replace(/(，|　)+/g, '');
                that.tagInput.val(val);
            }).keyup(function() {
                var val = $.trim(that.tagInput.val());
                var lastChar = val ? val.substr(-1, 1) : '';
                if (lastChar == '，' || lastChar == '　') {
                    that.tagInput.trigger('keydown', { keyCode:$.ui.keyCode.COMMA });
                }
            });
			$("input[type='text'][name='tabinput']:last", obj).bind("keydown blur click",
			function(event) {
				if (event.type == "click") {//Õâ¸öÊÂ¼þ´¦Àíº¯Êý»á½ÓÊÕµ½Ò»¸öÊÂ¼þ¶ÔÏó(event)£¬¿ÉÒÔÍ¨¹ýËüÀ´×èÖ¹£¨ä¯ÀÀÆ÷£©Ä¬ÈÏµÄÐÐÎª¡£Èç¹û¼ÈÏëÈ¡ÏûÄ¬ÈÏµÄÐÐÎª¡¸event.preventDefault()¡¹£¬ÓÖÏë×èÖ¹ÊÂ¼þÆðÅÝ¡¸event.stopPropagation()¡¹£¬Õâ¸öÊÂ¼þ´¦Àíº¯Êý±ØÐë·µ»Øfalse¡£
					return false;
				}
				if (event.keyCode == 13 || event.keyCode == 9 || event.type == "blur") {
					event.preventDefault();//Ö÷ÒªÊÇžéÁËtabæI£¬²»Òª×Œ®”Ç°ÔªËØÊ§È¥½¹üc£¨¼´×èÖ¹£¨ä¯ÀÀÆ÷£©Ä¬ÈÏµÄÐÐÎª£©
					event.stopPropagation();
					var inputObj = $(this);
					var value = $(this).val().replace(/\s+/gi, "");
					if ((event.keyCode == 13 || event.keyCode == 9) && value != "")//Ö÷ÒªÊÇÌŽÀíIE
					 inputObj.data("isIEKeyDown", true);
					if (event.type == "blur" && inputObj.data("isIEKeyDown")) {
						inputObj.removeData("isIEKeyDown");
						return;
					}
					if (value != "") {
						if (value.length > opts.tabMaxLen) {
							showMes($(this), "ÇëÊäÈë1µ½" + opts.tabMaxLen + "¸ö×Ö·û³¤¶ÈµÄ±êÇ©");
							return;
						}
						var _match = value.match(checkReg);
						if (!_match) {
							compTab(obj, inputObj, value);
							if ($("input[type='text'][name='tabinput']", obj).length < opts.maxTabCount) {
								if (!inputObj.data("isModify"))
								 initTab(obj);
								else if (!$("input[type='text'][name='tabinput']", obj).is(":hidden")) {
									initTab(obj);
								}
							}
							$("input[type='text']:last", obj).focus();
							hideErr();
						}
						 else {
							showMes(inputObj, "ƒÈÈÝ²»ÄÜ°üº¬·Ç·¨×Ö·û¡¸{0}¡¹£¡".replace("{0}", _match.join(" ")));
						}
					}
					 else {
						if (event.type != "blur")
						 showMes(inputObj, "ƒÈÈÝ²»žé¿Õ");
					}
				}
			}).bind("focus",
			function() {
				hideErr();
			});
		}
		//Íê³É±êÇ©±àÐ´
		var compTab = function(obj, inputObj, value) {
			inputObj.next("span").remove();//É¾³ý½ô¸úinputÔªËØááµÄspan
			var _span = "<span name='tab' id='radius'><b>" + value + "</b><a id='deltab'>¡Á</a></span>";
			inputObj.after(_span).hide();
			inputObj.next("span").find("a").click(function() {
				if (confirm("È·¶¨É¾³ý¸Ã±êÇ©£¿")) {
					inputObj.next("span").remove();
					inputObj.remove();
					if ($("span[name='tab']", obj).length == opts.maxTabCount - 1)
					 initTab(obj);
				}
			});
			inputObj.next("span").dblclick(function() {
				inputObj.data("isModify", true).next("span").remove();
				inputObj.show().focus();
			});
		}
		return this.each(function() {
			var jqObj = $(this);
			for (var i = 0; i < opts.initTabCount; i++) {
				initTab(jqObj, i);
			}
			jqObj.data("isInit", true);
			jqObj.click(function() {
				$("input[type='text'][name='tabinput']", jqObj).each(function() {
					if ($(this).val() == "") {
						$(this).focus();
						return false;
					}
				});
			});
		});
		function showMes(inputObj, mes) {
			var _offset = inputObj.offset();
			var _mesHtml = "<div id='errormes' class='radius_shadow' style='position:absolute;left:" + (_offset.left + opts.tipLOffset) + "px;top:" + (_offset.top + opts.tabH + opts.tipTOffset) + "px;'>" + mes + "</div>";
			$("#errormes").remove();
			$("body").append(_mesHtml);
		}
		function hideErr() {
			$("#errormes").hide();
		}
		function showErr() {
			$("#errormes").show();
		}
	},
	getTabVals: function() {//»ñÈ¡µ±Ç°ÈÝÆ÷ËùÉú³ÉµÄtabÖµ£¬½á¹ûÊÇÒ»Î¬Êý×é
		var obj = $(this);
		var values = [];
		obj.children("span[name=\"tab\"][id^=\"radius\"]").find("b").text(function(index, text) {
			var checkReg = /[^A-Za-z0-9_\u4E00-\u9FA5]+/gi;
			values.push(text.replace(checkReg, ""));
		});
		return values;
	}
});