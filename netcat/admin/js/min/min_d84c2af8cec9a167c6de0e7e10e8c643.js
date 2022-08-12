/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

var ncLang = {
  // управление правами пользователя
  UserSelectRights : "Выберите тип прав.",
  UserHelpDirector : "Пользователь с правами «Директор» имеет полные права на управление всеми сайтами, пользователями и инструментами в системе.",
  UserHelpSupervisor : "Пользователь с правами «Супервизор» имеет полные права на управление всеми сайтами, пользователями и инструментами в системе, за исключением управления пользователями, имеющими права «Директор».",
  UserHelpEditor : "Пользователь с правами «Редактор» имеет права на управление только назначенного сайта, раздела или компонента в разделе. Действия изменения, включения/выключения, удаления относятся только ко своим собственным объектам.",
  UserHelpModerator : "Пользователь с правами «Управление пользователями» имеет возможность управлять (добавлять, изменять, удалять) пользователями, не имеющими прав в системе.",
  UserHelpClassificator : "Пользователь с правами «Администратор списка» имеет права на управление списками.",
  UserHelpBanned : "Пользователь с правами этой категории будет ограничен в выбранных вами действиях.",
  UserHelpGuest : "Пользователь с правом «Гость» может \"ходить\" по системе администрирования, однако ему запрещено производить какие-либо операции с системой (демонстрационный режим).",
  UserHelpSubscriber : "Пользователь с правом «Подписчик» имеет право подписаться на выбранную рассылку.",
  UserPasswordsMismatch : "Пароли не совпадают!",
  WarnAddTemplate : "Альтернативная форма добавления не пустая! Заменить текст в этом поле на новый?",
  WarnEditTemplate : "Альтернативная форма изменения не пустая! Заменить текст в этом поле на новый?",
  WarnDeleteTemplate : "Альтернативная форма удаления не пустая! Заменить текст в этом поле на новый?",
  WarnSearchTemplate : "Форма поиска  объектов не пустая! Заменить текст в этом поле на новый?",
  WarnFullSearchTemplate : "Форма поиска перед списком объектов не пустая! Заменить текст в этом поле на новый?",
  WarnAddCond : "Поле \"условие добавления\" не пустое! Заменить текст в этом поле на новый?",
  WarnEditCond : "Поле \"условие изменения\" не пустое! Заменить текст в этом поле на новый?",
  WarnAddActionTemplate : "Поле \"действие после добавления\" не пустое! Заменить текст в этом поле на новый?",
  WarnEditActionTemplate : "Поле \"действие после изменения\" не пустое! Заменить текст в этом поле на новый?",
  WarnCheckActionTemplate : "Поле \"действие после включения\" не пустое! Заменить текст в этом поле на новый?",
  WarnDeleteActionTemplatee : "Поле \"действие после удаления\" не пустое! Заменить текст в этом поле на новый?",
  WarnAuthMail : "Восстановить значение по умолчанию?",
  WarnReplace : "Текущее значение шаблона будет заменено. Продолжить?",
  FieldFromUser : "Поля из системной таблицы Пользователи",
  Drop : "Удалить",
  DropHard : "Удалить безвозвратно?",
  Cancel : "Отмена",
  AddSubsection: "добавить подраздел",
  DebugCheckData: "Проверка данных",
  MessageError: "Ошибка",
  NetcatCMS: "Система управления NetCat",
  RemindSaveWarning: "У вас есть несохраненные изменения. Продолжить без сохранения?",
  Close: "Закрыть",
  DragAndDropConfirm: {
    buttons: { inside: 'Переместить', default: 'Всё верно' },
    site_below_site: { title: 'Изменение сортировки сайтов', text: 'Сайт «%1» в списках сайтов будет располагаться после сайта «%2».' },
    sub_inside_sub: { title: 'Перемещение раздела', text: 'Раздел «%1» будет подразделом в разделе «%2».' },
    sub_below_sub: { title: 'Изменение сортировки разделов', text: 'Раздел «%1» в списках разделов будет располагаться после раздела «%2».' },
    sub_firstIn_sub: { title: 'Изменение сортировки разделов', text: 'Раздел «%1» будет первым подразделом в разделе «%2».' },
    sub_inside_site: { title: 'Перемещение раздела', text: 'Раздел «%1» будет располагаться в корне сайта «%2».' },
    sub_firstIn_site: { title: 'Изменение сортировки разделов', text: 'Раздел «%1» будет первым в корне сайта «%2».' },
    subclass_inside_sub: { title: 'Перемещение инфоблока', text: 'Инфоблок «%1» будет перемещён в раздел «%2».' },
    message_inside_sub: { title: 'Перемещение объекта', text: '«%1» будет перемещён в инфоблок в разделе «%2».' },
    message_inside_message: { title: 'Изменение сортировки объектов', text: '«%1» при сортировке по умолчанию будет располагаться после «%2».', button: 'Всё верно' },
    template_inside_template: { title: 'Изменение иерархии макетов', text: 'Макет «%1» станет наследником макета «%2».', button: 'Всё верно' },
    template_below_template: { title: 'Изменение сортировки макетов', text: 'Макет «%1» в списках макетов будет располагаться после макета «%2».' },
    template_firstIn_template: { title: 'Изменение сортировки макетов', text: 'Макет «%1» в списках макетов будет располагаться первым в списке дочерних макетов «%2».' },
    field_below_field: { title: 'Изменение сортировки полей', text: 'Поле «%1» в списке полей и стандартных формах будет располагаться ниже поля «%2».' },
    systemfield_below_systemfield: { title: 'Изменение сортировки полей', text: 'Поле «%1» в списке полей и стандартных формах будет располагаться ниже поля «%2».' },
    dataclass_below_dataclass: { title: 'Изменение сортировки компонентов', text: 'Компонент «%1» в списках компонентов будет располагаться ниже компонента «%2».' },
    dataclass_inside_group: { title: 'Изменение группы компонента', text: 'Компонент «%1» будет перемещён в группу «%2».' }
  }
};
(function(c,g){var b=function(a,h){return typeof a===h};if(b(c.nc,"function"))return c.nc;"object"!==typeof JSON&&(JSON={});JSON.stringify=JSON.stringify||function(a){var d=typeof a;if("object"!==d||null===a)return"string"===d&&(a='"'+a+'"'),String(a);var c,e=[],f=a&&a.constructor===Array;for(c in a){var b=a[c];d=typeof b;"string"===d?b='"'+b+'"':"object"===d&&null!==b&&(b=JSON.stringify(b));e.push((f?"":'"'+c+'":')+String(b))}return(f?"[":"{")+String(e)+(f?"]":"}")};var f=!1,e={netcat_path:"undefined"===
typeof NETCAT_PATH?"/netcat/":NETCAT_PATH,admin_path:"undefined"===typeof ADMIN_PATH?"/netcat/admin/":ADMIN_PATH,custom_scroll:!0},k=!1,a=function(){return g.apply(null,arguments)};a.$=g;a.window=c;a.root=a;a.view={};a.process_list={};b(c.parent.nc,"function")&&(a.root=c.parent.nc.root);a.is=b;a.debug=function(d,h){a.is_bool(d)&&!a.is_undefined(d)?f=d:f&&console.log(d+":",h);return f};a.key_exists=function(a,h){return h?h.hasOwnProperty(a):!1};a.is_object=function(a){return b(a,"object")};a.is_undefined=
function(a){return b(a,"undefined")};a.is_bool=function(a){return b(a,"boolean")};a.is_string=function(a){return b(a,"string")};a.is_function=function(a){return b(a,"function")};a.is_empty=function(a){switch(!0){case !a:return!0;case a.length&&0<a.length:return!1;case 0===a.length:return!0}for(var d in a)if(a.hasOwnProperty(d))return!1;return!0};a.is_touch=function(){var a=navigator.userAgent.toLowerCase(),h=["iphone","ipad","ipod","android"],c;for(c in h)if(-1!==a.indexOf(h[c]))return h[c];return!1};
a.is_root=function(){return a.root===a};a.ext=function(d,c,b){b=b||"root";a.is_undefined(a[b][d])?(a[b][d]=c,a.key_exists("__init",c)&&a.is_function(c.__init)&&c.__init()):"root"!==b&&(a[b][d]=c);"root"===b&&a.set_global(d)};a.set_global=function(d,c){c&&(a.root[d]=c);a[d]=a.root[d];for(var b in a.view)a.view[b][d]=a.root[d]};a._view="";a.register_view=function(d){for(var c in a.root.process_list)a.root.process_list[c].view===d&&delete a.root.process_list[c];a.process_stop();k=d;a.ext(d,a,"view");
a.event.call(["nc","register_view"],d)};a.process_start=function(d,c){a.is_empty(a.root.process_list)&&a.event.call(["nc","loading","start"]);a.root.process_list[d]={view:k,obj:c};a.ui.loader_show(c);a.event.call(["nc","process","start"],d,c)};a.process_stop=function(d,c){var b;d&&a.key_exists(d,a.root.process_list)&&((b=a(a.root.process_list[d].obj))&&a.ui.loader_hide(b,c),a.event.call(["nc","process","stop"],d,b),delete a.root.process_list[d]);a.is_empty(a.root.process_list)&&(a.ui.loader_hide(null,
c),a.event.call(["nc","loading","stop"]))};a.config=function(d,c){if(a.is_undefined(d))return e;if(!a.is_undefined(c))e[d]=c;else if(a.is_object(d)){for(var b in d)e[b]=d[b];return e}return e[d]};a.load_dialog=function(c,b,f){return(new a.ui.modal_dialog({url:c,parameters:b||{admin_modal:1,isNaked:1},method:f})).open()};a.load_script=function(a,c){return g.ajax({url:a,dataType:"script",cache:!0,async:!!c})};a.set_global("debug");a.set_global("view");a.set_global("config");c.nc=a})(window,jQuery);
(function(c){var g={},b=function(b,e){c.is_undefined(g[b])&&(g[b]=[]);g[b].push(e)};b.selector=[];b.call=function(c){b.selector=c.slice();var e,f,a=[],d="";for(e in c)d=(d?d+".":"")+c[e],a.unshift(d);d=[].slice.call(arguments);d[0]=b;for(e in a)if(g[a[e]])for(f in g[a[e]])g[a[e]][f].apply(null,d)};c.ext("event",b)})(nc);
(function(c){var g=!1,b=function(){};b.__init=function(){c.event(["nc.process.stop"],function(f,e){if("loadIframe()"===e)(f=c("#mainViewIframe"))&&f.attr("title",c("#mainViewHeader").text());else if("tree"===e.split(".")[0]&&c.view&&c.view.tree)return b.accessibility_link(c.view.tree("a"))})};b.loader_show=function(b){b&&c(b).addClass("nc--loading");g&&clearTimeout(g);c.root("#nc-navbar-loader").show()};b.loader_hide=function(b,e){e=e||300;b?setTimeout(function(){b.removeClass("nc--loading")},e):
g=setTimeout(function(){c.root("#nc-navbar-loader").hide()},e)};b.ext=function(b,e){c.root.ui[b]=e};b.custom_scroll=function(b){return c.config("custom_scroll")&&b.length?b.jScrollPane({autoReinitialise:!0}):!1};b.accessibility_link=function(b){b.each(function(){var b=c(this),f=b.attr("title"),a=this.innerText;a=f?f:a;if(!f){if(!a)return c.debug("badlink",b);f||b.attr("title",a)}})};c(function(){b.accessibility_link(c("a"));c(document).on("click","div.nc-panel-toggle",function(){c(this).parents("div.nc-panel").toggleClass("nc--open nc--close")})});
c.ext("ui",b)})(nc);

!function(){if("undefined"!=typeof nc&&nc===nc.root){var c=nc.root.$;c(window).on("resize.modal_dialog",function(){c(".simplemodal-container").each(function(){var t=c(this).data("modal_dialog");t&&t.resize&&t.resize()})});var t="nc.ui.modal_dialog.load()",a="nc.ui.modal_dialog.submit_form()",e=null,s=0,i="keydown.modal_dialog";d.get_opened_dialog=function(){return e&&e.is_open?e:null},d.get_current_dialog=function(){return e},d.get_previous_dialog=function(){for(var t=s;0<--t;){var i=c("#"+o(t)).data("modal_dialog");if(i)return i}return null},d.prototype={constructor:d,options:{url:null,parameters:null,persist:!1,confirm_close:!0,on_show:c.noop,on_resize:c.noop,on_submit_response:null,width:null,height:null,min_width:600,max_width:1200,full_markup:'<div class="nc-modal-dialog"><div class="nc-modal-dialog-header"><h2>&nbsp;</h2></div><div class="nc-modal-dialog-body"></div><div class="nc-modal-dialog-footer"></div></div>',hidden_tabs:null,show_close_button:!0},loaded_markup:null,dialog_container:null,parts:{header:".nc-modal-dialog-header",title:".nc-modal-dialog-header h2",header_tabs:".nc-modal-dialog-header-tabs",body:".nc-modal-dialog-body",body_tabs:".nc-modal-dialog-body-tab",footer:".nc-modal-dialog-footer"},is_loaded:!1,is_open:!1,are_tabs_initialized:!1,has_header:!0,has_unsaved_changes:!1,index:0,set_options:function(t){this.options=c.extend(this.options,t)},set_option:function(t,i){this.options[t]=i},get_option:function(t){return this.options[t]},load:function(){var i=this;return nc.process_start(t),c.ajax({method:this.options.method||"GET",url:this.options.url,data:c.extend({isNaked:1},this.options.parameters||{})}).done(function(t){i.loaded_markup=c.trim(t)}).always(function(){i.is_loaded=!0,nc.process_stop(t,0)})},create:function(){if(!this.is_loaded)return this.load().done(c.proxy(this,"create"));var t,i=this.options;if(this.loaded_markup){var o=c(this.loaded_markup);if(o.is(".nc-modal-dialog"))t=o;else{var n=o.find(".nc-modal-dialog");n.length&&(t=n)}}t||(t=c(i.full_markup),this.loaded_markup&&t.find(".nc-modal-dialog-body").append(this.loaded_markup));var a=t.find("script").remove();return(e=this).dialog_container=t.hide().appendTo("body"),this.get_part("header").length||(this.dialog_container.addClass("nc-modal-dialog-without-header"),this.has_header=!1),this.init_options(),this.init_close_button(),this.init_tabs(),this.init_forms(),this.init_buttons(),t.append(a),c.Deferred().resolve()},init_options:function(){var o=this.options,t=this.dialog_container;for(var i in o){var n=t.data(i.replace(/_/g,"-"));void 0!==n&&n.toString().length&&(o[i]=n)}var a,e=this.options.hidden_tabs;for(var s in null===e?o.hidden_tabs=[]:c.isArray(e)||(o.hidden_tabs=[],c.each(e.match(/[\w-]+/g),function(t,i){o.hidden_tabs.push(i)})),{confirm_close:1,show_close_button:1})o[s]="boolean"!=typeof(a=o[s])?!/^(no|false|0)$/i.test(a.toString()):a},init_close_button:function(){this.options.show_close_button&&c('<a class="nc-modal-dialog-header-close-button" title="'+ncLang.Close+'" />').click(c.proxy(this,"close")).appendTo(this.get_part("header"))},init_buttons:function(){var t=this,i="click.modal_dialog",o=this.get_part("footer").find("button").off(i);o.filter("[data-action=close]").on(i,c.proxy(this,"close")),o.filter("[data-action=submit]").on(i,function(){c(this).hasClass("nc--loading")||(nc.process_start(a,this),t.submit_form())}),o.filter('[data-action="save-draft"]').toggle(l(this)).on(i,function(t){t.preventDefault(),window.autosave&&(c(this).addClass("nc--loading"),autosave.saveAllData(autosave))})},init_tabs:function(){if(!this.are_tabs_initialized){this.are_tabs_initialized=!0;var o=this,t=this.get_part("body").find("[data-tab-caption]");if(o.dialog_container.toggleClass("nc-modal-dialog-without-tabs",0===t.length),t.length){var i=this.get_part("header_tabs");i.length||(i=c('<div class="nc-modal-dialog-header-tabs"/>').appendTo(this.get_part("header")));var n=i.children("ul"),a=1;n.length||(n=c("<ul/>").appendTo(i)),t.addClass("nc-modal-dialog-body-tab").hide().each(function(){var t=c(this).data("tab-id")||"tab"+a++,i=c(this).attr("data-tab-id",t);c("<li>",{"data-tab-id":t,html:i.data("tab-caption")}).appendTo(n).click(function(t){o.change_tab(c(t.target).data("tab-id"))})}),c.each(this.options.hidden_tabs,function(t,i){o.hide_tab(i)}),this.change_tab(t.eq(0).data("tab-id"))}}},get_form:function(){var t=this.find("#adminForm");return t.length||(t=this.find("form").first()),t},init_forms:function(){InitTransliterate();var o=c.proxy(this,"process_form_submit_response");this.find("form").each(function(){var t=c(this);t.ajaxForm({beforeSerialize:nc_save_editor_values,success:o,iframe:!0});var i=t.attr("action");i=_(i=_(i,"isNaked",1),"admin_modal",1),t.attr("action",i)})},init_change_tracking:function(){if(this.options.confirm_close){var t=this,i=function(){t.has_unsaved_changes=!0};this.has_unsaved_changes=!1,this.dialog_container.one("change",":input",i).one("input textinput","div[contenteditable]",i)}},submit_form:function(t){this.has_unsaved_changes=!1,(t=t?c(t):this.get_form()).submit()},process_form_submit_response:function(t,i,o,n){return nc.process_stop(a),(c.isFunction(this.options.on_submit_response)?this.options.on_submit_response:this.default_form_submit_response_handler).call(this,t,i,o,n)},default_form_submit_response_handler:function(t,i,o,n){var a=nc_check_error(t);if(a)this.show_error(a);else{var e=n.find("input[name=cc]").val()||n.find("input[name=infoblock_id]").val(),s=window.location,d=/^NewHiddenURL=(.+?)$/m.exec(t),r=d?c.trim(d[1]):null,l=/^SetLocationHash=(.*?)$/m.exec(t);if(l&&(window.location.hash=l[1]),/^ReloadPage=1$/m.test(t))if(r&&!/\.php/.test(window.location.pathname)){var h=/\/([^\/]+)$/.exec(s.pathname);h&&(r+=h[1]),s.pathname=r}else s.reload(!0);else e&&nc_update_admin_mode_infoblock(e,c.proxy(this,"destroy"))}},show_error:function(t){var i=this.get_part("footer"),o=c("<div class='nc-alert nc--red' />").append(c("<div class='nc-alert-close nc-icon-s nc--remove'></div>").click(function(){o.remove()})).append("<i class='nc-icon-l nc--status-error'></i>").append(t).appendTo(i)},change_tab:function(t){var i=h(t);return this.get_part("header_tabs").find("li").removeClass("nc--active").filter(i).addClass("nc--active").show(),this.get_part("body_tabs").hide().filter(i).show(),this},hide_tab:function(t){var i=h(t);return this.get_part("header_tabs").find("li"+i).hide(),this.get_part("body_tabs").filter(i).hide(),this},show_tab:function(t){var i=h(t);return this.get_part("header_tabs").find("li"+i).show(),this.get_part("body_tabs").filter(i).show(),this},get_tab:function(t){return this.get_part("body").find(h(t))},get_current_tab:function(){var t=this.get_part("body_tabs");return t.length?t.filter(":visible"):this.get_part("body")},hide_header_tabs:function(){return this.dialog_container.addClass("nc-modal-dialog-without-tabs"),this},show_header_tabs:function(){return this.dialog_container.removeClass("nc-modal-dialog-without-tabs"),this},open:function(){return s&&(c("#simplemodal-container").attr("id",o()).data({modal_d:c.modal.impl.d,modal_o:c.modal.impl.o}),c("#simplemodal-overlay").attr("id",""),c.modal.impl.d={}),s++,this.index=s,this.dialog_container?this.when_ready_to_open():this.create().done(c.proxy(this,"when_ready_to_open")),this},when_ready_to_open:function(){c.modal(this.dialog_container,{onOpen:null,onShow:c.proxy(this,"on_show"),onClose:n,autoPosition:!1,persist:this.options.persist,closeHTML:"",zIndex:1e4+10*s}),c("#simplemodal-container").data("modal_dialog",this),c(window).off(i).on(i,r),this.is_open=!0,this.init_change_tracking(),this.resize()},on_show:function(){this.options.on_show(this),l(this)&&InitAutosave("adminForm")},close:function(){if(this.is_open&&this.is_close_confirmed()){if(this.index===s)c.modal.close();else{var t=c("#"+o(this.index));t.prev(".simplemodal-overlay").remove(),t.remove()}this.is_open=!1,this.options.persist||this.destroy(),this.index<=1&&c(window).off(i)}},is_close_confirmed:function(){return!this.options.confirm_close||!this.has_unsaved_changes||confirm(window.TEXT_SAVE||"Выйти без сохранения?")},resize:function(){if(!this.is_open)return this;var t=c(window.top.window),i=this.options,o=t.width(),n=window.innerHeight||window.clientHeight||t.height(),a=n-200,e=i.width||o-200,s=i.height||a,d="auto"===s,r=this.dialog_container.closest(".simplemodal-container"),l=Math.ceil;e>i.max_width&&(e=i.max_width),!i.width&&e<i.min_width&&(e=i.min_width),r.css({width:e+"px",height:s+(d?"":"px"),left:l((o-e)/2-10)+"px",top:"120px"}).find(".simplemodal-wrap").css("overflow","auto"),d&&(r.height()>a&&r.css("height",a+"px"),r.css("top",Math.max(l((n-r.height())/2),100)+"px"));var h=this.get_part("body").find(".nc--fill");return h.length&&h.css("height",r.height()+"px"),i.on_resize(),this},destroy:function(){this.close(),window.CKEDITOR&&this.dialog_container.find("textarea").each(function(){this.name in CKEDITOR.instances&&CKEDITOR.remove(CKEDITOR.instances[this.name])}),this.dialog_container.remove()},clear_all:function(){for(var t in this.parts)this.clear(t)},clear_part:function(t){this.get_part(t).empty()},find:function(t){return this.dialog_container||this.create(),this.dialog_container.find(t)},get_part:function(t){return this.find(this.parts[t])}},nc.ext("modal_dialog",d,"ui")}function d(t){return this instanceof d?(this.options=c.extend(!0,{},this.options),this.set_options(t),this.options.url||(this.is_loaded=!0),this):new d(t)}function o(t){return"simplemodal-container--"+(t||s)}function n(){var t=d.get_opened_dialog();if(null!==t){var i=t.options.persist,o=c("#simplemodal-placeholder");if(i&&this.d.placeholder?o.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(o.remove(),t.dialog_container.remove()),c("#simplemodal-container, #simplemodal-overlay").remove(),this.d={},e=d.get_previous_dialog()){s=e.index;var n=e.dialog_container.closest(".simplemodal-container").attr("id","simplemodal-container");this.d=n.data("modal_d"),this.o=n.data("modal_o"),this.occb=!1,this.unbindEvents(),this.bindEvents(),c(".simplemodal-overlay").last().attr("id","simplemodal-overlay")}else s=0,window.autosave&&(autosave.stopTimer(),autosave=null)}}function r(t){if(27===t.keyCode){var i=c(t.target);i.is(":input")&&i.blur(),d.get_opened_dialog().close()}}function l(t){if(!window.nc_autosave_use||!window.InitAutosave)return!1;var i=t.get_form();return"adminForm"===i.attr("id")&&!!i.find(':hidden[name="message"]').val()&&!!i.find(':hidden[name="cc"]').val()}function h(t){return'[data-tab-id="'+t+'"]'}function _(t,i,o){t&&(new RegExp("[?&]"+i+"=").test(t)||(t+=(0<=t.indexOf("?")?"&":"?")+i+"="+o));return t}}(window);
!function(t,$){var n=0,e=300,a=function(t){var a=t.data("content"),r;if(a){var i=t.data("id");if(i){if(r=$("#"+i),"none"===r.css("display"))return r.fadeIn(e),!0;if(r.length)return!1}var d=20,c={t:"b",b:"t",r:"l",l:"r"},l=t.data("style"),u=t.data("z-index")||1,f=t.data("width"),s=o(t.data("placement"),"right-center"),p=t.offset();r=$(document.createElement("DIV")).addClass("nc-popover"+(l?" nc--"+l:"")).html(a).css({"z-index":u,position:"absolute",display:"none"}),f&&r.width(f),n++,i="nc_popover_"+n,r.attr("id",i),t.attr("data-id",i),$("body").append(r);var v=s[0],h=s[1],b=t.outerWidth(),g=t.outerHeight(),m=r.outerWidth(),y=r.outerHeight();return"r"===v&&(p.left+=b+d),"l"===v&&(p.left-=m+d),"t"===v&&(p.top-=y+d),"b"===v&&(p.top+=g+d),("rc"===s||"lc"===s)&&(p.top-=y/2-g/2),("rb"===s||"lb"===s)&&(p.top-=y-g),("tc"===s||"bc"===s)&&(p.left-=m/2-b/2),("tr"===s||"br"===s)&&(p.left-=m-b),r.addClass("nc--"+c[v]+h).css(p).fadeIn(e),r}},r=function(t){var n=t.data("id");n&&$("#"+n).fadeOut(e)},o=function(t,n){t||(t=n);var e=t.split(/[- .]/);for(var a in e)e[a]=e[a][0];return e=e.join(""),1===e.length&&(e+="c"),e},i=function(t){$(t).each(function(){var t=$(this),n=t.data("trigger")||"click";"load"===n&&(n+=" click"),t.on(n,function(){return a(t)===!1&&r(t),!1}).load(),"mouseover"===n&&t.mouseout(function(){r(t)})})};t.ext("popover",i,"ui")}(nc,nc.$);
!function(t,$){var e=0,i={padding:10},o=function(t,e){var i={},o;for(o in t)i[o]=t[o];for(o in e)i[o]=e[o];return i},a=function(t,e){var i,o=t.padding;if(t.axis)i={left:t.axis[0]-o,top:t.axis[1]-o},i.width=t.axis[2]+2*o,i.height=t.axis[3]+2*o;else if(e){var a=$(e);i=a.offset(),i.top-=o,i.left-=o,i.width=a.outerWidth()+2*o,i.height=a.outerHeight()+2*o}i.position="absolute",i["z-index"]=999,n.ctx.clearRect(i.left,i.top,i.width,i.height);var r=$(document.createElement("div")).css(i);r.data("z-index",t["z-index"]||999);for(var s in t)r.data(s,t[s]);n.$overlay_objet.append(r),n.popovers.push(r)},n={};n.overlay_id=0,n.$overlay_objet=!1,n.$canvas=!1,n.ctx=!1,n.popovers=[],n.init=function(t){this.settings=o(i,t),e++;var a=$("html"),n=$(document.createElement("canvas")),r=n[0].getContext("2d");return this.$canvas=n,this.ctx=r,this.overlay_id="nc_help_overlay_"+e,this.$overlay_objet=$(document.createElement("div")).attr("id",this.overlay_id).hide(),this.$overlay_objet.append(this.$canvas),n.css({position:"absolute",top:0,left:0,"z-index":999}).attr("width",a.outerWidth()).attr("height",a.outerHeight()),r.fillStyle="rgba(0, 0, 0, 0.25)",r.fillRect(0,0,n[0].width,n[0].height),$("body").append(this.$overlay_objet),this},n.add=function(t){return t=o(this.settings,t),t.target?$(t.target).each(function(){a(t,this)}):t.axis&&a(t),this},n.show=function(){return this.$overlay_objet.show(function(){for(var e in n.popovers)t.ui.popover(n.popovers[e])}),this},n.hide=function(){for(var t in n.popovers)$("#"+n.popovers[t].data("id")).hide();return this.$overlay_objet.hide(),this},t.ext("help_overlay",function(t){return n.init(t)},"ui")}(nc,nc.$);


function transliterate(word, isUrl) {

    var tr = {"А": "A", "а": "a", "Б": "B", "б": "b",
        "В": "V", "в": "v", "Г": "G", "г": "g",
        "Д": "D", "д": "d", "Е": "E", "е": "e",
        "Ё": "E", "ё": "e", "Ж": "Zh", "ж": "zh",
        "З": "Z", "з": "z", "И": "I", "и": "i",
        "Й": "Y", "й": "y", "КС": "X", "кс": "x",
        "К": "K", "к": "k", "Л": "L", "л": "l",
        "М": "M", "м": "m", "Н": "N", "н": "n",
        "О": "O", "о": "o", "П": "P", "п": "p",
        "Р": "R", "р": "r", "С": "S", "с": "s",
        "Т": "T", "т": "t", "У": "U", "у": "u",
        "Ф": "F", "ф": "f", "Х": "H", "х": "h",
        "Ц": "Ts", "ц": "ts", "Ч": "Ch", "ч": "ch",
        "Ш": "Sh", "ш": "sh", "Щ": "Sch", "щ": "sch",
        "Ы": "Y", "ы": "y", "Ь": "'", "ь": "'",
        "Э": "E", "э": "e", "Ъ": "'", "ъ": "'",
        "Ю": "Yu", "ю": "yu", "Я": "Ya", "я": "ya"};


    var result = "";

    result = word.split('').map(function(char) {
        return tr[char] || char;
    }).join("");

    if (isUrl == 'yes') {
        result = result
                .toLowerCase() // change everything to lowercase
                .replace(/^\s+|\s+$/g, "") // trim leading and trailing spaces
                .replace(/[_|\s]+/g, "-") // change all spaces and underscores to a hyphen
                .replace(/[^a-z\u0400-\u04FF0-9-]+/g, "") // remove all non-cyrillic, non-numeric characters except the hyphen
                .replace(/[-]+/g, "-") // replace multiple instances of the hyphen with a single instance
                .replace(/^-+|-+$/g, "") // trim leading and trailing hyphens
                .replace(/[-]+/g, "-")
    }
    return result;
}

function InitTransliterate() {
    if ($nc("[data-type='transliterate']").length) {
        $nc.each($nc("[data-type='transliterate']"), function() {
            $nc(this).after('<span class="nc-transliterate-action nc-icon nc--refresh" title="Транслитерация названия"></span>');
            $nc(this).next('.nc-transliterate-action').click(function(e) {
                e.preventDefault();
                elemName = $nc(this).prev().attr('data-from');
                isUrl = $nc(this).prev().attr('data-is-url');
                $nc(this).prev().val(transliterate($nc('[name="' + elemName + '"]').val(), isUrl));
            });
        });
    }
}
$nc(document).ready(function() {
    InitTransliterate();
});
/**
 * Original PHP Engine: http://rmcreative.ru/blog/post/tipograf
 * JS Lite Version
 */

//typographus object
var Typographus_Lite = new Object();
//special characters
Typographus_Lite.sp_chars = {
  nbsp     : '&nbsp;',
  lnowrap  : '<span style="white-space:nowrap">',
  rnowrap  : '</span>',
  lquote   : '«',
  rquote   : '»',
  lquote2  : '„',
  rquote2  : '“',
  mdash    : '—',
  ndash    : '–',
  minus    : '–', // width equals to +, present in every font
  hellip   : '…',
  copy     : '©',
  trade    : '™',
  apos     : '&#39;',   // см. http://fishbowl.pastiche.org/2003/07/01/the_curse_of_apos
  reg      : '®',
  multiply : '&times;',
  frac_12  : '&frac12;',
  frac_14  : '&frac14;',
  frac_34  : '&frac34;',
  plusmn   : '±',
  rarr     : '→',
  larr     : '←',
  rsquo    : '&rsquo;'
};

//safeblocks (as parts of regular expressions)
//ADD YOUR SAFEBLOCKS HERE AS 'start' : 'end' PAIR
Typographus_Lite.safeblocks = {
  '<safeblock>' : '<\\/safeblock>',
  '<pre[^>]*>' : '<\\/pre>',
  '<style[^>]*>' : '<\\/style>',
  '<script[^>]*>' : '<\\/script>',
  '<code[^>]*>' : '<\\/code>',
  '<!--' : '-->',
  '<\\?php' : '\\?>',
  '<drupal6>' : '<\\/drupal6>',
  '<php>' : '<\\/php>',
  '<cpp>' : '<\\/cpp>',
  '<object>' : '<\\/object>',
  '<javascript>' : '<\\/javascript>',
  '<qt>' : '<\\/qt>'
};


Typographus_Lite.safeblock_storage = [];

//safeblock stacking
__stack = function (match) {
  //get length
  var i = Typographus_Lite.safeblock_storage.length;
  //add match
  Typographus_Lite.safeblock_storage[i] = match;
  //return replacement
  return "<" + i + ">";
}

//safeblock processing
Typographus_Lite.remove_safeblocks = function(str) {
  //empty storage
  this.safeblock_storage = [];
  var pattern = '(';
  for (var key in this.safeblocks) {
    pattern += "(" + key + "(.|\\n)*?" + this.safeblocks[key] + ")|";
  }
  pattern += '<[^>]*[\\s][^>]*>)';
  str = str.replace(RegExp(pattern, "gim"), __stack);
  return str;
}

//safeblock returning
Typographus_Lite.return_safeblocks = function(str) {
  for (var i=0; i<this.safeblock_storage.length; i++) {
    var block = "<" + i + ">";
    str = str.replace(block, this.safeblock_storage[i]);
  }
  return str;
}


/**
 *
 *  This function calls typo_text to process string str
 *
 */
Typographus_Lite.process = function(str) {
  str = this.remove_safeblocks(str);
  str = this.typo_text(str);
  str = this.return_safeblocks(str);
  return str;
}


/**
 *
 * This function applies array of rules to string str
 *
 */
Typographus_Lite.apply_rules = function(rules, str) {
  for (var key in rules) {
    var rule = new RegExp(key, "gim"); //with global, case-insensitive, multiline flags
    var newstr = rules[key];
    str = str.replace(rule, newstr);
  }
  return str;
}	


