$(function() {

	//Test that allFeeds[] is defined and populated
	describe('RSS Feeds', function() {
		//Test to ensure allFeeds[] is defined and not empty.
		it('allFeeds[] is defined and populated', function() {
        	expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
        });

		//Loop through each feed in allFeeds[] and ensure that it
		//has a URL defined and the URL is not empty.
		it('feed urls are defined and not empty', function() {
			for (let i=0; i<=allFeeds.length-1; i++) {
				expect(allFeeds[i].url).toBeDefined();
				//containing http proves .url is not empty and, at least, looks
				//like a valid address
				expect(allFeeds[i].url).not.toBe('');
				//expect(allFeeds[i].url).toContain('http');
			}
		});

		//Loop through each feed in allFeeds[] and test that each
		//url entry is valid
		it('feed urls have a valid url format', function() {
			for (let i=0; i<=allFeeds.length-1; i++) {
				expect(isURL(allFeeds[i].url)).toBe(true);
			}
			// isURL(str) is taken from https://github.com/chriso/validator.js/blob/master/validator.js
			function isURL(str) {
				var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
				var url = new RegExp(urlRegex, 'i');
				return str.length < 2083 && url.test(str);
			}
		});

		//Loop through allFeeds[] and ensure .name is defined
		//and populated for each.
		it('feed names are defined and not empty', function() {
			for (let i=0; i<=allFeeds.length-1; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).toBeGreaterThan(0);
			}
		});
    });

	//Tests to ensure the menu is is hidden by default and that its'
	//visibilty is toggled when the menu icon is clicked.
	describe('The Menu', function(){
	 	//Test that the menu is hidden by default
        it('menu is hidden by default', function() {
            //body tag has the menu-hidden class
            expect($('body')[0].classList.contains('menu-hidden')).toBe(true);
            //check menu transform to verify menu is truly hidden
            expect($('.menu-hidden .slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });

        //nested 2nd describe so some delay could be introduced to allow css
        //properties to be applied to the menu
        describe('Menu Visibility Toggle', function() {
        	//trigger a click on the menu then wait a bit before moving on
			beforeEach(function(done) {
				$('.menu-icon-link').trigger('click');
		 		setTimeout(done,400);
		 	});

			//test that the menu visibilty will toggle when the menu icon is clicked
			it('menu toggled to visible when menu icon is clicked', function() {
				//check class of body tag and location of menu to ensure menu visible
				expect($('body')[0].classList.contains('menu-hidden')).toBe(false);
				expect($('.slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, 0, 0)');
			});

			it('menu toggled to hidden when menu icon is clicked again', function() {
				//check class of body tag and location of menu to ensure menu hidden
				expect($('body')[0].classList.contains('menu-hidden')).toBe(true);
				expect($('.menu-hidden .slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
			});
        });
    });

    //Test that when the loadFeed function is called there is at least one .entry
    //element in the .feed container after completion.
    describe('Initial Entries', function(){
   		var initTitle,
   			curTitle='';

   		//load the first feed and get title of first entry
   		//this runs once before all other calls
   		beforeAll(function(done) {
   			loadFeed(0, function() {
   				//get title after initial feed loaded
   				initTitle=$('.feed').find('h2').first().text();
   				done();
   			});
   		});

   		//load the second feed.  This runs after the beforeAll function and
   		//is necessary to prove content changes when the feed is changed.
   		beforeEach(function(done) {
   			loadFeed(1, function() {
   				done();
   			});
   		});

   		//Test to show there at least one .entry element in the .feed container
   		it('should contain at least one .entry element in the .feed container', function(done) {
   			expect($('.feed .entry').length).toBeGreaterThan(0);
   			done();
   		});

   		//Test to show content changes when feed is changed.
   		it('content should change when feedlist is changed', function(done) {
   			//get current title after new feed was loaded
   			curTitle=$('.feed').find('h2').first().text();
   			expect(initTitle).not.toBe(curTitle);
   			done();
   		});
	});

}());