(function($){
    $.fn.SwappingWall = function(options) {
    	if(options.itemsInRow === undefined || options.itemsInRow === null){
    		throw new Error('ItemsInRow parameter is required');
    	} else {
    			var self  = this;

	    		var numberOfItems, itemsInRow, index, choosenItemFirst, choosenItemFirstHeight, choosenItemFirstWidth,
	    		    target, choosenItemSecond, choosenItemSecondHeight, choosenItemSecondWidth, interval,
	    			firstPosition, secondPosition, moveDistance1, moveDistance2, time, duration, br_settings = [], mainWidth,
	    			arr = [1,2], heightFirstElement,
	    			edgeNumbers = [];
	    			
	    		heightFirstElement = self.children().first().height();
	    		self.addClass("swappingwall");
	    		self.children().css('position','relative');
				self.children().css('height', heightFirstElement);
				self.children().css('overflow','hidden');

	    		if(options.responsive === undefined || options.responsive === null){
	    			settingValues(options.itemsInRow, options.time, options.duration);
	    		} else {
	    			settingsByWidth();
	    		}
	    		numberOfItems = self.children().length - 1;
	    		function runTimer(){
	    			interval = setInterval(runAnimation, time);
	    		}
	    		function runAnimation(){
	    			
	    			   index = getRandomInt(null, numberOfItems);
	    			   setTimeout(function(){
	    			   	edgeNumbers = [];
	    			   	for(var i = itemsInRow - 1 ; i <= numberOfItems; i = i + itemsInRow){
	    			   		edgeNumbers.push(i)
	    			   	}
	    			   	choosenItemFirst = self.children().eq(index);
	    			   	choosenItemFirstHeight = Math.round(choosenItemFirst.height() * 10) / 10;
	    			   	choosenItemFirstWidth = Math.round(choosenItemFirst.width() * 10) / 10;
	    			   	target = arr[Math.floor(Math.random() * arr.length)];
	    			   	if(target == 1){ 
	    			   		if(ifEdgePointHorizontal(index) > -1){
	    			   			RightToLeft();
	    			   		} else {
	    			   			LeftToRight();
	    			   		}
	    			   	} else if(target == 2){ 
	    			   		if(index <= itemsInRow - 1){
	    			   			TopToBottom();
	    			   		} else if(index >= numberOfItems - itemsInRow && index <= numberOfItems-1){
	    			   			BottomToTop();
	    			   		} else {
	    			   			TopToBottom(); 
	    			   		}
	    			   	}
	    			   }, 200)      
	    			
	    		}
	    		function settingsByWidth(){
	    			mainWidth = $(window).width();
	    			br_settings = options.responsive;
	    			var bp = [];
	    			for(var i = 0; i<br_settings.length; i++){
	    				bp.push(br_settings[i].breakpoint);
	    			}
	    			closestHighter(bp, mainWidth, function(neededBreakpoint){
	    				if(neededBreakpoint == 0){
	    					settingValues(options.itemsInRow, options.time, options.duration);
	    					return false;
	    				} else {
	    					for(var j = 0; j<br_settings.length; j++){
	    						if(br_settings[j].breakpoint == neededBreakpoint){
	    							settingValues(br_settings[j].itemsInRow, br_settings[j].time, br_settings[j].duration, br_settings[j].stop);
	    							break;
	    						}
	    					}
	    				}
	    			});
	    		}

	    	function ifEdgePointHorizontal(index){  
	    		return edgeNumbers.indexOf(index);
	    	}
	    	function settingValues(a, b, c, d){
	    		itemsInRow = a;
	    		self.children().css('width', ''+ 100/itemsInRow +'%');
	    		if(b === undefined || b === null){
	    			if(options.time){
	    				time = options.time;
	    			} else {
	    				time = 2500;
	    			}
	    		} else {
	    			if(b < 1000){
	    				time = 2500;
	    			} else {
	    				time = b;
	    			}
	    		}
	    		if(c === undefined || c === null){
	    			if(options.duration){
	    				duration = options.duration;
	    			} else {
	    				duration = 500;
	    			}
	    		} else {
	    			if(c < 300){
	    				duration = 500;
	    			} else {
	    				duration = c;
	    			}
	    		}
	    		if(time-duration < 300){
	    			time = 2500;
	    			duration = 500;
	    		}
	    		console.log(itemsInRow, time, duration);
	    		if($.isNumeric(itemsInRow) && $.isNumeric(time) && $.isNumeric(duration)){
	    			if(d !== true){
	    				runTimer();
	    			}
	    		} else {
	    			throw new Error('Some parameters are not defined');
	    		}
	    	} 
	    	function BottomToTop(){
	    			choosenItemSecond = self.children().eq(index - itemsInRow);
	    			if(choosenItemSecond.length !== 0){
	    				choosenItemSecondHeight = Math.round(choosenItemSecond.height() * 10) / 10;
	    				firstPosition = choosenItemFirst.css("top");
	    				secondPosition = choosenItemSecond.css("top");
	    				moveDistance1 = parseInt(firstPosition) - choosenItemFirstHeight;
	    				moveDistance2 = parseInt(secondPosition) + choosenItemSecondHeight;
	    				choosenItemFirst.stop(true,true).animate({
	    				    top: moveDistance1,
	    				}, duration ); 
	    				choosenItemSecond.stop(true,true).animate({
	    				    top: moveDistance2,
	    				}, duration );
	    				setTimeout(function(){
	    					swapElements(choosenItemFirst[0], choosenItemSecond[0], choosenItemFirst, choosenItemSecond);
	    				}, duration + 100)
	    			} else {
	    				return false;
	    			}
	    	}
	    	function TopToBottom(){
	    			choosenItemSecond = self.children().eq(index + itemsInRow);
	    			if(choosenItemSecond.length !== 0){
	    				choosenItemSecondHeight = Math.round(choosenItemSecond.height() * 10) / 10;
	    				firstPosition = choosenItemFirst.css("top");
	    				secondPosition = choosenItemSecond.css("top");
	    				moveDistance1 = parseInt(firstPosition) + choosenItemFirstHeight;
	    				moveDistance2 = parseInt(secondPosition) - choosenItemSecondHeight;
	    				choosenItemFirst.stop(true,true).animate({
	    				    top: moveDistance1,
	    				}, duration ); 
	    				choosenItemSecond.stop(true,true).animate({
	    				    top: moveDistance2,
	    				}, duration );
	    				setTimeout(function(){
	    					swapElements(choosenItemFirst[0], choosenItemSecond[0], choosenItemFirst, choosenItemSecond);
	    				}, duration + 100)
	    			} else {
	    				return false;
	    			}
	    	}
	    	function LeftToRight(){
	    			choosenItemSecond = self.children().eq(index + 1);
	    			if(choosenItemSecond.length !== 0){
	    				choosenItemSecondWidth = Math.round(choosenItemSecond.width() * 10) / 10;
	    				firstPosition = choosenItemFirst.css("left");
	    				secondPosition = choosenItemSecond.css("left");
	    				moveDistance1 = parseInt(firstPosition) + choosenItemFirstWidth;
	    				moveDistance2 = parseInt(secondPosition) - choosenItemSecondWidth;
	    				choosenItemFirst.stop(true,true).animate({
	    				    left: moveDistance1,
	    				}, duration ); 
	    				choosenItemSecond.stop(true,true).animate({
	    				    left: moveDistance2,
	    				}, duration );
	    				setTimeout(function(){
	    					swapElements(choosenItemFirst[0], choosenItemSecond[0], choosenItemFirst, choosenItemSecond);
	    				}, duration + 100)	
	    			} else {
	    				return false;
	    			}
	    	}
	    	function RightToLeft(){
	    			choosenItemSecond = self.children().eq(index - 1);
	    			if(choosenItemSecond.length !== 0){
	    				choosenItemSecondWidth = Math.round(choosenItemSecond.width() * 10) / 10;
	    				firstPosition = choosenItemFirst.css("left");
	    				secondPosition = choosenItemSecond.css("left");
	    				moveDistance1 = parseInt(firstPosition) - choosenItemFirstWidth;
	    				moveDistance2 = parseInt(secondPosition) + choosenItemSecondWidth;
	    				choosenItemFirst.stop(true,true).animate({
	    				    left: moveDistance1,
	    				}, duration ); 
	    				choosenItemSecond.stop(true,true).animate({
	    				    left: moveDistance2,
	    				}, duration );
	    				setTimeout(function(){
	    					swapElements(choosenItemFirst[0], choosenItemSecond[0], choosenItemFirst, choosenItemSecond);
	    				}, duration + 100)	
	    			} else {
	    				return false;
	    			}
	    	}
	    	function swapElements(elm1, elm2, nodeElm1, nodeElm2) {
	    		    var parent1, next1,
	    		        parent2, next2;
	    		    parent1 = elm1.parentNode;
	    		    next1   = elm1.nextSibling;
	    		    parent2 = elm2.parentNode;
	    		    next2   = elm2.nextSibling;
	    		    parent1.insertBefore(elm2, next1);
	    		    parent2.insertBefore(elm1, next2);
	    		    self.children().css("left", 0);
	    		    self.children().css("top", 0);
	    	}
	    	function getRandomInt(min, max) {
	    			min = 0;
	    		    return Math.floor(Math.random() * (max - min + 1)) + min;
	    	}
	    	function closestHighter(arr, closestTo, callback){
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
	    	$(window).bind('resize', function(e){
	    	    window.resizeEvt;
	    	    $(window).resize(function(){
	    	        clearTimeout(window.resizeEvt);
	    	        window.resizeEvt = setTimeout(function(){
	    	        	clearInterval(interval);
	    	        	settingsByWidth();
	    	        }, 250);
	    	    });
	    	});
    	}
    };
})(jQuery);




	