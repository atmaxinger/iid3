var USERS = [
	{
		username: "tim.taylor",
		password: "tooltime",
		firstname: "Tim",
		lastname: "Taylor",
		
		zip: "3281",
		city: "Oberndorf",
		street: "Manker Straße 2",
		
		email: "tim@taylor.at",
		tel: "0664 123 45 67"
	}
];

var TOOLS = [
	{
		id: "908ecdc1-ea1f-48ba-be7c-9cb6ed9133d5",
		sharer: "tim.taylor",
		name: "Bosch Professional GSR 18 V-EC Akku Bohrmaschine",
		brand: "BOSCH",
		
		description: "Eine Akkubohrmaschine",
		availiable: true,
		
		imgs: [
			"imgs/908ecdc1-ea1f-48ba-be7c-9cb6ed9133d5/1.jpg",
			"imgs/908ecdc1-ea1f-48ba-be7c-9cb6ed9133d5/2.jpg",
			"imgs/908ecdc1-ea1f-48ba-be7c-9cb6ed9133d5/3.jpg"
		]
	},
	{
		id: "3a597ff1-d298-497f-9ff9-346cb575d3ea",
		sharer: "tim.taylor",
		name: "Hilti Akku Bohrmaschine und Bohrhammer",
		brand: "Hilti",
		
		description: "Nennspannung: 36 V, Batterietyp: Li-Ion, Einzelschlagenergie: 3.6 J",
		availiable: false,
		
		imgs: [
			"imgs/3a597ff1-d298-497f-9ff9-346cb575d3ea/1.jpg"
		]
	},
	{
		id: "2ba07a71-973f-4e87-8d4b-302aa8a72634",
		sharer: "tim.taylor",
		name: "Kärcher Hochdruckreiniger",
		brand: "Kärcher",
		
		description: "Bester Reiniger",
		availiable: false
	}
];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var app = angular.module("main", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
			templateUrl: 'app/partials/start.html',
			controller: 'StartCtrl'
		})
		.when('/search', {
			templateUrl: 'app/partials/search.html',
			controller: 'SearchCtrl'	
		})
		.when('/tooldetail', {
			templateUrl: 'app/partials/tooldetail.html',
			controller: 'ToolDetailCtrl'
		})
		.when('/login', {
			templateUrl: 'app/partials/login.html',
			controller: 'LoginCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});


app.factory('authService', [function(){
	
	var authServiceFactory = {};

	var _authstatus = { 
		user: null 
	};


	var _isLoggedIn = function() {
		return _authstatus.user != null;
	}
	
	var _login = function(username, password) {
		
		var lastu = _authstatus.user;
		
		USERS.forEach(function(user) {
			if(user.username == username && user.password == password) {
				_authstatus.user = user;
			}
		});
		
				
		if(_authstatus.user != lastu) {
			return true;
		}		

		return false;
	}	
	
	var _getUserForUsername = function(username) {
		var user = null;
		
		USERS.forEach(function(u) {
			if(u.username == username) {
				user = u;
			}
		});
		
		return user;
	}
	
	var _logout = function() {
		_authstatus.user = null;
	}
	
	authServiceFactory.login = _login;
	authServiceFactory.logout = _logout;
	
	authServiceFactory.getUserForUsername = _getUserForUsername;
	
	authServiceFactory.authstatus = _authstatus;
	
	return authServiceFactory;
}]);

app.factory('toolService', [function(){
	var toolServiceFactory = {};

	var _search = function(filter) {
		var tools = [];
		
		var text = filter.text;
	
		TOOLS.forEach(function(tool) {
			if(tool.name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
				tools.push(tool);
			}
		});
		
		
		var brand = filter.brand;
		var distance = filter.distance;
		var availiability = filter.availiability;
		
		if(brand != "Alle") {
			var filtered = [];
			
			tools.forEach(function(t){
				if(t.brand.toLowerCase() == brand.toLowerCase()) {
					filtered.push(t);
				}
			});
			
			tools = filtered;
		}
		
		if(availiability != "Alle") {
			var should = true;			
			if(availiability == "Verfügbar") {
				should = true;
			}
			else {
				should = false;
			}
			var filtered = [];
			
			tools.forEach(function(t){
				if(t.availiable == should) {
					filtered.push(t);
				}
			});
			
			tools = filtered;
		}
		
		return tools;
	}
	
	var _getAllBrandsForSearch = function(text) {
		var tools = _search(text);
		
		var brands = []
		
		tools.forEach(function(t) {
			
			brands.push(t.brand);
			
		})
		
		return brands;
	}
	
	var _getTool = function(id) {
		var tool = null;
		
		TOOLS.forEach(function(t) {
			if(t.id == id) {
				tool = t;
			}
		});
		
		return tool;
	}
	
	
	toolServiceFactory.search = _search;
	toolServiceFactory.getAllBrandsForSearch = _getAllBrandsForSearch;
	toolServiceFactory.getTool = _getTool;

	return toolServiceFactory;
}]);


app.controller('StartCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService) {

}]);

app.controller('SearchCtrl', ['$scope', '$location', 'toolService', 'authService', '$routeParams', function($scope, $location, toolService, authService, $routeParams) {
	var searchtext = $routeParams.search;
	
	$scope.distances = [5, 10, 20, 50];
	$scope.availiabilities = ["Alle", "Verfügbar", "Nicht Verfügbar"];
	
	$scope.brands = ["Alle"];
	
	$scope.searchFilter = { 
		text: searchtext,
		distance: $scope.distances[1],
		availiability: $scope.availiabilities[0],
		brand: $scope.brands[0]
	};
	
	$scope.brands.push.apply($scope.brands, toolService.getAllBrandsForSearch($scope.searchFilter));
	
	
	$scope.searchtext = searchtext;
	
	$scope.tools = getDto();
	
	$scope.update = function() {
		$scope.tools = getDto();
	}
	
	
	function getDto() {
		 var tools = toolService.search($scope.searchFilter);
		 
		 var dto = [];
		 
		 tools.forEach(function(t) {
			var sharer = authService.getUserForUsername(t.sharer);
			
			dto.push({ tool: t, sharer: sharer });
		 });
		 
		 return dto;
	}
}]);

app.controller('ToolDetailCtrl', ['$scope', '$location', 'authService', 'toolService', '$routeParams', function($scope, $location, authService, toolService, $routeParams) {
	var toolid = $routeParams.id;
	
	$scope.tool = toolService.getTool(toolid);
	
	$scope.sharer = authService.getUserForUsername($scope.tool.sharer);
}]);


app.controller('LoginCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService) {
	$scope.login = function() {
		var un = $scope.username;
		var pw = $scope.password;
		
		var success = authService.login(un, pw);
		if(success == true) {
			$location.path('/');
		}
	}
}]);

app.controller('navbarController', ['$scope', '$location', 'authService', function($scope, $location, authService) {
	$scope.authstatus = authService.authstatus;
	$scope.position = "";
	
	$scope.search = function(text) {
		$location.path('/search').search("search=" + text);
	}
	
	$scope.logOut = function() {
		authService.logout();

		$location.path('/');
	}
}]);