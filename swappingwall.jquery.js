(function($){
    $.fn.SwappingWall = function(options) {
    	if(options.itemsInRow === undefined || options.itemsInRow === null){
    		throw new Error('ItemsInRow parameter is required');
    	} else {
    			var self  = this;
    			var numberOfItems = self.children().length - 1;
    			var interval;
    			self.addClass("swappingwall");
    			self.children().css('position','relative');
    			self.children().css('overflow','hidden');
    			self.children().css('height', 'auto');
    			self.children().css('float', 'left');
    			var body = {
    				itemsInRow: 0,
    				time: 2500,
    				duration: 500,
    				stop: false,
    				mainWidth: '',
    				br_settings: '',
    				setValues: function(_itemsInRow, _time, _duration, _stop){
    					this.itemsInRow = _itemsInRow;
    					self.children().css('width', ''+ 100/this.itemsInRow +'%');
    					if(_time !== undefined || _time !== null){
    						if(_time>1000){
    							this.time = _time;
    						}
    					}
    					if(_duration !== undefined || _duration !== null){
    						if(_duration > 300){
    							this.duration = _duration;
    						}
    					}
    					if(_stop !== undefined || _stop !== null){
    						this.stop = _stop;
    					}
    					if(this.time - this.duration < 300){
    						this.time = 2500;
    						this.duration = 500;
    					}
    					if(this.stop !== true){
    						this.timer();
    					}
    				},
    				setValuesByWidth: function(){
    					this.mainWidth = $(window).width();
    					this.br_settings = options.responsive;
    					var bp = [];
    					for(var i = 0; i<this.br_settings.length; i++){
    						bp.push(this.br_settings[i].breakpoint);
    					}
    					this.closestHighter(bp, this.mainWidth, function(neededBreakpoint){
    						if(neededBreakpoint == 0){
    							this.setValues(options.itemsInRow, options.time, options.duration);
    							return false;
    						} else {
    							for(var j = 0; j<this.br_settings.length; j++){
    								if(this.br_settings[j].breakpoint == neededBreakpoint){
    									this.setValues(this.br_settings[j].itemsInRow, this.br_settings[j].time, this.br_settings[j].duration, this.br_settings[j].stop);
    									break;
    								}
    							}
    						}
    					}.bind(this)); // binded function closestHighter to body's context
    				},
    				timer: function(){
    					interval = setInterval(this.animation.calculate.bind(this), this.time);  // Binded function calculate to body object's context
    				},
    				animation: {
    					index: '',
    					edgeNumbers: [],
    					choosenItemFirst: '',
    					choosenItemSecond: '',
    					choosenItemFirstHeight: '',
    					choosenItemFirstWidth: '',
    					choosenItemSecondHeight: '',
    					choosenItemSecondWidth: '',
    					firstItemPosition: '',
    					secondItemPosition: '',
    					moveDistance1: '',
    					moveDistance2: '',
    					target: '',
    					arr: [1,2],
    					calculate: function(){    // "this" in calculate method has body object context
    						this.animation.index = this.getRandomInt(numberOfItems);
    						setTimeout(function(){
	    						this.animation.edgeNumbers = [];
	    						for(var i = this.itemsInRow - 1 ; i <= numberOfItems; i = i + this.itemsInRow){
	    							this.animation.edgeNumbers.push(i)
	    						}
	    						this.animation.choosenItemFirst = self.children().eq(this.animation.index);
	    						this.animation.choosenItemFirstHeight = this.animation.choosenItemFirst.height();
	    						this.animation.choosenItemFirstWidth = this.animation.choosenItemFirst.width();
	    						this.animation.target = this.animation.arr[Math.floor(Math.random() * this.animation.arr.length)];
	    						if(this.animation.target == 1){ 
	    							if(this.ifEdgePointHorizontal(this.animation.index) > -1){
	    								this.animation.rightToLeft(this.itemsInRow, this.duration);
	    							} else {
	    								this.animation.leftToRight(this.itemsInRow, this.duration);
	    							}
	    						} else if(this.animation.target == 2){ 
	    							if(this.animation.index <= this.itemsInRow - 1){
	    								this.animation.topToBottom(this.itemsInRow, this.duration);
	    							} else if(this.animation.index >= numberOfItems - this.itemsInRow && this.animation.index <= numberOfItems-1){
	    								this.animation.bottomToTop(this.itemsInRow, this.duration);
	    							} else {
	    								this.animation.topToBottom(this.itemsInRow, this.duration);
	    							}
	    						}
    						}.bind(this), 200) 
    					},
    					bottomToTop: function(_itemsInRow, _duration){
    							this.choosenItemSecond = self.children().eq(this.index - _itemsInRow);
    							if(this.choosenItemSecond.length !== 0){
    								this.choosenItemSecondHeight = this.choosenItemSecond.height();
    								this.firstItemPosition = this.choosenItemFirst.css("top");
    								this.secondItemPosition = this.choosenItemSecond.css("top");
    								this.moveDistance1 = parseInt(this.firstItemPosition) - this.choosenItemFirstHeight;
    								this.moveDistance2 = parseInt(this.secondItemPosition) + this.choosenItemSecondHeight;
    								this.choosenItemFirst.stop(true,true).animate({
    								    top: this.moveDistance1,
    								}, _duration ); 
    								this.choosenItemSecond.stop(true,true).animate({
    								    top: this.moveDistance2,
    								}, _duration );
    								setTimeout(function(){
    									this.swapElements(this.choosenItemFirst[0], this.choosenItemSecond[0], this.choosenItemFirst, this.choosenItemSecond);
    								}.bind(this), _duration + 100)
    							} else {
    								return false;
    							}
    					},
    					topToBottom: function(_itemsInRow, _duration){
    							this.choosenItemSecond = self.children().eq(this.index + _itemsInRow);
    							if(this.choosenItemSecond.length !== 0){
    								this.choosenItemSecondHeight = this.choosenItemSecond.height();
    								this.firstItemPosition = this.choosenItemFirst.css("top");
    								this.secondItemPosition = this.choosenItemSecond.css("top");
    								this.moveDistance1 = parseInt(this.firstItemPosition) + this.choosenItemFirstHeight;
    								this.moveDistance2 = parseInt(this.secondItemPosition) - this.choosenItemSecondHeight;
    								this.choosenItemFirst.stop(true,true).animate({
    								    top: this.moveDistance1,
    								}, _duration ); 
    								this.choosenItemSecond.stop(true,true).animate({
    								    top: this.moveDistance2,
    								}, _duration );
    								setTimeout(function(){
    									this.swapElements(this.choosenItemFirst[0], this.choosenItemSecond[0], this.choosenItemFirst, this.choosenItemSecond);
    								}.bind(this), _duration + 100)
    							} else {
    								return false;
    							}
    					},
    					leftToRight: function(_itemsInRow, _duration){
    							this.choosenItemSecond = self.children().eq(this.index + 1);
    							if(this.choosenItemSecond.length !== 0){
    								this.choosenItemSecondWidth = this.choosenItemSecond.width();
    								this.firstItemPosition = this.choosenItemFirst.css("left");
    								this.secondItemPosition = this.choosenItemSecond.css("left");
    								this.moveDistance1 = parseInt(this.firstItemPosition) + this.choosenItemFirstWidth;
    								this.moveDistance2 = parseInt(this.secondItemPosition) - this.choosenItemSecondWidth;
    								this.choosenItemFirst.stop(true,true).animate({
    								    left: this.moveDistance1,
    								}, _duration ); 
    								this.choosenItemSecond.stop(true,true).animate({
    								    left: this.moveDistance2,
    								}, _duration );
    								setTimeout(function(){
    									this.swapElements(this.choosenItemFirst[0], this.choosenItemSecond[0], this.choosenItemFirst, this.choosenItemSecond);
    								}.bind(this), _duration + 100)	
    							} else {
    								return false;
    							}
    					},
    					rightToLeft: function(_itemsInRow, _duration){
    							this.choosenItemSecond = self.children().eq(this.index - 1);
    							if(this.choosenItemSecond.length !== 0){
    								this.choosenItemSecondWidth = this.choosenItemSecond.width();
    								this.firstItemPosition = this.choosenItemFirst.css("left");
    								this.secondItemPosition = this.choosenItemSecond.css("left");
    								this.moveDistance1 = parseInt(this.firstItemPosition) - this.choosenItemFirstWidth;
    								this.moveDistance2 = parseInt(this.secondItemPosition) + this.choosenItemSecondWidth;
    								this.choosenItemFirst.stop(true,true).animate({
    								    left: this.moveDistance1,
    								}, _duration ); 
    								this.choosenItemSecond.stop(true,true).animate({
    								    left: this.moveDistance2,
    								}, _duration );
    								setTimeout(function(){
    									this.swapElements(this.choosenItemFirst[0], this.choosenItemSecond[0], this.choosenItemFirst, this.choosenItemSecond);
    								}.bind(this), _duration + 100)	
    							} else {
    								return false;
    							}
    					},
    					swapElements: function(elm1, elm2, nodeElm1, nodeElm2) {
    						    var parent1, next1, parent2, next2;
    						    parent1 = elm1.parentNode;
    						    next1   = elm1.nextSibling;
    						    parent2 = elm2.parentNode;
    						    next2   = elm2.nextSibling;
    						    parent1.insertBefore(elm2, next1);
    						    parent2.insertBefore(elm1, next2);
    						    self.children().css("left", 0);
    						    self.children().css("top", 0);
    					}
    				},
    				getRandomInt: function(max){
    					return Math.floor(Math.random() * (max - 0 + 1)) + 0;
    				},
    				ifEdgePointHorizontal: function(index){  
    					return this.animation.edgeNumbers.indexOf(index);
    				},
    				closestHighter: function(arr, closestTo, callback){
    					var closest = Math.max.apply(null, arr);
    					if(closestTo > closest){
    						callback(0);
    						return false;
    					} else {
    						for(var i = 0; i < arr.length; i++){ 
    						    if(arr[i] >= closestTo && arr[i] < closest){
    						    	closest = arr[i]; 
    						    }
    						}
    					}
    					callback(closest);
    					return false;
    				}
    			}
    			if(options.responsive === undefined || options.responsive === null){
    				body.setValues(options.itemsInRow, options.time, options.duration);
    			} else {
    				body.setValuesByWidth();
    			}
    			$(window).bind('resize', function(e){
    			    window.resizeEvt;
    			    $(window).resize(function(){
    			        clearTimeout(window.resizeEvt);
    			        window.resizeEvt = setTimeout(function(){
    			        	clearInterval(interval);
    			        	body.setValuesByWidth();
    			        }, 250);
    			    });
    			});
    	}
    };
})(jQuery);




	