/**
 *
 * The main typographus function
 *
 */
Typographus_Lite.typo_text = function(str) {
  var sym = this.sp_chars;
  var html_tag = '(?:<.*?>)';
  var hellip = '\\.{3,5}';
  var word = '[a-zA-Z_абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ0123456789]';
  var phrase_begin = "(?:" + hellip + "|" + word + '|\\n)';
  var phrase_end = '(?:[)!?.:;#*\\\]|$|'+ word + '|' + sym['rquote'] + '|' + sym['rquote2'] + '|&quot;|"|' + sym['hellip'] + '|' + sym['copy'] + '|' + sym['trade'] + '|' + sym['apos'] + '|' + sym['reg'] + '|\\\')';
  var any_quote = "(?:" + sym['lquote'] + "|" + sym['rquote'] + "|" + sym['lquote2'] + "|" + sym['rquote2'] + "|&quot;|\\\")";
  //symbols
  var rules_symbols = {};
  //(c)
  rules_symbols['\\((c|с)\\)'] = sym['copy'];
  //(r)
  rules_symbols['\\(r\\)'] = sym['reg'];
  //tm
  rules_symbols['\\(tm\\)'] = sym['trade'];
  //hellip
  rules_symbols[hellip] = sym['hellip'];
  //+-
  rules_symbols['([^\\+]|^)\\+-'] = '$1' + sym['plusmn'];
  //->
  rules_symbols['([^-]|^)-(>|&gt;)'] = '$1' + sym['rarr'];
  //<-
  rules_symbols['([^<]|^)(<|&lt;)-'] = '$1' + sym['larr'];
  //quotes
  var rules_quotes = {};
  rules_quotes['([^"]\\w+)"(\\w+)"'] = '$1 "$2"';
  rules_quotes['"(\\w+)"(\\w+)'] = '"$1" $2';
  rules_quotes["(" + html_tag + "*?)(" + any_quote + ")(" + html_tag + "*" + phrase_begin + html_tag + "*)"] = '$1' + sym['lquote'] + '$3';
  rules_quotes["(" + html_tag + "*(?:" + phrase_end + "|[0-9]+)" + html_tag + "*)(" + any_quote + ")(" + html_tag + "*" + phrase_end + html_tag + "*|\\s|$$|\\n|[,<-])"] = '$1' + sym['rquote'] + '$3';

  //main rules
  var rules_main = {};
  //fix dashes
  rules_main[' +(?:--?|—|&mdash;)(?=\\s)'] = sym['nbsp'] + sym['mdash'];
  rules_main['^(?:--?|—|&mdash;)(?=\\s)'] = sym['mdash'];
  rules_main['(?:^|\\s+)(?:--?|—|&mdash;)(?=\\s)'] = "\n" + sym['nbsp'] + sym['mdash'];
  //fix digit-dash
  rules_main['(\\d{1,})(-)(?=\\d{1,})'] = '$1' + sym['ndash'];
  //glue percent
  rules_main['([0-9]+)\\s+%'] = '$1%';

  //apply different rules
  str = this.apply_rules(rules_quotes, str);
  str = this.apply_rules(rules_main, str);
  str = this.apply_rules(rules_symbols, str);

  return str;
}

// Resize modal on window.resize
//
// Если у элемента, из которого был создан modal, в качестве data-свойства onResize
// установлена функция [.data('onResize', someFunction)], она будет выполнена при
// событии resize
function nc_register_modal_resize_handler() {
    if (!$nc._resize_modal_event) {
        $nc(window).resize(function() {
            var modal = $nc('#simplemodal-container').not(".simplemodal-container-fixed-size");
            if (modal.length !== 0 && !modal.find('.nc-modal-dialog-body').length) {
                var w = $nc(window).width() - 100 * 2;
                var h = $nc(window).height() - 100 * 2;
                w = w > 1200 ? 1200 : (w < 600 ? 600 : w);

                modal.css({width: w, height: h});

                var modalResizeHandler = modal.find(".simplemodal-data").data("onResize");
                if (modalResizeHandler && typeof modalResizeHandler === "function") {
                    modalResizeHandler(modal);
                }
            }
        });

        $nc._resize_modal_event = true;
    }
}

function nc_save_editor_values() {
    // в случае удаления nc_form() перенести эту функцию в nc.ui.modal_dialog (?)

    if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances) {
        for (var instance_name in CKEDITOR.instances) {
            var editor = CKEDITOR.instances[instance_name],
                $textarea = $nc(editor.element.$),
                value = editor.getData();

            if ($textarea.length) {
                // CKEditor не фильтрует контент, если редактор находится не в режиме
                // WYSIWIG (as of version 4.4.1)
                if (editor.mode !== 'wysiwyg' && (!('allowedContent' in editor.config) || editor.config.allowedContent !== true)) {
                    var fragment = CKEDITOR.htmlParser.fragment.fromHtml(value),
                        writer = new CKEDITOR.htmlParser.basicWriter();

                    editor.filter.applyTo(fragment);
                    fragment.writeHtml(writer);
                    value = writer.getHtml();
                }
                $textarea.val(value);
            }
        }
    }

    if (window.FCKeditorAPI) {
        for (fckeditorName in FCKeditorAPI.Instances) {
            var editor = FCKeditorAPI.GetInstance(fckeditorName);
            if (editor.IsDirty()) {
                $nc('#' + fckeditorName).val(editor.GetHTML());
            }
        }
    }

    CMSaveAll();
}

function nc_form(url, backurl, target, modalWindowSize, httpMethod, httpData) {
    var path_re = new RegExp("^\\w+://[^/]+" + NETCAT_PATH + "(add|message)\\.php");
    if (path_re.test(url)) {
        return nc.load_dialog(url);
    }

    if (!target && window.event) {
        target = window.event.target || window.event.srcElement;
    }

    if (!modalWindowSize) {
        modalWindowSize = null;
    }

    nc_register_modal_resize_handler();

    var $target = target ? $nc(target) : false;
    if ($target) {
        if ($target.hasClass('nc--disabled')) {
            return;
        }
        $target.addClass('nc--disabled');
    }

    if (!backurl) {
        backurl = '';
    }

    nc.process_start('nc_form()');

    if (!httpMethod) {
        httpMethod = 'GET';
    }

    if (!httpData) {
        httpData = {};
    }

    $nc.ajax({
        'type': httpMethod,
        'url': url + '&isNaked=1',
        'data': httpData,
        'success': function(response) {

            nc.process_stop('nc_form()');
            if ($target) {
                $target.removeClass('nc--disabled');
            }

            nc_remove_content_for_modal();
            $nc('body').append('<div style="display: none;" id="nc_form_result"></div>');
            $nc('#nc_form_result').html(response).modal({
                position: [120, null],
                onShow: function(dialog) {
                    $nc('#nc_form_result').children().not('.nc_admin_form_menu, .nc_admin_form_body, .nc_admin_form_buttons').hide();

                    var container = dialog.container;

                    if (modalWindowSize) {
                        var currentLeft = parseInt(container.css('left'));
                        var currentWidth = container.width();

                        var currentTop = parseInt(container.css('top'));
                        var currentHeight = container.height();

                        container.css({
                            width: modalWindowSize.width,
                            height: modalWindowSize.height,
                            left: currentLeft + (currentWidth - modalWindowSize.width) / 2,
                            top: currentTop + (currentHeight - modalWindowSize.height) / 2
                        }).addClass('simplemodal-container-fixed-size');
                    } else {
                        container.removeClass('simplemodal-container-fixed-size');
                        $nc(window).resize();
                    }

                    $nc('#nc_form_result #adminForm').append("<input type='hidden' name='nc_token' value='" + nc_token + "' />");
                },
                closeHTML: "<a class='modalCloseImg'></a>",
                onClose: function(e) {
                    if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances) {
                        for (var instance_name in CKEDITOR.instances) {
                            if (!/_edit_inline$/i.test(instance_name)) {
                                CKEDITOR.instances[instance_name].destroy();
                            } else {
                                var $element = $nc('#' + instance_name);
                                var oldValue = $element.attr('data-oldvalue');
                                $element.html(oldValue);
                            }
                        }
                    }
                    $nc.modal.close();
                    if (typeof nc_autosave_use !== "undefined" && nc_autosave_use == 1 && autosave !== null && typeof autosave !== "undefined" && autosave.timeout != 0) {
                        autosave.stopTimer();
                    }
                    $nc(document).unbind('keydown.simplemodal');
                    nc_remove_content_for_modal();
                }
            });

            $nc('#nc_form_result #adminForm').ajaxForm({
                beforeSerialize: nc_save_editor_values,

                // modal layer button submit
                success: function(response, status, event, form) {

                    nc.process_stop('nc_form()');
                    var error = nc_check_error(response);
                    if (error) {
                        var $form_buttons = $nc('.nc_admin_form_buttons');
                        $form_buttons.append(
                            "<div id='nc_modal_error' class='nc-alert nc--red' style='position:absolute; z-index:3000; width:" + ($form_buttons.width() - 55) + "px; bottom:70px; text-align:left; line-height:20px '>"
                            + "<div class='simplemodal_error_close'></div>"
                            + "<i class='nc-icon-l nc--status-error'></i>"
                            + error
                            + "</div>");
                        $nc('.simplemodal_error_close').click(function() {
                            $nc('#nc_modal_error').remove();
                        });
                        return false;
                    }

                    // if (response == 'OK') {
                    //     window.location.reload(true);
                    //     return false;
                    // }

                    var cc = form.find('input[name=cc]').val();

                    var loc = window.location,
                        newUrlMatch = (/^NewHiddenURL=(.+?)$/m).exec(response), // в ответе есть строка "NewHiddenUrl=something"
                        newUrl = newUrlMatch ? $nc.trim(newUrlMatch[1]) : null; // новый HiddenURL страницы

                    if ((/^ReloadPage=1$/m).test(response)) { // в ответе есть строка "ReloadPage=1"
                        // не режим "редактирование", изменился путь страницы
                        if (newUrl && !(/\.php/.test(window.location.pathname))) {
                            // сохранить имя страницы, если оно было (изменение свойств раздела со страницы объекта)
                            var pageNameMatch = /\/([^\/]+)$/.exec(loc.pathname);
                            if (pageNameMatch) {
                                newUrl += pageNameMatch[1];
                            }
                            loc.pathname = newUrl;
                        } else {
                            loc.reload(true);
                        }
                        return false;
                    } else {
                        $nc.ajax({
                            'type': 'GET',
                            'url': (backurl ? backurl : nc_page_url()) + '&isNaked=1&admin_modal=1&cc_only=' + cc,
                            success: function(response) {
                                nc_update_admin_mode_content(response, null, cc);
                                $nc.modal.close();
                            }
                        });
                    }
                }
            });
            return false;
        }
    });
}

function nc_action_message(url, httpMethod, httpData) {
    var ajax_url = url + '&isNaked=1&posting=1' + '&nc_token=' + nc_token,
        cc_match = url.match(/\bcc=(\d+)/),
        cc = cc_match[1];

    if (!httpMethod) {
        httpMethod = 'GET';
    }

    if (!httpData) {
        httpData = {};
    }

    $nc.ajax({
        'type': httpMethod,
        'data': httpData,
        'url': ajax_url,
        'success': function(response) {
            response = $nc.trim(response);
            if (response === 'deleted') {
                $nc('body', nc_get_current_document()).append("<div id='formAsyncSaveStatus'>Объект помещен в корзину</div>");
                $nc('div#formAsyncSaveStatus', nc_get_current_document()).css({
                    backgroundColor: '#39B54A'
                });
                setTimeout(function() {
                        $nc('div#formAsyncSaveStatus', nc_get_current_document()).remove();
                    },
                    1000);
            }

            if (response.indexOf('trashbin_disabled') > -1) {

                nc_print_custom_modal();

                $nc('div#nc_cart_confirm_footer button.nc_admin_metro_button').click(function() {
                    $nc.modal.close();
                    nc_action_message(url + '&force_delete=1')
                });

                return null;
            }

            var $status_message = $nc('<div />').html(response).find('#statusMessage');

            if (cc) {
                nc_update_admin_mode_infoblock(cc);
                return;
            }

            $nc.ajax({
                'type': 'GET',
                'url': nc_page_url() + '&isNaked=1',
                'success': function(response) {
                    response ? nc_update_admin_mode_content(response, $status_message, cc)
                        : nc_page_url(nc_get_back_page_url());
                }
            });
        }
    });
}

function nc_is_frame() {
    return typeof mainView !== "undefined";
}

function nc_has_frame() {
    return 'mainView' in top.window && top.window.mainView.oIframe;
}

function nc_get_back_page_url() {
    return NETCAT_PATH + '?' + nc_page_url().match(/sub=[0-9]+/) + (nc_is_frame() ? '&inside_admin=1' : '');
}

function nc_page_url(url) {
    return nc_correct_page_url(url ? nc_get_location().href = url : nc_get_location().href);
}

function nc_correct_page_url(url) {
    url = url.replace(/#.*$/, '');
    return url.indexOf('?') == -1 ? url + '?' : url;
}

function nc_update_admin_mode_infoblock(infoblock_id, callback) {
    if (window.nc_partial_load && !/full\.php/.test(location)) {
        nc_partial_load(infoblock_id, callback || $nc.noop)
    } else {
        $nc.ajax({
            'type': 'GET',
            'url': nc_page_url() + '&isNaked=1&admin_modal=1&cc_only=' + infoblock_id,
            success: function (response) {
                nc_update_admin_mode_content(response, null, infoblock_id);
                if ($nc.isFunction(callback)) {
                    callback();
                }
            }
        });
    }
}

// используется в шаблонах компонента netcat_page_block_table!
function nc_update_admin_mode_content(content, $status_message, cc) {
    var scope = nc_has_frame() ? top.window.mainView.oIframe.contentDocument : document,
        block_id_selector = '#nc_admin_mode_content' + (cc || ''),
        $nc_admin_mode_content = $nc(block_id_selector, scope),
        new_content_block_by_id = $nc(content).filter(block_id_selector);

    if ($nc_admin_mode_content.length && new_content_block_by_id.length) {
        $nc_admin_mode_content.replaceWith(new_content_block_by_id);
        $nc_admin_mode_content = new_content_block_by_id;
    } else {
        if (!$nc_admin_mode_content.length) {
            $nc_admin_mode_content = $nc('div.nc_admin_mode_content', scope);
        }
        $nc_admin_mode_content.html(content);
    }

    $nc_admin_mode_content.find('LINK[rel=stylesheet]').appendTo($nc('HEAD', scope));

    $nc_admin_mode_content.prev('#statusMessage').remove();

    if (typeof($status_message) !== 'undefined' && $status_message) {
        $nc_admin_mode_content.before($status_message);
    }

    if ($nc.fn.addImageEditing) {
        $nc(".cropable").addImageEditing();
    }
}

function nc_get_current_document() {
    return nc_is_frame() ? mainView.oIframe.contentDocument : document;
}

function nc_get_location() {
    return nc_is_frame() ? mainView.oIframe.contentWindow.location : location;
}

function nc_remove_content_for_modal() {
    $nc('#nc_form_result').remove();
    if (typeof(resize_layout) !== 'undefined') {
        resize_layout();
    }
}

function nc_password_change() {
    var $password_change = $nc('#nc_password_change');
    $password_change.modal({
        closeHTML: "",
        containerId: 'nc_small_modal_container',
        onShow: function() {
            $nc('div.simplemodal-wrap').css({padding: 0, overflow: 'inherit'});
            var $form = $password_change.find('form');
            $nc('#nc_small_modal_container').addClass('nc-shadow-large').css({
                width: $form.width(),
                height: $form.height()
            });
            $nc(window).resize();
        }
    });

    // $nc('.password_change_simplemodal_container').css({
    //       backgroundColor: 'white',
    // });

    //FIXME: проверка формы изменения пароля перед отправкой
    if (false) {
        var $submit = $password_change.find('button[type=submit]');
        // var button = $nc('div#nc_password_change_footer button.nc_admin_metro_button');
        $submit.unbind();
        $submit.click(function() {
            if ($nc('input[name=Password1]').val() !== $nc('input[name=Password2]').val()) {
                $nc('div#nc_password_change_footer').append(
                    "<div id='nc_modal_error' style='position: absolute; z-index: 3000; width: 200px; border: 2px solid red;background-color: white; bottom: 190px; text-align: left; padding: 10px;'>"
                    + "<div class='simplemodal_error_close'></div>"
                    + ncLang.UserPasswordsMismatch
                    + "</div>");
                return false;
            }
            $nc('div#nc_password_change_body form').submit();
        });
    }

    $nc('div#nc_password_change form').ajaxForm({
        success: function() {
            $nc.modal.close();
        }
    });
}

$nc('button.nc_admin_metro_button_cancel').click(function() {
    $nc.modal.close();
});

function nc_check_error(response) {
    var div = document.createElement('div');
    div.innerHTML = response;
    return $nc(div).find('#nc_error').html();
}

$nc('.simplemodal_error_close').click(function() {
    $nc('#nc_modal_error').remove();
});

function CMSaveAll() {
    /* // pre method
    var editors = null;

    if ( nc_is_frame() ) {
        editors = mainView.oIframe.contentWindow.CMEditors;
    } else {
        editors = window.CMEditors;
    }
    if ( typeof(editors) != 'undefined' ) {
        for(var key in editors) {
            editors[key].save();
        }
    }*/

    $nc('textarea.has_codemirror').each(function() {
        $nc(this).data('codemirror').save();
    });
}

function nc_print_custom_modal() {
    $nc('body').append("<div id='nc_cart_confirm' style='display: none;'></div>");

    var cart_confirm = $nc('#nc_cart_confirm');

    cart_confirm.append("<div id='nc_cart_confirm_header'></div>");
    cart_confirm.append("<div id='nc_cart_confirm_body'></div>");
    cart_confirm.append("<div id='nc_cart_confirm_footer'></div>");

    $nc('#nc_cart_confirm_header').append("<div><h2 style='padding: 0px;'>" + ncLang.DropHard + "</h2></div>");
    $nc('#nc_cart_confirm_footer').append("<button type='button' class='nc_admin_metro_button nc-btn nc--blue'>" + ncLang.Drop + "</button>");
    $nc('#nc_cart_confirm_footer').append("<button type='button' class='nc_admin_metro_button_cancel nc-btn nc--red nc--bordered nc--right'>" + ncLang.Cancel + "</button>");

    cart_confirm.modal({
        closeHTML: "",
        containerId: 'cart_confirm_simplemodal_container',
        onShow: function() {
            $nc('.simplemodal-wrap').css({
                backgroundColor: 'white'
            });
        },
        onClose: function() {
            $nc.modal.close();
            $nc('#nc_cart_confirm').remove();
        }
    });

    $nc('div#nc_cart_confirm_footer button.nc_admin_metro_button_cancel').click(function() {
        $nc.modal.close();
    });

    $nc('div#nc_cart_confirm_footer button.nc_admin_metro_button').click(function() {
        if (typeof callback_on_confirm === 'function') {
            callback_on_confirm();
            $nc.modal.close();
        }
    });

}


function nc_print_custom_modal_callback(callback) {
    $nc('body').append("<div id='nc_cart_confirm' style='display: none;'></div>");

    var cart_confirm = $nc('#nc_cart_confirm');

    cart_confirm.append("<div id='nc_cart_confirm_header'></div>");
    cart_confirm.append("<div id='nc_cart_confirm_body'></div>");
    cart_confirm.append("<div id='nc_cart_confirm_footer'></div>");

    $nc('#nc_cart_confirm_header').append("<div><h2 style='padding: 0px;'>" + ncLang.DropHard + "</h2></div>");
    $nc('#nc_cart_confirm_footer').append("<button type='button' class='nc_admin_metro_button_cancel nc-btn nc--bordered nc--blue'>" + ncLang.Cancel + "</button>");
    $nc('#nc_cart_confirm_footer').append("<button type='button' class='nc_admin_metro_button nc-btn nc--red nc--bordered nc--right'>" + ncLang.Drop + "</button>");

    cart_confirm.modal({
        closeHTML: "",
        containerId: 'cart_confirm_simplemodal_container',
        onShow: function() {
            $nc('.simplemodal-wrap').css({
                backgroundColor: 'white'
            });
        },
        onClose: function() {
            $nc.modal.close();
            $nc('#nc_cart_confirm').remove();
        }
    });

    $nc('div#nc_cart_confirm_footer button.nc_admin_metro_button_cancel').click(function() {
        $nc.modal.close();
    });

    $nc('div#nc_cart_confirm_footer button.nc_admin_metro_button').click(function() {
        if (typeof callback === 'function') {
            callback();
            $nc.modal.close();
        }
    });
}

function prepare_message_form() {
    $nc(function() {
        $nc('#adminForm').wrapInner('<div class="nc_admin_form_main">');
        $nc('#adminForm').append($nc('#nc_seo_append').html());
        $nc('#adminForm').append('<input type="hidden" name="isNaked" value="1" />');
        $nc('#nc_seo_append').remove();
    });

    //var nc_admin_form_values = $nc('#adminForm').serialize();

    $nc('#nc_show_main').click(function() {
        $nc('.nc_admin_form_main').show();
        $nc('.nc_admin_form_seo').hide();
    });

    $nc('#nc_show_seo').click(function() {
        $nc('.nc_admin_form_main').hide();
        $nc('.nc_admin_form_seo').show();
    });

    $nc('#nc_object_slider_menu li').click(function() {
        $nc('#nc_object_slider_menu li').removeClass('button_on');
        $nc(this).addClass('button_on');
    });

    $nc('.nc_admin_metro_button_cancel').click(function() {
        $nc.modal.close();
    });

    $nc('.nc_admin_metro_button').click(function() {
        if ($nc(this).hasClass('nc--loading')) {
            return;
        }
        nc.process_start('nc_form()', this);
        $nc('#adminForm').submit();
    });
    InitTransliterate();
}

function nc_typo_field(field) {
    var string;
    if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances && typeof(CKEDITOR.instances[field]) !== 'undefined') {
        string = CKEDITOR.instances[field].getData();
        string = Typographus_Lite.process(string);
        CKEDITOR.instances[field].setData(string);
    } else if (typeof FCKeditorAPI !== 'undefined' && FCKeditorAPI.Instances && typeof(FCKeditorAPI.Instances[field]) !== 'undefined') {
        var editor = FCKeditorAPI.GetInstance(field);
        string = editor.GetHTML();
        string = Typographus_Lite.process(string);
        editor.SetHTML(string);
    } else {
        var $textarea = $nc('TEXTAREA[name=' + field + ']');
        string = $textarea.val();
        string = Typographus_Lite.process(string);
        $textarea.val(string);
    }
}

function nc_infoblock_controller_request(el, action, params) {
    return $nc.post(
        NETCAT_PATH + 'action.php',
        $nc.extend(
            {
                ctrl: 'admin.infoblock',
                action: action,
                infoblock_id: $nc(el).closest('.nc-infoblock-toolbar').data('infoblockId')
            },
            params
        )
    );
}

function nc_infoblock_toggle(el) {
    nc_infoblock_controller_request(el, 'toggle')
        .success(function(response) {
            if (response === 'OK') {
                $nc(el).closest('.nc-infoblock-toolbar').toggleClass('nc--disabled');
            } else {
                // todo: request: process errors
                alert(response);
            }
        });

    return false;
}

function nc_infoblock_place_before(el, other_infoblock_id) {
    return nc_infoblock_change_order(el, 'before', other_infoblock_id);
}

function nc_infoblock_place_after(el, other_infoblock_id) {
    return nc_infoblock_change_order(el, 'after', other_infoblock_id);
}

function nc_infoblock_change_order(el, position, other_infoblock_id) {
    nc_infoblock_controller_request(el, 'change_order', {
        position: position,
        other_infoblock_id: other_infoblock_id
    })
        .success(function(response) {
            if (response === 'OK') {
                window.location.hash = el.href.split('#')[1];
                window.location.reload(true);
            } else {
                // todo: request: process errors
                alert(response);
            }
        });

    return false;
}

function nc_infoblock_set_template(subdivision_id,infoblock_id, template_id) {
    nc_infoblock_controller_request(null, 'set_component_template', {
        subdivision_id: subdivision_id,
        infoblock_id: infoblock_id,
        template_id: template_id
    }).success(function(response) {
        nc_update_admin_mode_content(response, '', infoblock_id);
    });
    return false;
}

function nc_infoblock_get_main_axis(button_element) {
    return $nc(button_element).closest('.nc-infoblock-insert').is('.nc--vertical.nc-infoblock-insert-transverse')
        ? 'vertical'
        : 'horizontal';
}

function nc_infoblock_show_add_dialog(button) {
    nc.load_dialog(button.href + '&main_axis=' + nc_infoblock_get_main_axis(button));
    return false;
}

function nc_infoblock_buffer_get_id() {
    return $nc.cookie('nc_admin_buffer_infoblock_id');
}

function nc_infoblock_buffer_get_mode() {
    return $nc.cookie('nc_admin_buffer_infoblock_mode');
}

function nc_infoblock_buffer_update_page() {
    var infoblock_id = nc_infoblock_buffer_get_id();
    $nc('body').toggleClass('nc-page-buffer-has-infoblock', !!infoblock_id);
    $nc('.nc--in-buffer').removeClass('nc--in-buffer nc--in-buffer-cut nc--in-buffer-copy');
    if (infoblock_id) {
        $nc('.tpl-block-' + infoblock_id + ', .tpl-container-' + infoblock_id)
            .addClass('nc--in-buffer nc--in-buffer-' + nc_infoblock_buffer_get_mode());
    }
}

$nc(nc_infoblock_buffer_update_page);
$nc(window).on('focus', nc_infoblock_buffer_update_page);


function nc_infoblock_buffer_add(infoblock_id, cut) {
    $nc.cookie('nc_admin_buffer_infoblock_id', infoblock_id);
    $nc.cookie('nc_admin_buffer_infoblock_mode', cut ? 'cut' : 'copy');
    nc_infoblock_buffer_update_page();
}

function nc_infoblock_buffer_paste(paste_button) {
    var infoblock_id = nc_infoblock_buffer_get_id(),
        mode = nc_infoblock_buffer_get_mode(),
        controller_link = paste_button.href;
    if (!infoblock_id) {
        return false;
    }

    $nc.ajax({
        method: 'POST',
        url: NETCAT_PATH + 'action.php',
        data: controller_link.substr(controller_link.indexOf('?') + 1) +
                '&paste_mode=' + mode +
                '&pasted_infoblock_id=' + infoblock_id +
                '&main_axis=' + nc_infoblock_get_main_axis(paste_button),
        success: function(response) {
            $nc.cookie('nc_admin_buffer_infoblock_id', '');
            $nc.cookie('nc_admin_buffer_infoblock_mode', '');
            nc_infoblock_buffer_update_page();
            if (response === 'OK') {
                location.reload();
            } else if (response) {
                // todo: request: process errors
                alert(response);
            }
        }
    });
    return false;
}

function nc_init_toolbar_dropdowns() {
    // dropdown inside nc-toolbar: open on click, close on mouseleave or click inside the dropdown
    var event_ns = '.nc_toolbar_dropdown',
        toolbar_class = '.nc6-toolbar',
        close_timeout_id,
        clear_close_timeout = function() {
            clearTimeout(close_timeout_id);
        };

    $nc('body').on('click' + event_ns, toolbar_class + ' .nc--dropdown', function(e) {
        e.preventDefault();
        var el = $nc(this),
            close = function() {
                el.removeClass('nc--clicked');
                clear_close_timeout();
            };

        if (el.hasClass('nc--clicked')) {
            close();
        } else {
            $nc('.nc--clicked').removeClass('nc--clicked');
            clearTimeout(close_timeout_id);

            el.addClass('nc--clicked')
                .off(event_ns)
                .on('mouseenter' + event_ns, clear_close_timeout)
                .on('mouseleave' + event_ns, function() {
                    close_timeout_id = setTimeout(close, 1000);
                });

            // проверяем, чтобы выпадающее меню не попадало за пределы экрана по горизонтали
            var body_width = $nc('body').outerWidth(true),
                dropdown = el.children('ul').css('transform', ''),
                dropdown_left = dropdown.offset().left,
                overflow = body_width - dropdown_left - dropdown.outerWidth();
            if (dropdown_left < 0) {
                dropdown.css('transform', 'translateX(' + Math.ceil(-dropdown_left + 5) + 'px)');
            } else if (overflow < 0) {
                dropdown.css('transform', 'translateX(' + Math.ceil(overflow) + 'px)');
            }

            // проверяем, чтобы второй уровень не попадал за пределы экрана
            el.find('li.nc--dropdown')
                .off(event_ns)
                .on('mouseenter' + event_ns, function() {
                    var dropdown = $nc(this).find('ul').removeClass('nc--on-left');
                    if ($nc(window).width() < (dropdown.offset().left + dropdown.outerWidth())) {
                        dropdown.addClass('nc--on-left');
                    }
                });
        }
    });
}

$nc(nc_init_toolbar_dropdowns);

/**
 *
 */
function nc_editable_image_init(c) {
    c = $nc(c);
    c.find('input[type=file]').change(nc_editable_image_upload);
    c.find('.nc-editable-image-remove').click(nc_editable_image_remove);
    c.parents('a').prop('href', '#____'); // не получилось остановить переход по ссылке в FF
    c.find('form').mouseover(function() {
        c.addClass('nc--hover');
    });
    c.mouseleave(function() {
        c.removeClass('nc--hover');
    });
}

/**
 * Удаление изображения при in-place редактировании
 */
function nc_editable_image_remove(event) {
    event.stopPropagation();
    var c = $nc(event.target).closest('.nc-editable-image-container').addClass('nc--empty'),
        form = c.find('form');
    c.find('img:not(.icon)').prop('src', nc_edit_no_image);
    form.find('input[name^=f_KILL]').val(1);
    nc.process_start('nc_editable_image_remove');

    function done() {
        nc.process_stop('nc_editable_image_remove');
    }

    form.ajaxSubmit({success: done, error: done});
}

/**
 * Замена изображения при in-place редактировании
 */
function nc_editable_image_upload(event) {
    var input = $nc(event.target),
        form = input.closest('form'),
        image = form.find('img'),
        image_source = image.data('source'),
        cc = form.find('input[name=cc]').val();

    image.css('opacity', 0.2);
    form.closest('.nc-editable-image-container').removeClass('nc--empty');
    nc.process_start('nc_editable_image_upload');

    function preload_image(src, callback) {
        if (src) {
            var image_loader = $nc('<img/>', {src: src})
                .css({
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: -5000
                })
                .appendTo('body')
                .on('load error', function () {
                    image_loader.remove();
                    callback();
                });
        } else {
            callback();
        }
    }

    function done() {
        $nc.ajax({
            'type': 'GET',
            'url': nc_page_url() + '&isNaked=1&admin_modal=1&cc_only=' + cc,
            success: function(response) {
                // preload image to prevent visible height jerk
                response = $nc(response);
                var new_image = response.find('img[data-source="' + image_source + '"]').attr('src');
                preload_image(new_image, function() {
                    nc_update_admin_mode_content(response, null, cc);
                    nc.process_stop('nc_editable_image_upload');
                });
            }
        });
    }

    if (input.is(':file')) {
        form.ajaxSubmit({success: done, error: done});
    } else {
        done();
    }

    return false;
}


/**
 * Определение направления блоков в контейнере и вида тулбара
 */
