angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("class.html","<section class=\"hero\" style=\"background-image: url(\'/images/outside-yoga.jpg\')\">\n    <div class=\"container clear\">\n\n        <div class=\"class-teacher\">\n            <div class=\"thumbnail\">\n                <img class=\"img-rounded\" ng-src=\"http://dev.yourclass.co/web/uploads/images/user_photos/200/34.png\"/>\n            </div>\n            <div class=\"text-center text\">\n                <div>\n                    {{ class.class.teacher.profile.firstName | capitalize }}\n                    {{ class.class.teacher.profile.lastName | capitalize }}\n                </div>\n                <small class=\"italic\">\n                    Teacher\n                </small>\n            </div>\n        </div>\n\n        <div class=\"content\">\n\n            <div class=\"text-center text\">\n                <h1>{{ class.class.title }}</h1>\n                <small class=\"italic\">\n                    Sydney, NSW\n                </small>\n                <div class=\"review-stars\">\n                    <div class=\"stars\">\n                        <span class=\"icon icon-star\"></span>\n                        <span class=\"icon icon-star\"></span>\n                        <span class=\"icon icon-star\"></span>\n                        <span class=\"icon icon-star_half\"></span>\n                        <span class=\"icon icon-star_border\"></span>\n                    </div>\n                    <div class=\"\">\n                        4 Reviews\n                    </div>\n                </div>\n                <div class=\"\">\n                  {{ class.class.brief }}\n                    Football skills class is based in Moore Park, Sydney. It is an hour long session and takes up to 10 students.\n                </div>\n            </div>\n\n        </div>\n    </div>\n</section>\n\n<!--\n\n  Class title\n\n  Teacher pic\n  Teacher name\n\n  Class reviews\n  Location\n  Tags\n  Mini description\n\n  About class name\n  Big description\n  Images\n\n  Class fee\n  List of class dates\n  Number of students\n  Book button\n  Spots left\n\n\n -->\n<section class=\"panel\">\n    <div class=\"container\">\n        <div class=\"class-content\">\n\n            <h2>{{ class.class.title }}\n                taught by\n                {{ class.class.teacher.profile.firstName | capitalize }}\n                {{ class.class.teacher.profile.lastName | capitalize }}</h2>\n            <div class=\"class-description\">\n              {{ class.class.description }}\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu mattis nunc. Nam cursus metus ac scelerisque sollicitudin. Phasellus viverra sed dolor vel ornare. Pellentesque nunc felis, congue in eros et, imperdiet consectetur erat. Mauris a\n                libero posuere, convallis mi ut, interdum diam. Nunc iaculis dapibus lorem, quis pellentesque justo tempus et. Nulla bibendum lectus scelerisque, facilisis sem vel, ornare augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur\n                ridiculus mus. Sed iaculis dignissim dolor vitae ultricies. Nullam fringilla orci eros. Phasellus vel lectus augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut vestibulum id augue eu porta. In hac\n                habitasse platea dictumst.\n            </div>\n\n        </div>\n    </div>\n</section>\n\n<section class=\"panel panel-grey\">\n    <div class=\"container\">\n        <div class=\"class-content\">\n\n            <h2>Photos</h2>\n            <div class=\"class-photos\">\n                <ul>\n                    <li>\n                        <a href=\"#\">\n                            Photo 1\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\">\n                            Photo 1\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\">\n                            Photo 1\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\">\n                            Photo 1\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\">\n                            Photo 1\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"#\">\n                            Photo 1\n                        </a>\n                    </li>\n                </ul>\n            </div>\n\n        </div>\n    </div>\n</section>\n\n<section class=\"panel\">\n    <div class=\"container\">\n        <div class=\"class-content\">\n\n            <h2>Reviews</h2>\n            <div class=\"class-reviews\">\n                <ul>\n                    <li>Review 1</li>\n                    <li>Review 2</li>\n                    <li>Review 3</li>\n                </ul>\n            </div>\n\n        </div>\n    </div>\n</section>\n\n<section class=\"class-booking-wrapper\">\n  <div class=\"class-booking text-center\">\n    <div class=\"class-price text-uppercase\">\n      $30 per person\n    </div>\n    <div class=\"\">\n      Next available classes <span class=\"right\">View all</span>\n    </div>\n    <ul>\n      <li>Class time 1</li>\n      <li>Class time 2</li>\n      <li>Class time 3</li>\n      <li>Class time 4</li>\n    </ul>\n  </div>\n</section>\n\n<div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">Class quick details</h3>\n    </div>\n    <div class=\"panel-body\">\n        <p>\n            Class average review rating:\n        </p>\n        <p>\n            Venue location:\n        </p>\n        <p>\n            Category:\n            {{ class.class.category.title }}\n        </p>\n        <p>\n            Sub category:\n            {{ class.class.subcategory.title }}\n        </p>\n        <p>\n            Short description:\n            {{ class.class.brief }}\n        </p>\n\n    </div>\n</div>\n\n<div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">Class more details</h3>\n    </div>\n    <div class=\"panel-body\">\n        <h2>\n            More about\n            {{ class.class.title | lowercase }}\n            by\n            {{ class.class.teacher.username }}\n            {{ class.class.teacher.profile.firstName | capitalize }}\n            {{ class.class.teacher.profile.lastName | capitalize }}\n        </h2>\n        <p>\n            Long description:\n            {{ class.class.description }}\n        </p>\n        <p>\n            Class images\n        </p>\n\n    </div>\n</div>\n\n<div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">Register</h3>\n    </div>\n    <div class=\"panel-body\">\n        <h3>\n            ${{ class.class.price }}\n        </h3>\n        <p>\n            Dates available:\n            <div ng-repeat=\"classDate in class.class.validDates | limitTo:5\">\n                {{ classDate }}\n            </div>\n        </p>\n        <p>\n            Spots left:\n            {{ class.class.spotsLeft }}\n        </p>\n\n    </div>\n</div>\n\n<button type=\"button\" class=\"btn btn-default\" ng-click=\"user.isCollapsed = !user.isCollapsed\">View JSON</button>\n<hr>\n<div uib-collapse=\"user.isCollapsed\">\n    <div class=\"well well-lg\">\n\n        <pre>\n      {{ class.class | json }}\n    </pre>\n\n    </div>\n</div>\n");
$templateCache.put("home.html","<section class=\"hero\" style=\"background-image: url(\'/images/outside-yoga.jpg\')\">\n  <div class=\"container clear\">\n    <div class=\"content\">\n\n      <div class=\"logo-wrapper\">\n        <img src=\"/images/logo.png\" alt=\"Your Class - logo\"/>\n      </div>\n\n      <h1 class=\"text-center\">\n        Your Class\n      </h1>\n\n      <div class=\"text-center lead\">\n        Inspiring everyone to learn, share and teach what you love\n      </div>\n\n      <form name=\"form\" ng-submit=\"search()\" class=\"search-form clearfix\">\n        <fieldset>\n\n          <div class=\"form-group\">\n            <label class=\"control-label hidden\">Keyword</label>\n            <input ng-model=\"class\" type=\"text\" class=\"form-control\" placeholder=\"Class\"/>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"control-label hidden\">Location</label>\n            <input ng-model=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Location\"/>\n          </div>\n          <div class=\"search-submit\">\n            <button type=\"submit\" class=\"btn btn-primary btn-block\">\n              <span class=\"text\">Search</span>\n            </button>\n          </div>\n\n        </fieldset>\n      </form>\n\n      <div class=\"info-button center-block\">\n        <button type=\"submit\" ng-click=\"home.aboutModal(\'lg\')\" class=\"btn btn-info btn-block btn-shadow\">\n          <span class=\"text\">Who are we?</span>\n        </button>\n      </div>\n\n    </div>\n  </div>\n</section>\n\n<section class=\"top-categories container\">\n  <h2 class=\"text-center\">Top categories</h2>\n\n  <ul class=\"list-unstyled row\">\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Sports</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Academic</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Arts</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Cooking</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Life skills</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Hobbies</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Yoga</a>\n    </li>\n    <li class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a href=\"#\">Fitness</a>\n    </li>\n  </ul>\n</section>\n\n<section class=\"top-categories container\">\n  <h2 class=\"text-center\">Latest classes</h2>\n\n  <ul class=\"list-unstyled row\">\n    <li ng-repeat=\"classes in home.classesList | limitTo: \'-8\'\" class=\"col-sm-3\" style=\"background-image: url(\'/images/categories/sports.jpg\')\">\n      <a ui-sref=\"Class({ classAlias:classes.alias })\">{{ classes.title }}</a>\n    </li>\n  </ul>\n\n</section>\n");
$templateCache.put("search.html","<div class=\"container\">\n\n  <h1 class=\"heading center-text\">Search classes</h1>\n\n  <div class=\"panel panel-primary\" ng-repeat=\"classes in search.classesList\">\n    <div class=\"panel-heading\">\n      <h2>\n        {{ classes.title }}\n      </h2>\n    </div>\n\n    <div class=\"panel-body\">\n      <p>\n        <strong>\n          Class Description:\n        </strong>{{ classes.description }}\n      </p>\n      <div>\n        <a class=\"btn btn-primary\" ui-sref=\"Class({ classAlias:classes.alias })\">Go to class</a>\n      </div>\n    </div>\n\n    <div class=\"panel-footer\">\n      <div>\n        <strong>Teacher email:\n        </strong>{{ classes.teacher.email }}\n      </div>\n      <div>\n        <strong>Spots left:\n        </strong>{{ classes.spotsLeft }}\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<pre>\n	{{ search.classesList | json }}\n</pre>\n");
$templateCache.put("verify.html","<h3>Verify Email Address</h3>\n\n<div ng-if=\"verify.verifySent\" class=\"alert\" ng-class=\"home.verified ? \'alert-danger\' : \'alert-success\'\">\n  <span ng-if=\"verify.verified\">You are verified!</span>\n  <span ng-if=\"!verify.verified\">Error, not verified</span>\n</div>\n");
$templateCache.put("directives/example.html","<div class=\"example-directive\">\n  <h1>{{title}}</h1>\n</div>\n");
$templateCache.put("globals/footer.html","");
$templateCache.put("globals/header.html","<nav class=\"navbar navbar-inverse\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-2\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand logo\" href=\"/\">\n        <img src=\"images/logo.png\">\n      </a>\n    </div>\n\n    <form name=\"form\" ng-submit=\"search()\" class=\"search-form clearfix\">\n      <fieldset>\n\n        <div class=\"form-group\">\n          <label class=\"control-label hidden\">Keyword</label>\n          <input ng-model=\"class\" type=\"text\" class=\"form-control\" placeholder=\"Class\"/>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label hidden\">Location</label>\n          <input ng-model=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Location\"/>\n        </div>\n        <div class=\"search-submit\">\n          <button type=\"submit\" class=\"btn btn-primary btn-block\">\n            <span class=\"text\">Search</span>\n          </button>\n        </div>\n\n      </fieldset>\n    </form>\n\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li>\n          <a href=\"#\" ng-click=\"SignUpModal(\'sm\')\" ng-if=\"!userLoggedIn\">Sign Up</a>\n        </li>\n        <li>\n          <a href=\"#\" ng-click=\"LogInModal(\'sm\')\" ng-if=\"!userLoggedIn\">Log In</a>\n        </li>\n        <li class=\"dropdown\" uib-dropdown ng-if=\"userLoggedIn\">\n          <a href=\"/user/dashboard\" role=\"button\" uib-dropdown-toggle>\n            {{ userProfile.firstName }} {{ userProfile.lastName }}\n            <span class=\"caret\"></span>\n          </a>\n          <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"btn-append-to-single-button\">\n            <li role=\"menuitem\">\n              <a href=\"/user/dashboard\">Dashboard</a>\n            </li>\n            <li role=\"menuitem\">\n              <a href=\"/user/edit\">Edit profile</a>\n            </li>\n            <li role=\"menuitem\">\n              <a href=\"/user/class\">Add class</a>\n            </li>\n            <li class=\"divider\"></li>\n            <li role=\"menuitem\">\n              <a href=\"#\" ng-click=\"logOut()\">Log out</a>\n            </li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n");
$templateCache.put("modals/about.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title text-center\">Who are we?</h3>\n</div>\n\n<div class=\"modal-body\">\n  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\n\n  <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>\n\n  <p>Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</p>\n\n  <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.</p>\n\n  <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>\n</div>\n");
$templateCache.put("modals/login.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title text-center\">Log In</h3>\n</div>\n\n<div class=\"modal-body\">\n  <form name=\"form\" ng-submit=\"LogInForm()\">\n    <fieldset>\n\n      <div class=\"form-group\">\n        <label class=\"control-label hidden\">Email</label>\n        <input ng-model=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email\" required/>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label hidden\">Password</label>\n        <input ng-model=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" required/>\n      </div>\n      <div class=\"form-group\">\n        <button type=\"submit\" class=\"btn btn-primary btn-block\" ng-disabled=\"form.$invalid\" ng-class=\"{loading: isSubmitting}\">Log in</button>\n      </div>\n\n      <div class=\"alert alert-danger\" ng-if=\"formError\">\n        <span ng-repeat=\"error in formErrorData\">\n          {{ error }}\n        </span>\n      </div>\n\n    </fieldset>\n  </form>\n\n  <hr/>\n\n  <div class=\"login-switch clear\">\n    Not yet a Your Class member?\n    <button type=\"button\" name=\"Log in\" class=\"btn btn-alternative btn-sm pull-right\" ng-click=\"SignUpSwitch()\">\n      Sign up\n    </button>\n  </div>\n\n</div>\n");
$templateCache.put("modals/signup.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title text-center\">Sign Up</h3>\n</div>\n\n<div class=\"modal-body\">\n\n<a href=\"#\" class=\"btn btn-social btn-block btn-google\">\n  <span class=\"image image-google\"></span>\n  Google\n</a>\n<a href=\"#\" class=\"btn btn-social btn-block btn-facebook\">\n  <span class=\"icon icon-facebook\"></span>\n  Facebook\n</a>\n\n<div class=\"signup-separator\">\n  <span>or</span>\n  <hr/>\n</div>\n\n  <form name=\"form\" ng-submit=\"SignUpForm()\">\n    <fieldset>\n\n      <div class=\"form-group\">\n        <label class=\"control-label hidden\">First Name</label>\n        <input ng-model=\"firstname\" type=\"text\" class=\"form-control\" placeholder=\"First Name\" required/>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label hidden\">Last Name</label>\n        <input ng-model=\"lastname\" type=\"text\" class=\"form-control\" placeholder=\"Last Name\" required/>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label hidden\">Email</label>\n        <input ng-model=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email\" required/>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label hidden\">Password</label>\n        <input ng-model=\"password\" type=\"password\" class=\"form-control password\" placeholder=\"Password\" minlength=\"6\" required/>\n        <!-- <ng-password-meter password=\"password\"></ng-password-meter> -->\n      </div>\n      <div class=\"form-group\">\n        <button type=\"submit\" class=\"btn btn-primary btn-block\" ng-disabled=\"form.$invalid\" ng-class=\"{loading: isSubmitting}\">\n          <span class=\"text\">Sign up</span>\n        </button>\n      </div>\n\n      <div class=\"alert alert-danger\" ng-if=\"formError\">\n        <span ng-repeat=\"error in formErrorData\">\n          {{ error }}\n        </span>\n      </div>\n\n    </fieldset>\n  </form>\n\n  <hr/>\n\n  <div class=\"login-switch clear\">\n    Already a Your Class member?\n    <button type=\"button\" name=\"Log in\" class=\"btn btn-alternative btn-sm pull-right\" ng-click=\"LoginSwitch()\">\n      Log in\n    </button>\n  </div>\n\n</div>\n");
$templateCache.put("user/add-class.html","<div class=\"panel panel-primary\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Edit details</h3>\n  </div>\n  <div class=\"panel-body\">\n    <form ng-submit=\"user.addClass()\" class=\"form-horizontal\">\n      <fieldset>\n\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Title</label>\n          <div class=\"col-md-10\">\n            <input ng-model=\"user.title\" type=\"text\" class=\"form-control\" placeholder=\"Class title\"/>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Category</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.categoryId\" ng-change=\"user.classCategory(user.categoryId)\" class=\"form-control\" ng-options=\"category.id as category.title for category in user.categories track by category.id\"></select>\n          </div>\n        </div>\n\n        <div ng-repeat=\"category in user.categories\" ng-if=\"category.id == user.subCategory && category.subcats[0]\">\n          <div class=\"form-group\">\n            <label class=\"col-md-2 control-label\">Sub Category</label>\n            <div class=\"col-md-10\">\n              <select ng-model=\"user.subcategoryId\" class=\"form-control\" ng-options=\"subCategory.id as subCategory.title for subCategory in category.subcats track by subCategory.id\"></select>\n            </div>\n          </div>\n        </div>\n\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Sub Category</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.categoryId\" class=\"form-control\" ng-options=\"category.id as category.title for category in user.categories track by category.id\"></select>\n          </div>\n        </div> -->\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Brief</label>\n          <div class=\"col-md-10\">\n            <textarea ng-model=\"user.brief\" class=\"form-control\" rows=\"3\" placeholder=\"Class brief description\"></textarea>\n          </div>\n        </div> -->\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Description</label>\n          <div class=\"col-md-10\">\n            <textarea ng-model=\"user.description\" class=\"form-control\" rows=\"3\" placeholder=\"Class description\"></textarea>\n          </div>\n        </div> -->\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Teacher</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.teacherId\" class=\"form-control\" ng-options=\"teacher.id as teacher.username for teacher in user.teachers track by teacher.id\"></select>\n          </div>\n        </div> -->\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Interval</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.intervalId\" class=\"form-control\" ng-options=\"interval.id as interval.title for interval in user.intervalList track by interval.id\"></select>\n          </div>\n        </div> -->\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Price</label>\n          <div class=\"col-md-10\">\n            <input ng-model=\"user.price\" type=\"text\" class=\"form-control\"/>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Size</label>\n          <div class=\"col-md-10\">\n            <input ng-model=\"user.size\" type=\"text\" class=\"form-control\"/>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Start time</label>\n          <div class=\"col-md-10\">\n            <!-- <uib-timepicker ng-model=\"user.startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"ismeridian\"></uib-timepicker> -->\n            <uib-timepicker ng-model=\"user.startTime\"></uib-timepicker>\n            <!-- <input ng-model=\"user.startTime\" type=\"text\" class=\"form-control\"/> -->\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">End time</label>\n          <div class=\"col-md-10\">\n            <uib-timepicker ng-model=\"user.endTime\"></uib-timepicker>\n            <!-- <input ng-model=\"user.endTime\" type=\"text\" class=\"form-control\"/> -->\n          </div>\n        </div>\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Start date</label>\n          <div class=\"col-md-10\">\n            <input ng-model=\"user.startDate\" type=\"text\" class=\"form-control\"/>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">End date</label>\n          <div class=\"col-md-10\">\n            <input ng-model=\"user.endDate\" type=\"text\" class=\"form-control\"/>\n          </div>\n        </div> -->\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Days</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.dayIds\" class=\"form-control\" ng-options=\"day.id as day.title for day in user.dayList track by day.id\"></select>\n          </div>\n        </div> -->\n\n        <!-- <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Booking type</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.bookingType\" class=\"form-control\" ng-options=\"booking.id as booking.title for booking in user.bookingList track by booking.id\"></select>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-md-2 control-label\">Venue type</label>\n          <div class=\"col-md-10\">\n            <select ng-model=\"user.venueType\" class=\"form-control\" ng-options=\"venue.id as venue.title for venue in user.venueList track by venue.id\"></select>\n          </div>\n        </div> -->\n\n        <div class=\"form-group\">\n          <div class=\"col-md-10 col-md-offset-2\">\n            <button type=\"reset\" class=\"btn btn-primary\">Cancel</button>\n            <button type=\"submit\" class=\"btn btn-primary\">Send</button>\n          </div>\n        </div>\n\n        <div ng-if=\"home.formSent\" class=\"alert\" ng-class=\"home.formDone ? \'alert-success\' : \'alert-danger\'\">\n          <span ng-if=\"user.formDone\">Form Sent</span>\n          <span ng-if=\"!user.formDone\">Form Error</span>\n        </div>\n      </fieldset>\n\n    </form>\n\n  </div>\n\n</div>\n");
$templateCache.put("user/classes.html","<div class=\"panel panel-primary\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Classes</h3>\n  </div>\n  <div class=\"panel-body\">\n\n    \n\n  </div>\n</div>\n");
$templateCache.put("user/dashboard.html","<div class=\"row\">\n  <div class=\"col-sm-3\">\n    <div ng-repeat=\"userImage in user.userData.photos\" ng-if=\"userImage.isMain == 1\" class=\"thumbnail\">\n      <img class=\"img-rounded\" ng-src=\"{{imageUrl}}{{userImage.src}}\" />\n    </div>\n    <div class=\"text-center\" ng-if=\"user.userData.profile.firstName\">\n      <span>{{ user.userData.profile.firstName }} {{ user.userData.profile.lastName }}</span>\n      <div>\n        <a href=\"/user/edit-profile\">Edit Profile</a>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-sm-9\">\n    <div class=\"panel\">\n      <h2>Listings</h2>\n      <div class=\"panel\">\n        <ul ng-repeat=\"listing in user.userListings\">\n          <li>\n            <a ui-sref=\"Class({ classAlias:listing.alias })\">{{ listing.title }}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"panel panel-grey\">\n      <h3>Classes</h3>\n    </div>\n  </div>\n</div>\n\n<div class=\"panel hide\">\n  <div class=\"panel-body\">\n    <p ng-if=\"user.userData.roles[0]\">\n      <span class=\"label label-success\" ng-repeat=\"userRole in user.userData.roles\">{{ userRole.title }}</span>\n    </p>\n    <div ng-repeat=\"userImage in user.userData.photos\" ng-if=\"userImage.isMain == 1\" class=\"thumbnail\">\n      <img class=\"img-rounded\" ng-src=\"{{imageUrl}}{{userImage.src}}\" />\n    </div>\n    <p ng-if=\"user.userData.profile.firstName\">\n      <strong>Name: </strong>\n      <span>{{ user.userData.profile.firstName }} {{ user.userData.profile.lastName }}</span>\n    </p>\n    <p ng-if=\"user.userData.email\">\n      <strong>Email: </strong>\n      <span>{{ user.userData.email }}</span>\n    </p>\n    <!-- <p>\n      <strong>Birthday: </strong>\n      <span>{{ user.newBirthday | date:\'dd/MM/yyyy\' }}</span>\n    </p> -->\n    <p ng-if=\"user.userData.profile.phone\">\n      <strong>Phone number: </strong>\n      <span>{{ user.userData.profile.phone }}</span>\n    </p>\n    <p ng-if=\"user.userData.profile.brief\">\n      <strong>Brief: </strong>\n      <span>{{ user.userData.profile.brief }}</span>\n    </p>\n    <p ng-if=\"user.userData.profile.about\">\n      <strong>About: </strong>\n      <span>{{ user.userData.profile.about }}</span>\n    </p>\n    <!-- <p>\n      <strong>Rating: </strong>\n      <uib-rating ng-model=\"user.userData.rating | number:0\" max=\"5\" readonly=\"true\" aria-labelledby=\"default-rating\"></uib-rating>\n    </p> -->\n\n\n  </div>\n</div>\n");
$templateCache.put("user/edit-profile.html","<div class=\"panel panel-primary\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Edit details</h3>\n  </div>\n  <div class=\"panel-body\">\n    <form ng-submit=\"user.editDetails()\">\n\n      <p>\n        <span class=\"label label-success\" ng-repeat=\"role in user.userData.roles\">{{ role.title }}</span>\n      </p>\n      <div ng-repeat=\"userImage in user.userData.photos\" class=\"thumbnail\" ng-class=\"{default: userImage.isMain == 1}\">\n        <button class=\"delete-photo\" ng-click=\"user.userImageDelete(userImage.id)\">Delete</button>\n        <button class=\"default-photo\" ng-click=\"user.userImageDefault(userImage.id)\">\n          <span ng-if=\"userImage.isMain == 1\">Remove as profile</span>\n          <span ng-if=\"userImage.isMain == 0\">Set as profile</span>\n        </button>\n        <img class=\"img-rounded\" ng-src=\"{{imageUrl}}{{userImage.src}}\"/>\n\n      </div>\n      <p>\n        <strong>First name:\n        </strong>\n        <input ng-model=\"user.userData.profile.firstName\" type=\"text\" class=\"form-control\"/>\n      </p>\n      <p>\n        <strong>Last name:\n        </strong>\n        <input ng-model=\"user.userData.profile.lastName\" type=\"text\" class=\"form-control\"/>\n      </p>\n      <!-- <p>\n        <strong>Birthday:\n        </strong>\n        <input ng-model=\"user.newBirthday\" type=\"date\" class=\"form-control\"/>\n      </p> -->\n      <p>\n        <strong>Phone number:\n        </strong>\n        <input ng-model=\"user.userData.profile.phone\" type=\"tel\" class=\"form-control\"/>\n      </p>\n      <p>\n        <strong>Brief:\n        </strong>\n        <textarea ng-model=\"user.userData.profile.brief\" trows=\"2\" class=\"form-control\"></textarea>\n      </p>\n      <p>\n        <strong>About:\n        </strong>\n        <textarea ng-model=\"user.userData.profile.about\" rows=\"4\" class=\"form-control\"></textarea>\n      </p>\n      <div class=\"\">\n        <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n      </div>\n\n    </form>\n\n    <!-- <form ng-submit=\"user.addImage()\">\n      <input type=\"file\" id=\"file\" name=\"file\"/>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </form> -->\n\n    <button ngf-select=\"user.uploadFiles($files, $invalidFiles)\" multiple accept=\"image/*\" ngf-max-height=\"5000\" ngf-max-width=\"5000\" ngf-max-size=\"5MB\" ngf-resize=\"{width: 300, height: 300, quality: .8, type: \'image/jpeg\'}\" ngf-resize-if=\"$width > 300 || $height > 300\">\n      Select Files\n    </button>\n    <br><br>\n    Files:\n    <ul>\n      <li ng-repeat=\"f in user.files\" style=\"font:smaller\">{{f.name}}\n        {{f.$errorParam}}\n        <span class=\"progress\" ng-show=\"f.progress >= 0\">\n          <div style=\"width:{{f.progress}}%\" ng-bind=\"f.progress + \'%\'\"></div>\n        </span>\n      </li>\n      <li ng-repeat=\"f in user.errFiles\" style=\"font:smaller\">\n        {{f.name}}\n        {{f.$error}}\n        {{f.$errorParam}}\n      </li>\n    </ul>\n    {{user.errorMsg}}\n\n  </div>\n</div>\n");
$templateCache.put("user/listings.html","<div class=\"panel panel-primary\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Listings</h3>\n  </div>\n  <div class=\"panel-body\">\n\n    <ul ng-repeat=\"listing in user.userListings\">\n      <li>\n        <a ui-sref=\"Class({ classAlias:listing.alias })\">{{ listing.title }}</a>\n      </li>\n    </ul>\n\n  </div>\n</div>\n");
$templateCache.put("user/user.html","<div class=\"container\">\n\n<div class=\"\">\n  <ul class=\"nav nav-pills\">\n    <li ng-class=\"{ \'active\': pageClass === \'user-dashboard\' }\">\n      <a href=\"/user/dashboard\">Dashboard</a>\n    </li>\n    <li ng-class=\"{ \'active\': pageClass === \'user-listings\' }\">\n      <a href=\"/user/listings\">Your Listings</a>\n    </li>\n    <li ng-class=\"{ \'active\': pageClass === \'user-classes\' }\">\n      <a href=\"/user/classes\">Your Classes</a>\n    </li>\n    <li ng-class=\"{ \'active\': pageClass === \'user-add-class\' }\">\n      <a href=\"/user/add-class\">Add Class</a>\n    </li>\n  </ul>\n</div>\n\n    <div ui-view class=\"\"></div>\n\n  <hr>\n  <button type=\"button\" class=\"btn btn-default\" ng-click=\"user.isCollapsed = !user.isCollapsed\">View JSON</button>\n  <hr>\n  <div uib-collapse=\"user.isCollapsed\">\n    <div class=\"well well-lg\">\n\n      <pre>\n        {{ user.userData | json }}\n      </pre>\n\n    </div>\n  </div>\n\n</div>\n");}]);