/*!
* jQuery.Accordion
*
* @version beta
* @author Kazuhito Shiba
*/

(function($){
	$.fn.jAccordion = function(options){
		return this.each(function(){
			new $.JAccordion(this,options);
		});
	};
	
	$.JAccordion = function(_this,options){
		this.setting = $.extend({
			headClass: 'head',
			openClass: 'open',
			closeClass: 'close',
			speed: 0,
			easing: 'swing',
			autoClose: false
		},options);
		
		this.wrap = $(_this);
		this.head = this.wrap.find('.'+this.setting.headClass);
		this.content = this.head.next();
		this.init();
	};
	
	$.JAccordion.prototype = {
		init: function(){
			var self = this;
			
			this.head.css('cursor','pointer');
			
			this.content.each(function(){
				var _head = $(this).prev('.'+self.setting.headClass);
				
				if($(this).hasClass(self.setting.openClass)){
					_head.addClass(self.setting.openClass);
				}else{
					$(this)
						.add(_head)
						.addClass(self.setting.closeClass)
						.end()
						.hide();
				};
			});
			
			this.action();
		},
		action: function(){
			var self = this;
			
			this.head.click(function(){
				var target = $(this).next();
				
				if($(this).hasClass(self.setting.openClass)){
					self.close($(this),target);
				}else{
					self.open($(this),target);
					if(self.setting.autoClose){
						var clicked = $(this);
						var parent_head = clicked.closest(self.content).prev();
						var close_head = $(self.head,self.wrap).not(clicked).not(parent_head);
						var close_target = close_head.next();
						self.close(close_head,close_target);
					};
				};
			});
		},
		open: function(head,content){
			content
				.animate({
					height: 'show'
				},{
					duration: this.setting.speed,
					easing: this.setting.easing,
					queue: false
				})
				.add(head)
				.removeClass(this.setting.closeClass)
				.addClass(this.setting.openClass);
		},
		close: function(head,content){
			content
				.animate({
					height: 'hide'
				},{
					duration: this.setting.speed,
					easing: this.setting.easing,
					queue: false
				})
				.add(head)
				.removeClass(this.setting.openClass)
				.addClass(this.setting.closeClass);
		}
	};
	
})(jQuery);