$nc(function() {
    // инициализация только в режиме редактирования
    if (!$nc('#nc_page').length) {
        return;
    }

    var body = $nc('body');
    var overlay = $nc(
        '<div class="nc-page-overlay">' +
            '<div class="nc-page-overlay-top"></div>' +
            '<div class="nc-page-overlay-left"></div>' +
            '<div class="nc-page-overlay-right"></div>' +
            '<div class="nc-page-overlay-bottom"></div>' +
        '</div>'
    ).appendTo(body);

    // Расстояние между тулбарами после их автоматического смещения в случае наложения друг на друга
    var toolbar_spacing = 4;

    // Высота, меньше которой тулбары инфоблока и объекта будет выводиться в строку
    // Если высота меньше, будет добавлен класс nc--is-short, иначе — nc--is-tall
    var undersized_height = 60;
    // Ширина блока, меньше которой кнопки добавления блоков не будут раздвигаться
    // Если ширина меньше, будет добавлен класс nc--is-narrow, иначе — nc--is-wide
    // (название класса nc--wide тут использовать нельзя, т.к. этот модификатор устанавливает width: 100%)
    var undersized_width = 60;

    // Установка класса nc--scroll-top у body для того, чтобы первые тулбары были над навбаром
    var scroll_at_top_threshold = 3,
        is_window_scroll_at_top;
    function set_scroll_top_class() {
        if (window.scrollY < scroll_at_top_threshold) {
            body.addClass('nc--scroll-at-top');
            is_window_scroll_at_top = true;
        } else if (is_window_scroll_at_top) {
            body.removeClass('nc--scroll-at-top');
            is_window_scroll_at_top = false;
        }
    }
    set_scroll_top_class();
    $nc(window).on('scroll', set_scroll_top_class);


    function has_row_flex(container) {
        return container.css('display') === 'flex' && container.css('flex-direction') === 'row';
    }

    function are_children_inline(container) {
        var inline = false;
        container.children().each(function() {
            if (/inline|table-cell/.test($nc(this).css('display'))) {
                inline = true;
                return false;
            }
        });
        return inline;
    }

    var stacking_context_properties = ['transform', 'filter', 'perspective'];
    function has_stacking_context(element) {
        var position = element.css('position'),
            has_own_stacking_context =
                /^fixed|sticky|absolute$/.test(position) ||
                element.css('opacity') < 1;
        if (!has_own_stacking_context) {
            for (var i = 0; i < stacking_context_properties.length; i++) {
                if (element.css(stacking_context_properties[i]) !== 'none') {
                    has_own_stacking_context = true;
                    break;
                }
            }
        }
        // ↑ тут проверяются не все свойства; может понадобиться добавить другие проверки для будущих миксинов
        // (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
        return has_own_stacking_context;
    }

    function translate(element, x, y) {
        element.css('transform', 'translate(' +
            (x ? x + 'px' : 0) + ', ' +
            (y ? y + 'px' : 0) + ')'
        )
        //.data({ translateX: x || 0, translateY: y || 0 });
    }

    function shift_to_avoid_collision(axis, stationary_toolbar, moved_toolbar, move_after_even_when_not_colliding) {
        translate(moved_toolbar, 0, 0);

        var d1_offset = stationary_toolbar.offset();
        if (!d1_offset) {
            return false;
        }
        var d1_height = stationary_toolbar.outerHeight(false);
        var d1_width = stationary_toolbar.outerWidth(false);
        var d1_distance_from_top = d1_offset.top + d1_height;
        var d1_distance_from_left = d1_offset.left + d1_width;

        var d2_offset = moved_toolbar.offset();
        if (!d2_offset) {
            return false;
        }
        var d2_height = moved_toolbar.outerHeight(false);
        var d2_width = moved_toolbar.outerWidth(false);
        var d2_distance_from_top = d2_offset.top + d2_height;
        var d2_distance_from_left = d2_offset.left + d2_width;

        if (move_after_even_when_not_colliding) {
            d1_offset[axis === 'x' ? 'left' : 'top'] = 0;
        }

        var not_colliding = (d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left);

        if (!not_colliding) {
            var x, y;

            if (axis === 'x') {
                x = Math.ceil(d1_distance_from_left - d2_offset.left) + toolbar_spacing;
            } else if (axis === 'y') {
                y = Math.ceil(d1_distance_from_top - d2_offset.top) + toolbar_spacing;
            } else {
                throw "Wrong axis";
            }

            translate(moved_toolbar, x, y);

            return true;
        }

        return false;
    }

    function update_container_toolbar_size(container, toolbar) {
        toolbar.removeClass('nc--compact');
        var toolbar_overflown = toolbar.width() > container.width() / 2;
        toolbar.toggleClass('nc--compact', toolbar_overflown);
    }

    function update_toolbar_size(container, toolbar, max_width_ratio) {
        toolbar.removeClass('nc--compact');
        //                                                    дополнительный пиксель — рамка блока ↓
        var container_unavailable_width = max_width_ratio ? container.width() / max_width_ratio : -1,
            toolbar_overflown =
                    toolbar.length > 0 &&
                    toolbar.offset().left < container.offset().left + container_unavailable_width;
        toolbar.toggleClass('nc--compact', toolbar_overflown);
    }

    function get_container_toolbar(container) {
        return $nc(container).children('.nc-infoblock-toolbar');  // sic: children, CSS class
    }

    function distribute_container_toolbars(container) {
        var all_parent_containers = container.parents('.nc-container').get().reverse();
        if (all_parent_containers.length) {
            all_parent_containers.push(container);
            var outer = all_parent_containers.shift(),
                inner;
            while (inner = all_parent_containers.shift()) {
                shift_to_avoid_collision('x', get_container_toolbar(outer), get_container_toolbar(inner), true);
                outer = inner;
            }
        }
    }

    function adjust_insert_toolbar_margins(container, insert_toolbars) {
        var top = parseFloat(container.css('margin-top')),
            right = parseFloat(container.css('margin-right')),
            bottom = parseFloat(container.css('margin-bottom')),
            left = parseFloat(container.css('margin-left'));

        insert_toolbars.css({
            'margin-top': (-1 * top) + 'px',
            'margin-right': (-1 * right) + 'px',
            'margin-bottom': (-1 * bottom) + 'px',
            'margin-left': (-1 * left) + 'px',
        });

        insert_toolbars.each(function() {
            var insert_toolbar = $nc(this);
            if (insert_toolbar.is('.nc--vertical')) {
                insert_toolbar.css('height', 'calc(100% + ' + (top + bottom) + 'px)');
            } else {
                insert_toolbar.css('width', 'calc(100% + ' + (left + right) + 'px)');
            }
        });
    }

    function show_inside(toolbar) {
        toolbar.filter(':not(.nc--outside)').addClass('nc--half nc--inside');
    }

    function show_outside(toolbar) {
        toolbar.filter(':not(.nc--inside)').addClass('nc--half nc--outside');
    }

    function adjust_blocks_insert_toolbars(blocks, is_vertical) {
        blocks.each(function(i) {
            var block = $nc(this),
                insert_toolbars = block.children('.nc-infoblock-insert:not(.nc-infoblock-insert-first)');

            // направление кнопок добавления
            insert_toolbars.each(function() {
                var toolbar = $nc(this);
                if (toolbar.is('.nc-infoblock-insert-transverse')) {
                    toolbar.toggleClass('nc--vertical', !is_vertical)
                           .toggleClass('nc--horizontal', is_vertical);
                    show_inside(toolbar);
                } else {
                    toolbar.toggleClass('nc--vertical', is_vertical)
                           .toggleClass('nc--horizontal', !is_vertical);
                }
            });

            adjust_insert_toolbar_margins(block, insert_toolbars);

            // кнопка добавления до первого блока — уменьшенная кнопка внутри контейнера
            if (i === 0) {
                show_inside(insert_toolbars.filter('.nc-infoblock-insert-between.nc-infoblock-insert-before'));
            }
            // кнопка добавления после последнего блока — уменьшенная кнопка внутри контейнера
            if (i === blocks.length - 1) {
                show_inside(insert_toolbars.filter('.nc-infoblock-insert-between.nc-infoblock-insert-after'));
            }
        });
    }

    // Блок, над которым мышь, считается блоком «в фокусе».
    // Когда мышь уходит из блока, блок остаётся «в фокусе» в течение 1 с.
    var focused = null,
        next_to_focus = null;
    function add_hover_class(element) {
        clearTimeout(element.data('mouseleaveTimer'));
        element
            .removeClass('nc--hover-timeout')
            .addClass('nc--hover')
            .one('mouseleave', remove_hover_class_after_delay);
        if (!focused || !focused.is('.nc--hover')) {
            element.addClass('nc--focus');
            focused = element;
        } else {
            next_to_focus = element;
        }
    }

    function remove_hover_class_after_delay() {
        var element = $nc(this).addClass('nc--hover-timeout');
        element.data('mouseleaveTimer', setTimeout(function() {
            element
                .removeClass('nc--hover nc--hover-timeout nc--focus')
                .parents('.nc-infoblock, .nc-container').removeClass('nc--focus');
            if (next_to_focus) {
                if (next_to_focus.is('.nc--hover')) {
                    next_to_focus
                        .addClass('nc--focus')
                        .parents('.nc-infoblock, .nc-container').addClass('nc--focus');
                    focused = next_to_focus;
                } else {
                    focused = null;
                }
                next_to_focus = null;
            } else {
                focused = null;
            }
        }, 1000));
    }

    // Наведение мыши на контейнер
    $nc(document).on('mouseenter', '.nc-container', function(event) {
        // направление блоков в контейнере
        var container = $nc(this),
            container_toolbar = get_container_toolbar(container),
            is_short = container.outerHeight() < undersized_height,
            is_narrow = container.outerWidth() < undersized_width;

        add_hover_class(container);

        container.toggleClass('nc--is-short', is_short).toggleClass('nc--is-tall', !is_short)
                 .toggleClass('nc--is-narrow', is_narrow).toggleClass('nc--is-wide', !is_narrow);

        // кнопка добавления до и после блока — уменьшенная кнопка вне контейнера
        if (!container.is('.nc--empty')) {
            show_outside(container.children('.nc-infoblock-insert-between'));
        }

        // вид тулбара — полный или компактный
        update_container_toolbar_size(container, container_toolbar);

        // наложение тулбаров вложенных друг в друга контейнеров? сдвигаем вправо
        if (!container.find('.nc-container').length) {
            // Выполняем распределение тулбаров только когда событие сработало для контейнера с наибольшей вложенностью
            // (событие mouseenter сработает для всех контейнеров начиная снизу [bubbling], это нужно для определения
            // должен ли быть тулбар компактным, поэтому остановить propagation нельзя)
            distribute_container_toolbars(container);
        }

        // вид кнопок добавления у блоков в контейнере
        var list_div = container.children('.tpl-block-list').children('.tpl-block-list-objects'),
            list_is_vertical = has_row_flex(list_div) || are_children_inline(list_div),
            list_div_blocks = list_div.children('.nc-infoblock, .nc-container');
        adjust_blocks_insert_toolbars(list_div_blocks, list_is_vertical);
    });

    // Наведение мыши на инфоблок
    $nc(document).on('mouseenter', '.nc-infoblock', function() {
        var infoblock = $nc(this),
            infoblock_toolbar = infoblock.find('.nc-infoblock-toolbar'),
            is_short = infoblock.outerHeight() < undersized_height,
            is_narrow = infoblock.outerWidth() < undersized_width;

        add_hover_class(infoblock);

        infoblock.toggleClass('nc--is-short', is_short).toggleClass('nc--is-tall', !is_short)
                 .toggleClass('nc--is-narrow', is_narrow).toggleClass('nc--is-wide', !is_narrow);

        // вид тулбара — полный или компактный
        if (is_short) {
            // в зависимости от высоты блока
            infoblock_toolbar.addClass('nc--compact');
        } else {
            // в зависимости от [половины] ширины блока
            update_toolbar_size(infoblock, infoblock_toolbar, 2);
        }
    });

    // Наведение мыши на объект
    $nc(document).on('mouseenter', '.nc-infoblock-object', function() {
        var object = $nc(this);
        add_hover_class(object);
        // Нужно, чтобы этот обработчик сработал после mouseenter в .nc-infoblock,
        // что бывает не всегда; поэтому откладываем выполнение действий
        setTimeout(function() {
            var object_toolbar = object.find('.nc-object-toolbar'),
                infoblock = object.closest('.nc-infoblock'),
                infoblock_toolbar = infoblock.find('.nc-infoblock-toolbar'),
                is_short = infoblock.is('.nc--is-short');

            // наложение тулбара объекта на тулбар инфоблока? сдвигаем вниз
            shift_to_avoid_collision('y', infoblock_toolbar, object_toolbar);

            // вид тулбара — полный или компактный
            if (is_short) {
                object_toolbar
                    .removeClass('nc--compact')
                    .toggleClass('nc--compact', object_toolbar.width() > infoblock.width() / 2);
            } else {
                update_toolbar_size(object, object_toolbar);
            }
        }, 1);
    });

    var navbar_height = $nc('.nc-navbar.nc--fixed').outerHeight();
    // Подсветка блока при наведении мыши на тулбар
    $nc(document).on('mouseenter', '.nc-infoblock-toolbar, .nc-object-toolbar, .nc-infoblock-insert-buttons', function() {
        var toolbar = $nc(this),
            highlighted_parent = toolbar.closest('.nc-infoblock-object, .nc-infoblock, .nc-container, .nc-infoblock-insert'),
            grid_columns = '0 0 1fr', // старый IE не знает 'auto', поэтому 'fr'
            grid_rows = grid_columns,
            all_parents = toolbar.parents(),
            parent_list_containers = all_parents.filter('.nc-infoblock, .nc-container'),
            no_overlay = false;

        if (!highlighted_parent) {
            return;
        }

        // для блоков с собственным stacking context оверлей показан не будет
        // (так как перекроет выпадающие меню и т. п.)
        all_parents.each(function() {
            if (has_stacking_context($nc(this))) {
                no_overlay = true;
                return false;
            }
        });

        if (no_overlay) {
            return;
        }

        if (!highlighted_parent.is('.nc-infoblock-insert')) {
            var offset = highlighted_parent.offset();
            grid_columns = Math.ceil(offset.left) + 'px ' + Math.floor(highlighted_parent.outerWidth()) + 'px 1fr';
            grid_rows    = Math.ceil(offset.top - navbar_height + 1)  + 'px ' + Math.floor(highlighted_parent.outerHeight()) + 'px 1fr';
        }

        overlay.css({
            'grid-template-columns': grid_columns,
            'grid-template-rows': grid_rows,
            '-ms-grid-columns': grid_columns,
            '-ms-grid-rows': grid_rows
        }).addClass('nc--active');

        parent_list_containers.addClass('nc--hover-on-toolbar');

        toolbar.one('mouseleave', function() {
            overlay.removeClass('nc--active');
            parent_list_containers.removeClass('nc--hover-on-toolbar');
        });
    });

    show_outside($nc('.nc-infoblock-insert-between:not(.nc-infoblock-insert-first)').filter(':first, :last'));

    setTimeout(function() {
        next_to_focus = null; // при загрузке страницы срабатывает mouseenter (?!)
    }, 100);
});

/* $Id: lib.js 8189 2012-10-11 15:43:20Z vadim $ */

// EVENT BINDING *****************************************************************
var _eventRegistry = [];
var _lastEventId = 0;
/**
 * Добавление обработчика события к объекту
 * @param {Object} object
 * @param {String} eventName без 'on'
 * @param {Object} eventHandler
 * @param {Boolean} НЕ использовать конструкцию eventHandler.apply(object) в IE
 *  использование apply позволяет в IE обращаться к object в eventHandler как
 *  к this (т.е. как в Mozilla)
 * @return {Number} eventId
 */
function bindEvent(object, eventName, eventHandler, dontAddApplyInExplorer) {

    var fn = eventHandler;
    if (object.addEventListener) {
        object.addEventListener(eventName, fn, false);
    }
    else if (object.attachEvent) {
        if (!dontAddApplyInExplorer) fn = function() {
            eventHandler.apply(object);
        }
        object.attachEvent("on" + eventName, fn);
    }
    // добавлен "event": чтобы не "съезжали" id при удалении события из реестра
    var eventId = "event" + _lastEventId++;
    _eventRegistry[eventId] = {
        object: object,
        eventName: eventName,
        eventHandler: fn
    };
    return eventId;
}

/**
 * Удаление обработчика события eventId, добавленного через bindEvent()
 * @param {Object} eventId
 * @return {Boolean}
 */
function unbindEvent(eventId) {

    if (!_eventRegistry[eventId] || typeof _eventRegistry[eventId] != 'object') return false;

    var object = _eventRegistry[eventId].object;
    var eventName = _eventRegistry[eventId].eventName;
    var eventHandler = _eventRegistry[eventId].eventHandler;

    if (object.removeEventListener) {
        object.removeEventListener(eventName, eventHandler, false);
    }
    else if (object.detachEvent) {
        object.detachEvent("on" + eventName, eventHandler);
    }

    _eventRegistry.splice(eventId, 1);

    return true;
}

/**
  * отвязка всех событий
  */
function unbindAllEvents() {
    for (var i in _eventRegistry) {
        try {
            unbindEvent(i);
        } catch(e) {}
    }
}

// remove all events on page unload to prevent memory leaks
bindEvent(window, 'unload', unbindAllEvents);


/**
 * Позиция объекта относительно BODY или объекта с id=STOPID
 * @param {Object} object
 * @param {String} stopObjectId
 * @param {Boolean} addFrameOffset

 * @return {Object} {left: x, top: y}
 */
function getOffset(object, stopObjectId, addFrameOffset) {

    var pos = {
        top: 0,
        left: 0
    };

    // weak chain
    if (addFrameOffset) {
        if (object.ownerDocument.defaultView) {
            pos.top  = object.ownerDocument.defaultView.frameOffset.top -
            object.ownerDocument.body.scrollTop;
            pos.left = object.ownerDocument.defaultView.frameOffset.left -
            object.ownerDocument.body.scrollLeft;
        }
        else {
            pos.top = object.ownerDocument.parentWindow.frameOffset.top -
            object.ownerDocument.body.scrollTop;
            pos.left = object.ownerDocument.parentWindow.frameOffset.left -
            object.ownerDocument.body.scrollLeft;
        }
    }

    var isIE = (document.all ? true : false); // weak chain

    /*
  if (isIE) {
    // баг IE? если высота объекта не задана и он находится внутри
    // iframe, то offset - значение относительно BODY!
    if (ieOffsetBugX) { pos.left += object.offsetLeft; }
    if (ieOffsetBugY) { pos.top  += object.offsetTop; }
    if (ieOffsetBugX && ieOffsetBugY) { return pos; }
  }
*/
    //var str = "";
    while (object && object.tagName!="BODY") {
        if (!isIE || (isIE && object.id != "siteTreeContainer")) {
            pos.left += object.offsetLeft;
        }
        pos.top += object.offsetTop;

        object = object.offsetParent;
        if (stopObjectId && object.id == stopObjectId) break;
    }
    //alert(str);
    return pos;
}


/**
 * Create element
 * @param {String} tagName
 * @param {Object} attributes hash [optional]
 * @param {Object} oParent [optional]
 */
function createElement(tagName, attributes, oParent) {
    var obj = document.createElement(tagName);
    for (var i in attributes) {
        if (i.indexOf('.')) { // e.g. 'style.display'
            eval('obj.'+i+'=attributes[i]');
        } else {
            obj[i] = attributes[i];
        }
    }
    if (oParent) {
        oParent.appendChild(obj);
    }
    return obj;
}

// FADE OUT FUNCTIONS
var fadeIntervals = [];

/**
  * FADE OUT
  * @param {String} ID объекта
  */
function fadeOut(id)
{
    var dst = document.getElementById(id);

    if (dst.filters)
    {
        dst.style.filter="blendTrans(duration=1)";

        if (dst.filters.blendTrans.status != 2)
        {
            dst.filters.blendTrans.apply();
            dst.style.visibility="hidden";
            dst.filters.blendTrans.play();
        }
        return;
    }

    if (dst.style.opacity == 0)
    {
        clearInterval(fadeIntervals[id]);
        fadeIntervals[id] = null;
        dst.style.visibility='hidden';
        dst.style.opacity = 1;
        return;
    }

    dst.style.opacity = (Number(dst.style.opacity) - 0.05);

    // setup interval
    if (!fadeIntervals[id]) fadeIntervals[id] = setInterval("fadeOut('"+id+"')",40);
}



// returns all object property values as a STRING
function dump(object, regexpFilter) {
    var str = '';
    for (i in object) {
        if (!regexpFilter || i.match(regexpFilter)) {
            str += i+' = ' + object[i]+"<br>\n";
        }
    }
    return str;
}


function nc_dump (x,  l) {
    l = l || 0;
    var i, r = '', t = typeof x, tab = '';

    if (x === null) {
        r += "(null)\n";
    }
    else if (t == 'object') {
        l++;
        for (i = 0; i < l; i++) tab += ' ';

        if (x && x.length) t = 'array';

        r += '(' + t + ") :\n";

        for (i in x) {
            try {
                r += tab + '[' + i + '] : ' + nc_dump(x[i], (l + 1));
            } catch(e) {
                return "[error: " + e + "]\n";
            }
        }
    }
    else {
        if (t == 'string') {
            if (x == '') {
                x = '(empty)';
            }
        }

        r += '(' + t + ') ' + x + "\n";

    }

    return r;
}

/* для задания соответсвия полей пользователя */
nc_mapping_fields = function ( fields1, fields2, parent_div, name, data_from ) {
    this.nums = 0; // количеcтво соответсвий
    this.fields1 = fields1;
    this.fields2 = fields2;
    this.parent_div = parent_div || 'field_div';
    this.name = name;
    this.data_from = data_from;

}
nc_mapping_fields.prototype = {
    add: function ( val1, val2 ) {
        this.nums++;
        var con_id = this.parent_div+"_con_"+this.nums;

        if ( this.nums == 1 ) {
            $nc('#' + this.parent_div).append("<div id='"+con_id+"title'></div>");
            $nc('#' + con_id + 'title').append("<div  class='mf_fl1'>"+ncLang.FieldFromUser+":</div>");
            $nc('#' + con_id+ 'title').append("<div class='s_img s_img_darrow mf_arrow' style='visibility: hidden; height: 0px;'></div>");
            $nc('#' + con_id+ 'title').append("<div  class='mf_fl2'>"+this.data_from+":</div>");
            $nc('#' + con_id+ 'title').append("<div id='"+this.parent_div+"clear_"+this.nums+"' style='clear:both'></div>");
        }

        $nc('#' + this.parent_div).append("<div id='"+con_id+"'></div>");

        $nc('#' + con_id).append("<div id='"+this.parent_div+"_field1_"+this.nums+"' class='mf_fl1'></div>");
        $nc('#' + con_id).append("<div class='s_img s_img_darrow mf_arrow'></div>");
        $nc('#' + con_id).append("<div id='"+this.parent_div+"_field2_"+this.nums+"' class='mf_fl2'></div>");
        $nc('#' + con_id).append("<div id='"+this.parent_div+"_drop_"+this.nums+"' class='mf_drop' onclick='"+this.name+".drop("+this.nums+")'><div class='icons icon_delete' title='"+ncLang.Drop+"' style='margin-top:-3px'></div> "+ncLang.Drop+"</div>");
        $nc('#' + con_id).append("<div id='"+this.parent_div+"_clear_"+this.nums+"' style='clear:both'></div>");

        $nc("#"+this.parent_div+"_field1_"+this.nums).html("<select id='"+this.parent_div+"_field1_value_"+this.nums+"' name='"+this.parent_div+"_field1_value_"+this.nums+"'></select>");
        $nc("#"+this.parent_div+"_field2_"+this.nums).html("<select id='"+this.parent_div+"_field2_value_"+this.nums+"' name='"+this.parent_div+"_field2_value_"+this.nums+"'></select>");

        for (i in this.fields1) {
            $nc("#"+this.parent_div+"_field1_value_"+this.nums).append("<option value='"+i+"'>" + this.fields1[i] + "</option>");
        }
        if ( val1 ) $nc("#"+this.parent_div+"_field1_value_"+this.nums+" [value='"+val1+"']").attr("selected", "selected");

        for (i in this.fields2) {
            $nc("#"+this.parent_div+"_field2_value_"+this.nums).append("<option value='"+i+"'>" + this.fields2[i] + "</option>");
        }
        if ( val2 ) $nc("#"+this.parent_div+"_field2_value_"+this.nums+" [value='"+val2+"']").attr("selected", "selected");
    },

    drop: function ( id ) {
        $nc("#"+this.parent_div+"_con_"+id).remove();
    }
}

nc_openidproviders = function () {
    this.nums = 0;
    this.div_id = 'openid_providers';
}
nc_oauthproviders = function () {
    this.nums = 0;
    this.div_id = 'oauth_providers';
}
nc_openidproviders.prototype = {
    add: function ( name, url, imglink ) {
        this.nums++;
        if ( !imglink ) imglink = MODULE_AUTH_OPENID_ICON_PATH;
        if ( !name ) name ='';
        if ( !url ) url = '';
        var con_id = this.div_id+"_con_"+this.nums;
        $nc('#' + this.div_id).append("<div id='"+con_id+"'></div>");

        $nc('#' + con_id).append("<div class='img'><img id='openid_providers_img_"+this.nums+"' src='"+imglink+"' alt='' /></div>");
        $nc('#' + con_id).append("<div class='name'><input name='openid_providers_name_"+this.nums+"' type='text' value='"+name+"' /></div>");
        $nc('#' + con_id).append("<div class='imglink'><input id='openid_providers_imglink_"+this.nums+"'  name='openid_providers_imglink_"+this.nums+"' type='text' value='"+imglink+"' /></div>");
        $nc('#' + con_id).append("<div class='url'><input name='openid_providers_url_"+this.nums+"' type='text' value='"+url+"' /></div>");
        $nc('#' + con_id).append("<div class='drop' onclick='op.drop("+this.nums+")'><i class='nc-icon nc--remove'></i> "+ncLang.Drop+"</div>");
        $nc('#' + con_id).append("<div style='clear:both;'></div>");

        $nc('#openid_providers_imglink_'+this.nums).change (
            function() {
                $nc('#' + $nc(this).attr('id').replace('imglink','img') ).attr('src', $nc(this).val());
            }
            );
    },

    drop: function ( id ) {
        $nc("#"+this.div_id+"_con_"+id).remove();
    }
}

nc_oauthproviders.prototype = {
    add: function (imglink, name, provider, appid, pubkey, seckey ) {
        this.nums++;
        if ( !imglink ) imglink = MODULE_AUTH_OAUTH_ICON_PATH;
        if ( !provider ) provider ='';
        if ( !name ) name ='';
        if ( !appid ) appid = '';
        if ( !seckey ) seckey = '';
        if ( !pubkey ) pubkey = '';

        var con_id = this.div_id+"_con_"+this.nums;
        $nc('#' + this.div_id).append("<div id='"+con_id+"'></div>");

        $nc('#' + con_id).append("<div class='img'><img id='oauth_providers_img_"+this.nums+"' src='"+imglink+"' alt='' /></div>");
        $nc('#' + con_id).append("<div class='name'><input name='oauth_providers_name_"+this.nums+"' type='text' value='"+name+"' /></div>");
        $nc('#' + con_id).append("<div class='provider'><input name='oauth_providers_provider_"+this.nums+"' type='text' value='"+provider+"' /></div>");
        $nc('#' + con_id).append("<div class='imglink'><input id='oauth_providers_imglink_"+this.nums+"'  name='oauth_providers_imglink_"+this.nums+"' type='text' value='"+imglink+"' /></div>");
        $nc('#' + con_id).append("<div class='appid'><input id='oauth_providers_appid_"+this.nums+"'  name='oauth_providers_appid_"+this.nums+"' type='text' value='"+appid+"' /></div>");
        $nc('#' + con_id).append("<div class='pubkey'><input id='oauth_providers_pubkey_"+this.nums+"'  name='oauth_providers_pubkey_"+this.nums+"' type='text' value='"+pubkey+"' /></div>");
        $nc('#' + con_id).append("<div class='seckey'><input id='oauth_providers_seckey_"+this.nums+"'  name='oauth_providers_seckey_"+this.nums+"' type='text' value='"+seckey+"' /></div>");
        $nc('#' + con_id).append("<div class='drop' onclick='oap.drop("+this.nums+")'><i class='nc-icon nc--remove'></i> "+ncLang.Drop+"</div>");
        $nc('#' + con_id).append("<div style='clear:both;'></div>");

        $nc('#oauth_providers_imglink_'+this.nums).change (
            function() {
                $nc('#' + $nc(this).attr('id').replace('imglink','img') ).attr('src', $nc(this).val());
            }
        );
    },

    drop: function ( id ) {
        $nc("#"+this.div_id+"_con_"+id).remove();
    }
}


/* создание/редактирование параметра визуальных настроек */
nc_customsettings = function (type, subtype, subtypes, hasdefault, can_have_initial_value) {
    this.subtypes = subtypes;
    this.subtype = subtype || '';
    this.type = type || '';
    this.hasdefault = hasdefault;
    this.can_have_initial_value = can_have_initial_value;
};

nc_customsettings.prototype = {

    changetype: function () {
        this.type = $nc("#type :selected").val();
        $nc('#cs_subtypes').html('');
        $nc('#cs_subtypes_caption').hide();
        var st = this.subtypes[this.type];
        // показать или скрыть "значние по умолчанию"
        if (this.hasdefault[this.type]) {
            $nc('#def').show();
        }
        else {
            $nc('#def').hide();
        }

        $nc('#initial_value').toggle(this.can_have_initial_value[this.type]);

        var k, s_v, s_n;
        if (st.length) {
            $nc('#cs_subtypes_caption').show();
            $nc('#cs_subtypes').html("<select style='width: 100%;' id='subtype' name='subtype' onchange='nc_cs.changesubtype()'></select>");
            for (var i = 0; i < st.length; i++) {
                for (k in st[i]) {
                    s_v = k;
                    s_n = st[i][k];
                }
                $nc('#subtype').append("<option value='" + s_v + "'>" + s_n + "</option>");
            }
            if (this.subtype) {
                $nc("#subtype [value='" + this.subtype + "']").attr("selected", "selected");
            }
            else {
                $nc("#subtype :first").attr("selected", "selected");
            }
        }

        this.show_extends();
        this.changesubtype();
    },

    changesubtype: function () {
        this.subtype = $nc("#subtype :selected").val();
        this.show_extends();
    },

    show_extends: function () {
        var t = this.type;
        if (this.subtype) {
            t += '_' + this.subtype;
        }
        $nc(".cs_extends").hide();
        $nc(".cs_extends :input").attr('disabled', true);
        $nc("#extend_" + t).show();
        $nc("#extend_" + t + " :input").removeAttr('disabled');
    }
};

// ---------------------------------------------------------------------------
// HTTP REQUEST
// ---------------------------------------------------------------------------
// Create XMLHttpRequest object

/**
 * This XMLHttpRequest is NOT ASYNCHRONOUS by default
 * @param {Boolean} isAsync
 */
function httpRequest(isAsync) {
    this.xhr = null;

    try {
        this.xhr = new XMLHttpRequest();
    } catch(e) { // Mozilla, IE7
        try {
            this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }

this.isAsync = isAsync ? true : false;
this.statusHandlers = {};
}

// ----------------------------------------------------------------------------
/**
 * Make request
 * @param {String} method GET|POST
 * @param {String} url
 * @param {Object|String} urlParams { hash }
 * @param {Object} statusHandlers  e.g. { '200': 'alert(200)'. '403': 'alert("NO RIGHTS") }
 *    { '*': 'alert("Обработчик всех ответов - с любым статусом")' }
 * @return {String} status ('200', '404' etc) -- only if isAsync==false
 */
httpRequest.prototype.request = function(method, url, urlParams, statusHandlers) {
    this.statusHandlers = statusHandlers;
    if (method!='POST') method = 'GET';

    var encParams = (typeof urlParams == 'string') ? urlParams : urlEncodeArray(urlParams);

    if (encParams && method=='GET') {
        url += (url.match(/\?/) ?  "&" : "?") + encParams;
    }

    this.xhr.open(method, url, this.isAsync);
    if (method=='POST') {
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded, charset=utf-8");
    }
    this.xhr.send(encParams);

    if (this.isAsync) {
        var oXhr = this;
        this.xhr.onreadystatechange = function() {
            oXhr.trackStatus();
        };
    }
    else {
        this.trackStatus();
        return this.xhr.status;
    }
}

httpRequest.prototype.trackStatus = function() {

    try {
        if (!this.statusHandlers) return;

        var handler = this.statusHandlers[this.xhr.status];

        // DEFAULT STATUS HANDLER (fires on all status codes)
        if (!handler && this.statusHandlers['*']) {
            handler = this.statusHandlers['*'];
        }

        if (handler) {
            try {
                eval(handler);
            }
            catch(e) {
                alert('Failed ['+this.xhr.status+']: '+handler);
            }
        }
    } catch (outerException) {}
}

// getJson requests are always synchronous
httpRequest.prototype.getJson = function(url, urlParams, statusHandlers) {
    var isAsync = this.isAsync;
    this.isAsync = false;
    this.request('GET', url, urlParams, statusHandlers);
    this.isAsync = isAsync;

    if (this.xhr.status!='200' || !this.xhr.responseText.length) {
        return null;
    }
    try {
        return eval(this.xhr.responseText.replace("while(1);", ""));
    }
    catch (e) {
        return null;
    }
}

httpRequest.prototype.getResponseText = function() {
    return this.xhr.responseText;
}

// ----------------------------------------------------------------------------
// string to use with POST requests (recursive!)
function urlEncodeArray(data, parent)
{
    if (data==null) return '';

    if (!parent) parent = "";
    var query = [];

    if (data instanceof Object) {
        for (var k in data) {
            var key = parent ? parent+"["+k+"]" : k;

            query.push( data[k] instanceof Object
                ? urlEncodeArray(data[k], key)
                : encodeURIComponent(key) + "=" + encodeURIComponent(data[k]));
        }
        return query.join('&');
    }
    else {
        return encodeURIComponent(data);
    }
}

// Скроллер: прокручивает экран при приближении курсора мыши к краю экрана
var scroller = {
    scrollInterval: null, // для хранения ID интервала (setInterval)
    scrollDelay: 15,
    scrollAmount: 5,
    scrollAreaHeight: 60,
    scrollBottomK: 150, // ??? неправильно определяет body.scrollHeight?

    scroll: function(e) {
        if (!e) e = event;

        // высота окна
        var windowHeight = document.body.clientHeight;
        // место положения мыши
        var mouseY = e.clientY ? e.clientY : e.y;

        if (mouseY < scroller.scrollAreaHeight && scroller.canScrollUp()) {
            if (!scroller.scrollInterval) {
                scroller.scrollInterval = setInterval(scroller.scrollUp, scroller.scrollDelay);
            }
        }
        else if (mouseY > (windowHeight - scroller.scrollAreaHeight) && scroller.canScrollDown()) {
            if (!scroller.scrollInterval) {
                scroller.scrollInterval = setInterval(scroller.scrollDown, scroller.scrollDelay);
            }
        }
        else {
            scroller.scrollStop();
        }
    },

    canScrollUp: function() {
        return (document.body.scrollTop > 0);
    },

    canScrollDown: function() {
        return ((document.body.scrollHeight) > (document.body.scrollTop + document.body.clientHeight));
    },

    scrollUp: function() {
        if (scroller.canScrollUp()) {
            document.body.scrollTop -= scroller.scrollAmount;
        }
        else {
            scroller.scrollStop();
        }
    },

    scrollDown: function() {
        if (scroller.canScrollDown()) {
            document.body.scrollTop += scroller.scrollAmount;
        }
        else {
            scroller.scrollStop();
        }
    },

    scrollStop: function() {
        if (scroller.scrollInterval) {
            clearInterval(scroller.scrollInterval);
            scroller.scrollInterval = null;
        }
    }
}


/**
  * Add new parameter for module settings
  */
function ModulesAddNewParam () {
    var oIframe = top.frames['mainViewIframe'];

    var docum = (oIframe.contentWindow || oIframe.contentDocument || oIframe.document);
    if (docum.document) docum = docum.document;

    var tbody = docum.getElementById('tableParam').getElementsByTagName('TBODY')[0];
    var row = docum.createElement("TR");
    var tdName = docum.createElement("TD");
    var tdValue = docum.createElement("TD");
    var tdDelete = docum.createElement("TD");

    tdName.style.background = "#FFF";
    tdValue.style.background = "#FFF";
    tdDelete.style.background = "#FFF";

    var dat = new Date();
    var id = dat.getMinutes() + '' + dat.getSeconds() + '' + Math.floor(Math.random()*51174);

    tbody.appendChild(row);
    row.appendChild(tdName);
    row.appendChild(tdValue);
    row.appendChild(tdDelete);

    tdName.innerHTML  = '<textarea rows="1" style = "width:100%" name="Name_' + id + '"></textarea>';
    tdValue.innerHTML = '<textarea rows="1" style = "width:100%" name="Value_' + id + '"></textarea>';
    tdDelete.align = 'center';
    tdDelete.innerHTML = '<input type="checkbox" name="Delete_' + id + '" />';
    return;
}

// срабатывает при выборе объекта при пакетной обработке
function nc_message_select ( id ) {
    var frm = document.getElementById('nc_delete_selected');

    if ( !frm ) return false;

    if ( nc_message_selected[id] ) {
        nc_message_selected[id] = 0;
        frm.removeChild(document.getElementById('nc_hidden_'+id));
    }
    else {
        nc_message_selected[id] = id;
        frm.innerHTML += "<input id='nc_hidden_"+id+"'type='hidden' name='message["+id+"]' value='"+id+"' />";
    }

    return false;
}

// Пакетная обработка объектов
// Добавить скрытые поля и отправить форму при непосредственном нажатии "Удалить" или "включить\выключить"
function nc_package_click ( action ) {
    // id формы
    var frm = document.getElementById('nc_delete_selected');

    if ( !frm ) return false;

    if ( action == 'delete') { // delete
        frm.innerHTML += "<input type='hidden' name='delete' value='1' />";
    }
    else { //checked
        frm.innerHTML += "<input type='hidden' name='checked' value='1' />";
        frm.innerHTML += "<input type='hidden' name='posting' value='1' />"
    }

    frm.submit();
    return false;
}

function toggle(Obj) {
    if(Obj){
        Obj.style.display = (Obj.style.display != 'none') ? 'none':'block';
        return true;
    }
    return false;
}

function nc_toggle ( obj ) {
    var l = document.getElementById(obj);
    if ( l ) toggle(l);

}

function nc_trash_get_objects(cc, date_b, date_e, type_id) {
    if(!cc) return false;
    type_id = type_id || 0;

    var values = [];
    var res;
    var url = SUB_FOLDER + NETCAT_PATH + 'admin/trash/get_trash.php';
    // var needTextArea = document.getElementById(act);

    values["NC_HTTP_REQUEST"] = 1;
    var cc_div = document.getElementById('cc_'+cc+'_'+type_id);
    console.log(cc_div);

    if(cc_div.rel != 'updated'){
        cc_div.rel = 'updated';

        cc_div.innerHTML = "<img src='"+ICON_PATH+"trash-loader.gif' alt='' />";
        var xhr = new httpRequest();


        req = xhr.request('POST', url, {
            'cc':      cc,
            'date_b':  date_b,
            'date_e':  date_e,
            'type_id': type_id
        });

        res = xhr.getResponseText();

        // needTextArea.value = res;
        if(res){
            cc_div.innerHTML = res;
        }
    }
    else{
        toggle(cc_div);
    }

    return false;
}

/**
 * Отмечает все элементы типа checkbox в форме
 */
function nc_check_all() {
    var oIframe = top.frames['mainViewIframe'];
    var docum = (oIframe.contentWindow || oIframe.contentDocument || oIframe.document);

    if ( !docum.forms.length ) return true;
    var f = ( docum.forms.length == 1 ) ? docum.forms[0] : docum.forms['mainForm'];

    for (var i=0; i < f.length; i++) {
        var el = f.elements[i];
        if (el.tagName == "INPUT" && el.type=="checkbox") {
            el.checked = 'checked';
        }
    }

    return true;
}


nc_selectstatic = function () {
    this.nums = 0;
    this.div_id = 'select_static';
}
nc_selectstatic.prototype = {
    add: function (key, value) {
        this.nums++;
        if (key === undefined || key === null) { key = ''; }
        if (value === undefined || value === null) { value = ''; }

        if (this.nums == 1) { $nc('#select_static_head').show(); }

        var con_id = this.div_id + "_con_" + this.nums;
        $nc('#' + this.div_id).append("<div id='"+con_id+"'></div>");

        $nc('#' + con_id).append("<div class='key'><input name='select_static_key[" + this.nums + "]' type='text' value='" + key + "' /></div>");
        $nc('#' + con_id).append("<div class='value'><input name='select_static_value[" + this.nums + "]' type='text' value='" + value + "' /></div>");
        $nc('#' + con_id).append("<div class='drop' onclick='nc_s.drop(" + this.nums + ")'><div class='icons icon_delete' title='" + ncLang.Drop + "' style='margin-top:-3px'></div> " + ncLang.Drop + "</div>");
        $nc('#' + con_id).append("<div style='clear:both;'></div>");
    },

    drop: function ( id ) {
        $nc("#"+this.div_id+"_con_"+id).remove();
        this.nums--;
        if ( !this.nums  ) $nc('#select_static_head').hide();
    }
}
/**
 *
 * - Обработчики нажатий в формах внутри основного фрейма.
 * - messageInitDrag
 *
 */

/**
 * Обработка нажатия на элементы с атрибутом data-submit="1":
 * — если установлен атрибут data-confirm-message, будет создан запрос
 *   на подтверждение действия с указанным текстом;
 * — будет создана форма (метод POST) со значениями, перечисленными
 *   в параметре data-post в формате JSON
 */
$nc(function() {
    var buttons = $nc('[data-submit=1]');
    buttons.click(function(e) {
        var button = $nc(this),
            data = button.data('post'),
            message = button.data('confirmMessage');
        if (!message || confirm(message)) {
            var form = $nc('<form/>', {
                method: 'post',
                action: '?'
            }).hide().appendTo('body');
            for (var k in data) {
                form.append($nc('<input/>', {
                    type: 'hidden',
                    name: k,
                    value: data[k]
                }));
            }
            form.submit();
        }
    });
    // prevent middle click on these "buttons":
    $nc(document).on('click', buttons, function(e) {  // other ways do not work (jQ 1.10)
        if ($nc(e.target).closest('a').data('submit')) {
            e.preventDefault();
        }
    });

    var hide_aux_checkbox = $nc('#hide_aux');
    if (hide_aux_checkbox.length) {
        hide_aux_checkbox.change(function() {
            nc_component_reload_options($nc('select[name="Class_Groups"]').val());
        });

        nc_component_reload_options(null, false);
    }

    $nc(document).on('change', 'select[name="Class_Groups"]', function() {
        nc_component_reload_options($nc(this).val());
    });

    $nc(document).on('change', 'select[name="Class_ID"]', function() {
        nc_infoblock_on_component_change(this.options[this.selectedIndex], $nc(this).data('catalogue-id'));
    });
});

if (typeof formAsyncSaveEnabled === 'undefined') {
    formAsyncSaveEnabled = false;
}

$nc(function() {
    if ('nc_save_keycode' in window) {
        var e = 'keydown.nc_admin_form_save';
        $nc(document.body).on(e, formKeyHandler);
        // remove in NetCat 6 if that handler is still used
        if (window != top) {
            $nc(top.document.body).off(e).on(e, formKeyHandler);
        }
    }
});

/**
 * Form keyhandler (submits on enter, saves with XHR on Ctrl+Shift+S
 * @global {Boolean} formAsyncSaveEnabled
 */
function formKeyHandler(e) {
    //var kEnter = (e.keyCode==13),  // Enter pressed

    // Ctrl + (Shift +) S
    var bAutosave = (typeof nc_autosave_use !== "undefined" && nc_autosave_use == 1 && typeof nc_autosave_type !== "undefined" && nc_autosave_type === 'keyboard' && typeof autosave !== "undefined" && autosave !== null),
        kSave = (
            /* e.shiftKey && */
            e.ctrlKey &&
            e.keyCode == (nc_save_keycode ? Math.round(nc_save_keycode) : 83)
        );

    // SUBMIT on <ENTER>
    /*if (kEnter) {
     if (srcElement.tagName == 'INPUT' && srcElement.type=='text' && !srcElement.getAttribute('nosubmit')) {
     srcElement.form.submit();
     return;
     }
     else {
     return;
     }
     }*/

    if (!(kSave && (formAsyncSaveEnabled || bAutosave))) {
        return;
    }

    // SAVE on <CTRL+(SHIFT+)S>
    if (bAutosave) {
        autosave.saveAllData(autosave);
    } else {
        // update CodeMirror layers
        CMSaveAll();

        var iframe = false;
        $nc('iframe', parent.document).each(function() {
            if ($nc(this).attr('id') === 'mainViewIframe') {
                iframe = true;
            }
        });

        var $form = $nc(e.target).closest('form');
        if (!$form.length) {
            $form = top.$nc('form', nc_get_current_document());
        }
        if (!$form.length) {
            return;
        }

        formAsyncSave($form.eq(0), 0, 'formSaveStatus(1);');

        // inside_admin
        if (iframe) {
            parent.mainView.chan = 0;
            parent.mainView.displayStar(0);
        }
    }

    var originalEvent = e.originalEvent;
    if (originalEvent.stopPropagation) {
        originalEvent.stopPropagation();
        originalEvent.preventDefault();
    } else {
        try {
            originalEvent.keyCode = 0;
        } catch (exception) {}
        originalEvent.cancelBubble = true;
        originalEvent.returnValue = false;
    }

    return false;
}

/**
 * Form ajax saver
 * @param,String or object
 */
function formAsyncSave(form, statusHandlers, posteval) {
    if (!formAsyncSaveEnabled) {
        return;
    }

    var oForm;

    // object
    if (typeof form === 'object' && form.tagName === 'FORM') {
        oForm = form;
    }
    // get the form by ID
    if (typeof form === 'string') {
        oForm = document.getElementById(form);
    }
    // if it is not clear yet - save the FIRST form
    if (typeof oForm !== 'object') {
        oForm = document.getElementsByTagName("FORM")[0];
    }
    // no form!
    if (typeof oForm !== 'object') {
        return false;
    }

    if (oForm.onsubmit) {
        oForm.onsubmit();
    }

    var $form = $nc(oForm),
        flag = $nc('<input type="hidden" name="NC_HTTP_REQUEST" value="1">').appendTo($form),
        statusCode = {};

    // Эмуляция statusHandlers старого httpRequest, нужно будет убрать,
    // когда старые классы/функции будут убраны везде
    if ($nc.isEmptyObject(statusHandlers)) {
        statusHandlers = {
            '*': 'formSaveStatus(xhr);'
        };
    } else {
        for (var i in statusHandlers) {
            var body = statusHandlers[i].replace(/\bthis\b/, 'xhr');
            statusCode[i] = new Function('xhr', body);
        }
    }

    $form.ajaxSubmit({
        statusCode: statusCode,
        complete: new Function('xhr', statusHandlers['*'])
    });
    flag.remove();

    if (posteval) {
        eval(posteval);
    }
}

/**
 * Показать результат сохранения при помощи XHR
 * @param {Object} xhr   XHR object
 */
function formSaveStatus(xhr) {
    var dst = document.getElementById("formAsyncSaveStatus");
    if (!dst) {
        dst = createElement("DIV", {
            "id": "formAsyncSaveStatus"
        }, document.body);
    }

    dst.style.visibility = 'visible';
    dst.style.opacity = 1;
    dst.style.zIndex = 20000;

    dst.className = 'form_save_in_progress';
    dst.innerHTML = NETCAT_HTTP_REQUEST_SAVING;

    dst.style.top = Math.round(($nc('body').height() - $nc(dst).height()) / 2) + 'px';

    if (xhr.readyState && xhr.readyState > 3) {
        var errorMessage = "";

        var iframe = false;
        $nc('iframe', parent.document).each(function() {
            if ($nc(this).attr('id') === 'mainViewIframe') {
                iframe = true;
            }
        });

        // modal layer update
        if (!iframe) {
            $nc.ajax({
                'type': 'GET',
                'url': nc_page_url() + '&isNaked=1',
                success: function(response) {
                    nc_update_admin_mode_content(response);
                    $nc.modal.close();
                }
            });
        }

        if (xhr.status == "200") {
            var result = {};

            try {
                eval("var result = " + xhr.responseText);
            } catch (e) {
                if (xhr.responseText) {
                    errorMessage = xhr.responseText;
                }
            }

            if (result.error) {
                alert(result.error);
                errorMessage = result.error;
            } else {
                if (typeof(result.ui_config) !== 'undefined' && typeof(parent.mainView) !== 'undefined') {
                    var newSettings = result.ui_config;
                    parent.mainView.setHeader(newSettings.headerText, newSettings.subheaderText);

                    var tree;
                    if (newSettings.treeChanges && (tree = parent.document.getElementById('treeIframe').contentWindow.tree)) {
                        for (var method in newSettings.treeChanges) {
                            if (typeof tree[method] === 'function' && newSettings.treeChanges[method].length) {
                                for (var i = 0; i < newSettings.treeChanges[method].length; i++) {
                                    // call method in the tree
                                    tree[method](newSettings.treeChanges[method][i]);
                                }
                            }
                        }
                    }
                }

                dst.className = 'form_save_ok';
                dst.innerHTML = NETCAT_HTTP_REQUEST_SAVED;
                setTimeout(function() {
                    $nc(dst).remove();
                }, 2500);
            }

            if (result.update_html) {
                if (result.update_html) {
                    for (var selector in result.update_html) {
                        $nc(selector).html(result.update_html[selector]);
                    }
                }
            }

        } else {
            errorMessage = xhr.status + ". " + xhr.statusText;
        }

        if (errorMessage) {
            dst.className = 'form_save_error';
            dst.innerHTML = NETCAT_HTTP_REQUEST_ERROR;
            dst.error = errorMessage;
            setTimeout(function() {
                $nc(dst).remove();
            }, 5000);
        }
    }
}

function showFormSaveError() {
    alert(document.getElementById('formAsyncSaveStatus').error);
}

function loadCustomTplSettings(catalogueId, subdivisionId, templateId, parentSubdivisionId) {
    var is_parent_template = $nc('select[name=Template_ID] option:first').html() === $nc('select[name=Template_ID] option').filter(':selected').html();
    $nc('input[name=is_parent_template]').val(is_parent_template);
    $nc("#customTplSettings").html("");
    $nc("#loadTplWait").show();
    var xhr = new httpRequest;
    xhr.request('GET', top.ADMIN_PATH + 'template/custom_settings.php', {
        catalogue_id: catalogueId,
        sub_id: subdivisionId,
        parent_sub_id: parentSubdivisionId,
        template_id: templateId,
        is_parent_template: is_parent_template
    });
    // synchronous HTML-HTTP-request:
    $nc('#customTplSettings').html('').append(xhr.getResponseText());
    if (templateId != 0) {
        document.getElementById('templateEditLink').onclick = function() {
            var suffix = File_Mode_IDs.indexOf('|' + templateId + '|') != -1 ? '_fs' : '';
            window.open(top.ADMIN_PATH + '#template' + suffix + '.edit(' + templateId + ')', 1)
        };
        $nc("#templateEditLink").removeAttr("disabled");
    }
    $nc(document).trigger("apply-upload");

    $nc("#loadTplWait").hide();
}

/**
 * ?
 * @param classId
 * @see /files/netcat/admin/subdivision/function.inc.php
 */
function loadClassDescription(classId) {
    var loadClassDescription = $nc('#loadClassDescription');
    if (classId && classId != '0') {
        $nc.ajax({
            url: top.ADMIN_PATH + 'class/get_class_description.php',
            method: 'GET',
            data: {
                class_id: classId
            },
            success: function(data) {
                loadClassDescription
                    .html(data);
            },
            error: function(error) {
                console.error(error);
            }

        });
    } else {
        loadClassDescription.empty();
    }
}

/**
 * Подгружает шаблон
 * @param classId
 * @param selectedId
 * @param catalogueId
 * @param is_mirror
 * @param source
 * @see /files/netcat/admin/subdivision/function.inc.php
 */
function loadClassTemplates(classId, selectedId, catalogueId, is_mirror, source) {
    var loadClassTemplates = $nc('#loadClassTemplates');

    if (source == undefined) {
        source = 'class';
    }
    if (classId && classId != '0') {
        $nc.ajax({
            url: top.ADMIN_PATH + source + '/get_class_templates.php',
            method: 'GET',
            data: {
                class_id: classId,
                selected_id: selectedId,
                catalogue_id: catalogueId,
                is_mirror: is_mirror
            },
            success: function(data) {
                loadClassTemplates
                    .html(data);
            },
            error: function(error) {
                console.error(error);
            }
        });
    } else {
        loadClassTemplates.empty();
    }
}

/***
 * Отображать "пользовательские настройки", которые были указаны при создании компонента
 * @param classId Class ID
 * @param infoblockId
 * @see /files/netcat/admin/subdivision/function.inc.php
 */
function loadClassCustomSettings(classId, infoblockId) {
    var loadClassCustomSettings = $nc('#loadClassCustomSettings');
    if (classId && classId != '0') {
        $nc.ajax({
            url: top.ADMIN_PATH + 'class/get_class_custom_settings.php',
            method: 'GET',
            data: {
                class_id: classId,
                infoblock_id: infoblockId || ''
            },
            success: function(data) {
                loadClassCustomSettings
                    .html(data);
            },
            error: function(error) {
                console.error(error);
            }
        });
    } else {
        loadClassCustomSettings.empty();
    }
}

function setInfoblockName(infoblockItem) {
    var ClassName = $nc('input[name="SubClassName"]'),
        EnglishName = $nc('input[name="EnglishName"][data-from="SubClassName"]'),
        toRemove = $nc(infoblockItem).val() + '. ';

    if (!ClassName.val() || (ClassName.attr('data-changed') !== 'yes')) {
        ClassName.val($nc(infoblockItem).text().replace(toRemove, ''));
    }

    if (!EnglishName.val() || (EnglishName.attr('data-changed') !== 'yes')) {
        EnglishName.val(transliterate($nc(infoblockItem).text().replace(toRemove, ''), 'yes'));
    }
}

function inputTextClassName() {
    var optionFirstSelect = 'select[name="Class_ID"] > option:visible:first',
        listInput = [
            'input[name="SubClassName"]',
            'input[name="EnglishName"][data-from="SubClassName"]'
        ],
        textFirst = $nc(optionFirstSelect)
            .text()
            .replace($nc(optionFirstSelect).val() + '.', '')
            .trim();

    listInput.forEach(function(val) {
        $nc(val).on('input', function() {
            var self = $nc(this);
            if (!self.val()) {
                self.attr('data-changed', 'no');
            } else {
                self.attr('data-changed', 'yes');
            }
        });
    });

    if (!$nc(listInput[0]).val() || ($nc(listInput[0]).attr('data-changed') !== 'yes')) {
        $nc(listInput[0]).val(textFirst);
    }

    if (!$nc(listInput[1]).val() || ($nc(listInput[1]).attr('data-changed') !== 'yes')) {
        $nc(listInput[1]).val(transliterate(textFirst, 'yes'));
    }
}

function onchageSubClassType(conditions) {
    if (conditions) {
        $nc("#nc_class_select").hide();
        $nc("#loadClassCustomSettings").hide();
        $nc("#nc_infoblock_select").hide();
        $nc("#nc_mirror_select").show();
        $nc("#loadClassTemplates").html("");
        $nc('.tableComponent').hide();
        $nc('input[name="EnglishName"][data-from="SubClassName"]').val('');
        $nc('input[name="SubClassName"]').val('');
    } else {
        $nc("#nc_class_select").show();
        $nc("#nc_infoblock_select").show();
        $nc("#nc_mirror_select").hide();
        $nc("#loadClassTemplates").html("");
        $nc('.tableComponent').show();
    }
}

function loadSubdivisionAddForm(catalogueId, subId) {
    var oFormDiv;
    if (subId) {
        oFormDiv = document.getElementById('sub-' + subId);
    } else {
        oFormDiv = document.getElementById('site-' + catalogueId);
    }

    if (oFormDiv.innerHTML) {
        oFormDiv.innerHTML = '';
    } else {
        var xhr = new httpRequest;
        xhr.request('GET', top.ADMIN_PATH + 'wizard/subdivision_add_form.php', {
            catalogue_id: catalogueId,
            sub_id: subId
        });
        // synchronous HTML-HTTP-request:
        var oForm = document.createElement("form");
        oForm.id = 'ajaxSubdivisionAdd';
        oForm.name = 'ajaxSubdivisionAdd';
        oForm.innerHTML = xhr.getResponseText();
        oFormDiv.appendChild(oForm);
    }
}

//Subdivision_Name, EnglishName, TemplateID, ClassID
function saveSubdivisionAddForm() {
    var oSubdivisionForm = document.getElementById('ajaxSubdivisionAdd');

    var subdivisionName = oSubdivisionForm.Subdivision_Name.value,
        englishName = oSubdivisionForm.EnglishName.value,
        templateId = oSubdivisionForm.TemplateID.value,
        classId = oSubdivisionForm.ClassID.value,
        catalogueId = oSubdivisionForm.CatalogueID.value,
        subId = oSubdivisionForm.SubdivisionID.value,
        token = oSubdivisionForm.nc_token.value;

    var xhr = new httpRequest;
    xhr.request('GET', top.ADMIN_PATH + 'wizard/subdivision_add.php', {
        subdivision_name: subdivisionName,
        english_name: englishName,
        template_id: templateId,
        class_id: classId,
        catalogue_id: catalogueId,
        sub_id: subId,
        nc_token: token
    });
    // synchronous HTML-HTTP-request:

    var result = xhr.getResponseText();
    if (isNaN(result)) {
        var dst = document.getElementById("formAsyncSaveStatus");
        if (!dst) {
            dst = createElement("DIV", {
                "id": "formAsyncSaveStatus"
            }, document.body);
        }
        dst.style.visibility = 'visible';
        dst.style.opacity = 1;
        dst.className = 'form_save_error';
        dst.innerHTML = result;
        setTimeout("fadeOut('formAsyncSaveStatus')", 5000);
        return;
    }

    var oFormDiv, oInsertBeforeTr;

    if (subId != 0) {
        oFormDiv = document.getElementById('sub-' + subId);
        oInsertBeforeTr = document.getElementById('tr-' + subId);
    } else {
        oFormDiv = document.getElementById('site-' + catalogueId);
        oInsertBeforeTr = document.getElementById('site_tr-' + catalogueId);
    }

    var oTr1 = document.createElement('tr');
    oTr1.id = 'tr-' + result;
    oTr1.setAttribute('parentsub', subId);

    var oTr2 = document.createElement('tr');

    var oTd1 = document.createElement('td');
    oTd1.className = 'name active';

    var oTd2 = document.createElement('td');
    oTd2.className = 'button';

    var oTd3 = document.createElement('td');
    oTd3.colSpan = 2;
    oTd3.style.backgroundColor = '#FFFFFF';

    if (isNaN(parseInt(oInsertBeforeTr.firstChild.style.paddingLeft))) {
        oTd1.style.paddingLeft = 16;
        oTd3.style.padding = '0 0 0 16';
    } else {
        oTd1.style.paddingLeft = parseInt(oInsertBeforeTr.firstChild.style.paddingLeft) + 20;
        oTd3.style.paddingLeft = parseInt(oInsertBeforeTr.firstChild.style.paddingLeft) + 20;
        oTd3.style.paddingRight = 0;
        oTd3.style.paddingTop = 0;
        oTd3.style.paddingBottom = 0;
    }

    var oA1 = document.createElement('a');
    oA1.href = 'index.php?phase=4&SubdivisionID=' + result;
    oA1.innerHTML = subdivisionName;

    var oA2 = document.createElement('a');
    oA2.href = '#';
    oA2.onclick = function() {
        loadSubdivisionAddForm(catalogueId, result);
    };

    var oImg1 = document.createElement('img');
    oImg1.src = ADMIN_PATH + 'images/arrow_sec.gif';
    oImg1.width = '14';
    oImg1.height = '10';
    oImg1.alt = '';
    oImg1.title = '';

    var oImg2 = document.createElement('img');
    oImg2.src = ICON_PATH + 'i_folder_add.gif';
    oImg2.alt = ncLang.addSubsection;
    oImg2.title = ncLang.addSubsection;

    var oSpan = document.createElement('span');
    oSpan.innerHTML = result + '. ';

    oTd1.appendChild(oImg1);
    oTd1.appendChild(oSpan);
    oTd1.appendChild(oA1);

    oA2.appendChild(oImg2);

    oTd2.appendChild(oA2);

    oTr1.appendChild(oTd1);
    oTr1.appendChild(oTd2);

    var oDiv = document.createElement('div');
    oDiv.id = 'sub-' + result;

    oTr2.appendChild(oTd3);
    oTd3.appendChild(oDiv);

    bindEvent(oTr1, 'mouseover', siteMapMouseOver);
    bindEvent(oTr1, 'mouseout', siteMapMouseOut);

    bindEvent(oTr2, 'mouseover', siteMapMouseOver);
    bindEvent(oTr2, 'mouseout', siteMapMouseOut);

    oInsertBeforeTr.parentNode.insertBefore(oTr2, oInsertBeforeTr.nextSibling.nextSibling);
    oInsertBeforeTr.parentNode.insertBefore(oTr1, oInsertBeforeTr.nextSibling.nextSibling);
    oForm.parentNode.removeChild(oForm);
}

/**
 * привязать драг-дроп к s_list_class
 */
function messageInitDrag(messageList, allowChangePriority) {
    if (!messageList) {
        return;
    }

    var current_document = nc_get_current_document();

    for (var classId in messageList) {
        for (var i = 0; i < messageList[classId].length; i++) {
            var messageId = messageList[classId][i];
            var container = current_document.getElementById('message' + classId + '-' + messageId),
                handler = current_document.getElementById('message' + classId + '-' + messageId + '_handler');

            if (!container || !handler || !top.dragManager) {
                continue;
            }

            top.dragManager.addDraggable(handler, container);

            if (allowChangePriority) {
                top.dragManager.addDroppable(container, messageAcceptDrop, messageOnDrop, {
                    name: 'arrowRight',
                    bottom: 2,
                    left: 0
                });
            }

            // убрать selectstart с плашки с ID и кнопками (IE)
            handler.parentNode.onselectstart = top.dragManager.cancelEvent;
        }
    }
}

/**
 *
 */
function messageAcceptDrop(e) {
    var //dragged = top.dragManager.draggedInstance,
        target = top.dragManager.droppedInstance;

    // объект можно бросить на другой объект (если это не родительский) - сменить проритет
    // перемещать только в пределах того же родителя
    if (target.type === 'message' && this.getAttribute('messageParent') === top.dragManager.draggedObject.getAttribute('messageParent')) {
        return true;
    }

    return false;
}

function messageOnDrop(e) {
    var dragged = top.dragManager.draggedInstance,
        target = top.dragManager.droppedInstance,
        xhr = new httpRequest();

    var res = xhr.getJson(top.ADMIN_PATH + 'subdivision/drag_manager_message.php',
        {
            'dragged_type': dragged.type,
            'dragged_class': dragged.typeNum,
            'dragged_id': dragged.id,
            'target_type': target.type,
            'target_class': target.typeNum,
            'target_id': target.id
        });

    // (смена проритета)
    if (res && target.type === 'message') {
        var oParent = top.dragManager.draggedObject.parentNode;

        oParent.removeChild(top.dragManager.draggedObject);
        // если this.nextSibling не определен, то insertBefore вставляет в конец родительского элемента
        oParent.insertBefore(top.dragManager.draggedObject, this.nextSibling);
    }
}

function SendClassPreview(form, oTarget) {
    var oForm;
    // object
    if (typeof form === 'object' && form.tagName === 'FORM') {
        oForm = form;
    }
    // get the form by ID
    if (typeof form === 'string') {
        oForm = document.getElementById(form);
    }
    // if it is not clear yet - save the FIRST form
    if (typeof oForm !== 'object' || oForm == null) {
        oForm = document.getElementsByTagName("FORM")[0];
    }
    // no form!
    if (typeof oForm !== 'object') {
        return false;
    }

    if (typeof oTarget === 'undefined' || oTarget == null) {
        oTarget = '';
    }
    if (typeof oTarget !== 'string') {
        oTarget = oTarget.toString();
    }

    if (isFinite(oForm.ClassID.value)) {
        var old_action = oForm.getAttribute("action");
        var old_target = oForm.getAttribute("target");
        oForm.setAttribute("action", oTarget + "?classPreview=" + oForm.ClassID.value);
        oForm.setAttribute("target", "_blank");
        oForm.submit();
        oForm.setAttribute("action", old_action);
        oForm.setAttribute("target", old_target);
    }
}

function SendTemplatePreview(form, oTarget) {
    var oForm;
    // object
    if (typeof form === 'object' && form.tagName === 'FORM') {
        oForm = form;
    }
    // get the form by ID
    if (typeof form === 'string') {
        oForm = document.getElementById(form);
    }
    // if it is not clear yet - save the FIRST form
    if (typeof oForm !== 'object' || oForm == null) {
        oForm = document.getElementsByTagName("FORM")[0];
    }
    // no form!
    if (typeof oForm !== 'object') {
        return false;
    }

    if (typeof oTarget === 'undefined' || oTarget == null) {
        oTarget = '';
    }
    if (typeof oTarget !== 'string') {
        oTarget = oTarget.toString();
    }

    if (isFinite(oForm.TemplateID.value)) {
        var old_action = oForm.getAttribute("action");
        var old_target = oForm.getAttribute("target");
        oForm.setAttribute("action", oTarget + "?templatePreview=" + oForm.TemplateID.value);
        oForm.setAttribute("target", "_blank");
        oForm.submit();
        oForm.setAttribute("action", old_action);
        oForm.setAttribute("target", old_target);
    }
}

function generateForm(classID, sysTable, act, confirmation) {
    if (!classID || !act) {
        return false;
    }

    var values = [];
    var res, confirmText;
    var url = NETCAT_PATH + 'alter_form.php';
    var needTextArea = document.getElementById(act);

    // выгружаем данные из редактора
    if (typeof $nc(needTextArea).codemirror === 'function') {
        $nc(needTextArea).codemirror('save');
    }

    // если поле не пустое - вызываем диалог
    if (needTextArea.value && !confirmation) {
        var dlgValue = confirm(ncLang["Warn" + act]);

        if (dlgValue) {
            generateForm(classID, sysTable, act, 1);
        }
        return false;
    }

    // предупредить сервер, что данные переданы через Ajax в кодировке utf8
    values["NC_HTTP_REQUEST"] = 1;

    // инициализируем
    var xhr = new httpRequest();

    xhr.request('POST', url, {
        'classID': classID,
        'act': act,
        'systemTableID': sysTable,
        'fs': $nc('input[name=fs]', nc_get_current_document()).val()
    });

    res = xhr.getResponseText();

    needTextArea.value = res;
    if (typeof $nc(needTextArea).codemirror === 'function') {
        $nc(needTextArea).codemirror('setValue');
    }

    return false;
}

function generate_widget_form(widgetclass_id, action, confirm) {
    var textarea = document.getElementById(action);
    var url = NETCAT_PATH + 'admin/widget/index.php?phase=90';

    var xhr = new httpRequest(false);
    xhr.request('POST', url, {
        'Widget_Class_ID': widgetclass_id,
        'action': action
    });
    textarea.value = xhr.getResponseText();
    if (typeof $nc(textarea).codemirror === 'function') {
        $nc(textarea).codemirror('setValue');
    }

    return false;
}

/**
 * Привязать к textarea кнопки изменения размера
 */
function bindTextareaResizeButtons() {
    $nc('TEXTAREA').each(function() {
        var $this = $nc(this);
        if (!$this.prev().is('.resize_block')) {
            $nc('<div class="resize_block"><a class="textarea_shrink nc-label nc--lighten" href="#" >&#x25B2;</a> <a class="textarea_grow nc-label nc--lighten" href="#">&#x25BC;</a></div>').insertBefore($this);
        }
        return true;
    });

    $nc('.resize_block A.textarea_shrink, .resize_block A.textarea_grow').bind('click', function() {
        var $this = $nc(this);
        var $textarea = $this.closest('.resize_block').next();
        var height;
        var heightModifier = $this.hasClass('textarea_shrink') ? -50 : 50;
        if (!$textarea.is('TEXTAREA')) {
            $textarea = $textarea.find('TEXTAREA');
        }

        if ($textarea.is('TEXTAREA')) {
            if ($textarea.hasClass('has_codemirror')) {
                var cmEditor = $textarea.data('codemirror');
                if (cmEditor) {
                    var $scrollElement = $nc(cmEditor.getScrollerElement());
                    height = $scrollElement.height() + heightModifier;
                    if (height >= 100) {
                        cmEditor.setSize(null, height);
                    }
                }
            } else {
                height = $textarea.height() + heightModifier;
                if (height >= 100) {
                    $textarea.height(height);
                }
            }
        }
        return false;
    });
}

/**
 * Блок выбора компонента и шаблона компонента (диалог добавления инфоблока;
 * может использоваться и на других страницах)
 */
function nc_component_select_init(form) {
    var component_select = form.find('select.nc-infoblock-component-select'),
        template_select_div = form.find('.nc-infoblock-template-select'),
        template_select_buttons = form.find('.nc-infoblock-template-list-buttons .nc-btn'),
        custom_settings_div = form.find('.nc-infoblock-template-custom-settings'),
        preview_div = form.find('.nc-infoblock-template-preview'),
        show_all_components_checkbox = form.find('input.nc-infoblock-show-all-components'),
        current_component_id,
        component_filter_input = form.find('.nc-infoblock-component-filter input');

    // выбор первого видимого компонента
    function select_first_component() {
        component_select.find('option').first().prop('selected', true);
        component_select.change();
    }

    // Нажатие ↑↓ в поле фильтра
    function on_component_filter_arrows(keycode) {
        var options = component_select.find('option'),
            selected_index = options.index(component_select.find('option:selected')),
            new_selected_option;

        if (keycode == 38 && selected_index > 0) { // up key
            new_selected_option = -1;
        }
        if (keycode == 40 && selected_index != options.length - 1) { // down key
            new_selected_option = +1;
        }
        if (new_selected_option) {
            options.eq(selected_index + new_selected_option).prop('selected', true);
            component_select.change();
        }
    }

    // Загрузка информации о компоненте
    var last_template_data_request;

    function request_template_data(component_id) {
        if (last_template_data_request) {
            last_template_data_request.abort();
        }

        preview_div.css('background-image', '').find('.nc--loading').show();
        preview_div.find('span').hide();

        last_template_data_request = $nc.getJSON(NETCAT_PATH + 'action.php', {
            ctrl: 'admin.infoblock',
            action: 'get_component_template_settings',
            component_id: component_id
        }, function(result) {
            if (!result || !result.length) {
                return;
            }

            if (!show_all_components_checkbox.is(':checked')) {
                result = $nc.grep(result, function(item) {
                    return item.multiple_mode == '1';
                });
            }

            if (result.length < 2) {
                set_single_template(result[0]);
            } else {
                set_templates(result);
            }
        });

        return last_template_data_request;
    }

    // Обновление данных, когда нет выбора шаблона компонента
    function set_single_template(template_data) {
        template_select_div.html(
            template_data.name +
            '<input type="hidden" name="data[Class_Template_ID]" value="' + template_data.id + '">'
        );
        template_select_buttons.hide();
        set_current_template_data(template_data);
    }

    // Обновление данных о шаблонах компонента
    function set_templates(templates) {
        // <select>
        var select = $nc('<select name="data[Class_Template_ID]" />').change(on_template_select_change);
        $nc.each(templates, function(i, template_data) {
            $nc('<option />')
                .val(template_data.id)
                .html(template_data.name)
                .data('template_data', template_data)
                .appendTo(select);
        });
        template_select_div.empty().append(select);

        // кнопки
        template_select_buttons.show();
        template_select_buttons.eq(0).addClass('nc--disabled');
        template_select_buttons.eq(1).removeClass('nc--disabled');

        // скриншот и настройки
        set_current_template_data(templates[0]);
    }

    // Установка данных шаблона компонента
    function set_current_template_data(template_data) {
        // сохранение существующих настроек шаблона
        var values = {};
        custom_settings_div.find('input,select,textarea').each(function() {
            values[this.name] = $nc(this).val();
        });

        preview_div.find('span').toggle(!template_data.preview);
        if (template_data.preview) {
            preview_div.css('background-image', 'url(' + template_data.preview + ')');
        }
        preview_div.find('.nc--loading').hide();
        custom_settings_div.html(template_data.settings);

        // восстановление настроек шаблона
        for (var k in values) {
            custom_settings_div.find('[name="' + k + '"]').val(values[k]);
        }
    }

    // Событие при изменении шаблона компонента в списке (this == select)
    function on_template_select_change() {
        var options = $nc(this).find('option'),
            selected_option = options.filter(':selected'),
            selected_index = options.index(selected_option);

        set_current_template_data(selected_option.data('template_data'));
        // обновить состояние кнопок
        template_select_buttons.eq(0).toggleClass('nc--disabled', selected_index == 0);
        template_select_buttons.eq(1).toggleClass('nc--disabled', selected_index == options.length - 1);
    }

    // Вспомогательная функция для кнопок «предыдущий/следующий шаблон»
    function set_template_select_index(shift) {
        var select = template_select_div.find('select'),
            options = select.find('option'),
            selected_option = options.filter(':selected'),
            new_index = options.index(selected_option) + shift;
        if (new_index >= 0 && new_index < options.length) {
            options.eq(new_index).prop('selected', true);
            select.change();
        }
    }

    // В IE нельзя спрятать <option> стилями, в Chrome есть отдельные проблемы
    // с этим (не работает option:visible).
    // Для переключения списков компонентов придётся манипулировать DOM’ом
    function update_component_select() {
        var show_all = show_all_components_checkbox.is(':checked'),
            name_filter = component_filter_input.val(),
            selected_option_value = component_select.val();

        if (!component_select.data('all_options')) {
            component_select.data('all_options', component_select.html());
        }

        component_select.html(component_select.data('all_options')).val(selected_option_value);

        if (!show_all || name_filter) {
            var name_regexp = name_filter && name_filter.length ? new RegExp(name_filter, 'i') : null;
            // remove <option>s that do not match criteria
            component_select.find('option').each(function() {
                var option = $nc(this),
                    remove =
                        (!show_all && !option.hasClass('nc--component-multiple')) ||
                        (name_regexp && !name_regexp.test(option.html()));
                if (remove) {
                    option.remove();
                }
            });
            // remove empty <optgroup>s
            component_select.find('optgroup:not(:has(option))').remove();
        }

        if (!component_select.find('option[value="' + selected_option_value + '"]').length) {
            select_first_component();
        }
    }

    // --- Инициализация обработчиков событий ---

    // обработка нажатий в поле фильтра
    component_filter_input.on('keyup', function(e) {
        if (e.which == 38 || e.which == 40) { // up & down
            on_component_filter_arrows(e.which);
        } else {
            update_component_select();
        }
    });

    // Нажатие на × в поле фильтра
    form.find('.nc-infoblock-component-filter .nc--remove').click(function() {
        if (component_filter_input.val() != '') {
            component_filter_input.val('');
            update_component_select();
        }
    });

    // Выбор компонента в списке
    component_select.change(function() {
        var component_id = component_select.val();

        if (current_component_id == component_id) {
            return;
        }

        current_component_id = component_id;

        // Название для инфоблока по умолчанию возьмём из названия компонента
        var infoblock_name = component_select.find('option:selected').html().replace(/^\d+\. /, '');
        form.find('input[name="data[Sub_Class_Name]"]').val(infoblock_name);

        request_template_data(component_id);
    });

    // Кнопка «предыдущий шаблон»
    template_select_buttons.eq(0).click(function() {
        set_template_select_index(-1);
    });

    // Кнопка «следующий шаблон»
    template_select_buttons.eq(1).click(function() {
        set_template_select_index(+1);
    });

    // Чекбокс «показать все»
    show_all_components_checkbox.change(function() {
        update_component_select();
        request_template_data(component_select.val()); // reload to update template list
    });

    // Фильтрация списка компонентов
    update_component_select();

    // Выбор первой позиции (после выполнения прочих действий — например, после открытия диалога)
    setTimeout(select_first_component, 1);
}

function nc_infoblock_on_component_change(option, catalogue_id) {
    catalogue_id = catalogue_id || 0;

    if (option) {
        var class_id = option.value;
        loadClassCustomSettings(class_id);
        loadClassDescription(class_id);
        loadClassTemplates(class_id, 0, catalogue_id);
        setInfoblockName(option);
    }
}

function nc_component_reload_options(selected_group) {
    var show_all = $nc('#hide_aux').is(':checked');
    var catalogue_id = $nc('#Class_ID').data('catalogue-id');
    var action = 'subdivision.add';

    if (/^#subclass\.add/.test(parent.location.hash)) {
        action = 'subclass.add';
    }
    var query_string = '?catalogue_id=' + catalogue_id + '&action=' + action;
    $nc.getJSON(ADMIN_PATH + 'class/get_class_list.php' + query_string, {}, function(class_list) {
        var class_groups_select = $nc('select[name=Class_Groups]');
        var class_select = $nc('select[name=Class_ID]');
        class_groups_select.html('');

        for (var group in class_list['groups']) {
            var group_info = class_list['groups'][group];
            var is_skippable_auxiliary_group = group_info['is_auxiliary'] && !group_info['selected'] && !show_all;
            if (is_skippable_auxiliary_group) {
                continue;
            }
            var group_option;

            if (group_info['is_delimiter']) {
                group_option = $nc("<option disabled='disabled' data-delimiter='true'>" + group_info['text'] + "</option>");
            } else {
                var is_preselected = !selected_group && group_info['selected'];
                var is_matched_with_selected_group = selected_group && (group_info['value'] === selected_group);

                group_option = $nc("<option/>")
                    .attr('value', group_info['value'])
                    .attr('class', group_info['is_dummy'] || group_info['is_auxiliary'] ? 'nc-text-grey' : '')
                    .attr('data-property', true)
                    .attr('data-group-name', group_info['name'])
                    .html(group_info['text']);

                if (is_preselected || is_matched_with_selected_group) {
                    group_option.prop('selected', 'selected');
                }
            }

            if (group_option) {
                class_groups_select.append(group_option);
            }
        }

        if (class_groups_select.find('option[data-property="true"]:checked').length === 0) {
            class_groups_select.find('option[data-property="true"]:first').prop('selected', 'selected');
            class_groups_select.val(class_groups_select.find('option[data-property="true"]:first').val());
        }

        class_select.html('');

        class_list['components'].forEach(function(component_info) {
            var target_group = class_groups_select.find('option:checked').attr('data-group-name');
            var is_skippable_auxiliary_class = component_info['is_auxiliary'] && !component_info['selected'] && !show_all;

            if (is_skippable_auxiliary_class || component_info['group'] !== target_group) {
                return;
            }

            var component_option = $nc("<option/>")
                .attr('value', component_info['value'])
                .attr('class', component_info['is_dummy'] || component_info['is_auxiliary'] ? 'nc-text-grey' : '')
                .text(component_info['text']);
            if (component_info['selected']) {
                component_option.prop('selected', 'selected');
            }
            class_select.append(component_option);
        });

        if (class_select.find('option:checked').length === 0) {
            class_select.find('option:first').prop('selected', 'selected');
            class_select.val(class_select.find('option:first').val());
        }

        class_select.change();
        inputTextClassName();
    });
}


var dragLabel = null;

dragManager = {
    dragInProgress: false,
    dragLabel: null,
    draggedObject: null,
    dropTargetObject: null,
    dropPositionIndicator: null,
    dropPositionImages: {},

    // координаты начала перетаскивания
    dragEventX: 0,
    dragEventY: 0,
    // флаг видимости dragLabel (метка видна только если курсор при перетаскивании отклонился на определенное расстояние)
    dragLabelVisible: false,

    // тип и ID перетаскиваемого объекта в netcat
    draggedInstance: {}, // { type: x, id: n }
    // то же для объекта, на который перетаскиваем
    droppedInstance: {},

    init: function() {
        this.dragLabel = createElement('DIV', {
            id: 'dragLabel',
            'style.display': 'none'
        }, document.body);
        this.dropPositionIndicator = createElement('IMG', {
            id: 'dropPositionIndicator',
            'style.display': 'none',
            'style.position': 'absolute',
            'style.zIndex': 5000
        }, document.body);

        // preload drop position indicators
        this.dropPositionImages.arrowRight = new Image();
        this.dropPositionImages.arrowRight.src = ICON_PATH + 'drop_arrow_right.gif';

        this.dropPositionImages.arrowTop = new Image();
        this.dropPositionImages.arrowTop.src = ICON_PATH + 'drop_arrow_top.gif';

        this.dropPositionImages.line = new Image();
        this.dropPositionImages.line.src = ICON_PATH + 'drop_line.gif';

    }, // end of dragManager.init ------

    // init event listeners on drag start
    initHandlers: function() {
        dragManager.initHandlersInWindow(window);

        var frames = document.getElementsByTagName('IFRAME');
        for (var i=0; i<frames.length; i++) {
            if (frames[i].src.search(/^chrome-/) === -1) {
                dragManager.initHandlersInWindow(frames[i].contentWindow);
            }
        }
    },  // end of initHandlers

    initHandlersInWindow: function(targetWindow) {
        // store frame coords
        if (targetWindow.frameElement) {
            targetWindow.frameOffset = getOffset(targetWindow.frameElement);
        }
        else {
            targetWindow.frameOffset = {
                left: 0,
                top: 0
            };
        }

        // (1) onmousemove
        targetWindow.document.onmousemove = function(e) {
            if (targetWindow != top) targetWindow.scroller.scroll(e);

            if (targetWindow.event) { // IE
                e = targetWindow.event;
            }

            var x = e.clientX + targetWindow.frameOffset.left;
            var y = e.clientY + targetWindow.frameOffset.top;
            dragManager.labelMove(x, y);
        };

        targetWindow.document.onmouseout = function(e) {
            targetWindow.scroller.scrollStop(e);
        };

        // (2) onmouseup
        targetWindow.mouseUpEventId = bindEvent(targetWindow.document, 'mouseup', dragManager.dragEnd);
    },

    removeHandlers: function() {
        dragManager.removeHandlersInWindow(window);

        var frames = document.getElementsByTagName('IFRAME');
        for (var i=0; i<frames.length; i++) {
            if (frames[i].src.search(/^chrome-/) === -1) {
                dragManager.removeHandlersInWindow(frames[i].contentWindow);
            }
        }
    },

    removeHandlersInWindow: function(targetWindow) {
        // (1) onmousemove
        targetWindow.document.onmousemove = null;
        targetWindow.document.onmouseout = null;
        if (targetWindow.scroller) targetWindow.scroller.scrollStop();
        // (2) onmouseup
        unbindEvent(targetWindow.mouseUpEventId);
    },


    idRegexp: /_?([a-z]+)(\d+)?\-([a-f\d]+)$/i, // class-123, message12-345

    // получить тип и ID сущности netcat из ID html-элемента
    // напр., "siteTree_sub-348") -> { type: 'sub', id: '348' }
    // "mainViewToolbar_subclass-223" -> { type: 'subclass', id: '223' }
    // в случае message - еще параметр typeNum
    // "message12-345 -> { type : 'message', typeNum: 12, id: 345 }
    /**
     * Получить параметры перетаскиваемого объекта, необходимые для обработки
     * перетаскивания
     * @param object
     * @returns {*}
     */
    getInstanceData: function(object) {
        var result = this.getInstanceDataFromID(object.id);
        if (result.type && object.treeInstanceName) {
            result.treeInstanceName = object.treeInstanceName;
        }
        return result;
    },

    /**
     * Получить тип и ID сущности netcat из ID html-элемента
     * напр., "siteTree_sub-348" → { type: 'sub', id: '348' }
     * "mainViewToolbar_subclass-223" -> { type: 'subclass', id: '223' }
     * в случае message - еще параметр typeNum
     * "message12-345 -> { type : 'message', typeNum: 12, id: 345 }
     */
    getInstanceDataFromID: function(objectId) {
        var matches = objectId.match(dragManager.idRegexp);
        if (matches) {
            return {
                type: matches[1],
                typeNum: matches[2],
                id: matches[3]
            };
        }
        else {
            return {};
        }
    },

    /**
    * Функция-обработчик для объектов, которые объявлены как droppable
    * - определяет, может ли объект выступать в качестве цели для перетаскивания
    * - если да, перемещает индикаторы перетаскивания
    *
    * Должна быть *применена* (applied) к объекту (нужно использовать bindEvent)
    */
    dropTargetMouseOver: function(e) {
        if (!dragManager.dragInProgress) {
            return false;
        }

        if (!this.acceptsDrop) {
            return false;
        }

        if (dragManager.draggedObject == this) {
            return false;
        }

        var parentObject = this.parentNode;

        while (parentObject) {
            if (parentObject == dragManager.draggedObject) {
                return false;
            }
            parentObject = parentObject.parentNode;
        }

        dragManager.droppedInstance = dragManager.getInstanceData(this.id ? this : this.parentNode);

        if (this.acceptsDrop(this)) {
            // save the object as current target for the drop
            dragManager.dropTargetObject = this;
            if (this.dropIndicator && dragManager.dropPositionImages[this.dropIndicator.name]) {
                var ind = dragManager.dropPositionIndicator;
				if (this.ownerDocument != ind.ownerDocument) {
					var local_ind = $nc(this.ownerDocument.body).data('dropPositionIndicator');
					if (!local_ind) {
						local_ind = $nc(ind).clone(true);
						$nc(this.ownerDocument.body).append(local_ind);
						local_ind = local_ind.get(0);
						$nc(this.ownerDocument.body).data('dropPositionIndicator', local_ind);
					}
					ind  = local_ind;
					dragManager.dropPositionIndicator = ind;
				}
                ind.src = dragManager.dropPositionImages[this.dropIndicator.name].src;
                var pos = getOffset(this, false, false),
                    top = this.dropIndicator.top ? this.dropIndicator.top
                                                 : this.offsetHeight + this.dropIndicator.bottom;
                // положение «индикатора» настраивается в параметрах dropIndicator —
                // см. соответствующие вызовы addDroppable()
                ind.style.top = pos.top + top + 'px';
                ind.style.left = pos.left + this.dropIndicator.left + 'px';
                ind.style.display = '';
            }
        } // of accepts drop

        // stop event propagation
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            if (this.document.parentWindow.event) {
                this.document.parentWindow.event.cancelBubble = true;
            }
        }
    },

    dropTargetMouseOut: function(e) {
        if (!dragManager.dragInProgress) {
            return;
        }
        dragManager.dropTargetObject = null;
        dragManager.droppedInstance = {};
        dragManager.dropPositionIndicator.style.display = 'none';
    },


    labelSetHTML: function(html) {
        this.dragLabel.innerHTML = html;
    },

    //
    labelMove: function(x, y, frameId) {
        // show only if mouse moved already for more than 12px
        if (!this.dragLabelVisible) {
            if (Math.abs(x - this.dragEventX) > 12 || Math.abs(y - this.dragEventY) > 12) {
                this.dragLabelVisible = true;
                this.dragLabel.style.display = '';
            }
        }
        if (!this.dragLabelVisible) return;

        this.dragLabel.style.top = y + 10 + 'px';
        this.dragLabel.style.left = x + 10 + 'px';

    }, // end of dragManager.labelMove


    /**
    * Сделать объект перетаскиваемым
    * @param {Object} handlerObject объект-обработчик перетаскивания ("ручка", за
    *   которую можно "тащить" объект draggedObject)
    * @param {Object} draggedObject объект, который собственно перетаскивается
    *   (если не указан, то это собственно handlerObject)
    */
    addDraggable: function(handlerObject, draggedObject) {
        handlerObject.ondragstart = dragManager.cancelEvent;
        if (!draggedObject) draggedObject = handlerObject;

        if (
            typeof(handlerObject['tagName']) != 'undefined' &&
                typeof(handlerObject['className']) != 'undefined' &&
                handlerObject.tagName == 'I' &&
                handlerObject.className
        ) {
            var classNames = handlerObject.className.split(' ');
            for (var i in classNames) {
                var className = classNames[i];
                if (className.replace(/\s/g, '') == 'nc-icon') {
                    handlerObject.style.cursor = 'move';
                }
            }
        }

        bindEvent(handlerObject, 'mousedown',
            function(e) {
                dragManager.dragStart(e ? e : window.event, draggedObject);
            }, true);
    },

    cancelEvent: function() {
        return false;
    },

    // начало перетаскивания
    // IE: window.event тоже передается первым параметром!
    dragStart: function(e, draggedObject) {
        if (nc.config('drag_mode') == 'disabled') {
            return;
        }

        // check if left button was pressed
        if ((e.stopPropagation && e.button != 0) ||    // DOM (Mozilla)
            (!e.stopPropagation && e.button != 1)      // IE
            ) {
            return;
        } // not a left mouse button

        dragManager.initHandlers();

        dragManager.draggedObject = draggedObject;
        dragManager.dragInProgress = true;

        var dragLabel = draggedObject.dragLabel;
        if (!dragLabel) {
            if (draggedObject.getAttribute('dragLabel')) {
                dragLabel = draggedObject.getAttribute('dragLabel');
            }
            else {
                dragLabel = draggedObject.innerHTML;
            }
        }

        dragManager.labelSetHTML(dragLabel);

        dragManager.draggedInstance = dragManager.getInstanceData(draggedObject);
        // store drag event coordinates
        var windowOffset = draggedObject.ownerDocument.defaultView ?
        draggedObject.ownerDocument.defaultView.frameOffset :  // moz
        draggedObject.ownerDocument.parentWindow.frameOffset;   // IE
        dragManager.dragEventX = e.clientX + windowOffset.left;
        dragManager.dragEventY = e.clientY + windowOffset.top;

        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        else if (e) {
            e.cancelBubble = true;
        }
    },

    // окончание перетаскивания
    dragEnd: function(e) {
        if (dragManager.dropTargetObject) {
            var processDrop = function() {
                dragManager.dropTargetObject.dropHandler();
                dragManager.removeDragData();
            };

            var confirmation = dragManager.getConfirmationMessages();

            if (confirmation) {
                dragManager.showConfirmationDialog(confirmation.title, confirmation.text, confirmation.button, processDrop);
            }
            else {
                processDrop();
            }
        }
        else {
            dragManager.removeDragData();
        }

        dragManager.dragInProgress = false;
        dragManager.dragLabelVisible = false;
        dragManager.dragLabel.style.display = 'none';
        dragManager.dropPositionIndicator.style.display = 'none';
        dragManager.removeHandlers();
    },

    removeDragData: function() {
        dragManager.draggedObject = null;
        dragManager.dropTargetObject = null;
        dragManager.draggedInstance = {};
        dragManager.droppedInstance = {};
    },

    /**
 * сделать объект принимающим перетаскиваемые объекты
 * @param {Object} object объект, который будет принимать перетаскиваемый объект(drop)
 * @param {Function} acceptFn функция проверки возможности сбрасывания объекта на object
 * @param {Function} onDropFn функция, выполняемая при сбрасывании объекта на object
 * @param {Object} dropIndicator см. dragManager.init() - position indicators. Объект со свойствами
 *   { name, top|bottom, left }
 */
    addDroppable: function(object, acceptFn, onDropFn, dropIndicator) {
        object.acceptsDrop = acceptFn;
        object.dropHandler = onDropFn;
        object.dropIndicator = dropIndicator;

        bindEvent(object, 'mouseover', dragManager.dropTargetMouseOver);
        bindEvent(object, 'mouseout',  dragManager.dropTargetMouseOut);
    },

    /**
     * Формирует хэш с данными для показа диалога. Если диалог не будет показываться,
     * возвращает false
     * @return {false|Object}
     */
    getConfirmationMessages: function() {
        if (nc.config('drag_mode') != 'confirm') {
            return false;
        }

        function formatName(string) {
            // Если есть что-то похожее на ID в начале строки, убрать его
            string = string.replace(/^\d+\.\s+/, '');
            var words = string.split(/\s+/),
                maxNumWords = 8,
                result = words.slice(0, maxNumWords).join(' ');
            return $nc.trim(result) + (words.length > maxNumWords ? '…' : '');
        }

        function getNameFromHTML(html) {
            return getNameFromElement('<div>' + html + '</div>');
        }

        function getNameFromElement(el) {
            var $el = $nc(el);
            // уберём тулбар в объектах (на случай, когда нет заголовков — будет взят весь текст в объекте)
            if ($el.find('.nc-toolbar')) {
                $el = $el.clone();
                $el.find('.nc-toolbar').remove();
            }

            return formatName(
                $el.find('h1,h2,h3,h4,h5,h6').first().text().trim() ||  // объект — взять название из первого заголовка
                $el.closest('li').children('a').text().trim() ||  // дерево — "Идентификатор. Название"
                $el.text().trim() || // например: ярлык вкладки — только название; объект без заголовка — всё, кроме тулбаров
                $el.attr('dragLabel') ||
                ''
            );
        }

        function getTreeFromSameWindow(element, treeInstanceName) {
            var doc = element.ownerDocument,
                elWindow = doc.defaultView || doc.parentWindow /* IE8 */;
            return elWindow[treeInstanceName] instanceof elWindow.dynamicTree ? elWindow[treeInstanceName] : null;
        }

        var position = 'inside',
            dropTargetName = getNameFromElement(dragManager.dropTargetObject),
            dropTargetType = dragManager.droppedInstance.type,
            lang = ncLang.DragAndDropConfirm;

        // определение типа перемещения в дереве: inside — внутрь другого узла дерева,
        // below — смена порядка следования элементов, firstIn — первый дочерний узел
        if (dragManager.draggedInstance.treeInstanceName && dragManager.droppedInstance.treeInstanceName) {
            // для упрощения здесь считается, что оба дерева находятся в одном окне
            var tree = getTreeFromSameWindow(dragManager.dropTargetObject, dragManager.droppedInstance.treeInstanceName);
            if (tree) {
                var draggedNodeData = tree.getNodeData(dragManager.draggedInstance),
                    targetNodeData = tree.getNodeData(dragManager.droppedInstance);

                 position = (dragManager.dropTargetObject.tagName == 'I' ? 'below' : 'inside');

                if (position == 'below') {
                    dropTargetName = getNameFromHTML(tree.getNodeData(targetNodeData.nodeId).name);
                    // изменился родитель — это перетаскивание в указанную позицию в другой узел дерева, а не просто изменение сортировки
                    if (targetNodeData.parentNodeId && draggedNodeData.parentNodeId != targetNodeData.parentNodeId) {
                        position = 'inside';
                        var parentNodeId = targetNodeData.parentNodeId;
                        dropTargetName = getNameFromHTML(tree.getNodeData(parentNodeId).name);
                        dropTargetType = dragManager.getInstanceDataFromID(parentNodeId).type;
                    }
                }
                else if (position == 'inside' && draggedNodeData.parentNodeId && draggedNodeData.parentNodeId == targetNodeData.nodeId) {
                    // перетаскивание внутри одного родительского узла на первое место
                    position = 'firstIn';
                }
            }
        }

        var dragType = dragManager.draggedInstance.type + '_' + position + '_' + dropTargetType;

        // Нет языковых констант для этого типа перетаскивания — не будет и диалога
        if (!dragType in lang) {
            return false;
        }

        var messages = lang[dragType];

        return {
            title: messages.title,
            text: messages.text.replace('%1', getNameFromElement(dragManager.draggedObject))
                               .replace('%2', dropTargetName),
            button: messages.button || lang.buttons[position] || lang.buttons.default
        };
    },

    /**
     * Показать диалог подтверждения перетаскивания
     * @param {String} headerText
     * @param {String} messageText
     * @param {String} buttonText
     * @param {Function} onConfirm
     */
    showConfirmationDialog: function(headerText, messageText, buttonText, onConfirm) {
        var dialog = new nc.ui.modal_dialog({ width: 400, height: 'auto', confirm_close: false });
        dialog.get_part('title').html(headerText);
        dialog.get_part('body').html('<div class="nc-drop-confirmation-dialog-body">' + messageText + '</div>');
        dialog.get_part('footer').append(
            $nc('<button>', { html: buttonText }).click(function() {
                onConfirm(); dialog.close();
            }),
            $nc('<button>', { html: ncLang.Cancel, 'data-action': 'close' }).click(function() {
                dragManager.removeDragData(); dialog.close();
            })
        );
        dialog.open();
    }

};

bindEvent(window, 'load', function() {
    dragManager.init();
});

(function(d){function p(){return new Date(Date.UTC.apply(Date,arguments))}function t(a,b){var c=d(a).data(),f={},h,g=RegExp("^"+b.toLowerCase()+"([A-Z])"),b=RegExp("^"+b.toLowerCase()),e;for(e in c)b.test(e)&&(h=e.replace(g,function(a,b){return b.toLowerCase()}),f[h]=c[e]);return f}function u(a){var b={};if(!l[a]&&(a=a.split("-")[0],!l[a]))return;var c=l[a];d.each(v,function(a,d){d in c&&(b[d]=c[d])});return b}var q=d(window),o=function(a,b){this._process_options(b);this.element=d(a);this.isInline=
!1;this.isInput=this.element.is("input");this.hasInput=(this.component=this.element.is(".date")?this.element.find(".add-on, .btn"):!1)&&this.element.find("input").length;if(this.component&&0===this.component.length)this.component=!1;this.picker=d(k.template);this._buildEvents();this._attachEvents();this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu");this.o.rtl&&(this.picker.addClass("datepicker-rtl"),this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right"));
this.viewMode=this.o.startView;this.o.calendarWeeks&&this.picker.find("tfoot th.today").attr("colspan",function(a,b){return parseInt(b)+1});this._allow_update=!1;this.setStartDate(this._o.startDate);this.setEndDate(this._o.endDate);this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);this.fillDow();this.fillMonths();this._allow_update=!0;this.update();this.showMode();this.element.val()&&this.setValue();this.isInline&&this.show()};o.prototype={constructor:o,_process_options:function(a){this._o=d.extend({},
this._o,a);var a=this.o=d.extend({},this._o),b=a.language;if(!l[b]&&(b=b.split("-")[0],!l[b]))b=r.language;a.language=b;switch(a.startView){case 2:case "decade":a.startView=2;break;case 1:case "year":a.startView=1;break;default:a.startView=0}switch(a.minViewMode){case 1:case "months":a.minViewMode=1;break;case 2:case "years":a.minViewMode=2;break;default:a.minViewMode=0}a.startView=Math.max(a.startView,a.minViewMode);a.weekStart%=7;a.weekEnd=(a.weekStart+6)%7;b=k.parseFormat(a.format);if(-Infinity!==
a.startDate)a.startDate=a.startDate?a.startDate instanceof Date?this._local_to_utc(this._zero_time(a.startDate)):k.parseDate(a.startDate,b,a.language):-Infinity;if(Infinity!==a.endDate)a.endDate=a.endDate?a.endDate instanceof Date?this._local_to_utc(this._zero_time(a.endDate)):k.parseDate(a.endDate,b,a.language):Infinity;a.daysOfWeekDisabled=a.daysOfWeekDisabled||[];if(!d.isArray(a.daysOfWeekDisabled))a.daysOfWeekDisabled=a.daysOfWeekDisabled.split(/[,\s]*/);a.daysOfWeekDisabled=d.map(a.daysOfWeekDisabled,
function(a){return parseInt(a,10)});var b=(""+a.orientation).toLowerCase().split(/\s+/g),c=a.orientation.toLowerCase(),b=d.grep(b,function(a){return/^auto|left|right|top|bottom$/.test(a)});a.orientation={x:"auto",y:"auto"};if(c&&"auto"!==c)if(1===b.length)switch(b[0]){case "top":case "bottom":a.orientation.y=b[0];break;case "left":case "right":a.orientation.x=b[0]}else c=d.grep(b,function(a){return/^left|right$/.test(a)}),a.orientation.x=c[0]||"auto",c=d.grep(b,function(a){return/^top|bottom$/.test(a)}),
a.orientation.y=c[0]||"auto"},_events:[],_secondaryEvents:[],_applyEvents:function(a){for(var b=0,c,d;b<a.length;b++)c=a[b][0],d=a[b][1],c.on(d)},_unapplyEvents:function(a){for(var b=0,c,d;b<a.length;b++)c=a[b][0],d=a[b][1],c.off(d)},_buildEvents:function(){this.isInput?this._events=[[this.element,{focus:d.proxy(this.show,this),keyup:d.proxy(this.update,this),keydown:d.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:d.proxy(this.show,this),
keyup:d.proxy(this.update,this),keydown:d.proxy(this.keydown,this)}],[this.component,{click:d.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:d.proxy(this.show,this)}]];this._secondaryEvents=[[this.picker,{click:d.proxy(this.click,this)}],[d(window),{resize:d.proxy(this.place,this)}],[d("body"),{scroll:d.proxy(this.place,this)}],[d(document),{"mousedown touchstart":d.proxy(function(a){!this.element.is(a.target)&&!this.element.find(a.target).length&&
!this.picker.is(a.target)&&!this.picker.find(a.target).length&&this.hide()},this)}]]},_attachEvents:function(){this._detachEvents();this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents();this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(a,b){var c=b||this.date,f=this._utc_to_local(c);this.element.trigger({type:a,
date:f,format:d.proxy(function(a){return k.formatDate(c,a||this.o.format,this.o.language)},this)})},show:function(a){this.isInline||this.picker.appendTo("body");this.picker.show();this.height=this.component?this.component.outerHeight():this.element.outerHeight();this.place();this._attachSecondaryEvents();a&&a.preventDefault();this._trigger("show")},hide:function(){if(!this.isInline&&this.picker.is(":visible"))this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,
this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide")},remove:function(){this.hide();this._detachEvents();this._detachSecondaryEvents();this.picker.remove();delete this.element.data().datepicker;this.isInput||delete this.element.data().date},_utc_to_local:function(a){return new Date(a.getTime()+6E4*a.getTimezoneOffset())},_local_to_utc:function(a){return new Date(a.getTime()-6E4*a.getTimezoneOffset())},
_zero_time:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){return this.date},isoDateFormat:{separators:["","-","-",""],parts:["yyyy","mm","dd"]},getISODate:function(){return this.element.val()?this.getFormattedDate(this.isoDateFormat):null},setDate:function(a){this.setUTCDate(this._local_to_utc(a))},
setUTCDate:function(a){this.date=a;this.setValue()},setValue:function(){var a=this.getFormattedDate();this.isInput?this.element.val(a).change():this.component&&this.element.find("input").val(a).change()},getFormattedDate:function(a){if(void 0===a)a=this.o.format;return k.formatDate(this.date,a,this.o.language)},setStartDate:function(a){this._process_options({startDate:a});this.update();this.updateNavArrows()},setEndDate:function(a){this._process_options({endDate:a});this.update();this.updateNavArrows()},
setDaysOfWeekDisabled:function(a){this._process_options({daysOfWeekDisabled:a});this.update();this.updateNavArrows()},place:function(){if(!this.isInline){var a=this.picker.outerWidth(),b=this.picker.outerHeight(),c=q.width(),f=q.height(),h=q.scrollTop(),g=parseInt(this.element.parents().filter(function(){return"auto"!=d(this).css("z-index")}).first().css("z-index"))+10,e=this.component?this.component.parent().offset():this.element.offset(),j=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),
k=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),i=e.left,l=e.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left");"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(i-=a-k)):(this.picker.addClass("datepicker-orient-left"),0>e.left?i-=e.left-10:e.left+a>c&&(i=c-a-10));a=this.o.orientation.y;"auto"===a&&(a=-h+e.top-b,f=h+f-(e.top+
j+b),a=Math.max(a,f)===f?"top":"bottom");this.picker.addClass("datepicker-orient-"+a);l="top"===a?l+j:l-(b+parseInt(this.picker.css("padding-top")));this.picker.css({top:l,left:i,zIndex:g})}},_allow_update:!0,update:function(){if(this._allow_update){var a=new Date(this.date),b,c=!1;arguments&&arguments.length&&("string"===typeof arguments[0]||arguments[0]instanceof Date)?(b=arguments[0],b instanceof Date&&(b=this._local_to_utc(b)),c=!0):(b=this.isInput?this.element.val():this.element.data("date")||
this.element.find("input").val(),delete this.element.data().date);this.date=k.parseDate(b,this.o.format,this.o.language);c?this.setValue():b?a.getTime()!==this.date.getTime()&&this._trigger("changeDate"):this._trigger("clearDate");this.date<this.o.startDate?(this.viewDate=new Date(this.o.startDate),this.date=new Date(this.o.startDate)):this.date>this.o.endDate?(this.viewDate=new Date(this.o.endDate),this.date=new Date(this.o.endDate)):(this.viewDate=new Date(this.date),this.date=new Date(this.date));
this.fill()}},fillDow:function(){var a=this.o.weekStart,b="<tr>";this.o.calendarWeeks&&(b+='<th class="cw">&nbsp;</th>',this.picker.find(".datepicker-days thead tr:first-child").prepend('<th class="cw">&nbsp;</th>'));for(;a<this.o.weekStart+7;)b+='<th class="dow">'+l[this.o.language].daysMin[a++%7]+"</th>";this.picker.find(".datepicker-days thead").append(b+"</tr>")},fillMonths:function(){for(var a="",b=0;12>b;)a+='<span class="month">'+l[this.o.language].monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").html(a)},
setRange:function(a){!a||!a.length?delete this.range:this.range=d.map(a,function(a){return a.valueOf()});this.fill()},getClassNames:function(a){var b=[],c=this.viewDate.getUTCFullYear(),f=this.viewDate.getUTCMonth(),h=this.date.valueOf(),g=new Date;a.getUTCFullYear()<c||a.getUTCFullYear()==c&&a.getUTCMonth()<f?b.push("old"):(a.getUTCFullYear()>c||a.getUTCFullYear()==c&&a.getUTCMonth()>f)&&b.push("new");this.o.todayHighlight&&a.getUTCFullYear()==g.getFullYear()&&a.getUTCMonth()==g.getMonth()&&a.getUTCDate()==
g.getDate()&&b.push("today");a.valueOf()==h&&b.push("active");(a.valueOf()<this.o.startDate||a.valueOf()>this.o.endDate||-1!==d.inArray(a.getUTCDay(),this.o.daysOfWeekDisabled))&&b.push("disabled");this.range&&(a>this.range[0]&&a<this.range[this.range.length-1]&&b.push("range"),-1!=d.inArray(a.valueOf(),this.range)&&b.push("selected"));return b},fill:function(){var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth(),a=-Infinity!==this.o.startDate?this.o.startDate.getUTCFullYear():-Infinity,
f=-Infinity!==this.o.startDate?this.o.startDate.getUTCMonth():-Infinity,h=Infinity!==this.o.endDate?this.o.endDate.getUTCFullYear():Infinity,g=Infinity!==this.o.endDate?this.o.endDate.getUTCMonth():Infinity,e;this.picker.find(".datepicker-days thead th.datepicker-switch").text(l[this.o.language].months[c]+" "+b);this.picker.find("tfoot th.today").text(l[this.o.language].today).toggle(!1!==this.o.todayBtn);this.picker.find("tfoot th.clear").text(l[this.o.language].clear).toggle(!1!==this.o.clearBtn);
this.updateNavArrows();this.fillMonths();var j=p(b,c-1,28,0,0,0,0),c=k.getDaysInMonth(j.getUTCFullYear(),j.getUTCMonth());j.setUTCDate(c);j.setUTCDate(c-(j.getUTCDay()-this.o.weekStart+7)%7);var m=new Date(j);m.setUTCDate(m.getUTCDate()+42);for(var m=m.valueOf(),c=[],i;j.valueOf()<m;){if(j.getUTCDay()==this.o.weekStart&&(c.push("<tr>"),this.o.calendarWeeks)){i=new Date(+j+864E5*((this.o.weekStart-j.getUTCDay()-7)%7));i=new Date(+i+864E5*((11-i.getUTCDay())%7));var o=new Date(+(o=p(i.getUTCFullYear(),
0,1))+864E5*((11-o.getUTCDay())%7));c.push('<td class="cw">'+((i-o)/864E5/7+1)+"</td>")}i=this.getClassNames(j);i.push("day");if(this.o.beforeShowDay!==d.noop){var n=this.o.beforeShowDay(this._utc_to_local(j));void 0===n?n={}:"boolean"===typeof n?n={enabled:n}:"string"===typeof n&&(n={classes:n});!1===n.enabled&&i.push("disabled");n.classes&&(i=i.concat(n.classes.split(/\s+/)));if(n.tooltip)e=n.tooltip}i=d.unique(i);c.push('<td class="'+i.join(" ")+'"'+(e?' title="'+e+'"':"")+">"+j.getUTCDate()+"</td>");
j.getUTCDay()==this.o.weekEnd&&c.push("</tr>");j.setUTCDate(j.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(c.join(""));e=this.date&&this.date.getUTCFullYear();c=this.picker.find(".datepicker-months").find("th:eq(1)").text(b).end().find("span").removeClass("active");e&&e==b&&c.eq(this.date.getUTCMonth()).addClass("active");(b<a||b>h)&&c.addClass("disabled");b==a&&c.slice(0,f).addClass("disabled");b==h&&c.slice(g+1).addClass("disabled");c="";b=10*parseInt(b/10,10);f=this.picker.find(".datepicker-years").find("th:eq(1)").text(b+
"-"+(b+9)).end().find("td");b-=1;for(g=-1;11>g;g++)c+='<span class="year'+(-1==g?" old":10==g?" new":"")+(e==b?" active":"")+(b<a||b>h?" disabled":"")+'">'+b+"</span>",b+=1;f.html(c)},updateNavArrows:function(){if(this._allow_update){var a=new Date(this.viewDate),b=a.getUTCFullYear(),a=a.getUTCMonth();switch(this.viewMode){case 0:-Infinity!==this.o.startDate&&b<=this.o.startDate.getUTCFullYear()&&a<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"});
Infinity!==this.o.endDate&&b>=this.o.endDate.getUTCFullYear()&&a>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:-Infinity!==this.o.startDate&&b<=this.o.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),Infinity!==this.o.endDate&&b>=this.o.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):
this.picker.find(".next").css({visibility:"visible"})}}},click:function(a){a.preventDefault();a=d(a.target).closest("span, td, th");if(1==a.length)switch(a[0].nodeName.toLowerCase()){case "th":switch(a[0].className){case "datepicker-switch":this.showMode(1);break;case "prev":case "next":a=k.modes[this.viewMode].navStep*("prev"==a[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,a);this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=
this.moveYear(this.viewDate,a),1===this.viewMode&&this._trigger("changeYear",this.viewDate)}this.fill();break;case "today":a=new Date;a=p(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0);this.showMode(-2);this._setDate(a,"linked"==this.o.todayBtn?null:"view");break;case "clear":var b;this.isInput?b=this.element:this.component&&(b=this.element.find("input"));b&&b.val("").change();this._trigger("changeDate");this.update();this.o.autoclose&&this.hide()}break;case "span":if(!a.is(".disabled")){this.viewDate.setUTCDate(1);
if(a.is(".month")){b=1;var c=a.parent().find("span").index(a),f=this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(c);this._trigger("changeMonth",this.viewDate);1===this.o.minViewMode&&this._setDate(p(f,c,b,0,0,0,0))}else f=parseInt(a.text(),10)||0,b=1,c=0,this.viewDate.setUTCFullYear(f),this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(p(f,c,b,0,0,0,0));this.showMode(-1);this.fill()}break;case "td":a.is(".day")&&!a.is(".disabled")&&(b=parseInt(a.text(),10)||1,
f=this.viewDate.getUTCFullYear(),c=this.viewDate.getUTCMonth(),a.is(".old")?0===c?(c=11,f-=1):c-=1:a.is(".new")&&(11==c?(c=0,f+=1):c+=1),this._setDate(p(f,c,b,0,0,0,0)))}},_setDate:function(a,b){if(!b||"date"==b)this.date=new Date(a);if(!b||"view"==b)this.viewDate=new Date(a);this.fill();this.setValue();this._trigger("changeDate");var c;this.isInput?c=this.element:this.component&&(c=this.element.find("input"));c&&c.change();this.o.autoclose&&(!b||"date"==b)&&this.hide()},moveMonth:function(a,b){if(!b)return a;
var c=new Date(a.valueOf()),d=c.getUTCDate(),h=c.getUTCMonth(),g=Math.abs(b),e,b=0<b?1:-1;if(1==g){if(g=-1==b?function(){return c.getUTCMonth()==h}:function(){return c.getUTCMonth()!=e},e=h+b,c.setUTCMonth(e),0>e||11<e)e=(e+12)%12}else{for(var j=0;j<g;j++)c=this.moveMonth(c,b);e=c.getUTCMonth();c.setUTCDate(d);g=function(){return e!=c.getUTCMonth()}}for(;g();)c.setUTCDate(--d),c.setUTCMonth(e);return c},moveYear:function(a,b){return this.moveMonth(a,12*b)},dateWithinRange:function(a){return a>=this.o.startDate&&
a<=this.o.endDate},keydown:function(a){if(this.picker.is(":not(:visible)"))27==a.keyCode&&this.show();else{var b=!1,c,d,h;switch(a.keyCode){case 27:this.hide();a.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;c=37==a.keyCode?-1:1;a.ctrlKey?(d=this.moveYear(this.date,c),h=this.moveYear(this.viewDate,c),this._trigger("changeYear",this.viewDate)):a.shiftKey?(d=this.moveMonth(this.date,c),h=this.moveMonth(this.viewDate,c),this._trigger("changeMonth",this.viewDate)):(d=new Date(this.date),
d.setUTCDate(this.date.getUTCDate()+c),h=new Date(this.viewDate),h.setUTCDate(this.viewDate.getUTCDate()+c));if(this.dateWithinRange(d))this.date=d,this.viewDate=h,this.setValue(),this.update(),a.preventDefault(),b=!0;break;case 38:case 40:if(!this.o.keyboardNavigation)break;c=38==a.keyCode?-1:1;a.ctrlKey?(d=this.moveYear(this.date,c),h=this.moveYear(this.viewDate,c),this._trigger("changeYear",this.viewDate)):a.shiftKey?(d=this.moveMonth(this.date,c),h=this.moveMonth(this.viewDate,c),this._trigger("changeMonth",
this.viewDate)):(d=new Date(this.date),d.setUTCDate(this.date.getUTCDate()+7*c),h=new Date(this.viewDate),h.setUTCDate(this.viewDate.getUTCDate()+7*c));if(this.dateWithinRange(d))this.date=d,this.viewDate=h,this.setValue(),this.update(),a.preventDefault(),b=!0;break;case 13:this.hide();a.preventDefault();break;case 9:this.hide()}if(b){this._trigger("changeDate");var g;this.isInput?g=this.element:this.component&&(g=this.element.find("input"));g&&g.change()}}},showMode:function(a){if(a)this.viewMode=
Math.max(this.o.minViewMode,Math.min(2,this.viewMode+a));this.picker.find(">div").hide().filter(".datepicker-"+k.modes[this.viewMode].clsName).css("display","block");this.updateNavArrows()}};var s=function(a,b){this.element=d(a);this.inputs=d.map(b.inputs,function(a){return a.jquery?a[0]:a});delete b.inputs;d(this.inputs).datepicker(b).bind("changeDate",d.proxy(this.dateUpdated,this));this.pickers=d.map(this.inputs,function(a){return d(a).data("datepicker")});this.updateDates()};s.prototype={updateDates:function(){this.dates=
d.map(this.pickers,function(a){return a.date});this.updateRanges()},updateRanges:function(){var a=d.map(this.dates,function(a){return a.valueOf()});d.each(this.pickers,function(b,c){c.setRange(a)})},dateUpdated:function(a){var b=d(a.target).data("datepicker").getUTCDate(),a=d.inArray(a.target,this.inputs),c=this.inputs.length;if(-1!=a){if(b<this.dates[a])for(;0<=a&&b<this.dates[a];)this.pickers[a--].setUTCDate(b);else if(b>this.dates[a])for(;a<c&&b>this.dates[a];)this.pickers[a++].setUTCDate(b);this.updateDates()}},
remove:function(){d.map(this.pickers,function(a){a.remove()});delete this.element.data().datepicker}};var w=d.fn.datepicker;d.fn.datepicker=function(a){var b=Array.apply(null,arguments);b.shift();var c;this.each(function(){var f=d(this),h=f.data("datepicker"),g="object"==typeof a&&a;if(!h){var h=t(this,"date"),e=d.extend({},r,h,g),e=u(e.language),g=d.extend({},r,e,h,g);f.is(".input-daterange")||g.inputs?(h={inputs:g.inputs||f.find("input").toArray()},f.data("datepicker",h=new s(this,d.extend(g,h)))):
f.data("datepicker",h=new o(this,g))}if("string"==typeof a&&"function"==typeof h[a]&&(c=h[a].apply(h,b),void 0!==c))return!1});return void 0!==c?c:this};var r=d.fn.datepicker.defaults={autoclose:!1,beforeShowDay:d.noop,calendarWeeks:!1,clearBtn:!1,daysOfWeekDisabled:[],endDate:Infinity,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,orientation:"auto",rtl:!1,startDate:-Infinity,startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0},v=d.fn.datepicker.locale_opts=
["format","rtl","weekStart"];d.fn.datepicker.Constructor=o;var l=d.fn.datepicker.dates={en:{days:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(","),daysShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat,Sun".split(","),daysMin:"Su,Mo,Tu,We,Th,Fr,Sa,Su".split(","),months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthsShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),today:"Today",clear:"Clear"}},k={modes:[{clsName:"days",
navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(a){return 0===a%4&&0!==a%100||0===a%400},getDaysInMonth:function(a,b){return[31,k.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(a){var b=a.replace(this.validParts,"\x00").split("\x00"),a=a.match(this.validParts);if(!b||!b.length||!a||
0===a.length)throw Error("Invalid date format.");return{separators:b,parts:a}},parseDate:function(a,b,c){if(a instanceof Date)return a;"string"===typeof b&&(b=k.parseFormat(b));if(/^\d{4}-\d{2}-\d{2}$/.test(a)){var f=a.split("-");return p(f[0],parseInt(f[1],10)-1,f[2],0,0,0)}if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(a)){for(var h=/([\-+]\d+)([dmwy])/,f=a.match(/([\-+]\d+)([dmwy])/g),g,a=new Date,e=0;e<f.length;e++)switch(b=h.exec(f[e]),g=parseInt(b[1]),b[2]){case "d":a.setUTCDate(a.getUTCDate()+
g);break;case "m":a=o.prototype.moveMonth.call(o.prototype,a,g);break;case "w":a.setUTCDate(a.getUTCDate()+7*g);break;case "y":a=o.prototype.moveYear.call(o.prototype,a,g)}return p(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),0,0,0)}var f=a&&a.match(this.nonpunctuation)||[],a=new Date,h={},j="yyyy,yy,M,MM,m,mm,d,dd".split(",");g={yyyy:function(a,b){return a.setUTCFullYear(70>b?2E3+b:b)},yy:function(a,b){return a.setUTCFullYear(2E3+b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;0>b;)b+=12;
b%=12;for(a.setUTCMonth(b);a.getUTCMonth()!=b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};var m;g.M=g.MM=g.mm=g.m;g.dd=g.d;var a=p(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0),i=b.parts.slice();f.length!=i.length&&(i=d(i).filter(function(a,b){return-1!==d.inArray(b,j)}).toArray());if(f.length==i.length){for(var e=0,q=i.length;e<q;e++){m=parseInt(f[e],10);b=i[e];if(isNaN(m))switch(b){case "MM":m=d(l[c].months).filter(function(){var a=this.slice(0,f[e].length),
b=f[e].slice(0,a.length);return a==b});m=d.inArray(m[0],l[c].months)+1;break;case "M":m=d(l[c].monthsShort).filter(function(){var a=this.slice(0,f[e].length),b=f[e].slice(0,a.length);return a==b}),m=d.inArray(m[0],l[c].monthsShort)+1}h[b]=m}for(e=0;e<j.length;e++)c=j[e],c in h&&!isNaN(h[c])&&(b=new Date(a),g[c](b,h[c]),isNaN(b)||(a=b))}return a},formatDate:function(a,b,c){"string"===typeof b&&(b=k.parseFormat(b));c={d:a.getUTCDate(),D:l[c].daysShort[a.getUTCDay()],DD:l[c].days[a.getUTCDay()],m:a.getUTCMonth()+
1,M:l[c].monthsShort[a.getUTCMonth()],MM:l[c].months[a.getUTCMonth()],yy:a.getUTCFullYear().toString().substring(2),yyyy:a.getUTCFullYear()};c.dd=(10>c.d?"0":"")+c.d;c.mm=(10>c.m?"0":"")+c.m;for(var a=[],f=d.extend([],b.separators),h=0,g=b.parts.length;h<=g;h++)f.length&&a.push(f.shift()),a.push(c[b.parts[h]]);return a.join("")},headTemplate:'<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',
footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};k.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+k.headTemplate+"<tbody></tbody>"+k.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+k.headTemplate+k.contTemplate+k.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+k.headTemplate+k.contTemplate+k.footTemplate+
"</table></div></div>";d.fn.datepicker.DPGlobal=k;d.fn.datepicker.noConflict=function(){d.fn.datepicker=w;return this};d(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(a){var b=d(this);b.data("datepicker")||(a.preventDefault(),b.datepicker("show"))});d(function(){d('[data-provide="datepicker-inline"]').datepicker()})})(window.jQuery);

var autosave = null;

function InitAutosave(form_id) {

    var restore = false;
    var fields_to_restore = null;
    if (typeof restoredFields !== 'undefined' && restoredFields !== null) { 
        restore = true;
        fields_to_restore = restoredFields;
        restoredFields = null;
    }
    autosave = $nc("#" + form_id).autosave({
        timeout: ((nc_autosave_type === 'timer' && nc_autosave_period > 0) ? nc_autosave_period : 0),
        noactive: ((typeof nc_autosave_noactive !== 'undefined') ? nc_autosave_noactive : 0),
        restore: restore,
        fields_to_restore: fields_to_restore,
        customKeySuffix: 'nc_',
        // чтобы избежать автозаполнения черновыми данными
        onBeforeRestore: function() {
            return false;
        },
        onSave: function(obj) {
            var self = this;
            var post_data = {};
            self.targets.each(function() {
                var targetId = $nc(this).attr("id");
                var multiCheckboxCache = {};

                self.findFieldsToProtect($nc('#' + targetId)).each(function() {
                    var field = $nc(this);
                    if ($nc.inArray(this, self.options.excludeFields) !== -1 || field.attr("name") === undefined) {
                        // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                        return true;
                    }
                    var value = field.val();

                    if (field.is(":checkbox")) {
                        if (field.attr("name").indexOf("[") !== -1) {
                            if (multiCheckboxCache[ field.attr("name") ] === true) {
                                return;
                            }
                            value = [];
                            $nc("[name='" + field.attr("name") + "']:checked").each(function() {
                                value.push($nc(this).val());
                            });
                            multiCheckboxCache[ field.attr("name") ] = true;
                        } else {
                            value = field.is(":checked");
                        }
                        post_data[field.attr("name")] = value;
                    } else if (field.is(":radio")) {
                        if (field.is(":checked")) {
                            value = field.val();
                            post_data[field.attr("name")] = value;
                        }
                    } else {
                        if (self.isCKEditorExists()) {
                            var editor;
                            if (editor = CKEDITOR.instances[ field.attr("name") ] || CKEDITOR.instances[ field.attr("id") ]) {
                                editor.updateElement();
                                post_data[field.attr("name")] = field.val();
                            } else {
                                post_data[field.attr("name")] = value;
                            }
                        } else {
                            post_data[field.attr("name")] = value;
                        }
                    }
                });
            });
            $nc.ajax({
                'type': 'POST',
                'url': NETCAT_PATH + 'message.php?isVersion=1&cc=' + post_data.cc,
                'data': post_data,
                success: function(response) {
                    if ($nc('.nc_draft_btn').length) {
                        $nc('.nc_draft_btn').removeClass('nc--loading');
                    }
                }
            });
        }
    });

}

//
// jQuery MiniColors: A tiny color picker built on jQuery
//
// Developed by Cory LaViska for A Beautiful Site, LLC
//
// Licensed under the MIT license: http://opensource.org/licenses/MIT
//
!function(i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(C){"use strict";function o(i){var t=i.parent();i.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input"),t.before(i).remove()}function s(i){var t=i.parent(),o=t.find(".minicolors-panel"),s=i.data("minicolors-settings");!i.data("minicolors-initialized")||i.prop("disabled")||t.hasClass("minicolors-inline")||t.hasClass("minicolors-focus")||(a(),t.addClass("minicolors-focus"),o.animate?o.stop(!0,!0).fadeIn(s.showSpeed,function(){s.show&&s.show.call(i.get(0))}):(o.css("opacity",1),s.show&&s.show.call(i.get(0))))}function a(){C(".minicolors-focus").each(function(){var i=C(this),t=i.find(".minicolors-input"),o=i.find(".minicolors-panel"),s=t.data("minicolors-settings");o.animate?o.fadeOut(s.hideSpeed,function(){s.hide&&s.hide.call(t.get(0)),i.removeClass("minicolors-focus")}):(o.css("opacity",0),s.hide&&s.hide.call(t.get(0)),i.removeClass("minicolors-focus"))})}function n(i,t,o){var s,a,n,e,r,c=i.parents(".minicolors").find(".minicolors-input"),l=c.data("minicolors-settings"),h=i.find("[class$=-picker]"),d=i.offset().left,p=i.offset().top,u=Math.round(t.pageX-d),g=Math.round(t.pageY-p),m=o?l.animationSpeed:0;t.originalEvent.changedTouches&&(u=t.originalEvent.changedTouches[0].pageX-d,g=t.originalEvent.changedTouches[0].pageY-p),u<0&&(u=0),g<0&&(g=0),u>i.width()&&(u=i.width()),g>i.height()&&(g=i.height()),i.parent().is(".minicolors-slider-wheel")&&h.parent().is(".minicolors-grid")&&(s=75-u,a=75-g,n=Math.sqrt(s*s+a*a),(e=Math.atan2(a,s))<0&&(e+=2*Math.PI),75<n&&(u=(n=75)-75*Math.cos(e),g=75-75*Math.sin(e)),u=Math.round(u),g=Math.round(g)),r={top:g+"px"},i.is(".minicolors-grid")&&(r.left=u+"px"),h.animate?h.stop(!0).animate(r,m,l.animationEasing,function(){f(c,i)}):(h.css(r),f(c,i))}function f(i,t){function o(i,t){var o,s;return i.length&&t?(o=i.offset().left,s=i.offset().top,{x:o-t.offset().left+i.outerWidth()/2,y:s-t.offset().top+i.outerHeight()/2}):null}var s,a,n,e,r,c,l,h=i.val(),d=i.attr("data-opacity"),p=i.parent(),u=i.data("minicolors-settings"),g=p.find(".minicolors-input-swatch"),m=p.find(".minicolors-grid"),f=p.find(".minicolors-slider"),v=p.find(".minicolors-opacity-slider"),b=m.find("[class$=-picker]"),w=f.find("[class$=-picker]"),y=v.find("[class$=-picker]"),C=o(b,m),k=o(w,f),M=o(y,v);if(t.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")){switch(u.control){case"wheel":e=m.width()/2-C.x,r=m.height()/2-C.y,c=Math.sqrt(e*e+r*r),(l=Math.atan2(r,e))<0&&(l+=2*Math.PI),75<c&&(c=75,C.x=69-75*Math.cos(l),C.y=69-75*Math.sin(l)),a=F(c/.75,0,100),h=q({h:s=F(180*l/Math.PI,0,360),s:a,b:n=F(100-Math.floor(k.y*(100/f.height())),0,100)}),f.css("backgroundColor",q({h:s,s:a,b:100}));break;case"saturation":h=q({h:s=F(parseInt(C.x*(360/m.width()),10),0,360),s:a=F(100-Math.floor(k.y*(100/f.height())),0,100),b:n=F(100-Math.floor(C.y*(100/m.height())),0,100)}),f.css("backgroundColor",q({h:s,s:100,b:n})),p.find(".minicolors-grid-inner").css("opacity",a/100);break;case"brightness":h=q({h:s=F(parseInt(C.x*(360/m.width()),10),0,360),s:a=F(100-Math.floor(C.y*(100/m.height())),0,100),b:n=F(100-Math.floor(k.y*(100/f.height())),0,100)}),f.css("backgroundColor",q({h:s,s:a,b:100})),p.find(".minicolors-grid-inner").css("opacity",1-n/100);break;default:h=q({h:s=F(360-parseInt(k.y*(360/f.height()),10),0,360),s:a=F(Math.floor(C.x*(100/m.width())),0,100),b:n=F(100-Math.floor(C.y*(100/m.height())),0,100)}),m.css("backgroundColor",q({h:s,s:100,b:100}))}x(i,h,d=u.opacity?parseFloat(1-M.y/v.height()).toFixed(2):1)}else g.find("span").css({backgroundColor:h,opacity:d}),I(i,h,d)}function x(i,t,o){var s,a=i.parent(),n=i.data("minicolors-settings"),e=a.find(".minicolors-input-swatch");n.opacity&&i.attr("data-opacity",o),"rgb"===n.format?(s=T(t)?S(t,!0):L(M(t,!0)),o=""===i.attr("data-opacity")?1:F(parseFloat(i.attr("data-opacity")).toFixed(2),0,1),!isNaN(o)&&n.opacity||(o=1),t=i.minicolors("rgbObject").a<=1&&s&&n.opacity?"rgba("+s.r+", "+s.g+", "+s.b+", "+parseFloat(o)+")":"rgb("+s.r+", "+s.g+", "+s.b+")"):(T(t)&&(t=j(t)),t=k(t,n.letterCase)),i.val(t),e.find("span").css({backgroundColor:t,opacity:o}),I(i,t,o)}function d(i,t){var o,s,a,n,e,r,c,l,h,d,p=i.parent(),u=i.data("minicolors-settings"),g=p.find(".minicolors-input-swatch"),m=p.find(".minicolors-grid"),f=p.find(".minicolors-slider"),v=p.find(".minicolors-opacity-slider"),b=m.find("[class$=-picker]"),w=f.find("[class$=-picker]"),y=v.find("[class$=-picker]");switch(T(i.val())?(o=j(i.val()),(e=F(parseFloat(D(i.val())).toFixed(2),0,1))&&i.attr("data-opacity",e)):o=k(M(i.val(),!0),u.letterCase),o||(o=k(z(u.defaultValue,!0),u.letterCase)),s=function(i){var t=function(i){var t={h:0,s:0,b:0},o=Math.min(i.r,i.g,i.b),s=Math.max(i.r,i.g,i.b),a=s-o;t.b=s,t.s=0!==s?255*a/s:0,0!==t.s?i.r===s?t.h=(i.g-i.b)/a:i.g===s?t.h=2+(i.b-i.r)/a:t.h=4+(i.r-i.g)/a:t.h=-1;t.h*=60,t.h<0&&(t.h+=360);return t.s*=100/255,t.b*=100/255,t}(L(i));0===t.s&&(t.h=360);return t}(o),n=u.keywords?C.map(u.keywords.split(","),function(i){return C.trim(i.toLowerCase())}):[],r=""!==i.val()&&-1<C.inArray(i.val().toLowerCase(),n)?k(i.val()):T(i.val())?S(i.val()):o,t||i.val(r),u.opacity&&(a=""===i.attr("data-opacity")?1:F(parseFloat(i.attr("data-opacity")).toFixed(2),0,1),isNaN(a)&&(a=1),i.attr("data-opacity",a),g.find("span").css("opacity",a),l=F(v.height()-v.height()*a,0,v.height()),y.css("top",l+"px")),"transparent"===i.val().toLowerCase()&&g.find("span").css("opacity",0),g.find("span").css("backgroundColor",o),u.control){case"wheel":h=F(Math.ceil(.75*s.s),0,m.height()/2),d=s.h*Math.PI/180,c=F(75-Math.cos(d)*h,0,m.width()),l=F(75-Math.sin(d)*h,0,m.height()),b.css({top:l+"px",left:c+"px"}),l=150-s.b/(100/m.height()),""===o&&(l=0),w.css("top",l+"px"),f.css("backgroundColor",q({h:s.h,s:s.s,b:100}));break;case"saturation":c=F(5*s.h/12,0,150),l=F(m.height()-Math.ceil(s.b/(100/m.height())),0,m.height()),b.css({top:l+"px",left:c+"px"}),l=F(f.height()-s.s*(f.height()/100),0,f.height()),w.css("top",l+"px"),f.css("backgroundColor",q({h:s.h,s:100,b:s.b})),p.find(".minicolors-grid-inner").css("opacity",s.s/100);break;case"brightness":c=F(5*s.h/12,0,150),l=F(m.height()-Math.ceil(s.s/(100/m.height())),0,m.height()),b.css({top:l+"px",left:c+"px"}),l=F(f.height()-s.b*(f.height()/100),0,f.height()),w.css("top",l+"px"),f.css("backgroundColor",q({h:s.h,s:s.s,b:100})),p.find(".minicolors-grid-inner").css("opacity",1-s.b/100);break;default:c=F(Math.ceil(s.s/(100/m.width())),0,m.width()),l=F(m.height()-Math.ceil(s.b/(100/m.height())),0,m.height()),b.css({top:l+"px",left:c+"px"}),l=F(f.height()-s.h/(360/f.height()),0,f.height()),w.css("top",l+"px"),m.css("backgroundColor",q({h:s.h,s:100,b:100}))}i.data("minicolors-initialized")&&I(i,r,a)}function I(i,t,o){var s,a,n,e=i.data("minicolors-settings"),r=i.data("minicolors-lastChange");if(!r||r.value!==t||r.opacity!==o){if(i.data("minicolors-lastChange",{value:t,opacity:o}),e.swatches&&0!==e.swatches.length){for(s=T(t)?S(t,!0):L(t),a=-1,n=0;n<e.swatches.length;++n)if(s.r===e.swatches[n].r&&s.g===e.swatches[n].g&&s.b===e.swatches[n].b&&s.a===e.swatches[n].a){a=n;break}i.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected"),-1!==a&&i.parent().find(".minicolors-swatches .minicolors-swatch").eq(n).addClass("selected")}e.change&&(e.changeDelay?(clearTimeout(i.data("minicolors-changeTimeout")),i.data("minicolors-changeTimeout",setTimeout(function(){e.change.call(i.get(0),t,o)},e.changeDelay))):e.change.call(i.get(0),t,o)),i.trigger("change").trigger("input")}}function k(i,t){return"uppercase"===t?i.toUpperCase():i.toLowerCase()}function M(i,t){return(i=i.replace(/^#/g,"")).match(/^[A-F0-9]{3,6}/gi)?3!==i.length&&6!==i.length?"":(3===i.length&&t&&(i=i[0]+i[0]+i[1]+i[1]+i[2]+i[2]),"#"+i):""}function S(i,t){var o=i.replace(/[^\d,.]/g,"").split(",");return o[0]=F(parseInt(o[0],10),0,255),o[1]=F(parseInt(o[1],10),0,255),o[2]=F(parseInt(o[2],10),0,255),void 0!==o[3]&&(o[3]=F(parseFloat(o[3],10),0,1)),t?void 0!==o[3]?{r:o[0],g:o[1],b:o[2],a:o[3]}:{r:o[0],g:o[1],b:o[2]}:void 0!==o[3]&&o[3]<=1?"rgba("+o[0]+", "+o[1]+", "+o[2]+", "+o[3]+")":"rgb("+o[0]+", "+o[1]+", "+o[2]+")"}function z(i,t){return T(i)?S(i):M(i,t)}function F(i,t,o){return i<t&&(i=t),o<i&&(i=o),i}function T(i){var t=i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return!(!t||4!==t.length)}function D(i){return(i=i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i))&&6===i.length?i[4]:"1"}function j(i){return(i=i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===i.length?"#"+("0"+parseInt(i[1],10).toString(16)).slice(-2)+("0"+parseInt(i[2],10).toString(16)).slice(-2)+("0"+parseInt(i[3],10).toString(16)).slice(-2):""}function p(i){var o=[i.r.toString(16),i.g.toString(16),i.b.toString(16)];return C.each(o,function(i,t){1===t.length&&(o[i]="0"+t)}),"#"+o.join("")}function q(i){return p(function(i){var t={},o=Math.round(i.h),s=Math.round(255*i.s/100),a=Math.round(255*i.b/100);if(0===s)t.r=t.g=t.b=a;else{var n=a,e=(255-s)*a/255,r=o%60*(n-e)/60;360===o&&(o=0),o<60?(t.r=n,t.b=e,t.g=e+r):o<120?(t.g=n,t.b=e,t.r=n-r):o<180?(t.g=n,t.r=e,t.b=e+r):o<240?(t.b=n,t.r=e,t.g=n-r):o<300?(t.b=n,t.g=e,t.r=e+r):o<360?(t.r=n,t.g=e,t.b=n-r):(t.r=0,t.g=0,t.b=0)}return{r:Math.round(t.r),g:Math.round(t.g),b:Math.round(t.b)}}(i))}function L(i){return{r:(i=parseInt(-1<i.indexOf("#")?i.substring(1):i,16))>>16,g:(65280&i)>>8,b:255&i}}C.minicolors={defaults:{animationSpeed:50,animationEasing:"swing",change:null,changeDelay:0,control:"hue",defaultValue:"",format:"hex",hide:null,hideSpeed:100,inline:!1,keywords:"",letterCase:"lowercase",opacity:!1,position:"bottom",show:null,showSpeed:100,theme:"default",swatches:[]}},C.extend(C.fn,{minicolors:function(i,t){switch(i){case"destroy":return C(this).each(function(){o(C(this))}),C(this);case"hide":return a(),C(this);case"opacity":return void 0===t?C(this).attr("data-opacity"):(C(this).each(function(){d(C(this).attr("data-opacity",t))}),C(this));case"rgbObject":return function(i){var t,o=C(i).attr("data-opacity");if(T(C(i).val()))t=S(C(i).val(),!0);else{var s=M(C(i).val(),!0);t=L(s)}if(!t)return null;void 0!==o&&C.extend(t,{a:parseFloat(o)});return t}(C(this));case"rgbString":case"rgbaString":return function(i,t){var o,s=C(i).attr("data-opacity");if(T(C(i).val()))o=S(C(i).val(),!0);else{var a=M(C(i).val(),!0);o=L(a)}if(!o)return null;void 0===s&&(s=1);return t?"rgba("+o.r+", "+o.g+", "+o.b+", "+parseFloat(s)+")":"rgb("+o.r+", "+o.g+", "+o.b+")"}(C(this),"rgbaString"===i);case"settings":return void 0===t?C(this).data("minicolors-settings"):(C(this).each(function(){var i=C(this).data("minicolors-settings")||{};o(C(this)),C(this).minicolors(C.extend(!0,i,t))}),C(this));case"show":return s(C(this).eq(0)),C(this);case"value":return void 0===t?C(this).val():(C(this).each(function(){"object"==typeof t&&null!==t?(void 0!==t.opacity&&C(this).attr("data-opacity",F(t.opacity,0,1)),t.color&&C(this).val(t.color)):C(this).val(t),d(C(this))}),C(this));default:return"create"!==i&&(t=i),C(this).each(function(){!function(t,i){var o,s,a,n,e,r,c,l=C('<div class="minicolors" />'),h=C.minicolors.defaults;if(t.data("minicolors-initialized"))return;i=C.extend(!0,{},h,i),l.addClass("minicolors-theme-"+i.theme).toggleClass("minicolors-with-opacity",i.opacity),void 0!==i.position&&C.each(i.position.split(" "),function(){l.addClass("minicolors-position-"+this)});s="rgb"===i.format?i.opacity?"25":"20":i.keywords?"11":"7";t.addClass("minicolors-input").data("minicolors-initialized",!1).data("minicolors-settings",i).prop("size",s).wrap(l).after('<div class="minicolors-panel minicolors-slider-'+i.control+'"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>'),i.inline||(t.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>'),t.next(".minicolors-input-swatch").on("click",function(i){i.preventDefault(),t.focus()}));if((r=t.parent().find(".minicolors-panel")).on("selectstart",function(){return!1}).end(),i.swatches&&0!==i.swatches.length)for(r.addClass("minicolors-with-swatches"),a=C('<ul class="minicolors-swatches"></ul>').appendTo(r),c=0;c<i.swatches.length;++c)"object"===C.type(i.swatches[c])?(o=i.swatches[c].name,n=i.swatches[c].color):(o="",n=i.swatches[c]),n=T(e=n)?S(n,!0):L(M(n,!0)),C('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color" title="'+o+'"></span></li>').appendTo(a).data("swatch-color",e).find(".minicolors-swatch-color").css({backgroundColor:p(n),opacity:n.a}),i.swatches[c]=n;i.inline&&t.parent().addClass("minicolors-inline");d(t,!1),t.data("minicolors-initialized",!0)}(C(this),t)}),C(this)}}}),C([document]).on("mousedown.minicolors touchstart.minicolors",function(i){C(i.target).parents().add(i.target).hasClass("minicolors")||a()}).on("mousedown.minicolors touchstart.minicolors",".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider",function(i){var t=C(this);i.preventDefault(),C(i.delegateTarget).data("minicolors-target",t),n(t,i,!0)}).on("mousemove.minicolors touchmove.minicolors",function(i){var t=C(i.delegateTarget).data("minicolors-target");t&&n(t,i)}).on("mouseup.minicolors touchend.minicolors",function(){C(this).removeData("minicolors-target")}).on("click.minicolors",".minicolors-swatches li",function(i){i.preventDefault();var t=C(this),o=t.parents(".minicolors").find(".minicolors-input"),s=t.data("swatch-color");x(o,s,D(s)),d(o)}).on("mousedown.minicolors touchstart.minicolors",".minicolors-input-swatch",function(i){var t=C(this).parent().find(".minicolors-input");i.preventDefault(),s(t)}).on("focus.minicolors",".minicolors-input",function(){var i=C(this);i.data("minicolors-initialized")&&s(i)}).on("blur.minicolors",".minicolors-input",function(){var i,t,o,s,a,n=C(this),e=n.data("minicolors-settings");n.data("minicolors-initialized")&&(i=e.keywords?C.map(e.keywords.split(","),function(i){return C.trim(i.toLowerCase())}):[],a=""!==n.val()&&-1<C.inArray(n.val().toLowerCase(),i)?n.val():null===(o=T(n.val())?S(n.val(),!0):(t=M(n.val(),!0))?L(t):null)?e.defaultValue:"rgb"===e.format?e.opacity?S("rgba("+o.r+","+o.g+","+o.b+","+n.attr("data-opacity")+")"):S("rgb("+o.r+","+o.g+","+o.b+")"):p(o),s=e.opacity?n.attr("data-opacity"):1,"transparent"===a.toLowerCase()&&(s=0),n.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity",s),n.val(a),""===n.val()&&n.val(z(e.defaultValue,!0)),n.val(k(n.val(),e.letterCase)))}).on("keydown.minicolors",".minicolors-input",function(i){var t=C(this);if(t.data("minicolors-initialized"))switch(i.which){case 9:a();break;case 13:case 27:a(),t.blur()}}).on("keyup.minicolors",".minicolors-input",function(){var i=C(this);i.data("minicolors-initialized")&&d(i,!0)}).on("paste.minicolors",".minicolors-input",function(){var i=C(this);i.data("minicolors-initialized")&&setTimeout(function(){d(i,!0)},1)})});

(function(f){function q(a){return Object.keys(a).reduce(function(b,c){if("object"===typeof a[c]&&a[c]){var d=q(a[c]);Object.keys(d).forEach(function(a){b[c+"."+a]=d[a]})}else b[c]=a[c];return b},{})}function u(a){var b={},c;for(c in a)r(b,c.split("."),a[c]);return b}function r(a,b,c){for(var d=a,e=b.length-1,g=0;g<e;g++)void 0===d[b[g]]&&(d[b[g]]={}),d=d[b[g]];d[b[e]]=c;return a}function t(a,b,c){return a.replace("%from",b).replace("%to",c)}var m="",h=window.nc_mixin_settings_editor=function(a){if(!(this instanceof
h))return new h(a);this.breakpoints={};this.breakpoints[this.MAX_WIDTH]=this.MAX_WIDTH.toString();this.lang=a.lang||this.lang;this.container=f(a.container);this.component_template_id=a.component_template_id;this.infoblock_id=a.infoblock_id;this.set_breakpoint_type_from_select();this.fonts=a.fonts;this.mixin_type_order=this.get_mixin_type_order();this.calculated_colors={};try{var b=this.find(".nc-mixins-json").val()||"{}";this.set_own_settings(JSON.parse(b)||{})}catch(d){}this.apply_preset_settings();
this.rebuild_table();this.init_event_handlers();var c=this;this.find(".nc-mixins-mixin-settings-lock-sides-button").each(function(){c.init_lock_sides_button(f(this))});this.load_fonts();this.find("select.nc-mixins-mixin-font-select").each(function(){c.init_font_select(f(this))});this.init_color_inputs(this.find("[data-color-input]"))};h.mixin_settings_set_values_event="mixin_settings_set_values_event";h.mixin_settings_new_row_event="mixin_settings_new_row_event";h.breakpoint_type_change_event="breakpoint_type_change";
h.prototype={MAX_WIDTH:9999,lang:{},container:null,selected_preset:"",own_settings:{},component_template_id:void 0,infoblock_id:void 0,fonts:[],selectors:{},breakpoints:{},breakpoint_type:"",inherited_settings:{},temporary_own_settings:{},mixin_type_order:[],constructor:h,find:function(a){return this.container.find(a)},init_event_handlers:function(){var a=this;this.find(".nc-mixins-preset-select").change(f.proxy(this,"on_preset_select_change"));this.find(".nc-mixins-preset-actions .nc--edit").click(f.proxy(this,
"open_preset_edit_dialog"));this.find(".nc-mixins-preset-actions .nc--remove").click(f.proxy(this,"open_preset_delete_dialog"));this.find(".nc-mixins-breakpoint-type-select").change(f.proxy(this,"on_breakpoint_type_select_change")).change();this.find(".nc-mixins-selector-select").change(f.proxy(this,"on_selector_select_change"));this.container.on("click",".nc-mixins-breakpoint-add-button",f.proxy(this,"show_new_breakpoint_dialog"));this.container.on("click",".nc-mixins-breakpoint",f.proxy(this,"show_edit_breakpoint_dialog"));
this.container.on("click",".nc-mixins-add-setting, .nc-mixins-settings-marker",f.proxy(this,"show_mixin_settings"));this.container.on("click",".nc-mixins-settings-cell:not(.nc--active)",function(){var a=f(this).prev(),c=a.find(".nc-mixins-settings-marker");c.length?c.click():a.find(".nc-mixins-add-setting").click()});this.container.on("change",".nc-mixins-mixin-select",function(){a.on_mixin_select_change(f(this),!1)});this.container.on("change input",".nc-mixins-mixin-settings :input",f.proxy(this,
"update_current_mixin_settings"));this.container.on("click",".nc-mixins-mixin-remove",f.proxy(this,"on_remove_settings_button_click"));this.container.on("click",".nc-mixins-mixin-settings-row-add",f.proxy(this,"on_mixin_multiple_settings_add_button_click"));this.container.on("click",".nc-mixins-mixin-settings-row-remove",f.proxy(this,"on_mixin_multiple_settings_remove_button_click"))},get_mixin_input_values:function(a){var b={};a.find("input, select, textarea").filter('[name^="mixin."]').each(function(){var a=
f(this),d=this.name.replace(/^mixin\./,""),e=a.val();if(!a.is(":radio")||a.is(":checked")){if(0<=d.indexOf("#")){if(a.closest(".nc-mixins-mixin-settings-row-template").length)return;var g=a.closest(".nc-mixins-mixin-settings-row"),g=g.parent().children().index(g);0<=g&&(d=d.replace(/#/g,g))}a.is(":checkbox")?b[d]=a.is(":checked")?e:"":a.is('[data-color-input][data-nc-swatches][data-sync-color^="var"]')?b[d]=a.attr("data-sync-color"):b[d]=e}});return b},set_inherited_settings:function(a){var b=!f.isEmptyObject(this.inherited_settings),
c=!f.isEmptyObject(a);if(c){var b=Object.keys(this.breakpoints),d=this.get_breakpoints_as_array_from_settings(a),b=b.filter(function(a){return 0>d.indexOf(a)});if(b.length){for(var e=0;e<b.length;e++)this.remove_breakpoint(b[e]);this.after_breakpoint_change()}}else b&&this.set_own_settings(f.extend({},this.inherited_settings,this.own_settings));this.container.toggleClass("nc-mixins-editor--with-preset",c);this.inherited_settings=a;this.extract_selectors_and_breakpoints(a)},set_own_settings:function(a){this.own_settings=
a;this.extract_selectors_and_breakpoints(a)},extract_selectors_and_breakpoints:function(a){for(var b in a){this.selectors[b]=b;for(var c in a[b])for(var d in a[b][c])this.breakpoints[d]=d}this.sort_breakpoints();this.on_breakpoint_number_change();this.update_selectors_select()},get_breakpoints_as_array_from_settings:function(a){var b={},c;for(c in a)for(var d in a[c])for(var e in a[c][d])b[e]=e;return Object.keys(b)},sort_breakpoints:function(){var a=Object.keys(this.breakpoints).sort(function(a,
b){return a-b});this.breakpoints={};for(var b=0;b<a.length;b++){var c=a[b];this.breakpoints[c]=c}},sort_mixins:function(a){var b={};f.each(this.mixin_type_order,function(c,d){d in a&&(b[d]=a[d])});return b},get_mixin_type_order:function(){var a=[];this.find(".nc-mixins-mixin-row").each(function(){a.push(f(this).data("mixinType"))});return a},on_breakpoint_number_change:function(){this.container.attr("data-breakpoint-number",Object.keys(this.breakpoints).length)},show_new_breakpoint_dialog:function(a){var b=
f(a.target).closest("td");a=parseInt(b.data("breakpoint"),10);var b=parseInt(b.prev().data("breakpoint"),10)||0,c=this.lang,d=c.BREAKPOINT_ADD_PROMPT;if(b||a)d+=" "+t(c.BREAKPOINT_ADD_PROMPT_RANGE,b,a);(c=parseInt(prompt(d+":"),10))&&c>b&&c<a&&this.add_new_breakpoint(c)},add_new_breakpoint:function(a){this.breakpoints[a]=a;this.sort_breakpoints();this.on_breakpoint_number_change();this.rebuild_table()},show_edit_breakpoint_dialog:function(a){if(!this.container.is(".nc-mixins-editor--with-preset")){a=
f(a.target).closest(".nc-mixins-width").data("breakpoint");var b=prompt(this.lang.BREAKPOINT_CHANGE_PROMPT,a);b!=a&&null!==b&&(""===b||"0"===b?this.remove_breakpoint(a):this.replace_breakpoint(a,b),this.after_breakpoint_change())}},replace_breakpoint:function(a,b){var c=this.own_settings,d;for(d in c)for(var e in c[d])c[d][e][a]&&(c[d][e][b]=c[d][e][a]);this.breakpoints[b]=b;this.remove_breakpoint(a)},remove_breakpoint:function(a){var b=this.get_current_selector(),c;for(c in this.own_settings[b])delete this.own_settings[b][c][a];
delete this.breakpoints[a]},after_breakpoint_change:function(){this.temporary_own_settings={};this.close_opened_mixin_settings();this.sort_breakpoints();this.on_breakpoint_number_change();this.rebuild_table();this.update_mixin_json()},update_selectors_select:function(a){var b=this.find(".nc-mixins-selector-select"),c=b.find("option:last"),d=Object.keys(this.selectors).sort();void 0===a&&(a=b.val());b.find(".nc-mixins-selector-select-selector").remove();for(var e=0;e<d.length;e++){var g=d[e];g&&f("<option>",
{value:g,text:g,"class":"nc-mixins-selector-select-selector"}).insertBefore(c)}b.val(a in this.selectors?a:"")},rebuild_table:function(){var a=Object.keys(this.breakpoints).map(Number);this.temporary_own_settings={};this.rebuild_table_head_width_ranges(a);this.rebuild_table_body_width_ranges(a)},rebuild_table_head_width_ranges:function(a){var b=a.length,c="";this.find(".nc-mixins-width-icon").prop("colspan",b);this.find(".nc-mixins-width").remove();for(var d=0;d<b;d++)var e=a[d],c=c+('<td class="nc-mixins-width nc-mixins-width-head" data-breakpoint="'+
e+'"><div class="nc-mixins-breakpoint-add-button-container"><div class="nc-mixins-breakpoint-add-button" title="'+this.lang.BREAKPOINT_ADD+'">+</div></div><div class="nc-mixins-breakpoint"><span>'+(e>=this.MAX_WIDTH?"&#x2731;":e)+"</span></div></td>");c=f(c);c.first().addClass("nc-mixins-width--first");c.last().addClass("nc-mixins-width--last");this.find(".nc-mixins-width-ranges").prepend(c)},rebuild_table_body_width_ranges:function(a){var b=this;this.find(".nc-mixins-mixin-row").each(function(){var c=
f(this),d="",e=a.length;c.find(".nc-mixins-width").remove();for(var g=0;g<e;g++)d+='<td class="nc-mixins-width" data-breakpoint="'+a[g]+'"><div class="nc-mixins-add-setting-container"><div class="nc-mixins-add-setting">+</div></div></td>';d=f(d);d.first().addClass("nc-mixins-width--first");d.last().addClass("nc-mixins-width--last");c.prepend(d);b.update_row_markers(c)})},update_row_markers:function(a){var b=-1,c=0,d=a.find(".nc-mixins-mixin-type-name").html(),e=this,g=a.data("mixinType");a.find(".nc-mixins-width").each(function(a){var k=
f(this),l=k.data("breakpoint"),p=e.make_range_description(c,l);k.prop("title",d+" "+p).data("range",p);k.find(".nc-mixins-settings-marker").remove();k.removeClass(function(a,b){return(b.match(/\bnc-mixins-width--span-\S+/g)||[]).join(" ")});1<a-b&&k.addClass("nc-mixins-width--span-"+(a-b));var p=e.get_settings(e.own_settings,g,l),h=e.get_settings(e.temporary_own_settings,g,l),m=e.get_settings(e.inherited_settings,g,l);p||h?k.append('<div class="nc-mixins-settings-marker nc-mixins-own-settings-marker">\u25cf</div>'):
m&&k.append('<div class="nc-mixins-settings-marker nc-mixins-inherited-settings-marker">\ud83e\udc61</div>');k.toggleClass("nc-mixins-width--with-own-settings",!!p||!!h);k.toggleClass("nc-mixins-width--with-inherited-settings",!!m);if(p||h||m)b=a,c=l})},get_current_selector:function(){return this.find(".nc-mixins-selector-select").val()},on_selector_select_change:function(){"+"===this.find(".nc-mixins-selector-select").val()?this.show_add_selector_dialog():this.rebuild_table()},show_add_selector_dialog:function(){var a=
prompt(this.lang.SELECTOR_ADD_PROMPT);!a||a in this.selectors||(this.selectors[a]=a);this.update_selectors_select(a||"")},get_settings:function(a,b,c){var d;(d=a[this.get_current_selector()])&&(d=d[b])&&(d=d[c]);return d},remove_settings:function(a,b,c){var d=this.get_current_selector();a[d]&&a[d][b]&&(delete a[d][b][c],f.isEmptyObject(a[d][b])&&delete a[d][b])},make_range_description:function(a,b){if(2>Object.keys(this.breakpoints).length)return"";var c=this.breakpoint_type,c="FOR_"+(c?c.toUpperCase()+
"_":"")+"WIDTH_",c=0==a?c+(b==this.MAX_WIDTH?"ANY":"TO"):b==this.MAX_WIDTH?c+"FROM":c+"RANGE";return t(this.lang[c]||"",a,b-1)},set_breakpoint_type_from_select:function(){this.breakpoint_type=this.find(".nc-mixins-breakpoint-type-select").val()||""},on_breakpoint_type_select_change:function(){var a=this;a.set_breakpoint_type_from_select();a.find(".nc-mixins-mixin-row").each(function(){var b=f(this),c=b.find(".nc-mixins-settings-marker.nc--active").closest(".nc-mixins-width").index();a.update_row_markers(b);
0<=c&&b.find(".nc-mixins-width").eq(c).find(".nc-mixins-settings-marker, .nc-mixins-add-setting").click()});this.container.trigger(h.breakpoint_type_change_event,[{editor:this}])},on_preset_select_change:function(){"+"===this.find(".nc-mixins-preset-select").val()?this.open_preset_edit_dialog():this.apply_preset_settings()},open_preset_edit_dialog:function(){var a=this.get_selected_preset_option().data("id"),b="+"===a,c={component_template_id:this.component_template_id};if("0"!==a){b?c["data[Mixin_Settings]"]=
this.find(".nc-mixins-json").val():c.mixin_preset_id=a;var d=this;nc.load_dialog(this.container.data("preset-edit-dialog-url"),c,"POST").set_option("on_submit_response",function(a){a=parseInt(a,10);var b=this.find('input[name="data[Mixin_Preset_Name]"]').val(),c=this.find(".nc-mixins-json").val(),f=this.find(':checkbox[name="set_as_default"]').is(":checked");a&&d.update_preset(a,b,c,f);this.destroy()});b&&this.find(".nc-mixins-preset-select").val("-1").change()}},open_preset_delete_dialog:function(){var a=
{mixin_preset_id:this.get_selected_preset_option().data("id")},b=this;nc.load_dialog(this.container.data("preset-delete-dialog-url"),a,"POST").set_option("on_submit_response",function(a){(a=parseInt(a,10))&&b.delete_preset(a);this.destroy()})},update_preset:function(a,b,c,d){var e=this.find(".nc-mixins-preset-select"),g=e.find('option[data-id="'+a+'"]'),n=e.find('option[value="-1"]'),k=n.data("id")==a;g.length||(g=f("<option>").val(a).insertBefore(e.find("option:last")),e.val(d?"-1":a));d&&(g=g.add(n));
g.html(b).attr({"data-id":a,"data-settings":c}).data({id:a,settings:JSON.parse(c)});d?n.html(this.lang.PRESET_DEFAULT.replace("%s",b)):k&&this.remove_default_preset(a);e.change()},delete_preset:function(a){var b=this.find(".nc-mixins-preset-select");b.find('option[value="'+a+'"]').remove();this.remove_default_preset(a);b.val("-1").change()},remove_default_preset:function(a){this.find(".nc-mixins-preset-select").find('option[value="-1"][data-id="'+a+'"]').attr({"data-id":"0","data-settings":""}).data({id:0,
settings:{}}).html(this.lang.PRESET_DEFAULT_NONE)},get_selected_preset_option:function(){return this.find(".nc-mixins-preset-select option:selected")},apply_preset_settings:function(){var a=this.get_selected_preset_option();this.set_inherited_settings(a.data("settings")||{});this.rebuild_table();this.find(".nc-mixins-preset-actions").toggle(!!a.data("id"));this.update_mixin_json()},close_opened_mixin_settings:function(){var a=this;this.find(".nc-mixins-settings-cell.nc--active").removeClass("nc--active").each(function(){var b=
f(this);if(b.is(".nc-mixins-settings-cell--temporary")){var c=b.closest("tr");a.remove_settings(a.temporary_own_settings,c.data("mixinType"),b.data("breakpoint"));a.update_row_markers(c)}})},show_mixin_settings:function(a){a=f(a.target);var b=a.closest("td"),c=b.closest("tr"),d=c.find(".nc-mixins-settings-cell"),e=c.data("mixinType"),g=b.data("breakpoint"),c=d.find(".nc-mixins-mixin-select");if(!a.is(".nc--active")){this.close_opened_mixin_settings();d.find(".nc-mixins-mixin-range-description").html(b.data("range"));
d.data("breakpoint",g);d.addClass("nc--active");var e=this.get_mixin_settings_values(e,g),g=e.mixin,n=d.find('.nc-mixins-mixin-settings[data-mixin-keyword="'+g+'"]');c.val(g||"");this.on_mixin_select_change(c,!0);this.set_mixin_input_values(n,e,!0);d.toggleClass("nc-mixins-settings-cell--temporary",!a.is(".nc-mixins-own-settings-marker"));a.is(".nc-mixins-add-setting")&&this.update_current_mixin_settings(!0);this.find(".nc-mixins-settings-marker").removeClass("nc--active");b.find(".nc-mixins-settings-marker").addClass("nc--active")}},
set_mixin_input_values:function(a,b,c){a.find(".nc-mixins-mixin-settings-rows").children().remove();"settings.lock_sides"in b&&!b["settings.lock_sides"]&&(b=f.extend({"settings.lock_sides":b["settings.lock_sides"]},b));for(var d in b){var e=(d.match(/\.(\d+)\./)||[])[1],g=void 0!==e?this.get_mixin_multiple_settings_container(a,e):a,e="mixin."+d.replace("."+e+".",".#."),g=g.find('[name="'+e+'"]');g.is(":checkbox")?g.prop("checked",!!b[d]):g.is(":radio")?g.filter('[value="'+b[d].replace('"','\\"')+
'"]').prop("checked",!0):g.is("[data-color-input]")?(g.attr("data-sync-color",b[d]),this.set_color_input(g,b[d])):g.val(b[d]);c&&g.change()}a.trigger(h.mixin_settings_set_values_event,[{editor:this}])},get_mixin_multiple_settings_container:function(a,b){b=parseInt(b,10);var c=a.find(".nc-mixins-mixin-settings-rows"),d=c.find(".nc-mixins-mixin-settings-row"),e=d.length,g=a.find(".nc-mixins-mixin-settings-row-template");if(e>b)return d.eq(b);if(!c.length||!g.length)return a;for(d=a;e++<b+1;)d=g.clone().removeClass("nc-mixins-mixin-settings-row-template").appendTo(c),
this.init_color_inputs(d.find("[data-color-input]"));0<g.find(".nc-mixins-mixin-settings-row-move").length&&c.sortable({handle:".nc-mixins-mixin-settings-row-move",containment:"parent",update:f.proxy(this,"update_current_mixin_settings")});return d},on_mixin_multiple_settings_add_button_click:function(a){a=f(a.target).closest(".nc-mixins-mixin-settings");var b=a.find(".nc-mixins-mixin-settings-rows .nc-mixins-mixin-settings-row").length,b=this.get_mixin_multiple_settings_container(a,b);a.trigger(h.mixin_settings_new_row_event,
[{editor:this,row:b}]);this.update_current_mixin_settings();return!1},on_mixin_multiple_settings_remove_button_click:function(a){f(a.target).closest(".nc-mixins-mixin-settings-row").remove();this.update_current_mixin_settings();return!1},get_mixin_settings_values:function(a,b){var c=this.get_settings(this.own_settings,a,b)||this.get_settings(this.inherited_settings,a,b);if(!c){var d=Object.keys(this.breakpoints).map(Number),e=d.indexOf(b);e<d.length-1&&(c=this.get_mixin_settings_values(a,d[e+1]))}return q(c||
{})},on_mixin_select_change:function(a,b){var c=a.closest(".nc-mixins-settings-cell");c.find(".nc-mixins-mixin-settings").hide().filter('[data-mixin-keyword="'+a.val()+'"]').show().trigger(h.mixin_settings_set_values_event,[{editor:this}]);b||(c.removeClass("nc-mixins-settings-cell--temporary"),this.update_current_mixin_settings())},update_current_mixin_settings:function(a){var b=this;b.find(".nc-mixins-settings-cell.nc--active").each(function(){var c=f(this),d=b.get_current_selector(),e=c.closest(".nc-mixins-mixin-row"),
g=e.data("mixinType"),n=c.find(".nc-mixins-mixin-select").val(),k=c.data("breakpoint"),l=!1,h="own_settings";!0===a?(l=!0,h="temporary_own_settings"):c.hasClass("nc-mixins-settings-cell--temporary")&&(c.removeClass("nc-mixins-settings-cell--temporary"),l=!0);r(b[h],[d,g,k],{mixin:n});c.find('.nc-mixins-mixin-settings[data-mixin-keyword="'+n+'"]').each(function(){var a=b.get_mixin_input_values(f(this));f.extend(b[h][d][g][k],u(a))});l&&(b.update_row_markers(e),e.find('.nc-mixins-width[data-breakpoint="'+
k+'"] .nc-mixins-settings-marker').addClass("nc--active"))});!0!==a&&this.update_mixin_json()},update_mixin_json:function(){var a=f.extend({},this.own_settings),b;for(b in a)f.isEmptyObject(a[b])?delete a[b]:a[b]=this.sort_mixins(a[b]);this.find(".nc-mixins-json").val(JSON.stringify(a))},on_remove_settings_button_click:function(a){var b=f(a.target).closest(".nc-mixins-settings-cell");a=b.closest("tr");var c=a.data("mixinType"),b=b.data("breakpoint");this.remove_settings(this.temporary_own_settings,
c,b);this.remove_settings(this.own_settings,c,b);this.update_row_markers(a);this.close_opened_mixin_settings();this.update_mixin_json()},init_lock_sides_button:function(a){var b=a.closest(".nc-mixins-mixin-settings-lock-sides, .nc-mixins-mixin-settings"),c=b.find(':hidden[name="mixin.settings.lock_sides"]'),d=b.find(":input");c.change(function(){a.removeClass("nc-icon-lock nc-icon-unlock").addClass(c.val()?"nc-icon-lock":"nc-icon-unlock")}).change();a.click(function(){c.val(c.val()?"":"1").change();
d.filter('[name*="top"]').change()});var e=/(top|right|bottom|left)/;d.on("change input blur",function(){if("1"===c.val()){var a=this.attributes,b=f(this).val(),k=new RegExp(this.name.replace(/\./g,"\\.").replace(e,"(top|right|bottom|left)")),h=d.filter(function(){return this.name&&this.name.match(k)});h.val(b);f.each(a,function(a,b){b.name.indexOf("data-sync-")||h.attr(b.name,b.value)});d.filter(".minicolors-input").each(function(){var a=f(this);a.minicolors("value",a.val())})}})},get_font_options_html:function(){m||
f.each(this.fonts,function(a,b){m+="<option name='"+b.name+"' data-asset='"+b.asset+"' data-fallback='"+b.fallback+"' style='font-family:&quot;"+b.name+"&quot;'>"+b.name+"</option>"});return m},init_font_select:function(a){a.html(a.html()+this.get_font_options_html())},init_color_inputs:function(a){var b=this.infoblock_id?this.infoblock_id:0,c=f(".tpl-block-"+b+", .tpl-container-"+b),d={format:"rgb",keywords:"transparent",opacity:!0,swatches:[],theme:"netcat"},e=["--tpl-color-foreground-main","--tpl-color-foreground-accent",
"--tpl-color-brand","--tpl-color-background-accent","--tpl-color-background-main"],g={};0<b&&0<c.length&&(f.each(e,function(a,b){var e=getComputedStyle(c[0]).getPropertyValue(b);e&&(d.swatches.push({name:"var("+b+")",color:e.trim()}),g["var("+b+")"]=e.trim())}),0<d.swatches.length&&a.each(function(){var a=f(this);g.hasOwnProperty(a.attr("data-sync-color"))&&a.val(g[a.attr("data-sync-color")])}));this.calculated_colors=g;a.minicolors("destroy").minicolors(d);"undefined"!==typeof a.data("nc-swatches")&&
(f(".minicolors-swatch-color").on("click",function(){var a=f(this);if(!a.attr("title"))return!0;a.closest(".minicolors-panel").siblings(".minicolors-input").attr("data-sync-color",a.attr("title"))}),f(".minicolors-panel *").on("click",function(a){a=f(a.target);if(a.is(".minicolors-swatches")||0<a.closest(".minicolors-swatches").length)return!0;f(this).closest(".minicolors-panel").siblings(".minicolors-input").attr("data-sync-color","")}))},set_color_input:function(a,b){0===b.indexOf("var")&&this.calculated_colors.hasOwnProperty(b)?
a.minicolors("value",{color:this.calculated_colors[b]}):a.minicolors("value",{color:b})},load_fonts:function(){var a=f("head");f.each(this.fonts,function(b,c){f.each(c.css,function(b,c){f('link[href="'+c+'"]',a).length||a.append(f("<link>",{rel:"stylesheet",href:c}))})})},get_infoblock_element:function(){var a=this.infoblock_id;return a?document.querySelector(".tpl-block-"+a+", .tpl-container-"+a):null}}})($nc);

/*! jQuery UI - v1.12.1 - 2018-02-24
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e=t.css("visibility");"inherit"===e;)t=t.parent(),e=t.css("visibility");return"hidden"!==e}t.ui=t.ui||{},t.ui.version="1.12.1";var i=0,s=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,n,o=s.call(arguments,1),a=0,r=o.length;r>a;a++)for(i in o[a])n=o[a][i],o[a].hasOwnProperty(i)&&void 0!==n&&(e[i]=t.isPlainObject(n)?t.isPlainObject(e[i])?t.widget.extend({},e[i],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,i){var n=i.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=s.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+o+"'")}):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new i(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(u.test(t[0])?e/100:1),parseFloat(t[1])*(u.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var u,p,f,g,m,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,g=_.offset,m=t.extend({},g),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?m.left+=p:"center"===n.at[0]&&(m.left+=p/2),"bottom"===n.at[1]?m.top+=f:"center"===n.at[1]&&(m.top+=f/2),u=e(k.at,p,f),m.left+=u[0],m.top+=u[1],this.each(function(){var s,r,l=t(this),h=l.outerWidth(),c=l.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),x=h+d+i(this,"marginRight")+y.width,C=c+_+i(this,"marginBottom")+y.height,D=t.extend({},m),T=e(k.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?D.left-=h:"center"===n.my[0]&&(D.left-=h/2),"bottom"===n.my[1]?D.top-=c:"center"===n.my[1]&&(D.top-=c/2),D.left+=T[0],D.top+=T[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](D,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:c,collisionPosition:s,collisionWidth:x,collisionHeight:C,offset:[u[0]+T[0],u[1]+T[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(r=function(t){var e=g.left-D.left,i=e+p-h,s=g.top-D.top,r=s+f-c,u={target:{element:v,left:g.left,top:g.top,width:p,height:f},element:{element:l,left:D.left,top:D.top,width:h,height:c},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};h>p&&p>a(e+i)&&(u.horizontal="center"),c>f&&f>a(s+r)&&(u.vertical="middle"),u.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,u)}),l.offset(t.extend(D,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-r-o,(0>s||a(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,(i>0||u>a(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),t.ui.focusable=function(i,s){var n,o,a,r,l,h=i.nodeName.toLowerCase();return"area"===h?(n=i.parentNode,o=n.name,i.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']"),a.length>0&&a.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(h)?(r=!i.disabled,r&&(l=t(i).closest("fieldset")[0],l&&(r=!l.disabled))):r="a"===h?i.href||s:s,r&&t(i).is(":visible")&&e(t(i)))},t.extend(t.expr[":"],{focusable:function(e){return t.ui.focusable(e,null!=t.attr(e,"tabindex"))}}),t.ui.focusable,t.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):t(this[0].form)},t.ui.formResetMixin={_formResetHandler:function(){var e=t(this);setTimeout(function(){var i=e.data("ui-form-reset-instances");t.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var t=this.form.data("ui-form-reset-instances")||[];t.length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t)}},_unbindFormResetHandler:function(){if(this.form.length){var e=this.form.data("ui-form-reset-instances");e.splice(t.inArray(this,e),1),e.length?this.form.data("ui-form-reset-instances",e):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}},"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(e,i){function s(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.ui.escapeSelector=function(){var t=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;return function(e){return e.replace(t,"\\$1")}}(),t.fn.labels=function(){var e,i,s,n,o;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),s=this.attr("id"),s&&(e=this.eq(0).parents().last(),o=e.add(e.length?e.siblings():this.siblings()),i="label[for='"+t.ui.escapeSelector(s)+"']",n=n.add(o.find(i).addBack(i))),this.pushStack(n))},t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.extend(t.expr[":"],{tabbable:function(e){var i=t.attr(e,"tabindex"),s=null!=i;return(!s||i>=0)&&t.ui.focusable(e,s)}}),t.fn.extend({uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}})});
(function(b){"function"===typeof define&&define.amd?define(["jquery","../ie","../version","../widget"],b):b(jQuery)})(function(b){var d=!1;b(document).on("mouseup",function(){d=!1});return b.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.on("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).on("click."+this.widgetName,function(c){if(!0===b.data(c.target,a.widgetName+".preventClickEvent"))return b.removeData(c.target,
a.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1});this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName);this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(a){if(!d){this._mouseMoved=!1;this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,e=1===a.which,f="string"===typeof this.options.cancel&&a.target.nodeName?b(a.target).closest(this.options.cancel).length:
!1;if(!e||f||!this._mouseCapture(a))return!0;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=!0},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)&&(this._mouseStarted=!1!==this._mouseStart(a),!this._mouseStarted))return a.preventDefault(),!0;!0===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(a){return c._mouseMove(a)};
this._mouseUpDelegate=function(a){return c._mouseUp(a)};this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=!0}},_mouseMove:function(a){if(this._mouseMoved){if(b.ui.ie&&(!document.documentMode||9>document.documentMode)&&!a.button)return this._mouseUp(a);if(!a.which)if(a.originalEvent.altKey||a.originalEvent.ctrlKey||a.originalEvent.metaKey||a.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(a)}if(a.which||
a.button)this._mouseMoved=!0;if(this._mouseStarted)return this._mouseDrag(a),a.preventDefault();if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,a))?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted)this._mouseStarted=!1,a.target===this._mouseDownEvent.target&&
b.data(a.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(a);this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer);d=this.ignoreMissingWhich=!1;a.preventDefault()},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},
_mouseCapture:function(){return!0}})});

(function(e){"function"===typeof define&&define.amd?define("jquery,./mouse,../data,../ie,../scroll-parent,../version,../widget".split(","),e):e(jQuery)})(function(e){return e.widget("ui.sortable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,
scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(a,b,c){return a>=b&&a<b+c},_isFloating:function(a){return/left|right/.test(a.css("float"))||/inline|table-cell/.test(a.css("display"))},_create:function(){this.containerCache={};this._addClass("ui-sortable");this.refresh();this.offset=this.element.offset();
this._mouseInit();this._setHandleClassName();this.ready=!0},_setOption:function(a,b){this._super(a,b);"handle"===a&&this._setHandleClassName()},_setHandleClassName:function(){var a=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle");e.each(this.items,function(){a._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var a=this.items.length-1;0<=a;a--)this.items[a].item.removeData(this.widgetName+
"-item");return this},_mouseCapture:function(a,b){var c=null,d=!1,f=this;if(this.reverting||this.options.disabled||"static"===this.options.type)return!1;this._refreshItems(a);e(a.target).parents().each(function(){if(e.data(this,f.widgetName+"-item")===f)return c=e(this),!1});e.data(a.target,f.widgetName+"-item")===f&&(c=e(a.target));if(!c||this.options.handle&&!b&&(e(this.options.handle,c).find("*").addBack().each(function(){this===a.target&&(d=!0)}),!d))return!1;this.currentItem=c;this._removeCurrentsFromItems();
return!0},_mouseStart:function(a,b,c){var d,b=this.options;this.currentContainer=this;this.refreshPositions();this.appendTo=e("parent"!==b.appendTo?b.appendTo:this.currentItem.parent());this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};e.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},relative:this._getRelativeOffset()});
this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!==this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();this.scrollParent=this.placeholder.scrollParent();e.extend(this.offset,{parent:this._getParentOffset()});b.containment&&this._setContainment();if(b.cursor&&"auto"!==b.cursor)d=this.document.find("body"),
this.storedCursor=d.css("cursor"),d.css("cursor",b.cursor),this.storedStylesheet=e("<style>*{ cursor: "+b.cursor+" !important; }</style>").appendTo(d);if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName)this.overflowOffset=
this.scrollParent.offset();this._trigger("start",a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;0<=c;c--)this.containers[c]._trigger("activate",a,this._uiHash(this));if(e.ui.ddmanager)e.ui.ddmanager.current=this;e.ui.ddmanager&&!b.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,a);this.dragging=!0;this._addClass(this.helper,"ui-sortable-helper");if(!this.helper.parent().is(this.appendTo))this.helper.detach().appendTo(this.appendTo),
this.offset.parent=this._getParentOffset();this.position=this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;this.lastPositionAbs=this.positionAbs=this._convertPositionTo("absolute");this._mouseDrag(a);return!0},_scroll:function(a){var b=this.options,c=!1;if(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=
c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else a.pageY-
this.document.scrollTop()<b.scrollSensitivity?c=this.document.scrollTop(this.document.scrollTop()-b.scrollSpeed):this.window.height()-(a.pageY-this.document.scrollTop())<b.scrollSensitivity&&(c=this.document.scrollTop(this.document.scrollTop()+b.scrollSpeed)),a.pageX-this.document.scrollLeft()<b.scrollSensitivity?c=this.document.scrollLeft(this.document.scrollLeft()-b.scrollSpeed):this.window.width()-(a.pageX-this.document.scrollLeft())<b.scrollSensitivity&&(c=this.document.scrollLeft(this.document.scrollLeft()+
b.scrollSpeed));return c},_mouseDrag:function(a){var b,c,d,f;b=this.options;this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||"y"!==this.options.axis)this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||"x"!==this.options.axis)this.helper[0].style.top=this.position.top+"px";this._contactContainers(a);if(null!==this.innermostContainer){b.scroll&&!1!==this._scroll(a)&&(this._refreshItemPositions(!0),e.ui.ddmanager&&
!b.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,a));this.dragDirection={vertical:this._getDragVerticalDirection(),horizontal:this._getDragHorizontalDirection()};for(b=this.items.length-1;0<=b;b--)if(c=this.items[b],d=c.item[0],(f=this._intersectsWithPointer(c))&&c.instance===this.currentContainer&&d!==this.currentItem[0]&&this.placeholder[1===f?"next":"prev"]()[0]!==d&&!e.contains(this.placeholder[0],d)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],d):1)){this.direction=1===
f?"down":"up";if("pointer"===this.options.tolerance||this._intersectsWithSides(c))this._rearrange(a,c);else break;this._trigger("change",a,this._uiHash());break}}e.ui.ddmanager&&e.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return!1},_mouseStop:function(a,b){if(a){e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this,d=this.placeholder.offset(),f=this.options.axis,g={};if(!f||"x"===f)g.left=
d.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft);if(!f||"y"===f)g.top=d.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop);this.reverting=!0;e(this.helper).animate(g,parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new e.Event("mouseup",{target:null}));
"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var a=this.containers.length-1;0<=a;a--)if(this.containers[a]._trigger("deactivate",null,this._uiHash(this)),this.containers[a].containerCache.over)this.containers[a]._trigger("out",null,this._uiHash(this)),this.containers[a].containerCache.over=0}this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem));return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[],a=a||{};e(b).each(function(){var b=(e(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[\-=_](.+)/);b&&c.push((a.key||
b[1]+"[]")+"="+(a.key&&a.expression?b[1]:b[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[],a=a||{};b.each(function(){c.push(e(a.item||this).attr(a.attribute||"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,g=a.left,j=g+a.width,i=a.top,k=i+a.height,h=this.offset.click.top,l=this.offset.click.left,
l="y"===this.options.axis||b+l>g&&b+l<j,h=("x"===this.options.axis||d+h>i&&d+h<k)&&l;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?h:g<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<j&&i<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b;b="x"===this.options.axis||
this._isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);if(!b||!a)return!1;b=this.dragDirection.vertical;a=this.dragDirection.horizontal;return this.floating?"right"===a||"down"===b?2:1:b&&("down"===b?2:1)},_intersectsWithSides:function(a){var b=this._isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height),a=this._isOverAxis(this.positionAbs.left+this.offset.click.left,
a.left+a.width/2,a.width),c=this.dragDirection.vertical,d=this.dragDirection.horizontal;return this.floating&&d?"right"===d&&a||"left"===d&&!a:c&&("down"===c&&b||"up"===c&&!b)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return 0!==a&&(0<a?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return 0!==a&&(0<a?"right":"left")},refresh:function(a){this._refreshItems(a);this._setHandleClassName();this.refreshPositions();
return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor===String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){function b(){g.push(this)}var c,d,f,g=[],j=[],i=this._connectWith();if(i&&a)for(a=i.length-1;0<=a;a--){d=e(i[a],this.document[0]);for(c=d.length-1;0<=c;c--)(f=e.data(d[c],this.widgetFullName))&&f!==this&&!f.options.disabled&&j.push([e.isFunction(f.options.items)?f.options.items.call(f.element):e(f.options.items,f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
f])}j.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(a=j.length-1;0<=a;a--)j[a][0].each(b);return e(g)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(b){for(var c=0;c<a.length;c++)if(a[c]===b.item[0])return!1;return!0})},_refreshItems:function(a){this.items=
[];this.containers=[this];var b,c,d,f,g,j=this.items,i=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):e(this.options.items,this.element),this]];if((g=this._connectWith())&&this.ready)for(b=g.length-1;0<=b;b--){d=e(g[b],this.document[0]);for(c=d.length-1;0<=c;c--)if((f=e.data(d[c],this.widgetFullName))&&f!==this&&!f.options.disabled)i.push([e.isFunction(f.options.items)?f.options.items.call(f.element[0],a,{item:this.currentItem}):e(f.options.items,
f.element),f]),this.containers.push(f)}for(b=i.length-1;0<=b;b--){a=i[b][1];d=i[b][0];for(c=0,g=d.length;c<g;c++)f=e(d[c]),f.data(this.widgetName+"-item",a),j.push({item:f,instance:a,width:0,height:0,left:0,top:0})}},_refreshItemPositions:function(a){var b,c,d;for(b=this.items.length-1;0<=b;b--)if(c=this.items[b],!this.currentContainer||!(c.instance!==this.currentContainer&&c.item[0]!==this.currentItem[0])){d=this.options.toleranceElement?e(this.options.toleranceElement,c.item):c.item;if(!a)c.width=
d.outerWidth(),c.height=d.outerHeight();d=d.offset();c.left=d.left;c.top=d.top}},refreshPositions:function(a){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1;null!==this.innermostContainer&&this._refreshItemPositions(a);var b;if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(a=this.containers.length-1;0<=a;a--)b=this.containers[a].element.offset(),this.containers[a].containerCache.left=
b.left,this.containers[a].containerCache.top=b.top,this.containers[a].containerCache.width=this.containers[a].element.outerWidth(),this.containers[a].containerCache.height=this.containers[a].element.outerHeight();return this},_createPlaceholder:function(a){var a=a||this,b,c,d=a.options;if(!d.placeholder||d.placeholder.constructor===String)b=d.placeholder,c=a.currentItem[0].nodeName.toLowerCase(),d.placeholder={element:function(){var d=e("<"+c+">",a.document[0]);a._addClass(d,"ui-sortable-placeholder",
b||a.currentItem[0].className)._removeClass(d,"ui-sortable-helper");"tbody"===c?a._createTrPlaceholder(a.currentItem.find("tr").eq(0),e("<tr>",a.document[0]).appendTo(d)):"tr"===c?a._createTrPlaceholder(a.currentItem,d):"img"===c&&d.attr("src",a.currentItem.attr("src"));b||d.css("visibility","hidden");return d},update:function(e,g){if(!b||d.forcePlaceholderSize){if(!g.height()||d.forcePlaceholderSize&&("tbody"===c||"tr"===c))g.height(a.currentItem.innerHeight()-parseInt(a.currentItem.css("paddingTop")||
0,10)-parseInt(a.currentItem.css("paddingBottom")||0,10));g.width()||g.width(a.currentItem.innerWidth()-parseInt(a.currentItem.css("paddingLeft")||0,10)-parseInt(a.currentItem.css("paddingRight")||0,10))}}};a.placeholder=e(d.placeholder.element.call(a.element,a.currentItem));a.currentItem.after(a.placeholder);d.placeholder.update(a,a.placeholder)},_createTrPlaceholder:function(a,b){var c=this;a.children().each(function(){e("<td>&#160;</td>",c.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(b)})},
_contactContainers:function(a){var l;var b,c,d,f,g,j,i,k,h=f=null;for(b=this.containers.length-1;0<=b;b--)if(!e.contains(this.currentItem[0],this.containers[b].element[0]))if(this._intersectsWith(this.containers[b].containerCache)){if(!f||!e.contains(this.containers[b].element[0],f.element[0]))f=this.containers[b],h=b}else if(this.containers[b].containerCache.over)this.containers[b]._trigger("out",a,this._uiHash(this)),this.containers[b].containerCache.over=0;if(this.innermostContainer=f)if(1===this.containers.length){if(!this.containers[h].containerCache.over)this.containers[h]._trigger("over",
a,this._uiHash(this)),this.containers[h].containerCache.over=1}else{b=1E4;d=null;l=(c=f.floating||this._isFloating(this.currentItem))?"left":"top",f=l;g=c?"width":"height";k=c?"pageX":"pageY";for(c=this.items.length-1;0<=c;c--)if(e.contains(this.containers[h].element[0],this.items[c].item[0])&&this.items[c].item[0]!==this.currentItem[0]&&(j=this.items[c].item.offset()[f],i=!1,a[k]-j>this.items[c][g]/2&&(i=!0),Math.abs(a[k]-j)<b))b=Math.abs(a[k]-j),d=this.items[c],this.direction=i?"up":"down";if(d||
this.options.dropOnEmpty)if(this.currentContainer===this.containers[h]){if(!this.currentContainer.containerCache.over)this.containers[h]._trigger("over",a,this._uiHash()),this.currentContainer.containerCache.over=1}else{d?this._rearrange(a,d,null,!0):this._rearrange(a,null,this.containers[h].element,!0);this._trigger("change",a,this._uiHash());this.containers[h]._trigger("change",a,this._uiHash(this));this.currentContainer=this.containers[h];this.options.placeholder.update(this.currentContainer,this.placeholder);
this.scrollParent=this.placeholder.scrollParent();if(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName)this.overflowOffset=this.scrollParent.offset();this.containers[h]._trigger("over",a,this._uiHash(this));this.containers[h].containerCache.over=1}}},_createHelper:function(a){var b=this.options,a=e.isFunction(b.helper)?e(b.helper.apply(this.element[0],[a,this.currentItem])):"clone"===b.helper?this.currentItem.clone():this.currentItem;a.parents("body").length||this.appendTo[0].appendChild(a[0]);
if(a[0]===this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};(!a[0].style.width||b.forceHelperSize)&&a.width(this.currentItem.width());(!a[0].style.height||b.forceHelperSize)&&a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){"string"===typeof a&&(a=a.split(" "));e.isArray(a)&&(a={left:+a[0],top:+a[1]||
0});if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],
this.offsetParent[0])&&(a.left+=this.scrollParent.scrollLeft(),a.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var a=this.currentItem.position();
return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a,
b,c;b=this.options;if("parent"===b.containment)b.containment=this.helper[0].parentNode;if("document"===b.containment||"window"===b.containment)this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===b.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===b.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-
this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment))a=e(b.containment)[0],b=e(b.containment).offset(),c="hidden"!==e(a).css("overflow"),this.containment=[b.left+(parseInt(e(a).css("borderLeftWidth"),10)||0)+(parseInt(e(a).css("paddingLeft"),10)||0)-this.margins.left,b.top+(parseInt(e(a).css("borderTopWidth"),10)||0)+(parseInt(e(a).css("paddingTop"),10)||0)-this.margins.top,b.left+(c?Math.max(a.scrollWidth,a.offsetWidth):a.offsetWidth)-(parseInt(e(a).css("borderLeftWidth"),
10)||0)-(parseInt(e(a).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,b.top+(c?Math.max(a.scrollHeight,a.offsetHeight):a.offsetHeight)-(parseInt(e(a).css("borderTopWidth"),10)||0)-(parseInt(e(a).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]},_convertPositionTo:function(a,b){if(!b)b=this.position;var c="absolute"===a?1:-1,d="absolute"===this.cssPosition&&!(this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0]))?
this.offsetParent:this.scrollParent,f=/(html|body)/i.test(d[0].tagName);return{top:b.top+this.offset.relative.top*c+this.offset.parent.top*c-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():f?0:d.scrollTop())*c,left:b.left+this.offset.relative.left*c+this.offset.parent.left*c-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():f?0:d.scrollLeft())*c}},_generatePosition:function(a){var b,c,d=this.options;c=a.pageX;b=a.pageY;var f="absolute"===this.cssPosition&&!(this.scrollParent[0]!==
this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);if("relative"===this.cssPosition&&!(this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();this.originalPosition&&(this.containment&&(a.pageX-this.offset.click.left<this.containment[0]&&(c=this.containment[0]+this.offset.click.left),a.pageY-this.offset.click.top<this.containment[1]&&
(b=this.containment[1]+this.offset.click.top),a.pageX-this.offset.click.left>this.containment[2]&&(c=this.containment[2]+this.offset.click.left),a.pageY-this.offset.click.top>this.containment[3]&&(b=this.containment[3]+this.offset.click.top)),d.grid&&(b=this.originalPageY+Math.round((b-this.originalPageY)/d.grid[1])*d.grid[1],b=this.containment?b-this.offset.click.top>=this.containment[1]&&b-this.offset.click.top<=this.containment[3]?b:b-this.offset.click.top>=this.containment[1]?b-d.grid[1]:b+d.grid[1]:
b,c=this.originalPageX+Math.round((c-this.originalPageX)/d.grid[0])*d.grid[0],c=this.containment?c-this.offset.click.left>=this.containment[0]&&c-this.offset.click.left<=this.containment[2]?c:c-this.offset.click.left>=this.containment[0]?c-d.grid[0]:c+d.grid[0]:c));return{top:b-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():g?0:f.scrollTop()),left:c-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+
("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?b.item[0]:b.item[0].nextSibling);var e=this.counter=this.counter?++this.counter:1;this._delay(function(){e===this.counter&&this.refreshPositions(!d)})},_clear:function(a,b){function c(a,b,c){return function(d){c._trigger(a,d,b._uiHash(b))}}this.reverting=!1;var d,e=[];!this._noFinalSort&&
this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]===this.currentItem[0]){for(d in this._storedCSS)if("auto"===this._storedCSS[d]||"static"===this._storedCSS[d])this._storedCSS[d]="";this.currentItem.css(this._storedCSS);this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!b&&e.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))});(this.fromOutside||this.domPosition.prev!==
this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!==this.currentItem.parent()[0])&&!b&&e.push(function(a){this._trigger("update",a,this._uiHash())});this!==this.currentContainer&&!b&&(e.push(function(a){this._trigger("remove",a,this._uiHash())}),e.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.currentContainer)),e.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.currentContainer)));
for(d=this.containers.length-1;0<=d;d--)if(b||e.push(c("deactivate",this,this.containers[d])),this.containers[d].containerCache.over)e.push(c("out",this,this.containers[d])),this.containers[d].containerCache.over=0;this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove());this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex);this.dragging=
!1;b||this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(!this.cancelHelperRemoval)this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!b){for(d=0;d<e.length;d++)e[d].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=!1;return!this.cancelHelperRemoval},_trigger:function(){!1===e.Widget.prototype._trigger.apply(this,arguments)&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,
placeholder:b.placeholder||e([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}})});

!function(v){if(v){var o=5242880,c="FileReader"in window;v.fn.upload=function(){return this.each(function(){var e=v(this);if(!e.hasClass("nc-upload-applied")){e.addClass("nc-upload-applied");var i,a=d(e),n=e.find(".nc-upload-files"),l=n.find(".nc-upload-file");if(0<l.length&&!a&&e.find(".nc-upload-input").hide(),l.each(function(){var e=v(this),n=e.data("type"),a=e.find(".nc-upload-file-name");t(e,n,a.html(),a.data("preview-url"),!1)}),setTimeout(function(){C(e)},10),e.on("change",".nc-upload-input",function(){var e,u,s,c,p,n,f,r;a?(s=v(u=this),c=g(s),p=c.data("maxFiles"),n=c.data("fieldName"),f=function(e){return"multifile_"+e+"["+n+"][]"},r=h(u),s.hide().clone().val("").appendTo(c).show(),s.removeClass("nc-upload-input").appendTo(c.find(".nc-upload-new-files")),v.each(r,function(e){var n,a,i,l=(a="nextUploadIndex",i=(n=c).data(a)||0,n.data(a,i+1),i);1==r.length&&s.addClass("nc-upload-file-index--"+l);var d=m(u,e).hide().data("uploadIndex",l).append(x(f("id")),x(f("upload_index"),l),x(f("delete"),0).addClass("nc-upload-file-remove-hidden"));if(c.data("customName")){var o=c.data("customNameCaption"),t=y("text",f("name"),"",o);v('<div class="nc-upload-file-custom-name"/>').append(t).appendTo(d)}p&&"0"!=p&&w(c)>=p?b(d):d.slideDown(100)}),C(c)):(e=this).value&&(m(e,0).hide().slideDown(100).find(".nc-upload-file-custom-name input:text").focus(),C(g(e)))}),n.find(".nc-upload-file-remove").attr("onclick",""),u(n),a&&e.append(x("multifile_js["+e.data("fieldName")+"]",1)),a)n.on("mousedown",".nc-upload-file-drag-handle",function(e){e.preventDefault(),n.addClass("nc--dragging"),i=v(this).closest(".nc-upload-file").addClass("nc--dragged"),v(window).on("mouseup.nc-upload",function(){n.removeClass("nc--dragging"),i.removeClass("nc--dragged"),v(window).off("mouseup.nc-upload"),i=null})}),n.on("mousemove",".nc-upload-file",function(e){var n,a=v(this);if(i&&!a.hasClass("nc--dragged")){if("none"==a.css("float"))n=e.pageY-a.offset().top<a.height()/2;else n=e.pageX-a.offset().left<a.width()/2;n?i.insertBefore(a):i.insertAfter(a)}})}})},v(document).on("apply-upload",function(e){v(".nc-upload").upload()})}function m(e,n){var a=h(e)[n],i=v('<div class="nc-upload-file"><div class="nc-upload-file-info"><span class="nc-upload-file-name">'+a.name+'</span> <a href="#" class="nc-upload-file-remove" tabindex="-1">×</a></div></div>'),l=g(e).find(".nc-upload-files");if(c&&a.size<o&&p(a.type)){var d=new FileReader;d.onload=function(e){t(i,a.type,a.name,e.target.result,!0)},d.readAsDataURL(a)}else t(i,a.type,a.name,null,!0);return i.appendTo(l),u(i),i}function t(e,n,a,i,l){var d="nc-upload-file-preview",o="nc-upload-file-drag-handle",t=v("<div/>").addClass(d+" "+o),u=i&&p(n);if(u&&c)t.addClass(d+"-image").append('<img src="'+i+'" />'),g(e).addClass("nc-upload-with-preview");else{var s=a.lastIndexOf(".");t.addClass(d+"-other"),0<s&&t.append('<span class="nc-upload-file-extension">'+a.substr(s+1)+"</span>")}return e.prepend('<div class="nc-upload-file-drag-icon '+o+'"><i class="nc-icon nc--file-text"></i></div>',t),(u||e.closest(".nc-upload-with-preview").length)&&c&&(l?t.slideDown(100):t.show()),t}function p(e){return/^image\/(jpe?g|png|gif|bmp|svg([+-]xml)?)$/i.test(e)}function h(e){return c?e.files:[{name:e.value.substr(e.value.lastIndexOf("\\")+1),type:"",size:0}]}function d(e){return e.hasClass("nc-upload-multifile")}function g(e){return v(e).closest(".nc-upload")}function w(e){return e.find(".nc-upload-file:visible").length}function C(e){var n=d(e)?e.data("maxFiles"):1;n&&e.find(".nc-upload-input").toggle(w(e)<n)}function x(e,n){return y("hidden",e,n)}function y(e,n,a,i){return v("<input />",{type:e,name:n,value:void 0===a?"":a,placeholder:i||""})}function a(e){e.preventDefault(),e.stopPropagation();var n=v(e.target).closest(".nc-upload-file"),a=g(n),i=a.find(".nc-upload-input"),l=i;return b(n),d(a)?a.find(".nc-upload-file-index--"+n.data("uploadIndex")).val(""):(l=i.clone().val("").show(),i.replaceWith(l)),n.slideUp(100,function(){var e="nc-upload-with-preview";a.hasClass(e)&&0==a.find(".nc-upload-file:visible .nc-upload-file-preview-image").length&&a.removeClass(e);var n=v.Event("change");n.target=l[0],v(document).trigger(n),C(a)}),!1}function b(e){e.find(".nc-upload-file-remove-hidden").val(1).trigger("change")}function u(e){var n="click.nc-upload";e.find(".nc-upload-file-remove").off(n).on(n,a)}}(window.$nc||window.jQuery);
if (typeof(lsDisplayLibLoaded) == 'undefined') {
    var lsDisplayLibLoaded = true;
    var E_CLICK  = 0,
        E_SUBMIT = 1;

    jQuery(function(){
        var bindEvents = function($container){
            jQuery('[data-nc-ls-display-link]', $container).click(function(){
                eventHandler(this, true, E_CLICK);
                return false;
            });
            jQuery('form[data-nc-ls-display-form]', $container).submit(function(){
                eventHandler(this, true, E_SUBMIT);
                return false;
            });
        }

        var eventHandler = function(element, callBindEvents, event_type){

            switch (event_type) {

                case E_SUBMIT:
                    var url_attr  = 'action';
                    var data_attr = 'data-nc-ls-display-form';
                    break;

                case E_CLICK:
                default:
                    var url_attr  = 'href';
                    var data_attr = 'data-nc-ls-display-link';
                    break;
            }

            var $this    = jQuery(element);
            var url      = $this.attr(url_attr);
            var obj_data = $this.attr(data_attr);

            if (obj_data) {
                obj_data = jQuery.parseJSON(obj_data);
            }
            else {
                return false;
            }

            var replace_content = obj_data.subdivisionId !== false;

            if (url) {
                if (obj_data.displayType == 'shortpage' || (obj_data.displayType == 'longpage_vertical' && typeof(obj_data.subdivisionId) == 'undefined')) {

                    var send_as_post = event_type === E_SUBMIT && $this.attr('method').toLowerCase() === 'post';
                    var send_data    = jQuery.extend({}, obj_data.query); // clone

                    send_data.isNaked       = parseInt(typeof send_data.isNaked !== 'undefined' ? send_data.isNaked : 1);
                    send_data.lsDisplayType = obj_data.displayType;
                    send_data.skipTemplate  = parseInt(send_data.skipTemplate ? send_data.skipTemplate : obj_data.displayType == 'shortpage' && typeof(obj_data.subdivisionId) != 'undefined' ? 1 : 0);

                    if (send_as_post) {
                        url += (url.indexOf('?') >= 0 ? '&' : '?') + jQuery.param(send_data);
                        send_data = $this.serialize();
                    }

                    jQuery.ajax({
                        type:    send_as_post ? 'POST' : 'GET',
                        url:     url,
                        data:    send_data,
                        success: function(data){
                            var $container = [];

                            if (typeof(obj_data.onSubmit) !== 'undefined') {
                                if (data[0] == '{' || data[0] == '[') {
                                    data = jQuery.parseJSON(data);
                                }

                                if ((eval(obj_data.onSubmit)).call($this.get(0), data) === false) {
                                    replace_content = false;
                                }
                            }

                            if ( ! replace_content) {
                                return false;
                            }

                            if (typeof(obj_data.subdivisionId) == 'undefined') {
                                $container = $this.closest('[data-nc-ls-display-container]');
                            } else {
                                jQuery('[data-nc-ls-display-container]').each(function(){
                                    var $element = jQuery(this);
                                    var containerData = $element.attr('data-nc-ls-display-container');
                                    if (containerData) {
                                        containerData = jQuery.parseJSON(containerData);
                                        if (containerData.subdivisionId == obj_data.subdivisionId) {
                                            $container = $element;
                                            return false;
                                        }
                                    }

                                    return true;
                                });
                            }

                            if (!$container.length) {
                                $container = jQuery('[data-nc-ls-display-container]');
                            }

                            $container.html(data);

                            if (callBindEvents) {
                                bindEvents($container);
                            }

                            if (typeof(parent.nc_ls_quickbar) != 'undefined') {
                                var quickbar = parent.nc_ls_quickbar;
                                if (quickbar) {
                                    var $quickbar = jQuery('.nc-navbar').first();
                                    $quickbar.find('.nc-quick-menu LI:eq(0) A').attr('href', quickbar.view_link);
                                    $quickbar.find('.nc-quick-menu LI:eq(1) A').attr('href', quickbar.edit_link);
                                    $quickbar.find('.nc-menu UL LI:eq(0) A').attr('href', quickbar.sub_admin_link);
                                    $quickbar.find('.nc-menu UL LI:eq(1) A').attr('href', quickbar.template_admin_link);
                                    $quickbar.find('.nc-menu UL LI:eq(2) A').attr('href', quickbar.admin_link);
                                }
                            }
                        }
                    });

                } else if (obj_data.displayType == 'longpage_vertical') {
                    var scrolled = false;

                    var scrollToContainer = function(containerData, $element){
                        if (containerData) {
                            containerData = jQuery.parseJSON(containerData);
                            if (containerData.subdivisionId == obj_data.subdivisionId) {
                                jQuery('HTML,BODY').animate({
                                    scrollTop: $element.offset().top - jQuery('BODY').offset().top
                                }, containerData.animationSpeed);
                                return true;
                            }
                        }

                        return false;
                    };

                    jQuery('[data-nc-ls-display-pointer]').each(function(){
                        var $element = jQuery(this);
                        if (scrollToContainer($element.attr('data-nc-ls-display-pointer'), $element)) {
                            scrolled = true;
                            return false;
                        }

                        return true;
                    });

                    if (!scrolled) {
                        jQuery('[data-nc-ls-display-container]').each(function(){
                            var $element = jQuery(this);

                            if (scrollToContainer($element.attr('data-nc-ls-display-container'), $element)) {
                                return false;
                            }

                            return true;
                        });
                    }
                }

                if (replace_content) {
                    if (!!(window.history && history.pushState)) {
                        window.history.pushState({}, '', url);
                    }
                }

                if (event_type === E_CLICK) {
                    if (typeof(obj_data.onClick) == 'undefined') {
                        $this.addClass('active').siblings().removeClass('active');
                    } else {
                        eval('var callback = ' + obj_data.onClick);
                        callback.call($this.get(0));
                    }
                }

                return false;
            }
        }

        jQuery('[data-nc-ls-display-link]').click(function(){
            eventHandler(this, true, E_CLICK);
            return false;
        });

        jQuery('form[data-nc-ls-display-form]').submit(function(){
            eventHandler(this, true, E_SUBMIT);
            return false;
        });

        jQuery('[data-nc-ls-display-pointer]').each(function(){
            var $this = jQuery(this);
            var data = jQuery.parseJSON($this.attr('data-nc-ls-display-pointer'));
            if (data.onReadyScroll) {
                setTimeout(function(){
                    jQuery('HTML,BODY').scrollTop($this.offset().top);
                }, 1000);
                return false;
            }

            return true;
        });
    });
}
